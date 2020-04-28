import React from 'react';
import { withTeam } from '../ctx';
import styled from 'styled-components';
import { toSwe } from '../../../constants/helperFuncs';

const Wrapper = styled.div`
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

const StageTitle = ({ teamContext }) => {
    const { stageName } = teamContext.state.config.buildStage;

    return (
        <Wrapper>
            <Title>{toSwe(stageName, 'stages')}</Title>
        </Wrapper>
    );
};

export default withTeam(StageTitle);
