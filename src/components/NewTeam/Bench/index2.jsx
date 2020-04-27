import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import Plupp from '../Plupp';
import pitchImg from '../../../media/pitch.png';
import BuildInfo from '../BuildInfo';
import Position from './position';
import { toSwe } from '../../../constants/helperFuncs';

const Wrapper = styled.div`
    grid-row: 2;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: auto;
    margin-top: 0;

    @media screen and (min-width: 900px) {
        grid-column: 2;
    }

    @media all and (max-width: 899px) {
        /* pre 480 */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        @media all and (max-height: 700px) {
            justify-content: flex-start;
        }
    }
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.h2`
    font-size: 2em;
    line-height: 30px; /* in line with titles above pitch */
    margin: 0;
    margin-bottom: 12px;
    font-weight: 600;

    @media all and (max-width: 899px) {
        /* prev 480 */
        font-size: 24px;
        line-height: unset;
    }

    @media all and (max-width: 350px) {
        font-size: 7vw;
    }
`;

const FieldContainer = styled.div`
    width: 100%;
    max-width: 700px;
    height: 100%;
    position: relative;
    margin: 0;

    @media all and (max-width: 899px) {
        margin: 0 auto;
        width: 480px;
        height: 432px;
    }

    @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    }

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
    top:-0.6rem;
	display: flex;
	flex-direction: column;

	/* ${p => p.bg && 'background: url(' + p.bg + ')'};
	background-size: 100% 100%;
	background-repeat: no-repeat; */
`;

const PosLineup = styled.div`
    width: 100%;
    height: 24%;
    /* min-height: 117px; */
    /* flex: 1; */
    position: relative;
    display: flex;
    justify-content: space-evenly;
`;

const PluppContainer = styled.div`
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

const PluppContainerBench = styled(PluppContainer)`
    justify-content: flex-start;
`;

const BenchContainer = styled.div`
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
`;

const Bench = props => {
    const { team } = props.teamContext.state;
    const { captain, viceCaptain } = team;
    const { togglePlayerSearch } = props.teamContext.setters;
    const playerCount = team.list.map(player => player.origin === 'bench').length;

    const capObj = team.list.filter(p => p.uid === captain)[0];
    const viceObj = team.list.filter(p => p.uid === viceCaptain)[0];

    return (
        <Wrapper className="Bench Wrapper" /* pitchSize={pitchSize} */>
            <TitleWrap className="TitleWrap">
                <Title className="Title unmarkable">Avbytarbänk</Title>
            </TitleWrap>

            <BuildInfo playerCount={playerCount} team={team} origin="bench" />

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

            <BenchContainer className="BenchContainer">
                {preset.positions.map((pos, nth) => (
                    <PluppContainerBench
                        key={`pos-${nth}`}
                        className={`PluppContainerBench ${pos}`}
                    >
                        <Position pos={toSwe(pos, 'positions')} />
                        <Plupp
                            pos={pos}
                            player={team.bench[pos][0]}
                            lineupCount={team.bench[pos].length}
                            lineupIndex={0}
                            origin="bench"
                        />
                    </PluppContainerBench>
                ))}
            </BenchContainer>
        </Wrapper>
    );
};

export default withTeam(Bench);
