import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { withOverview } from '../OverviewState';

import {
    ContentWrap,
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

const CustomCollapse = styled(Collapse)`
    width: 100%;
    margin: 20px 0;
`;

const Rounds = ({ overviewContext, totalPoints }) => {
    const { user, playedRounds, roundInView } = overviewContext.state;
    const { setRoundInView } = overviewContext.setters;
    console.log(playedRounds);
    const [collapseKey, setCollapseKey] = useState(false);

    const config = [
        {
            title: 'TotalPoäng',
            content: totalPoints
        },
        {
            title: 'Din Ranking',
            content: '1'
        },
        {
            title: 'Utdelning',
            content: '22 000 kr'
        }
    ];

    if (!roundInView) return null;

    return (
        <CustomCollapse
            className="unmarkable"
            onChange={() => setCollapseKey(!collapseKey)}
            expandIconPosition="right"
        >
            <Panel header={'Resultat'} key="1">
                <List
                    itemLayout="vertical"
                    dataSource={config}
                    renderItem={round => (
                        <List.Item
                            key={config.title}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setRoundInView(round)}
                        >
                            <List.Item.Meta
                                title={
                                    <>
                                        <p
                                            style={{
                                                fontWeight:
                                                    round._id === roundInView._id ? '700' : 'normal'
                                            }}
                                        >
                                            {round.title}
                                        </p>
                                    </>
                                }
                                description={`${round.content}`}
                            />
                        </List.Item>
                    )}
                ></List>
            </Panel>
        </CustomCollapse>
    );
};

export default withOverview(Rounds);
