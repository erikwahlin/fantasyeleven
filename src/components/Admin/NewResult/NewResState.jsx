import React, { Component, createContext } from 'react';
import apis from '../../../constants/api';
import { getPlayers } from '../../../constants/players';
import { clone, userMsg } from '../../../constants/helperFuncs';
import { initialMatches } from '../../../constants/gamePreset';

const NewResContext = createContext(null);

const errMsg = userMsg({
    message: 'Något gick fel!',
    dismiss: { duration: 3000 },
    type: 'error'
});

export default class NewResState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            substep: 0,
            matches: initialMatches()
        };

        this.matchUpdater = this.matchUpdater.bind(this);
        this.stepUpdater = this.stepUpdater.bind(this);

        this.setters = {
            matchUpdater: this.matchUpdater,
            stepUpdater: this.stepUpdater
        };
    }

    componentDidMount = () => {};

    matchUpdater = newMatch => {
        const matches = clone(this.state.matches);

        matches[this.state.step] = newMatch;

        this.setState({ matches });
    };

    stepUpdater = ({ step = this.state.step, substep = this.state.substep }) => {
        this.setState({ step, substep });
    };

    render() {
        return (
            <NewResContext.Provider
                value={{
                    state: this.state,
                    setters: this.setters
                }}
            >
                {this.props.children}
            </NewResContext.Provider>
        );
    }
}

export const withNewRes = Component => props => (
    <NewResContext.Consumer>
        {NewResult => <Component {...props} newResContext={NewResult} />}
    </NewResContext.Consumer>
);
