import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import pitchImg from '../../../media/pitch.png';
import BuildInfo from '../BuildInfo';
import Plupp from '../Plupp';
import Position from './position';

const Wrap = styled.div`
    /* margin-top: 130px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    background: none;

    /* border-top: 1px solid white; */
`;

const PitchImg = styled.img`
    width: 100%;
    max-height: 500px;
    max-width: 700px;
    position: absolute;
    z-index: -1;
    opacity: 0.1;
    filter: brightness(70%);
`;

const PluppContainer = styled.div`
    height: 100%;
    min-height: 100px;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const Bench = props => {
    const { team } = props.teamContext.state;
    const playerCount = team.list.map(player => player.origin === 'bench').length;

    return (
        <>
            <BuildInfo playerCount={playerCount} team={team} origin="bench" />
            <Wrap className="Bench OuterWrapper">
                <h4>Avbytarbänk</h4>
                <PitchImg src={pitchImg} />
                <Wrapper className="Bench unmarkable InnerWrapper">
                    {preset.positions.map((pos, nth) => (
                        <PluppContainer key={`pos-${nth}`} className={`PluppContainer ${pos}`}>
                            <Plupp
                                pos={pos}
                                player={team.bench[pos][0]}
                                lineupCount={team.bench[pos].length}
                                lineupIndex={0}
                                origin="bench"
                            />
                            <Position pos={pos} />
                        </PluppContainer>
                    ))}
                </Wrapper>
            </Wrap>
        </>
    );
};

export default withTeam(Bench);
