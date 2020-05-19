import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/context';

import { clone, errMsg } from '../../constants/helperFuncs';

const OverviewContext = createContext(null);

const initialState = {
    user: null,
    teams: []
};

class OverviewState extends Component {
    constructor(props) {
        super(props);

        this.state = clone(initialState);

        // Share
        this.setters = {};
    }

    componentDidMount = () => {
        this.userInit(admin => {
            if (!admin) {
                errMsg(
                    'Kunde inte fastställa admin-rättigheter. Vänligen logga in på nytt.',
                    10000
                ).add();
                return;
            }
        });
    };

    userInit = async callback => {
        await this.props.firebase.auth.onAuthStateChanged(async user => {
            // check/set admin details
            if (user) {
                await this.props.firebase
                    .user(user.uid)
                    .once('value')
                    .then(snapshot => {
                        this.setState(
                            {
                                user: {
                                    uid: user.uid,
                                    username: snapshot.val().username,
                                    email: snapshot.val().email,
                                    roles: snapshot.val().roles
                                }
                            },
                            () => {
                                if (typeof callback === 'function') callback(true);

                                // GET TEAMS (all registered teams) FROM MONGO INSTEAD
                                /* this.setState({
                                    teams: [this.props.location.state.newTeam, ...this.state.teams]
                                }); */
                            }
                        );
                    });
            } else if (typeof callback === 'function') callback(false);
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
