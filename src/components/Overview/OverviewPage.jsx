import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../Navigation';
import { withOverview } from './OverviewState';
import Collapsible from './Collapsible.js';
import {
    ContentWrap,
    OuterWrapper,
    InnerWrapper,
    PitchWrap,
    PitchImg,
    ResultWrap,
    Stake,
    Revenue
} from './overview.styles';

import Pitch from './Pitch';
import Rounds from './Rounds';
import Bench from './Bench';

const InfoTitle = styled.h2`
    margin: 0;
    margin-bottom: 0.2rem;

    @media all and (max-width: 899px) {
        /* prev 480 */
        font-size: 14px;
    }

    @media all and (max-width: 350px) {
        font-size: 4vw;
    }
`;

const OverviewPage = ({ overviewContext }) => {
    const { user, teams, roundInView } = overviewContext.state;

    return (
        <div className="Overview">
            <ContentWrap>
                <PitchWrap>
                    <Pitch />
                    <Bench />
                </PitchWrap>
                <OuterWrapper>
                    <InnerWrapper>
                        <ResultWrap>
                            <Stake>
                                <h5>Din insats</h5>
                                <p className="stakeSum">178kr</p>
                            </Stake>
                            <Revenue>
                                <h6>Omsättning inför helgens omgång</h6>
                                <p className="revenueSum">120 000kr</p>
                            </Revenue>
                        </ResultWrap>
                        <Collapsible />
                        <Rounds />
                    </InnerWrapper>
                </OuterWrapper>
            </ContentWrap>
        </div>
    );
};

export default withOverview(OverviewPage);
