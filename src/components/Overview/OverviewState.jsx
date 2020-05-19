import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/context';

import { clone, userMsg, errMsg, userTemplate } from '../../constants/helperFuncs';

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
        this.userInit(user => {
            if (!user) {
                userMsg({
                    message: 'Kunde inte hitta din användar-data. Vänligen logga in på nytt.',
                    type: 'danger',
                    dismiss: false,
                    onRemoval: () => this.props.history.push('/signin')
                }).add();
                return;
            }
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
