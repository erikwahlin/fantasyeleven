import React from 'react';
import styled from 'styled-components';
import { withNewTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';

import BuildInfo from '../BuildInfo';
import { shortenName } from '../../../constants/helperFuncs';
import Plupp from '../Plupp';

const Wrapper = styled.div`
    width: 100%;
    height: 150px;

    display: flex;
    justify-content: space-evenly;

    background: none;

    border-top: 1px solid white;
`;

const PluppContainer = styled.div`
    flex: 1;
    height: 100%;
    min-height: 100px;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const PlayerName = styled.span`
    position: absolute;
    top: 8px;
    font-size: 0.6em;
    text-align: center;
    color: white;
`;

const Bench = props => {
    const { config, team } = props.NewTeam.state;
    const playerCount = team.list.map(player => player.origin === 'bench').length;
    const teamValue = team.game.value;

    return (
        <div>
            <BuildInfo playerCount={playerCount} team={team} origin="bench" />

            <Wrapper className="Bench unmarkable">
                {preset.positions.map((pos, nth) => (
                    <PluppContainer key={`pos-${nth}`} className={`PluppContainer ${pos}`}>
                        <Plupp
                            pos={pos}
                            player={team.bench[pos][0]}
                            lineupCount={team.bench[pos].length}
                            lineupIndex={0}
                            origin="bench"
                        />
                    </PluppContainer>
                ))}
            </Wrapper>
        </div>
    );
};

export default withNewTeam(Bench);
