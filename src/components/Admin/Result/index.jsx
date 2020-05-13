import React, { Component } from 'react';
import ResultContext from './ctx';
import apis from '../../../constants/api';
//import { store } from 'react-notifications-component';
import { userMsg } from '../../../constants/helperFuncs';
import ManualSim from './ManualSim';
import ResultForm from './ResultForm';
import ResultList from './ResultList';

/*     step: {
        clubPick: {
            homeClub: '',
            awayClub: ''
        },
        standings: {
            homePoints: '',
            awayPoints: ''
        },
        whoScored: {
            scores: [],
            assists: []
        }
    }, */

const initial_state = {
    playerResult: null,

    step: 1, // 1
    homeClub: '', //''
    awayClub: '', //''
    homeClubScore: '', //null
    awayClubScore: '', //null
    whoScoredHome: [],
    whoScoredAway: [],

    playerStep: 1 // first goals, then assists etc..
};

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = initial_state;

        this.contextState = this.contextState.bind(this);
        this.setPlayerResult = this.setPlayerResult.bind(this);

        this.getPlayerResult = this.getPlayerResult.bind(this);

        this.onClubClickHandler = this.onClubClickHandler.bind(this);
        this.onScoreChange = this.onScoreChange.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onPlayerClick = this.onPlayerClick.bind(this);
    }

    onPlayerClick = (e, players) => {
        const {
            awayClub,
            homeClub,
            playerStep,
            homeClubScore,
            awayClubScore,
            whoScoredAway,
            whoScoredHome
        } = this.state;
        let name = e.target.innerHTML;
        if (playerStep === 1) {
            const scoringPlayer = players.filter(player => player.name === name)[0];
            console.log(scoringPlayer.club);
            if (scoringPlayer.club === awayClub) {
                whoScoredAway.push(scoringPlayer);
                this.setState({ whoScoredAway: whoScoredAway }, () => console.log(this.state));
            } else {
                whoScoredHome.push(scoringPlayer);
                this.setState({ whoScoredHome: whoScoredHome }, () => console.log(this.state));
            }
        }
    };

    onClickNext = e => {
        const { homeClubScore, awayClubScore } = this.state;
        if (homeClubScore && awayClubScore) {
            this.setState({ step: this.state.step + 1 });
        } else {
            console.log('du måste fylla i poäng för alla lagen.');
        }
    };

    onScoreChange = e => {
        const { homeClubScore, awayClubScore } = this.state;
        let score = e.target.value;
        if (e.target.className === 'homeClub') {
            this.setState({ homeClubScore: score }, () => console.log(this.state));
        } else {
            this.setState({ awayClubScore: score }, () => console.log(this.state));
        }
        console.log(score);
    };

    onClubClickHandler = (e, players) => {
        //const { homeClub, awayClub } = this.state;
        //on first click do this
        const club = e.target.innerHTML;
        /*         if (!this.state.homeClub) {
            this.setState(
                {
                    ...this.state.step,
                    homeClub: club
                },
                () => console.log(this.state)
            );
        } else {
            this.setState(
                {
                    ...this.state.step,
                    awayClub: club
                },
                () => console.log(this.state)
            );
        }
 */
        if (!this.state.homeClub) {
            this.setState({ homeClub: club }, () => {
                console.log(this.state);
            });
        } else {
            this.setState({ awayClub: club }, () => {
                this.setState({ step: this.state.step + 1 });
            });
        }
        //on second click do this

        //display clicked club
        //remove it from clubs array.
        // add to what state?
        //add to div.
    };

    componentDidMount = () => {
        //at component load
        this.getPlayerResult(); //getting res from db
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
        const { clubs, players } = this.state;
        return (
            <>
                <ResultContext.Provider
                    value={{
                        state: this.state,
                        setters
                    }}
                >
                    <ResultForm />
                    <div
                        style={{ color: 'white' }}
                    >{` HEMMALAG: ${this.state.homeClub} POÄNG: ${this.state.homeClubScore}`}</div>
                    <div
                        style={{ color: 'white' }}
                    >{`HEMMALAG: ${this.state.awayClub}  POÄNG: ${this.state.awayClubScore}`}</div>
                    <ManualSim
                        whoScoredHome={this.state.whoScoredHome}
                        whoScoredAway={this.state.whoScoredAway}
                        playerStep={this.state.playerStep}
                        onPlayerClick={this.onPlayerClick}
                        onClickNext={this.onClickNext}
                        onChange={this.onScoreChange}
                        step={this.state.step}
                        awayClub={this.state.awayClub}
                        homeClub={this.state.homeClub}
                        players={this.props.players}
                        onClick={this.onClubClickHandler}
                    />
                    {/* render some kind of ui for simulating manually.  */}
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
