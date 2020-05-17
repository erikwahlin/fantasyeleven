import React, { Component, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

//import ResultContext from './ctx';
import apis from '../../../constants/api';
//import { store } from 'react-notifications-component';
import { userMsg, clone } from '../../../constants/helperFuncs';
//import ManualSim from './ManualSim';
import ResultForm from '../Result/ResultForm';
import ResultList from '../Result/ResultList';

import { withAdmin } from '../AdminState';
import { withNewRes } from './NewResState';
import ClubForm from './ClubForm';
import EffortForm from './EffortForm';

import allClubs from '../../../constants/clubs';

import { Wrapper } from '../template/wrapperTemplate';
import { ButtonStandard, SaveBtn } from '../template/TemplateElems';

import { Steps, Divider, Button } from 'antd';

const { Step } = Steps;

const stepInfo = {
    step: (() => {
        let res = [];

        // 10 matches
        for (let max = 0; max < 10; max++) {
            res.push({
                name: `match-${max + 1}`,
                label: `Match ${max + 1}`,
                category: 'match'
            });
        }

        // overview
        res.push({
            name: 'overview',
            label: 'Översikt',
            category: 'overview'
        });
        return res;
    })(),
    substep: [
        {
            name: 'homeEffort',
            label: 'Hemmalag',
            content: props => <EffortForm side="home" {...props} />,
            ready: match => true,
            parent: 'match'

            // each player has all effort fields + field for effort-amount
        },
        {
            name: 'homeEffort',
            label: 'Bortalag',
            content: props => <EffortForm side="away" {...props} />,
            ready: match => true,
            parent: 'match'
        }
    ]
};

const StepContainer = styled(Steps)`
    overflow-x: scroll;

    & .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: #005c07;
    }

    & .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
        background-color: #1890ff;
    }
`;

const ResultStep = styled(Step)`
    /* just keep active step in view on wide screens, wip */
    ${p => p.hidden && 'display: none'};
`;

const NewResultSteps = ({ adminContext, newResContext, roundIndex }) => {
    const { state } = newResContext;
    const { step, substep, saved } = state;
    const { stepUpdater, saveRes } = newResContext.setters;

    const { rounds } = adminContext.state;
    const round = rounds[roundIndex];
    const { matches } = round;
    const match = matches[step];

    const { updateRound } = adminContext.setters;

    const stepContent = stepInfo.step[state.step].content;
    const substepContent =
        stepInfo.substep[state.substep].parent === stepInfo.step[state.step].category
            ? stepInfo.substep[state.substep].content
            : null;

    const lastStepIndex = stepInfo.step.length - 1;
    const lastSubstepIndex =
        stepInfo.substep.filter(s => s.parent === stepInfo.step[step].category).length - 1;

    const hiddenStepIndex = window.innerWidth >= 650 ? 3 : window.innerWidth >= 480 ? 2 : 1;

    const nextReady = stepInfo.substep[state.substep].ready(match);

    const takeSubstep = input => {
        let newStepIndex = state.step;
        let newSubstepIndex = state.substep;
        let stepAdd = 0;
        let substepAdd = input;

        // going forwards and on last substep
        if (substepAdd > 0 && state.substep === lastSubstepIndex) {
            // on last step
            if (state.step === lastStepIndex) {
                // stay
                return;
            } else {
                // step forwards, first substep
                stepAdd = 1;
                substepAdd = 0;
                newSubstepIndex = 0;
            }
        }

        // going back and on first substep
        if (substepAdd < 0 && state.substep === 0) {
            // on first step
            if (state.step === 0) {
                // stay
                return;
            } else {
                // step backwards, last substep
                stepAdd = -1;
                substepAdd = 0;
                newSubstepIndex = lastSubstepIndex;
            }
        }

        stepUpdater({
            step: newStepIndex + stepAdd,
            substep: newSubstepIndex + substepAdd
        });
    };

    return (
        <Wrapper
            className="NewResult Wrapper unmarkable"
            customStyle="margin: 50px 0; width: 100%; position: relative;"
        >
            <h2>RESULTAT FÖR OMGÅNG {round.alias}</h2>

            <StepContainer progressDot current={state.step}>
                {Object.values(stepInfo.step).map((step, nth) => {
                    const active = state.step === nth ? true : false;
                    const hidden = !active && nth < state.step - hiddenStepIndex ? true : false;

                    return (
                        <ResultStep
                            key={`${step.name}-step-${nth}`}
                            title={step.label}
                            active={active}
                            hidden={hidden}
                        />
                    );
                })}
            </StepContainer>
            <Divider />
            <Steps progressDot direction="vertical" current={state.substep}>
                {Object.values(stepInfo.substep).map((sub, nth) =>
                    sub.parent === stepInfo.step[step].category ? (
                        <Step key={`${sub.name}-step-${nth}`} title={sub.label} />
                    ) : null
                )}
            </Steps>

            {stepInfo.substep[state.substep].label.toUpperCase()}
            <p>Match {state.step + 1}</p>

            {stepContent &&
                stepContent({
                    stepInfo: stepInfo.step[state.step]
                })}

            {substepContent &&
                substepContent({
                    stepInfo: stepInfo.substep[state.substep],
                    roundIndex,
                    matchIndex: step
                })}

            <SaveBtn className="saveBtn" onClick={saveRes} saved={saved}>
                {saved ? 'sparat' : 'spara'}
            </SaveBtn>
            <div className="stepNav" style={{ marginTop: '50px' }}>
                <ButtonStandard
                    type="primary"
                    disabled={state.step === 0 && state.substep === 0}
                    onClick={() => takeSubstep(-1)}
                >
                    Tillbaka
                </ButtonStandard>
                <ButtonStandard type="primary" disabled={!nextReady} onClick={() => takeSubstep(1)}>
                    Vidare
                </ButtonStandard>
            </div>
            {/* Render content (forms) for each substep */}
        </Wrapper>
    );
};

export default withAdmin(withNewRes(NewResultSteps));
