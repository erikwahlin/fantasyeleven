import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/context';

import apis from '../../constants/api';

import { clone, userMsg, errMsg, userTemplate } from '../../constants/helperFuncs';

const OverviewContext = createContext(null);

const initialState = {
    user: null,
    teams: [],
    selectedTeam: -1
};

class OverviewState extends Component {
    constructor(props) {
        super(props);

        this.state = clone(initialState);

        this.readRegisteredTeams = this.readRegisteredTeams.bind(this);
        this.selectTeam = this.selectTeam.bind(this);

        // Share
        this.setters = {
            selectTeam: this.selectTeam
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
            this.readRegisteredTeams(() => {
                this.selectTeam(0);
            });
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

    readRegisteredTeams = async callback => {
        await apis
            .read({ action: 'readRegisteredTeams', _id: this.state.user._id })
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ teams: res.data.data }, () => {
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

    selectTeam = selectedTeam => {
        this.setState({ selectedTeam });
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
