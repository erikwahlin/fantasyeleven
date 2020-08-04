import React from 'react';

import * as Scroll from 'react-scroll';
import styled from 'styled-components';
import { withOverview } from './OverviewState';
import Round from './Round';
import ResultDropdown from './ResultDropdown';
import { LoadingOutlined } from '@ant-design/icons';

import { PitchWrap, Stake, Revenue } from './overview.styles';

import Pitch from './Pitch';
import Rounds from './Rounds';
import Bench from './Bench';

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
    width: 100%;
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
    margin: 0 auto;
    @media all and (max-width: 899px) {
        order: 1;
        width: 100vw;
        margin: 0 5%;
    }
`;

const OverviewPage = ({ overviewContext }) => {
    const { user, roundInView, playedTeams } = overviewContext.state;

    if (!playedTeams.length || !roundInView)
        return (
            <LoadingOutlined
                style={{ fontSize: 40, position: 'fixed', right: '50vw', top: '50vh' }}
                spin
            />
        );

    const team = playedTeams.filter(t => t.round === roundInView._id)[0];
    //console.log(team);

    let totalPoints = 0;
    let rank = 0;
    let award = 0;
    let totalTeamValue = 0;
    let attendedPlayers = 0;
    let awardPercent = 0;
    let highestPoint = 0;
    let lowestPoint = 0;

    if (roundInView.result.myTeam) {
        if (roundInView.result.myTeam.list.length) {
            attendedPlayers = roundInView.users.length;

            totalPoints = roundInView.result.myTeam.list.reduce(
                (tot, player) => tot + player.points.tot,
                0
            );

            highestPoint = Math.max(...roundInView.users.map(u => u.totalPoints));
            lowestPoint = Math.min(...roundInView.users.map(u => u.totalPoints));

            const users = roundInView.users.sort((a, b) =>
                a.totalPoints > b.totalPoints ? -1 : 1
            );

            users.forEach((userObj, nth) => {
                if (userObj.user === user._id) {
                    rank = nth + 1;
                }

                if (userObj.teamValue) {
                    totalTeamValue += userObj.teamValue;
                }
            });

            totalTeamValue = Math.round(totalTeamValue);

            if (rank > 0) {
                award = rank === 1 ? totalTeamValue * 0.75 : rank === 2 ? totalTeamValue * 0.25 : 0;
                award = Math.round(award);

                awardPercent = rank === 1 ? 75 : rank === 2 ? 25 : 0;
            }
        }
    }

    return (
        <div className="Overview">
            <SuperWrapper className="SuperWrapper">
                <MainContent>
                    <PitchWrap className="PitchWrap">
                        <Title2>Ditt lag</Title2>
                        <Pitch />
                        <Bench />
                    </PitchWrap>

                    <InfoWrapper>
                        <Title>Översikt över dina spel</Title>
                        <Stake style={{}}>
                            <h5>Din insats</h5>
                            <p className="stakeSum">{team.value.tot} kr</p>
                        </Stake>
                        <Revenue>
                            <h6>Total omsättning för denna omgång</h6>
                            <p className="revenueSum">{totalTeamValue} kr</p>
                        </Revenue>
                        <ResultDropdown
                            totalPoints={totalPoints}
                            totalTeamValue={totalTeamValue}
                            rank={rank}
                            award={award}
                            awardPercent={awardPercent}
                            attendedPlayers={attendedPlayers}
                            highestPoint={highestPoint}
                            lowestPoint={lowestPoint}
                        />
                        <Rounds />
                    </InfoWrapper>
                </MainContent>
                <Round round={roundInView} roundIndex={roundInView && roundInView._id} />
            </SuperWrapper>
        </div>
    );
};

export default withOverview(OverviewPage);
