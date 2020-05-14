import React from 'react';
import { withTeam } from '../ctx';
import StageWrapper from './StageWrapper';
import StageTitle from './StageTitle';
import StageInfo from '../StageInfo';
import Pitch from '../Pitch';
import Bench from '../Bench';

const StageTemplate = ({ teamContext }) => {
    const { stageName } = teamContext.state.config.buildStage;

    return (
        <StageWrapper className={`Stage ${stageName}`}>
            <StageTitle />
            <StageInfo />

            <Pitch />
            <Bench /> 
        </StageWrapper>
    );
};

export default withTeam(StageTemplate);
