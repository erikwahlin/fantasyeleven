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
    const scroll = Scroll.animateScroll;

    if (!playedTeams.length || !roundInView)
        return (
            <LoadingOutlined
                style={{ fontSize: 40, position: 'fixed', right: '50vw', top: '50vh' }}
                spin
            />
        );

    const team = playedTeams.filter(t => t.round === roundInView._id)[0];
    console.log(team);

    let totalPoints = 0;

    if (roundInView.result) {
        if (roundInView.result.list.length) {
            totalPoints = roundInView.result.list.reduce(
                (tot, player) => tot + player.points.tot,
                0
            );
        }
    }

    console.log('totalPoints', totalPoints);
    const bet =
        playedTeams[0] && roundInView && roundInView._id === playedTeams[0].round ? null : (
            /* players.list
                .filter(p => p.origin === 'pitch')
                .reduce((tot, player) => {
                    return tot + player;
                }) */
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
                                <h5>Din insats{/*   */}</h5>
                                <p className="stakeSum">{team.value.tot} kr</p>
                            </Stake>
                            <Revenue>
                                <h6>Omsättning inför helgens omgång</h6>
                                <p className="revenueSum"></p>
                            </Revenue>
                        </ResultWrap>
                        <Collapsible totalPoints={totalPoints} />
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
