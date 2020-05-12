import React from 'react';
import styled, { css } from 'styled-components';
import { toSwe } from '../../../constants/helperFuncs';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';
import Position from './position';

const PlayerContainer = styled.div`
    flex: 1;
    height: 100%;
    min-height: 115px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media all and (max-width: 899px) {
        /* prev 480 */
        min-height: unset;
    }
`;

const Wrapper = styled.div`
    display: flex;

    height: 150px;
    width: 480px;
    margin: 0 auto;
    padding: 5px 0;

    @media all and (max-width: 480px) {
        margin: 10px 0;
        padding: 0;
        width: 100vw;
        height: 28vw;
    }

    ${p =>
        p.stageName !== 'bench' &&
        p.stageName !== 'overview' &&
        css`
            opacity: 0.2;
            filter: grayscale(1);
        `};
`;

const Bench = props => {
    const { team, config } = props.teamContext.state;
    const { players } = team;
    const { stageName } = config.buildStage;

    return (
        <Wrapper className="Bench Wrapper" stageName={stageName}>
            {preset.positions.map((pos, nth) => (
                <PlayerContainer key={`pos-${nth}`} className={`PlayerContainer ${pos}`}>
                    {(stageName === 'bench' || stageName === 'overview') && (
                        <Position pos={toSwe(pos, 'positions')} />
                    )}
                    <Plupp
                        pos={pos}
                        player={team.players.bench[pos][0]}
                        lineupCount={players.bench[pos].length}
                        lineupIndex={0}
                        origin="bench"
                    />
                </PlayerContainer>
            ))}
        </Wrapper>
    );
};

export default withTeam(Bench);
