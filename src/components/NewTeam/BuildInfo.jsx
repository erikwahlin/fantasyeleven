import React from 'react';
import { withTeam } from './ctx';
import styled from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';
import { toSwe, countPlayers } from '../../constants/helperFuncs';

const Wrapper = styled.div`
    width: 100%;
    /* height: 100%; */
    max-width: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    & > * {
        @media all and (max-width: 480px) {
            max-width: 22%;
            justify-content: space-evenly;
        }
    }
`;

const ChosenPlayers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoTitle = styled.h2`
    margin: 0;
    margin-bottom: 0.2rem;

    @media all and (max-width: 899px) {
        /* prev 480 */
        font-size: 14px;
    }

    @media all and (max-width: 350px) {
        font-size: 4vw;
    }
`;

const InfoP = styled.p`
    color: ${p => (p.notReady ? 'red' : p.ready ? '#35892A' : 'white')};

    @media all and (max-width: 899px) {
        /* prev 480 */
        font-size: 24px;
        margin-bottom: 0;
    }

    @media all and (max-width: 350px) {
        font-size: 7vw;
    }
`;

const ClearBtn = styled.button`
    width: 100px;
    height: 35px;
    background: #5ac5d3;
    border: none;
    border-radius: 15px;
    outline: none;
    cursor: pointer;
    font-family: 'Avenir';
    font-size: 1em;
    font-weight: 500;
    color: black;
    padding: 5px;
    align-self: center;

    @media all and (max-width: 899px) {
        /* prev 480 */
        width: auto;
        height: auto;
        padding: 7px;
        font-size: 18px;
    }

    @media all and (max-width: 350px) {
        padding: 2vw;
        font-size: 5vw;
    }
`;
const FillBtn = styled(ClearBtn)``;

const AddPlayerBtn = styled(FaUserPlus)`
    width: 65px;
    height: 100%;
    color: white;
    align-self: center;

    cursor: pointer;

    @media all and (max-width: 899px) {
        /* prev 480 */
        width: 47px;
    }

    @media all and (max-width: 350px) {
        width: 14vw;
    }
`;

const BuildInfo = ({ teamContext, origin }) => {
    const { team, config } = teamContext.state;
    const { value, players } = team;
    const { buildStage, limit, mobileSearch, allPlayers } = config;
    const { stageName } = buildStage;
    const { delPlayer, openPlayerSearch } = teamContext.setters;
    const { bench, pitch } = players;
    const maxPlayers = limit[origin].tot;
    const maxValue = limit.value[origin];

    const playerCount = players.list.filter(player => player.origin === origin).length;
    const teamValue = value[origin]; // adding bench tot price to state

    let budgetLeft = maxValue - teamValue; //rendering budget left

    const ready =
        buildStage.stageName === 'pitch' || buildStage.stageName === 'bench'
            ? teamValue <= maxValue && playerCount === maxPlayers
            : true;

    const notReady = teamValue > maxValue;
    //checks how many of players of each value there is, could be could for
    //continuing dev on autofill.
    const countOccur = players => {
        var counts = {};
        // looping through your array
        players.forEach(players => {
            let num = players.price;
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        });
        return counts;
    };

    const posPriceSort = (position, players) => {
        return players
            .filter(player => player.position === position)
            .sort((a, b) => a.price - b.price);
    }; //ger tillbaka array med specifik spelarposition sorterad på pris.

    //console.log(posPriceSort('Defender', players))
    //value is top, middle or low
    const get = (value, playersArr) => {
        switch (value) {
            case 'high':
                return playersArr.slice(
                    Math.floor(playersArr.length - playersArr.length / 3),
                    playersArr.length
                );
                break;
            case 'middle':
                return playersArr.slice(
                    Math.floor(playersArr.length - 2 * (playersArr.length / 3)),
                    Math.floor(playersArr.length - playersArr.length / 3)
                );
                break;
            case 'low':
                return playersArr.slice(0, Math.floor(playersArr.length / 3));
                break;
            default:
                return playersArr;
                break;
        }
    };

    const getRandomPlayers = (amount, playersArr) => {
        const getRandPlayer = (players, n) => {
            return players[Math.floor(Math.random() * n)];
        };

        const team = [];

        for (let i = 0; i < amount; i++) {
            team.push(getRandPlayer(playersArr, playersArr.length));
        }
        return team;
    };

    const team = [
        ...getRandomPlayers(1, get('top', posPriceSort('Goalkeeper', players))),
        ...getRandomPlayers(2, get('top', posPriceSort('Forward', players))),
        ...getRandomPlayers(4, get('top', posPriceSort('Defender', players))),
        ...getRandomPlayers(4, get('top', posPriceSort('Midfielder', players)))
    ];

    const sumOfTeam = team => {
        let sum = 0;
        team.forEach(player => (sum += Number(player.price)));
        return sum;
    };

    const benchPlayers = [
        ...getRandomPlayers(1, get('', posPriceSort('Goalkeeper', players))),
        ...getRandomPlayers(1, get('', posPriceSort('Forward', players))),
        ...getRandomPlayers(1, get('', posPriceSort('Defender', players))),
        ...getRandomPlayers(1, get('', posPriceSort('Midfielder', players)))
    ];

    console.log(sumOfTeam(bench));

    const clearPlayers = () => {
        // alla spelare på []
        //const players = players.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
    };

    return (
        <Wrapper className="BuildInfo unmarkable">
            <ChosenPlayers>
                <InfoTitle className="infoTitle">
                    Valda {origin === 'pitch' ? 'spelare' : 'reserver'}
                </InfoTitle>
                <InfoP ready={ready} className="amount">
                    {playerCount + '/' + maxPlayers}
                </InfoP>
            </ChosenPlayers>

            {stageName === 'pitch' && (
                <ChosenPlayers>
                    <InfoTitle className="infoTitle">Totalt pris</InfoTitle>
                    <InfoP className="amount" ready={ready} notReady={notReady}>
                        {teamValue + ' kr'}
                    </InfoP>
                </ChosenPlayers>
            )}
            {buildStage.stageName === 'bench' && (
                <ChosenPlayers>
                    <InfoTitle className="infoTitle">Återstående Budget</InfoTitle>
                    <InfoP
                        style={budgetLeft <= 0 ? { color: 'red' } : { color: 'green' }}
                        className="amount"
                    >
                        {budgetLeft + ' kr'}
                    </InfoP>
                </ChosenPlayers>
            )}
            {(stageName === 'pitch' && countPlayers(players.pitch) === 0) ||
            (stagename === 'bench' && countPlayers(players.bench) === 0) ? (
                <ClearBtn onClick={clearPlayers}>'Nollställ'</ClearBtn>
            ) : (
                <FillBtn onClick={autofill('pitch')}>'Autofyll'</FillBtn>
            )}

            {(stageName === 'pitch' || stageName === 'bench') && mobileSearch && (
                <AddPlayerBtn className="AddPlayerBtn" onClick={openPlayerSearch} />
            )}
        </Wrapper>
    );
};

export default withTeam(BuildInfo);
