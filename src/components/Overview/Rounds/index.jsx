import React, { useState } from 'react';
import styled from 'styled-components';
import { withOverview } from '../OverviewState';

import { Collapse, List } from 'antd';
const { Panel } = Collapse;

const CustomCollapse = styled(Collapse)`
    width: 100%;
    max-width: 576px;
    margin: 20px auto;
`;

const Rounds = ({ overviewContext }) => {
    const { playedRounds, roundInView } = overviewContext.state;
    const { setRoundInView } = overviewContext.setters;

    const [collapseKey, setCollapseKey] = useState(false);

    if (!roundInView) return null;

    return (
        <CustomCollapse
            className="unmarkable"
            onChange={() => setCollapseKey(!collapseKey)}
            expandIconPosition="right"
        >
            <Panel
                header={`Visar omgång ${roundInView.alias}`}
                key="1"
                style={{ fontSize: '1.1em', fontWeight: '500' }}
            >
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
