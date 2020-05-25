import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { withOverview } from '../OverviewState';
import { positions } from '../../../constants/gamePreset';
import Plupp from '../Plupp';

import pitchImg from '../../../media/pitch.png';
//import { AddPlayerIcon } from '../StageInfo/template';

const Wrapper = styled.div`
    position: relative;
    width: 576px;
    height: 522px;
    margin: 0 auto;
    margin-bottom: 30px;

    @media all and (max-width: 570px) {
        width: 100vw;
        height: 90vw;
        margin: 0;
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

const Pitch = ({ overviewContext }) => {
    const fallback = <PitchImg src={pitchImg} className="PitchImg" />;

    const { playedTeams, playedRounds, roundInView, user } = overviewContext.state;

    if (!roundInView) return fallback;

    //const teamID = round.users.filter(item => item.user === user._id)[0].team;

    const team = playedTeams.filter(t => t.round === roundInView._id)[0];

    if (!team) return fallback;

    const { captain, viceCaptain } = team;

    let players = team.players;

    if (roundInView) {
        if (roundInView.result.list.length > 0) {
            players = roundInView.result;
        }
    }
    console.log(players);
    // team value
    const teamValue = players.list
        .filter(p => p.origin === 'pitch')
        .reduce((tot, player) => {
            return tot + player;
        });

    return (
        <Wrapper className="Pitch Wrapper" bg={pitchImg}>
            <PitchImg src={pitchImg} className="PitchImg" />

            <FormationContainer className="FormationContainer">
                {positions.map((pos, nth) => {
                    return (
                        <PositionContainer
                            key={`lineup-${nth}`}
                            className={`PositionContainer ${pos}`}
                        >
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
                                        isCap={player._id === captain._id}
                                        isVice={player._id === viceCaptain._id}
                                    />
                                </PlayerContainer>
                            ))}
                        </PositionContainer>
                    );
                })}
            </FormationContainer>
        </Wrapper>
    );
};

export default withOverview(Pitch);
