import React, { useState, useEffect } from 'react';

import * as Scroll from 'react-scroll';
import { IoIosArrowDown } from 'react-icons/io';
import styled, { css } from 'styled-components';
import Navigation from '../Navigation';
import { withOverview } from './OverviewState';
import Round from './Round';
import ResultDropdown from './ResultDropdown';
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

const SuperWrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 50px;

    @media all and (max-width: 899px) {
        flex-direction: column;
        margin-top: 50px;
    }
`;

const MainContent = styled.div`
    width: 90%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 50px;
`;

const Title = styled.h1`
    text-align: center;
    font-weight: 500;
    font-size: 1.8em;
`;

const Title2 = styled.h1`
    text-align: left;
    font-weight: 500;
    font-size: 1.8em;
    margin-left: 5%;
`;

const InfoWrapper = styled.div`
    @media all and (max-width: 899px) {
        order: 1;
        width: 100vw;
        margin: 0 5%;
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

    return (
        <div className="Overview">
            <SuperWrapper className="SuperWrapper">
                <MainContent>
                    <PitchWrap className="PitchWrap">
                        <Pitch />
                        <Bench />
                    </PitchWrap>

                    <InfoWrapper>
                        <Title>Översikt över dina spel</Title>
                        <Stake /* isMobile={isMobile} */ style={{}}>
                            <h5>Din insats</h5>
                            <p className="stakeSum">{team.value.tot} kr</p>
                        </Stake>
                        <Revenue>
                            <h6>Omsättning inför helgens omgång</h6>
                            <p className="revenueSum">128 000 kr</p>
                        </Revenue>
                        {/* <Collapsible totalPoints={totalPoints} /> */}
                        <ResultDropdown totalPoints={totalPoints} />
                        <Rounds />
                    </InfoWrapper>
                </MainContent>
                <Round round={roundInView} roundIndex={roundInView && roundInView._id} />
            </SuperWrapper>
        </div>
    );
};

export default withOverview(OverviewPage);
