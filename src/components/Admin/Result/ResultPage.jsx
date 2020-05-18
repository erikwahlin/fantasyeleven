import React from 'react';
import styled, { css } from 'styled-components';

import { withAdmin } from '../AdminState';
import { withResult } from './ResultState';
import InputTable from './InputTable';
import OverView from './OverView';

import { Wrapper, OptionsWrapper } from '../template/wrapperTemplate';
import { ButtonStandard, SaveBtn, CustomTooltip } from '../template/TemplateElems';

import { Steps, Divider } from 'antd';

const { Step } = Steps;

const stepData = {
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
    substep: {
        match: [
            {
                name: 'homeEffort',
                label: 'Hemmalag',
                content: props => <InputTable side="home" {...props} />,
                ready: match => true

                // each player has all effort fields + field for effort-amount
            },
            {
                name: 'homeEffort',
                label: 'Bortalag',
                content: props => <InputTable side="away" {...props} />,
                ready: match => true
            }
        ],
        overview: [
            {
                name: 'overview',
                label: 'Översikt',
                content: props => <OverView {...props} />,
                ready: matches => true // calc all conditions... (at least 8 fullTimers in each team etc)
            }
        ]
    }
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
    ${p =>
        p.hidden &&
        css`
            display: none;
        `}
`;

const ResultPage = ({ adminContext, resultContext, roundIndex, closeResult }) => {
    const { state } = resultContext;
    const { step, substep, saved } = state;
    const { stepUpdater, saveRes } = resultContext.setters;

    const { rounds } = adminContext.state;
    const round = rounds[roundIndex];
    const { matches } = round;
    const match = matches[step];

    const { updateRound } = adminContext.setters;
    const hiddenStepIndex = window.innerWidth >= 650 ? 3 : window.innerWidth >= 480 ? 2 : 1;

    const { category } = stepData.step[step];
    const content = stepData.substep[category][substep].content;

    const lastStep = stepData.step.length - 1;
    const lastSubstep = stepData.substep[category].length - 1;

    const nextReady = stepData.substep[category][substep].ready(match);

    const takeSubstep = input => {
        let newSubstep = substep;
        let stepAdd = 0;
        let substepAdd = input;

        // going forwards and on last substep
        if (input > 0 && substep === lastSubstep) {
            // on last step
            if (step === lastStep) {
                // stay
                return;
            } else {
                // step forwards, first substep
                stepAdd = 1;
                substepAdd = 0;
                newSubstep = 0;
            }
        }

        // going back and on first substep
        if (input < 0 && substep === 0) {
            // on first step
            if (step === 0) {
                // stay
                return;
            } else {
                // step backwards, last substep
                stepAdd = -1;
                substepAdd = 0;
                newSubstep = lastSubstep;
            }
        }

        stepUpdater({
            step: step + stepAdd,
            substep: newSubstep + substepAdd
        });
    };

    return (
        <Wrapper
            className="NewResult Wrapper unmarkable"
            customStyle="margin: 50px 0; width: 100%; position: relative;"
        >
            <h2>RESULTAT FÖR OMGÅNG {round.alias}</h2>

            <StepContainer progressDot current={step}>
                {stepData.step.map((data, nth) => {
                    const active = data === nth ? true : false;
                    const hidden = !active && nth < step - hiddenStepIndex ? true : false;

                    return (
                        <ResultStep
                            key={`${data.name}-step-${nth}`}
                            title={data.label}
                            active={active}
                            hidden={hidden}
                        />
                    );
                })}
            </StepContainer>
            <Divider />
            <Steps progressDot direction="vertical" current={substep}>
                {stepData.substep[category].map((sub, nth) => (
                    <Step key={`${sub.name}-step-${nth}`} title={sub.label} />
                ))}
            </Steps>

            {category === 'match' && (
                <>
                    {stepData.substep[category][substep].label.toUpperCase()}
                    <p>Match {step + 1}</p>
                </>
            )}

            {content &&
                content({
                    stepData: stepData.substep[category][substep],
                    roundIndex,
                    matchIndex: step
                })}

            <SaveBtn className="saveBtn" onClick={saveRes} saved={saved}>
                {saved ? 'sparat' : 'spara'}
            </SaveBtn>

            <OptionsWrapper
                className="stepNav"
                style={{ marginTop: '50px' }}
                onClick={() => !saved && saveRes()}
            >
                <ButtonStandard
                    type="default"
                    disabled={step === 0 && substep === 0}
                    onClick={() => takeSubstep(-1)}
                >
                    Tillbaka
                </ButtonStandard>
                <CustomTooltip condition={category === 'match'} title="Nästa match">
                    <ButtonStandard
                        type="default"
                        disabled={category !== 'match'}
                        onClick={() => takeSubstep(1)}
                    >
                        Vidare
                    </ButtonStandard>
                </CustomTooltip>

                <CustomTooltip title="Stäng resultat">
                    <ButtonStandard type="primary" onClick={() => closeResult()}>
                        {category === 'overview' ? 'Klar' : 'Stäng'}
                    </ButtonStandard>
                </CustomTooltip>
            </OptionsWrapper>
        </Wrapper>
    );
};

export default withAdmin(withResult(ResultPage));
