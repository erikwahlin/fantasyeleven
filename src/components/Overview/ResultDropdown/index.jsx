import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { withOverview } from '../OverviewState';

import {
    valWrap,
    OuterWrapper,
    InnerWrapper,
    PitchWrap,
    PitchImg,
    ResultWrap,
    Stake,
    Revenue
} from '../overview.styles';

import { Collapse, Select, List } from 'antd';
const { Panel } = Collapse;
const { Option } = Select;

const Infokey = styled.h2`
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

const CustomCollapse = styled(Collapse)`
    width: 300px;
    max-width: 576px;
    margin: 20px auto;

    @media all and (max-width: 899px) {
        min-width: 576px;
    }
`;

const ResultDropdown = ({
    overviewContext,
    totalPoints,
    rank,
    award,
    awardPercent,
    totalTeamValue,
    attendedPlayers = 0,
    highestPoint,
    lowestPoint
}) => {
    const { user, playedRounds, roundInView } = overviewContext.state;
    const { setRoundInView } = overviewContext.setters;
    const [collapseKey, setCollapseKey] = useState(false);

    // TEMP
    const config = [
        {
            key: 'Totalpoäng',
            val: totalPoints,
            color:
                totalPoints > 30
                    ? '#00840A'
                    : totalPoints > 15
                    ? '#23540A'
                    : totalPoints <= 5
                    ? 'red'
                    : '#000',
            description: attendedPlayers > 1 ? `Omfång: ${lowestPoint} - ${highestPoint}` : null
        },
        {
            key: 'Rankingplats',
            val: `${rank}`,
            color:
                rank === roundInView.users.length
                    ? 'red'
                    : rank <= 3
                    ? '#00840A'
                    : rank <= 10
                    ? '#23540A'
                    : rank > 10
                    ? 'orange'
                    : rank > 100
                    ? 'red'
                    : '#000',
            description: `Deltagare: ${attendedPlayers}`
        },
        {
            key: 'Utdelning',
            val: `${award} kr`,
            extraVal: `(${awardPercent}%)`,
            color: award >= 99 ? '#00840A' : award >= 49 ? '#19261A' : award < 1 ? 'red' : '#000',
            description: `Potten: ${totalTeamValue} kr`
        }
    ];

    if (!roundInView) return null;

    return (
        <CustomCollapse
            classkey="unmarkable"
            onChange={() => setCollapseKey(!collapseKey)}
            expandIconPosition="right"
        >
            {!roundInView.ended ? (
                <Panel header="RESULTAT (inväntar...)"></Panel>
            ) : (
                <Panel
                    header={
                        <p style={{ margin: '0' }}>
                            RESULTAT
                            <br />
                            <span
                                style={{
                                    /* marginLeft: '2vw', */
                                    fontSize: '1.2em',
                                    fontWeight: '700',
                                    color: config[0].color
                                }}
                            >
                                {totalPoints}p
                            </span>
                            <span
                                style={{
                                    marginLeft: '2vw',
                                    fontSize: '1.2em',
                                    fontWeight: '700',
                                    color: config[1].color
                                }}
                            >
                                {rank}:plats
                            </span>
                            <span
                                style={{
                                    marginLeft: '2vw',
                                    fontSize: '1.2em',
                                    fontWeight: '700',
                                    color: config[2].color
                                }}
                            >
                                {award} kr
                            </span>
                        </p>
                    }
                    key="1"
                    style={{ fontSize: '1.1em', fontWeight: '500' }}
                >
                    <List
                        itemLayout="vertical"
                        dataSource={config}
                        renderItem={result => (
                            <List.Item key={config.key}>
                                <List.Item.Meta
                                    title={
                                        <>
                                            <p>
                                                {result.key}{' '}
                                                <span
                                                    style={{
                                                        fontSize: '1.2em',
                                                        fontWeight: '700',
                                                        marginLeft: '10px',
                                                        color: result.color
                                                    }}
                                                >
                                                    {result.val}
                                                </span>
                                                {result.extraVal && (
                                                    <span style={{ marginLeft: '10px' }}>
                                                        {result.extraVal}
                                                    </span>
                                                )}
                                            </p>
                                        </>
                                    }
                                    description={result.description}
                                />
                            </List.Item>
                        )}
                    ></List>
                </Panel>
            )}
        </CustomCollapse>
    );
};

export default withOverview(ResultDropdown);
