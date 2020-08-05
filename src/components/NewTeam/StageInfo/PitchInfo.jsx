import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers, clone, mathRandInc } from '../../../constants/helperFuncs';
import { positions, formations } from '../../../constants/gamePreset';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const PitchInfo = ({ teamContext }) => {
    const { team, config } = teamContext.state;
    const { value, players } = team;
    const { buildStage, limit, mobileSearch, allPlayers } = config;
    const { stageName } = buildStage;
    const { delPlayer, addPlayer, openPlayerSearch } = teamContext.setters;

    const playerCount = players.list.filter(player => player.origin === stageName).length;

    const maxPlayers = limit[stageName].tot;
    const maxValue = limit.value[stageName];

    const teamValue = value[stageName]; // adding bench tot price to state

    const clearPlayers = () => {
        // alla spelare på []
        //const players = players.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
    };

    const autoFill = () => {
        let newTeam = [];

        // pick formation randomly
        const randForm = mathRandInc(formations.length - 1);
        const formation = formations[randForm];

        console.log('PICKED FORMATION', formation);

        // get all players, split by player position
        const players = {
            Goalkeeper: [],
            Defender: [],
            Midfielder: [],
            Forward: []
        };

        allPlayers.forEach(p => players[p.position].push(p));

        // pick rand player
        const randPlayer = pos => {
            const nth = mathRandInc(players[pos].length - 1);
            return players[pos][nth];
        };

        // loop through picked formation
        formation.forEach((posLimit, nth) => {
            // pos name
            const pos = positions[nth];

            // for each pos, push rand player to team, *posLimit* times
            for (let i = 0; i < posLimit; i++) {
                newTeam.push(randPlayer(pos));
            }
        });

        // add players to state
        newTeam.forEach(p => addPlayer(p));
    };

    const emptyPitch = countPlayers(players.pitch) === 0;

    return (
        <Wrapper className="StageInfo" style={{ marginTop: '20px' }}>
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
                <Button
                    onClick={emptyPitch ? autoFill : clearPlayers}
                    className="Button autofill clearplayers"
                >
                    {emptyPitch ? 'Autofyll' : 'Nollställ'}
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
