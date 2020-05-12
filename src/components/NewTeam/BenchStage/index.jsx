import React from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';

import StageInfo from '../StageInfo';
import Pitch from '../Pitch';
import Bench from '../Bench';
import StageTemplate from '../StageTemplate';

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

const BenchStage = props => {
    return (
        <StageTemplate className="BenchStage StageWrapper">
            <Pitch />

            <Bench />
        </StageTemplate>
    );
};

export default withTeam(BenchStage);
