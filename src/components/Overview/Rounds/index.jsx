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

    return (
        <CustomCollapse
            /* onChange={} */
            expandIconPosition="right"
        >
            <Panel header="Omgångar" key="1">
                <List
                    itemLayout="vertical"
                    dataSource={playedRounds}
                    renderItem={round => (
                        <List.Item
                            key={round._id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setRoundInView(round._id)}
                        >
                            <List.Item.Meta
                                /* avatar={
                                    <>
                                        <span>{round.alias}</span>
                                        säsong <span>{round.season}</span>
                                        omgångsnr <span>{round.number}</span>
                                    </>
                                } */
                                title={round.alias}
                                description={`säsong ${round.season} - omgångsnr ${round.number}`}
                            />
                            {/*  <div>
                                <p>Satsning {round.value.tot} kr</p>
                                <p>Kapten {round.captain.name}</p>
                                <p>Vice kapten {round.viceCaptain.name}</p>
                            </div> */}
                        </List.Item>
                    )}
                ></List>
            </Panel>
        </CustomCollapse>
    );
};

export default withOverview(Rounds);
