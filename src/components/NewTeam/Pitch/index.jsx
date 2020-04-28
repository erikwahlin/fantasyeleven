import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';
import pitchImg from '../../../media/pitch.png';

const Wrapper = styled.div`
    position: relative;
    width: 480px;
    height: 432px;
    margin: 0 auto;

    @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    }
`;

const PitchImg = styled.img`
    width: 100%;
    height: 100%;
    max-width: 700px;
    position: absolute;
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
    const { team } = props.teamContext.state;
    const { togglePlayerSearch } = props.teamContext.setters;

    return (
        <Wrapper className="Pitch Wrapper" bg={pitchImg} onClick={togglePlayerSearch}>
            <PitchImg src={pitchImg} className="PitchImg" />
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
