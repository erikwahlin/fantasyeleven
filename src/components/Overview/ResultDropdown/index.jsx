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
    width: 100%;
    margin: 20px 0;
`;

const ResultDropdown = ({ overviewContext, totalPoints, rank, award }) => {
    const { user, playedRounds, roundInView } = overviewContext.state;
    const { setRoundInView } = overviewContext.setters;
    console.log(playedRounds);
    const [collapseKey, setCollapseKey] = useState(false);

    // TEMP

    const config = [
        {
            key: 'TotalPoäng',
            val: totalPoints,
            color:
                totalPoints > 20
                    ? '#00840A'
                    : totalPoints > 10
                    ? '#19261A'
                    : totalPoints <= 0
                    ? 'red'
                    : '#000'
        },
        {
            key: 'Din Ranking',
            val: rank,
            color: rank <= 3 ? '#00840A' : rank <= 20 ? '#19261A' : rank > 100 ? 'red' : '#000'
        },
        {
            key: 'Utdelning',
            val: '22 000 kr',
            color: award >= 99 ? '#00840A' : award >= 49 ? '#19261A' : award < 1 ? 'red' : '#000'
        }
    ];

    if (!roundInView) return null;

    return (
        <CustomCollapse
            classkey="unmarkable"
            onChange={() => setCollapseKey(!collapseKey)}
            expandIconPosition="right"
        >
            <Panel header={'Resultat'} key="1">
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
                                        </p>
                                    </>
                                }
                                /* description={`${round.val}`} */
                            />
                        </List.Item>
                    )}
                ></List>
            </Panel>
        </CustomCollapse>
    );
};

export default withOverview(ResultDropdown);
