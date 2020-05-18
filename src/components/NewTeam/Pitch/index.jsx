import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';

import pitchImg from '../../../media/pitch.png';
import { AddPlayerIcon } from '../StageInfo/template';

const Wrapper = styled.div`
    position: relative;
    width: 576px;
    height: 522px;
    margin: 0 auto;
    margin-bottom: 30px;

    @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    }

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
            filter: /* grayscale(1) */ brightness(70%);
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
            opacity: 0.5;
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

const AddContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 48%;
    display: flex;
    justify-content: center;

    & > svg {
        width: 47px;
        position: relative;
        left: 5px;
    }

    @media all and (max-width: 480px) {
        top: 43.5vw;
        & > svg {
            width: 9.7vw;
            left: 1.5vw;
        }
    }
`;

const Pitch = props => {
    const { team, config } = props.teamContext.state;
    const { players } = team;
    const { mobileSearch, buildStage } = config;
    const { stageName } = buildStage;
    const { togglePlayerSearch, openPlayerSearch } = props.teamContext.setters;
    const playerCount = players.list.filter(p => p.origin === 'pitch').length;
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
                        {players.pitch[pos].map((player, nth) => (
                            <PlayerContainer
                                key={`${player._id}-${nth}`}
                                className={`PlayerContainer ${pos} unmarkable`}
                                player={player}
                            >
                                <Plupp
                                    pluppIndex={nth}
                                    origin="pitch"
                                    player={player}
                                    pos={player.position}
                                    lineupCount={players.pitch[pos].length}
                                />
                            </PlayerContainer>
                        ))}
                    </PositionContainer>
                ))}

                {playerCount < 1 && mobileSearch && (
                    <AddContainer>
                        <AddPlayerIcon onClick={openPlayerSearch} />
                    </AddContainer>
                )}
            </FormationContainer>
        </Wrapper>
    );
};

export default withTeam(Pitch);
