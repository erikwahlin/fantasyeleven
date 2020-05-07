import React, { useState } from 'react';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import { firstCap, toSwe } from '../../../constants/helperFuncs';
import styled from 'styled-components';
import Pitch from '../Pitch';
import Bench from '../Bench';
import Captain from '../Captain';
import { Tabs } from 'antd';
import { Steps } from 'antd';

const { TabPane } = Tabs;

const Wrapper = styled.div`
    grid-row: 2;
    /* display: flex;
	grid-template-columns: 100%;
	grid-template-rows: 80px auto;
	position: relative; */
    width: 100%;
    height: 100%;
    max-width: 800px;
    /* margin: auto;
    margin-top: 0; */

    display: flex;
    flex-direction: column;
    justify-content: stretch;

    @media screen and (min-width: 900px) {
        grid-column: 2;
    }
`;

const TabContainer = styled(Tabs)`
    flex: 1;

    display: flex;
    flex-direction: column-reverse;

    & .tablist {
        width: 100%;
    }

    & .ant-tabs-nav-container-scrolling {
        padding: 0;
    }

    & .ant-tabs-nav-scroll {
        width: 100%;
    }

    & .ant-tabs-nav {
        width: 100%;
        & > div {
            width: 100%;
            display: flex;
        }
    }

    & .ant-tabs-tab {
        flex: 1;
        margin: 0;
    }

    & .ant-tabs-content {
        flex: 1;
    }
`;
const StepContainer = styled(Steps)`
    flex: 0;
    display: flex;
`;
const Tab = styled(TabPane)``;

const StageNav = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
`;

const StageNavBtn = styled.button`
    width: 120px;
    height: 50px;
    background: rgba(35, 51, 77, 1);
    border: none;
    outline: none;
    cursor: pointer;
    font-family: 'Avenir';
    font-size: 1.1em;
    font-weight: 500;
    color: white;
    opacity: ${p => (p.disabled ? '.5' : '1')};
`;

const stageContent = stage => {
    let stageTitle = toSwe(stage, 'stages').toUpperCase();

    switch (stage) {
        case 'pitch':
            return <Pitch />;

        case 'captain':
            return (
                <>
                    <Captain />
                </>
            );

        case 'bench':
            return (
                <>
                    {/* <h2>{stageTitle}</h2> */}
                    <Bench />
                </>
            );

        default:
            return <h2>{stageTitle}</h2>;
    }
};

const BuildStages = ({ buildStage, teamContext, ...props }) => {
    const { setStage, updateFilterKeys } = teamContext.setters;
    const { team } = teamContext.state;
    const { list: playerList, captain, viceCaptain } = team;

    const { stageName, stageIndex } = buildStage;
    const playerCount = playerList.filter(player => player.origin === stageName).length;

    const callback = key => {
        console.log('tab change callback...');
    };

    const onChange = current => {
        console.log('onChange:', current);
    };

    const navHandler = input => {
        let index = stageIndex + input;

        if (index < 0 || index > preset.buildStages.length - 1) return;

        setStage({
            stageName: preset.buildStages[index],
            stageIndex: index
        });

        updateFilterKeys();
    };

    const stageCondition = key => {
        switch (key) {
            case 'pitch':
                return (
                    /*                     playerCount === preset.maxPlayers[stageName] &&
                    value[stageName] <= preset.maxPrice[stageName] */
                    true
                );

            case 'captain':
                return true; /* captain && viceCaptain; */

            case 'bench':
                return (
                    /*                     playerCount === preset.maxPlayers[stageName] &&
                    value[stageName] <= preset.maxPrice[stageName] */
                    true
                );

            default:
                return true;
        }
    };

    return (
        <Wrapper className="BuildStages unmarkable">
            {
                <TabContainer
                    activeKey={stageName}
                    defaultActiveKey={preset.buildStages[0]}
                    onChange={callback}
                >
                    {preset.buildStages.map((stage, nth) => (
                        <Tab tab={firstCap(stage)} key={stage} disabled>
                            {stageContent(stage)}
                        </Tab>
                    ))}
                </TabContainer>
            }

            <StageNav className="StageNav">
                <StageNavBtn
                    className="StageNavBtn prev"
                    onClick={e => navHandler(-1)}
                    disabled={buildStage.stageIndex < 1}
                >
                    Tillbaka
                </StageNavBtn>

                <StageNavBtn
                    className="StageNavBtn next"
                    onClick={e => navHandler(1)}
                    disabled={!stageCondition(stageName)}
                >
                    {buildStage.stageName === 'overview' ? 'Lämna in lag!' : 'Vidare'}
                </StageNavBtn>
            </StageNav>
        </Wrapper>
    );
};

export default withTeam(BuildStages);
