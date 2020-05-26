import React from 'react';
import styled, { css } from 'styled-components';
import { toSwe } from '../../../constants/helperFuncs';
import { withOverview } from '../OverviewState';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';
import Position from './position';
import pitchImg from '../../../media/pitch.png';

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

const Wrapper = styled.div`
    display: flex;

    height: 150px;
    width: 480px;
    margin: 0 auto;
    padding: 5px 0;

    @media all and (max-width: 570px) {
        margin: 10px 0;
        padding: 0;
        width: 100vw;
        height: 28vw;
    }

/*     ${p =>
    p.stageName !== 'bench' &&
    p.stageName !== 'overview' &&
    css`
        opacity: 0.2;
        filter: grayscale(1);
    `}; */
`;

const Bench = ({ overviewContext }) => {
    const fallback = <PitchImg src={pitchImg} className="PitchImg" />;

    const { playedTeams, playedRounds, roundInView, user } = overviewContext.state;

    if (!roundInView || roundInView < 0) return fallback;

    const round = playedRounds.filter(r => r._id === roundInView._id)[0];

    if (!round) return fallback;

    //const teamID = round.users.filter(item => item.user === user._id)[0].team;
    const team = playedTeams.filter(t => t.round === roundInView._id)[0];

    //const team = playedTeams.filter(t => t._id === teamID)[0];

    console.log('team', team);

    if (!team) return fallback;

    const { captain, viceCaptain } = team;

    let players = team.players;

    if (roundInView) {
        if (roundInView.result.list.length > 0) {
            players = roundInView.result;
        }
    }

    return (
        <Wrapper className="Bench Wrapper">
            {preset.positions.map((pos, nth) => (
                <PlayerContainer key={`pos-${nth}`} className={`PlayerContainer ${pos}`}>
                    <Plupp
                        pos={pos}
                        player={players.bench[pos][0]}
                        lineupCount={players.bench[pos].length}
                        lineupIndex={0}
                        origin="bench"
                        isCap={players.bench[pos]._id === captain._id}
                        isVice={players.bench[pos]._id === viceCaptain._id}
                    />
                </PlayerContainer>
            ))}
        </Wrapper>
    );
};

export default withOverview(Bench);
