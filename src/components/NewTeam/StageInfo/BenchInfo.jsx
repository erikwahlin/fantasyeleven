import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const BenchInfo = ({ teamContext }) => {
    const { team, config } = teamContext.state;
    const { value, players } = team;
    const { buildStage, limit, mobileSearch, allPlayers } = config;
    const { stageName } = buildStage;
    const { delPlayer, openPlayerSearch } = teamContext.setters;
    const playerCount = players.list.filter(player => player.origin === stageName).length;
    const {
        bench: { Defender, Forward, Midfielder, Goalkeeper }
    } = players;
    const maxPlayers = limit[stageName].tot;
    const maxValue = limit.value[stageName];

    const teamValue = value[stageName]; // adding bench tot price to state

    const budgetLeft = maxValue - teamValue; //rendering budget left

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

    const clearPlayers = () => {
        // alla spelare på []
        //const players = players.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
    };

    const autofill = func => {
        Defender.push(func(1, get('', posPriceSort('Defender', allPlayers)))[0]);
        Forward.push(func(1, get('', posPriceSort('Forward', allPlayers)))[0]);
        Goalkeeper.push(func(1, get('', posPriceSort('Goalkeeper', allPlayers)))[0]);
        Midfielder.push(func(1, get('', posPriceSort('Midfielder', allPlayers)))[0]);
    };

    return (
        <Wrapper className="StageInfo">
            <Section className="Section">
                <Key className="Key">Valda reserver</Key>
                <Val ready={playerCount === maxPlayers} className="Val playercount">
                    {playerCount + '/' + maxPlayers}
                </Val>
            </Section>
            <Section className="Section">
                <Key className="Key">Återstående budget</Key>
                <Val
                    ready={budgetLeft >= 0 && playerCount === maxPlayers}
                    notReady={budgetLeft < 0}
                    className="Val budgetleft"
                >
                    {budgetLeft + ' kr'}
                </Val>
            </Section>
            <Section className="Section">
                <Button
                    onClick={
                        countPlayers(players.bench) === 0
                            ? () => autofill(getRandomPlayers)
                            : clearPlayers
                    }
                    className="Button autofill clearplayers"
                >
                    {countPlayers(players.bench) === 0 ? 'Autofyll' : 'Nollställ'}
                </Button>
            </Section>
            {mobileSearch && (
                <Section className="Section">
                    <AddPlayerIcon className="AddPlayerIcon icon" onClick={openPlayerSearch} />
                </Section>
            )}
        </Wrapper>
    );
};

export default withTeam(BenchInfo);
