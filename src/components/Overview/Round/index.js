import React, { useState } from 'react';

import styled, { css } from 'styled-components';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Arrow from '../../../media/arrow.svg';
import ArrowB from '../../../media/arrowB.svg';

import { CustomConfirm } from '../../Elements';

import { Table, Card } from 'antd';
const { Column, ColumnGroup } = Table;

const Header = styled.div`
    width: 100%;
    margin: 10px;
    margin-bottom: ${p => (p.open ? '0' : '10px')};
    padding: 10px;

    position: relative;

    display: flex;
    justify-content: space-between;

    cursor: pointer;

    background: ${p => (p.open ? 'rgba(255,255,255,0.1)' : '#fff')};
    color: ${p => (p.open ? '#fff' : '#000')};
`;

const Title = styled.h2`
    color: ${p => (p.open ? '#fff' : '#000')};
    & span {
        font-weight: 700;
    }
`;

const TitleSpan = styled.span`
    font-size: 14px;
    color: ${p => (p.status === 'Aktiv' ? 'green' : p.status === 'Avslutad' ? 'orange' : '#fff')};
`;

const ArrowIcon = styled.img`
    transform: rotate(${p => (p.open ? '180deg' : '0deg')});
    color: purple;
`;

const RoundContent = styled.div`
    /* background: #23334d; */

    background: rgba(255, 255, 255, 0.1);

    display: ${p => (p.open ? 'flex' : 'none')};

    width: 100%;
    padding: 10px;

    flex-wrap: wrap;
`;

const InfoCard = styled(Card)`
    background: white;
    box-shadow: 0 0 10px #222;
    height: fit-content;
    margin: 20px 0;
    align-self: self-start;

    & p {
        font-size: 16px;

        & > span {
            font-weight: 700;
        }
    }
`;

const MatchTable = styled(Table)`
    background: white;
    width: 100%;

    margin: 20px 0;

    & th,
    & td {
        color: black;
    }

    & th {
        font-weight: 700;
    }
`;

const OptionContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

const Round = ({ round, roundIndex, active }) => {
    //const noneIsActive = !settings.activeRound._id;
    console.log(round && round.matches);

    const [open, setOpen] = useState(false);

    const matchTableData = round ? (
        round.matches.map((match, nth) => ({
            key: nth + 1,
            match: nth + 1,
            homeTeam: match.home.club,
            homeGoals: match.home.goals,
            hyphen: '-',
            awayGoals: match.away.goals,
            awayTeam: match.away.club
        }))
    ) : (
        <LoadingOutlined style={{ fontSize: 80 }} spin />
    );
    return (
        <div className="Result" div className="Result" customStyle="margin: 10px auto;">
            <Header className="Header">
                <Title>{round && round.alias}</Title>
            </Header>

            {/* <RoundContent open={open} className="RoundContent"> */}
            <div>
                <MatchTable
                    className="MatchTable unmarkable"
                    dataSource={matchTableData}
                    pagination={{ position: ['bottomCenter'], pageSize: 20 }}
                >
                    <Column title="Match" dataIndex="match" key="match" />
                    <Column title="HEMMA" dataIndex="homeTeam" key="homeTeam" />
                    <Column title="" dataIndex="homeGoals" key="homeGoals" />
                    <Column title="" dataIndex="hyphen" key="hyphen" />
                    <Column title="" dataIndex="awayGoals" key="awayGoals" />
                    <Column title="BORTA" dataIndex="awayTeam" key="awayTeam" />
                </MatchTable>
            </div>
            {/* </RoundContent> */}
        </div>
    );
};

export default Round;
