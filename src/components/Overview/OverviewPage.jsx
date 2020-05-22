import React, { useState, useEffect } from 'react';

import * as Scroll from 'react-scroll';
import { IoIosArrowDown } from 'react-icons/io';
import styled, { css } from 'styled-components';
import Navigation from '../Navigation';
import { withOverview } from './OverviewState';
import Round from './Round';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

const Arrow = styled.div`
    position: absolute;
    top: 90vh;
    left: 50vw;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`;
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
    const { user, teams, roundInView, playedTeams, activeRound } = overviewContext.state;
    var scroll = Scroll.animateScroll;
    const bet =
        playedTeams[0] && roundInView && roundInView._id === playedTeams[0].round ? (
            playedTeams[0].value.tot + ' kr'
        ) : (
            <LoadingOutlined style={{ fontSize: 20 }} spin />
        );
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
                                <p className="stakeSum">{bet}</p>
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
            {roundInView && (
                <Arrow onClick={() => scroll.scrollToBottom()}>
                    <IoIosArrowDown style={{ fontSize: '40px' }} />
                </Arrow>
            )}
            {roundInView ? (
                <Round round={roundInView} roundIndex={roundInView && roundInView._id} />
            ) : (
                <LoadingOutlined style={{ fontSize: 20 }} spin />
            )}
        </div>
    );
};

export default withOverview(OverviewPage);
