import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const PitchInfo = ({ teamContext }) => {
    const { team, config } = teamContext.state;
    const { value, players } = team;
    const { buildStage, limit, mobileSearch } = config;
    const { stageName } = buildStage;
    const { delPlayer, openPlayerSearch } = teamContext.setters;

    const playerCount = players.list.filter(player => player.origin === stageName).length;

    const maxPlayers = limit[stageName].tot;
    const maxValue = limit.value[stageName];

    const teamValue = value[stageName]; // adding bench tot price to state

    const clearPlayers = () => {
        // alla spelare på []
        //const players = players.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
    };

    return (
        <Wrapper className="StageInfo" style={{ marginTop:'20px'}}>
            <Section className="Section">
                <Key className="Key">Valda spelare</Key>
                <Val ready={playerCount === maxPlayers} className="Val playercount">
                    {playerCount + '/' + maxPlayers}
                </Val>
            </Section>

            <Section className="Section">
                <Key className="Key">Totalt pris</Key>
                <Val className="Val teamvalue" ready={playerCount === maxPlayers}>
                    {teamValue + ' kr'}
                </Val>
            </Section>

            <Section className="Section">
                <Button onClick={clearPlayers} className="Button autofill clearplayers">
                    {countPlayers(players.pitch) === 0 ? 'Autofyll' : 'Nollställ'}
                </Button>
            </Section>

            {mobileSearch && playerCount > 0 && (
                <Section className="Section">
                    <AddPlayerIcon className="AddPlayerIcon icon" onClick={openPlayerSearch} />
                </Section>
            )}
        </Wrapper>
    );
};

export default withTeam(PitchInfo);
