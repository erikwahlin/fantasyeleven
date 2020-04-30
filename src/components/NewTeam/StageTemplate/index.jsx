import React from 'react';
import { withTeam } from '../ctx';
import StageWrapper from './StageWrapper';
import StageTitle from './StageTitle';
import StageInfo from '../StageInfo';

const StageTemplate = props => {
    const { children } = props;
    const { team } = props.teamContext.state;
    const { captain } = team;

    return (
        <StageWrapper>
            <StageTitle />
            <StageInfo />

            {children}
        </StageWrapper>
    );
};

export default withTeam(StageTemplate);
