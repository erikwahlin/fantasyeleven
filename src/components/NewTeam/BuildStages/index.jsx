import React, { useEffect } from 'react';
import { withTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import { firstCap, toSwe } from '../../../constants/helperFuncs';
import styled from 'styled-components';
import StageTemplate from '../StageTemplate';
import PitchStage from '../PitchStage';
import CaptainStage from '../CaptainStage';
import BenchStage from '../BenchStage';
import OverviewStage from '../OverviewStage';
import Pitch from '../Pitch';
import Bench from '../Bench';
import './index.css';
import { Steps, Button, message } from 'antd';
import StepContainer from './StepContainer';

const { Step } = Steps;

const Wrapper = styled.div`
    grid-row: 1;

    width: 100%;
    height: 100%;
    max-width: 650px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media all and (min-height: 830px) {
        justify-content: space-around;
    }

    @media all and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        justify-content: flex-start;
        height: auto;
    }

    @media screen and (min-width: 900px) {
        margin: 0 0 0 auto;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 480px) {
        /*  flex: 1; */
    }
`;

const StageNav = styled.div`
    position: relative;
    bottom: 0;

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

    @media all and (max-width: 480px) {
        bottom: 0;
        width: 50vw;
        height: 7vh;
        /* border: 1px solid white; */
    }
`;

const StageNavBtnLeft = styled(StageNavBtn)`
    @media all and (max-width: 480px) {
        right: 50vw;
    }
`;
const StageNavBtnRight = styled(StageNavBtn)``;

const stageContent = stage => {
    let stageTitle = toSwe(stage, 'stages').toUpperCase();

    switch (stage) {
        case 'pitch':
            return <PitchStage />;

        case 'captain':
            return (
                <>
                    <CaptainStage />
                </>
            );

        case 'bench':
            return (
                <>
                    {/* <h2>{stageTitle}</h2> */}
                    <BenchStage />
                </>
            );
        case 'overview':
            return (
                <>
                    {/* <h2>{stageTitle}</h2> */}
                    <OverviewStage />
                </>
            );

        default:
            return <h2>{stageTitle}</h2>;
    }
};

const BuildStages = ({ buildStage, teamContext, ...props }) => {
    const { setStage, updateFilterKeys, updatePitchAnim } = teamContext.setters;
    const { team } = teamContext.state;
    const { list: playerList, captain, viceCaptain } = team;

    const { stageName, stageIndex } = buildStage;
    const playerCount = playerList
        ? playerList.filter(player => player.origin === stageName).length
        : 0;

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
                    playerCount === preset.maxPlayers[stageName] &&
                    team.game.value[stageName] <= preset.maxPrice[stageName]
                    //true
                );

            case 'captain':
                return captain && viceCaptain; //true

            case 'bench':
                return (
                    playerCount === preset.maxPlayers[stageName] &&
                    team.game.value[stageName] <= preset.maxPrice[stageName]
                    //true
                );

            default:
                return true;
        }
    };
    const steps = [
        {
            title: 'First',
            content: 'First-content'
        },
        {
            title: 'Second',
            content: 'Second-content'
        },
        {
            title: 'Last',
            content: 'Last-content'
        }
    ];

    return (
        <Wrapper className="BuildStages">
            <Content className="fade-in steps-content Content">
                <StageTemplate />
            </Content>

            <StepContainer
                stagename={stageName}
                current={stageIndex}
                size="small"
                className="StepContainer"
            >
                {preset.buildStages.map((stage, nth) => (
                    <Step key={stage} title={stage}></Step>
                    /* title should change depending on stage. */
                ))}
            </StepContainer>

            <StageNav className="StageNav">
                <StageNavBtnLeft
                    className="StageNavBtn prev"
                    onClick={e => navHandler(-1)}
                    disabled={buildStage.stageIndex < 1}
                >
                    Tillbaka
                </StageNavBtnLeft>

                <StageNavBtnRight
                    className="StageNavBtn next"
                    onClick={e => navHandler(1)}
                    disabled={!stageCondition(stageName)}
                >
                    {buildStage.stageName === 'overview' ? 'Lämna in lag!' : 'Vidare'}
                </StageNavBtnRight>
            </StageNav>
        </Wrapper>
    );
};

export default withTeam(BuildStages);
