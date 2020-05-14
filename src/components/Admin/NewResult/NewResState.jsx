import React, { Component, createContext } from 'react';
import apis from '../../../constants/api';
import { getPlayers } from '../../../constants/players';
import { clone, userMsg } from '../../../constants/helperFuncs';
import allClubs from '../../../constants/clubs';

const NewResContext = createContext(null);

const errMsg = userMsg({
    message: 'Något gick fel!',
    dismiss: { duration: 3000 },
    type: 'error'
});

const initialEfforts = {
    club: '',
    score: 0,
    goal: [], // {playerObj, amount} ...
    assist: [],
    cleanSheet: [],
    yellow: [],
    red: [],
    penalyMiss: [],
    penaltySave: [],
    fulltime: [],
    parttime: []
};

const initialMatches = (() => {
    let res = [];
    for (let nth = 0; nth < allClubs.length; nth++) {
        res.push({
            home: clone(initialEfforts),
            away: clone(initialEfforts)
        });
    }
    return res;
})();

export default class NewResState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resultStep: 0,
            matchStep: 0,
            matches: clone(initialMatches)
        };

        this.setters = {};
    }

    componentDidMount = () => {};

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
        {newres => <Component {...props} newResContext={newres} />}
    </NewResContext.Consumer>
);
