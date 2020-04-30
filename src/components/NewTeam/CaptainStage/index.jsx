import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import StageTemplate from '../StageTemplate';

import Pitch from '../Pitch';
import Bench from '../Bench';

import Plupp from '../Plupp';
import pitchImg from '../../../media/pitch.png';
import StageInfo from '../StageInfo';

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

const CaptainStage = props => {
    return (
        <StageTemplate className="CaptainStage Wrapper">
            <Pitch />

            <Bench />
        </StageTemplate>
    );
};

export default withTeam(CaptainStage);
