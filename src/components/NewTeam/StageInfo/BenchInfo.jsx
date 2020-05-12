import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const BenchInfo = ({ teamContext }) => {
    const { team, config } = teamContext.state;
    const { value, players } = team;
    const { buildStage, limit, mobileSearch } = config;
    const { stageName } = buildStage;
    const { delPlayer, openPlayerSearch } = teamContext.setters;
    const playerCount = players.list.filter(player => player.origin === stageName).length;

    const maxPlayers = limit[stageName].tot;
    const maxValue = limit.value[stageName];

    const teamValue = value[stageName]; // adding bench tot price to state

    const budgetLeft = maxValue - teamValue; //rendering budget left

    const clearPlayers = () => {
        // alla spelare på []
        //const players = players.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
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
                <Button onClick={clearPlayers} className="Button autofill clearplayers">
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
