import React, { Component } from 'react';
import ResultContext from './ctx';
import apis from '../../../constants/api';
//import { store } from 'react-notifications-component';
import { userMsg } from '../../../constants/helperFuncs';

import ResultForm from './ResultForm';
import ResultList from './ResultList';

const initial_state = {
    playerResult: null
};

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = initial_state;

        this.contextState = this.contextState.bind(this);
        this.setPlayerResult = this.setPlayerResult.bind(this);

        this.getPlayerResult = this.getPlayerResult.bind(this);
    }

    componentDidMount = () => {
        this.getPlayerResult();
    };

    contextState = (key, val) => {
        this.setState({ [key]: val });
    };

    setPlayerResult = newRes => {
        console.log('updating playerRes', newRes);
        this.setState({ playerResult: newRes });
    };

    getPlayerResult = async () => {
        const loadMsg = userMsg({
            message: 'laddar resultat...'
        });

        loadMsg.add();

        console.log('getplayer res...');
        await apis
            .get('getResult', 'all')
            .then(async res => {
                console.log('Got player result', res.data.data);
                this.setState({ playerResult: res.data.data });

                loadMsg.remove();
            })
            .catch(err => {
                //setLoading(false);
                console.log('err when getting player result');
            });
    };

    render() {
        const setters = {
            contextState: this.contextState,
            setPlayerResult: this.setPlayerResult,
            getPlayerResult: this.getPlayerResult
        };

        const { playerResult } = this.state;

        return (
            <>
                <ResultContext.Provider
                    value={{
                        state: this.state,
                        setters
                    }}
                >
                    <ResultForm />

                    {playerResult &&
                        (playerResult.length ? (
                            <ResultList playerResult={this.state.playerResult} />
                        ) : (
                            <h3>
                                <i>Inga skapade resultat</i>
                            </h3>
                        ))}
                </ResultContext.Provider>
            </>
        );
    }
}

export default Result;
