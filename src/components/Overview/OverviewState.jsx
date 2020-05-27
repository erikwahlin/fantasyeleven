import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/context';

import apis from '../../constants/api';

import { clone, userMsg, errMsg, userTemplate } from '../../constants/helperFuncs';

import * as ROUTES from '../../constants/routes';

const routeToNewteamMsg = userMsg({
    message: 'Första gången? Klicka för att skapa ett nytt lag!',
    type: 'info',
    container: 'top-center',
    dismiss: false
});

const routeToSigninMsg = userMsg({
    message: 'Inte inloggad? Klicka för att logga in.',
    type: 'info',
    container: 'top-center',
    dismiss: false
});

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
                // suggest -> /signin
                routeToSigninMsg.notif.onRemoval = () => {
                    // cleanup self before redirect
                    routeToSigninMsg.notif.onRemoval = () => {};
                    routeToSigninMsg.remove();
                    // go
                    this.props.history.push(ROUTES.SIGN_IN);
                };

                return routeToSigninMsg.add();
            }

            // if user, get data
            this.readPlayedTeams(() => {
                this.readPlayedRounds(() => {
                    const { playedRounds } = this.state;
                    if (playedRounds.length) this.setRoundInView(playedRounds[0]);
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

    setRoundInView = round => {
        if (this.state.roundInView) {
            if (round._id === this.state.roundInView._id) return;
        }

        this.setState({ roundInView: round });
    };

    readActiveRound = async callback => {
        await apis
            .read({ action: 'readActiveRound' })
            .then(res => {
                if (res.status <= 200) {
                    const activeRound = clone(res.data.data);

                    this.setState({ activeRound });
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
                        if (res.data.data.length < 1) {
                            console.log('No registered teams found.');

                            // suggest -> /newteam
                            routeToNewteamMsg.notif.onRemoval = () => {
                                // cleanup self before redirect
                                routeToNewteamMsg.notif.onRemoval = () => {};
                                routeToNewteamMsg.remove();
                                // go
                                this.props.history.push(ROUTES.NEWTEAM);
                            };

                            routeToNewteamMsg.add();
                        }

                        if (typeof callback === 'function') callback();

                        // put result in played teams
                        /* this.state.playedTeams.forEach(team => {
                            this.state.playedRounds;
                        }); */
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
        //const IDs = this.state.playedTeams.map(team => team.round);

        if (!this.state.playedTeams.length) return;

        await apis
            .create({ action: 'readPlayedRounds', payload: { teams: this.state.playedTeams } })
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
