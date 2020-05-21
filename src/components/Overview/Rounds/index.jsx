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

const Rounds = ({ overviewContext }) => {
    const { user, playedRounds, roundInView } = overviewContext.state;
    const { setRoundInView } = overviewContext.setters;

    const [collapseKey, setCollapseKey] = useState(false);

    if (!roundInView) return null;

    return (
        <CustomCollapse
            className="unmarkable"
            onChange={() => setCollapseKey(!collapseKey)}
            expandIconPosition="right"
        >
            <Panel header={`Visar omgång ${roundInView.alias}`} key="1">
                <List
                    itemLayout="vertical"
                    dataSource={playedRounds}
                    renderItem={round => (
                        <List.Item
                            key={round._id}
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
                                            {round.alias}
                                        </p>
                                    </>
                                }
                                description={`säsong ${round.season} - omgångsnr ${round.number}`}
                            />
                            {/* content... */}
                        </List.Item>
                    )}
                ></List>
            </Panel>
        </CustomCollapse>
    );
};

export default withOverview(Rounds);
