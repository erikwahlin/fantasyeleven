import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';
import pitchImg from '../../../media/pitch.png';
import BuildInfo from '../BuildInfo';

import { Title } from '../../PlayerSearch/index.styled';

const Wrapper = styled.div`
    grid-row: 2;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 80px 80px auto;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: auto;
    margin-top: 0;

    @media screen and (min-width: 900px) {
        grid-column: 2;
    }
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
`;

const FieldContainer = styled.div`
    width: 100%;
    max-width: 700px;
    height: 100%;
    position: relative;
    margin: auto;

    & > {
        @media screen and (max-height: 665px) and (max-width: 500px) {
            height: 70vh;
        }
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
	display: flex;
	flex-direction: column;

	/* ${p => p.bg && 'background: url(' + p.bg + ')'};
	background-size: 100% 100%;
	background-repeat: no-repeat; */
`;

const PosLineup = styled.div`
    width: 100%;
    height: 100px;
    /* min-height: 117px; */
    flex: 1;
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const PluppContainer = styled.div`
    flex: 1;
    height: 100%;
    min-height: 115px;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const Captain = props => {
    const { team } = props.teamContext.state;
    const { captain, viceCaptain } = team;
    const { togglePlayerSearch } = props.teamContext.setters;

    const capObj = team.list.filter(p => p.uid === captain)[0];
    const viceObj = team.list.filter(p => p.uid === viceCaptain)[0];

    return (
        <Wrapper className="Pitch" /* pitchSize={pitchSize} */>
            <TitleWrap>
                <Title className="SearchPlayer-Title unmarkable">
                    Välj {!captain ? 'Kapten' : 'Vice kapten'}
                </Title>
            </TitleWrap>

            <div>TEMP BUILDINFO</div>

            <FieldContainer className="FieldContainer" bg={pitchImg} onClick={togglePlayerSearch}>
                <PitchImg src={pitchImg} />
                <FormationContainer className="FormationContainer" bg={pitchImg}>
                    {preset.positions.map((pos, nth) => (
                        <PosLineup key={`lineup-${nth}`} className={`PosLineup ${pos}`}>
                            {team.pitch[pos].map((player, nth) => (
                                <PluppContainer
                                    key={player.uid}
                                    className={`PluppContainer ${pos} unmarkable`}
                                    player={player}
                                >
                                    <Plupp
                                        origin="pitch"
                                        player={player}
                                        pos={player.position}
                                        lineupCount={team.pitch[pos].length}
                                    />
                                </PluppContainer>
                            ))}
                        </PosLineup>
                    ))}
                </FormationContainer>
            </FieldContainer>
        </Wrapper>
    );
};

export default withTeam(Captain);
