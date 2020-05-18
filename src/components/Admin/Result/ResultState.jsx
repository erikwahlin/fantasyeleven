import React, { Component, createContext } from 'react';
import { withAdmin } from '../AdminState';
import { clone, userMsg, updatedStamp } from '../../../constants/helperFuncs';

const NewResContext = createContext(null);

const errMsg = userMsg({
    message: 'Något gick fel!',
    dismiss: { duration: 3000 },
    type: 'error'
});

class ResultState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 10,
            substep: 0,
            ready: false,
            newRes: this.props.adminContext.state.rounds[this.props.roundIndex].matches,
            saved: true
        };

        this.matchUpdater = this.matchUpdater.bind(this);
        this.stepUpdater = this.stepUpdater.bind(this);
        this.saveRes = this.saveRes.bind(this);

        this.setters = {
            matchUpdater: this.matchUpdater,
            stepUpdater: this.stepUpdater,
            saveRes: this.saveRes
        };
    }

    componentDidMount = () => {};

    matchUpdater = newMatch => {
        const { newRes } = this.state;

        newRes[this.state.step] = newMatch;

        this.setState({ newRes }, () => {
            this.setState({ saved: false });
        });
    };

    stepUpdater = ({ step = this.state.step, substep = this.state.substep }) => {
        this.setState({ step, substep });
    };

    saveRes = ({ key = '' }) => {
        if (key !== '') key = `(${key})`;
        const { rounds, user } = this.props.adminContext.state;
        const newRound = clone(rounds[this.props.roundIndex]);

        newRound.matches = this.state.newRes;

        newRound.updated.unshift(updatedStamp({ user, tag: `Result ${key}` }));

        this.props.adminContext.setters.updateRound(newRound, () => {
            this.setState({ saved: true });
        });
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

export default withAdmin(ResultState);

export const withResult = Component => props => (
    <NewResContext.Consumer>
        {NewResult => <Component {...props} resultContext={NewResult} />}
    </NewResContext.Consumer>
);
