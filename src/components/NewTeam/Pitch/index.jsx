import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';

import pitchImg from '../../../media/pitch.png';

import pitchInitial from '../../../media/pitchAnim/pitchInitial.gif';
import pitchNext from '../../../media/pitchAnim/pitchNext.gif';
import pitchPrev from '../../../media/pitchAnim/pitchPrev.gif';

const Wrapper = styled.div`
    position: relative;
    width: 480px;
    height: 432px;
    margin: 0 auto;

    @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    }

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.3;
            filter: grayscale(1);
        `};
`;

const PitchImg = styled.img`
    width: 100%;
    height: 100%;
    max-width: 700px;
    position: absolute;

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.2;
        `};
`;

const FormationContainer = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
    position: relative;
    top: -0.6rem;
    display: flex;
    flex-direction: column;
`;

const PositionContainer = styled.div`
    width: 100%;
    height: 24%;
    /* min-height: 117px; */
    /* flex: 1; */
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const PlayerContainer = styled.div`
    flex: 1;
    height: 100%;
    min-height: 115px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    @media all and (max-width: 899px) {
        /* prev 480 */
        min-height: unset;
    }
`;

const Pitch = props => {
    const { team, config } = props.teamContext.state;
    //let pitchAnim = config.pitch;
    const { stageName } = config.buildStage;
    const { togglePlayerSearch } = props.teamContext.setters;

    /* const anims = {
        initial: pitchInitial,
        next: pitchNext,
        prev: pitchPrev
    }; */

    return (
        <Wrapper
            className="Pitch Wrapper"
            bg={pitchImg}
            onClick={togglePlayerSearch}
            stageName={stageName}
        >
            <PitchImg src={pitchImg} className="PitchImg" stageName={stageName} />

            {/* <img
                src={anims[pitchAnim]}
                alt="pitchAnim"
                style={{ margin: 'auto', width: '100%', position: 'absolute' }}
            /> */}

            <FormationContainer className="FormationContainer">
                {preset.positions.map((pos, nth) => (
                    <PositionContainer key={`lineup-${nth}`} className={`PositionContainer ${pos}`}>
                        {team.pitch[pos].map((player, nth) => (
                            <PlayerContainer
                                key={player.uid}
                                className={`PlayerContainer ${pos} unmarkable`}
                                player={player}
                            >
                                <Plupp
                                    origin="pitch"
                                    player={player}
                                    pos={player.position}
                                    lineupCount={team.pitch[pos].length}
                                />
                            </PlayerContainer>
                        ))}
                    </PositionContainer>
                ))}
            </FormationContainer>
        </Wrapper>
    );
};

export default withTeam(Pitch);
