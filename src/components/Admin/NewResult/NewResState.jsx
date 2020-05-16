import React, { Component, createContext } from 'react';
import apis from '../../../constants/api';
import { withAdmin } from '../AdminState';
import { getPlayers } from '../../../constants/players';
import { clone, userMsg } from '../../../constants/helperFuncs';
import { initialMatches } from '../../../constants/gamePreset';

const NewResContext = createContext(null);

const errMsg = userMsg({
    message: 'Något gick fel!',
    dismiss: { duration: 3000 },
    type: 'error'
});

class NewResState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            substep: 1,
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
        this.setState({ step, substep }, () => {
            if (!this.state.saved) this.saveRes();
        });
    };

    saveRes = () => {
        const newRound = this.props.adminContext.state.rounds[this.props.roundIndex];
        newRound.matches = this.state.newRes;
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

export default withAdmin(NewResState);

export const withNewRes = Component => props => (
    <NewResContext.Consumer>
        {NewResult => <Component {...props} newResContext={NewResult} />}
    </NewResContext.Consumer>
);
