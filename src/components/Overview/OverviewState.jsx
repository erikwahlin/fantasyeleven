import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/context';

import apis from '../../constants/api';

import { clone, userMsg, errMsg, userTemplate } from '../../constants/helperFuncs';

const OverviewContext = createContext(null);

const initialState = {
    user: null,
    playedTeams: [],
    activeRound: null,
    playedRounds: [],
    roundInView: null
};

class OverviewState extends Component {
    constructor(props) {
        super(props);

        this.state = clone(initialState);

        this.readPlayedTeams = this.readPlayedTeams.bind(this);
        this.setRoundInView = this.setRoundInView.bind(this);
        this.readActiveRound = this.readActiveRound.bind(this);
        this.readPlayedRounds = this.readPlayedRounds.bind(this);

        // Share
        this.setters = {
            setRoundInView: this.setRoundInView
        };
    }

    componentDidMount = () => {
        this.userInit(user => {
            // if no user, prompt signin/up
            if (!user) {
                userMsg({
                    message: 'Kunde inte hitta din användar-data. Vänligen logga in på nytt.',
                    type: 'danger',
                    dismiss: false,
                    onRemoval: () => this.props.history.push('/signin')
                }).add();
                return;
            }

            // if user, get data
            this.readPlayedTeams(() => {
                this.readPlayedRounds(() => {
                    const { playedRounds } = this.state;
                    if (playedRounds.length) this.setRoundInView(playedRounds[0]._id);
                });
            });

            this.readActiveRound();
        });
    };

    userInit = async callback => {
        await this.props.firebase.onAuthUserListener(
            user => {
                this.setState({ user: userTemplate(user) }, () => {
                    // got user
                    if (typeof callback === 'function') callback(true);
                });
            },
            () => {
                // no user
                if (typeof callback === 'function') callback(false);
            }
        );
    };

    setRoundInView = _id => {
        if (this.state.roundInView) {
            if (_id === this.state.roundInView._id) return;
        }

        let index = -1;

        this.state.playedRounds.forEach((r, nth) => {
            if (r._id === _id) index = nth;
            return;
        });

        if (index < 0) return;

        this.setState({ roundInView: { _id, index } });
    };

    readActiveRound = async callback => {
        await apis
            .read({ action: 'readActiveRound' })
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ activeRound: res.data.data });
                } else {
                    console.log('Active round not found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get active round (${err})`);
            });
    };

    readPlayedTeams = async callback => {
        await apis
            .read({ action: 'readPlayedTeams', _id: this.state.user._id })
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ playedTeams: res.data.data }, () => {
                        if (typeof callback === 'function') callback();
                    });
                } else {
                    console.log('Teams not found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get teams (${err})`);
            });
    };

    readPlayedRounds = async callback => {
        const payload = { IDs: this.state.playedTeams.map(team => team.round) };

        if (!payload.IDs.length) return;

        await apis
            .create({ action: 'readPlayedRounds', payload })
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ playedRounds: res.data.data }, () => {
                        if (typeof callback === 'function') callback();
                    });
                } else {
                    console.log('Played rounds not found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get played rounds (${err})`);
            });
    };

    render() {
        return (
            <OverviewContext.Provider
                value={{
                    state: this.state,
                    setters: this.setters
                }}
            >
                {this.props.children}
            </OverviewContext.Provider>
        );
    }
}

export default withRouter(withFirebase(OverviewState));

export const withOverview = Component => props => (
    <OverviewContext.Consumer>
        {Overview => <Component {...props} overviewContext={Overview} />}
    </OverviewContext.Consumer>
);
