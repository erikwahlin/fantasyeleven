import React, { Component, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

//import ResultContext from './ctx';
import apis from '../../../constants/api';
//import { store } from 'react-notifications-component';
import { userMsg, clone } from '../../../constants/helperFuncs';
//import ManualSim from './ManualSim';
import ResultForm from '../Result/ResultForm';
import ResultList from '../Result/ResultList';

import NewResState from './NewResState';

import { withAdmin } from '../AdminState';
import allClubs from '../../../constants/clubs';

import { Wrapper } from '../template/wrapperTemplate';

import { Steps, Divider } from 'antd';

const { Step } = Steps;

/*     step: {
        clubPick: {
            homeClub: '',
            awayClub: ''
        },
        standings: {
            homePoints: '',
            awayPoints: ''
        },
        whoScored: {
            scores: [],
            assists: []
        }
    }, */

/* const initial_state = {
    playerResult: null,

    step: 1, // 1
    homeClub: '', //''
    awayClub: '', //''
    homeClubScore: '', //null
    awayClubScore: '', //null
    whoScoredHome: [],
    whoScoredAway: [],

    playerStep: 1 // first goals, then assists etc..
}; */

const ClubForm = ({ role, step, ...props }) => {
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');

    const homeRef = useRef(null);
    const awayRef = useRef(null);

    return (
        <NewResState>
            <div>
                <form>
                    <select
                        ref={homeRef}
                        type="select"
                        value={home}
                        onChange={e => setHome(e.target.value)}
                    >
                        <option disabled value="">
                            - Välj hemmalag -
                        </option>
                        {allClubs.map(club => (
                            <option
                                key={club.short}
                                value={club.long}
                                disabled={away === club.long}
                            >
                                {club.long}
                            </option>
                        ))}
                    </select>

                    <select
                        ref={awayRef}
                        type="select"
                        value={away}
                        onChange={e => setAway(e.target.value)}
                    >
                        <option disabled value="">
                            - Välj bortalag -
                        </option>
                        {allClubs.map(club => (
                            <option
                                key={club.short}
                                value={club.long}
                                disabled={home === club.long}
                            >
                                {club.long}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        </NewResState>
    );
};

const EffortForm = ({ role, ...props }) => {
    const roleSwe = role === 'home' ? 'hemma' : 'borta';

    return <div>{roleSwe}-prestationer...</div>;
};

const stepContent = {
    matchStep: [
        {
            name: 'clubs',
            label: 'Vilka lag möttes?',
            content: props => <ClubForm {...props} />
        },
        {
            name: 'homeEffort',
            label: 'Prestationer hemmalag',
            content: props => <EffortForm role="home" {...props} />

            // each player has all effort fields + field for effort-amount
        },
        {
            name: 'homeEffort',
            label: 'Prestationer bortalag',
            content: props => <EffortForm role="away" {...props} />
        }
    ],
    resultStep: (() => {
        let res = [];
        for (let max = 0; max < 10; max++) {
            res.push({
                name: `match-${max + 1}`,
                label: `Match ${max + 1}`
            });
        }
        return res;
    })()
};

const resultSteps = [''];

const initialState = {
    resultStep: {
        nav: 0
    },
    matchStep: {
        nav: 0
    }
};

const ResultStepContainer = styled(Steps)`
    overflow-x: scroll;
`;

const ResultStep = styled(Step)`
    /* just keep active step in view on wide screens, wip */
    ${p => p.hidden && 'display: none'};
`;

const NewResult = ({ adminContext }) => {
    const [state, setState] = useState(initialState);

    const currResultIndex = state.resultStep.nav;
    const currMatchIndex = state.matchStep.nav;
    const lastResultIndex = stepContent.resultStep.length - 1;
    const lastMatchIndex = stepContent.matchStep.length - 1;

    const resultStepsRef = useRef(null);

    const resultHideIndex = window.innerWidth >= 650 ? 3 : window.innerWidth >= 480 ? 2 : 1;

    const takeMatchStep = input => {
        let newResultIndex = currResultIndex;
        let newMatchIndex = currMatchIndex;
        let resultAdd = 0;
        let matchAdd = input;

        // going forwards and on last matchstep
        if (matchAdd > 0 && currMatchIndex === lastMatchIndex) {
            // on last resultstep
            if (currResultIndex === lastResultIndex) {
                // stay
                matchAdd = 0;
            } else {
                // resultstep forwards, first matchstep
                resultAdd = 1;
                matchAdd = 0;
                newMatchIndex = 0;
            }
        }

        // going back and on first matchstep
        if (matchAdd < 0 && currMatchIndex === 0) {
            // on first resultstep
            if (currResultIndex === 0) {
                // stay
                matchAdd = 0;
            } else {
                // resultstep backwards, last matchstep
                resultAdd = -1;
                matchAdd = 0;
                newMatchIndex = lastMatchIndex;
            }
        }

        setState({
            ...state,
            resultStep: {
                ...state.resultStep,
                nav: newResultIndex + resultAdd
            },
            matchStep: { ...state.matchStep, nav: newMatchIndex + matchAdd }
        });
    };

    return (
        <Wrapper>
            <ResultStepContainer progressDot current={currResultIndex}>
                {Object.values(stepContent.resultStep).map((step, nth) => {
                    const active = currResultIndex === nth ? true : false;
                    const hidden =
                        !active && nth < currResultIndex - resultHideIndex ? true : false;

                    console.log(
                        'active',
                        active,
                        'currIndex',
                        currResultIndex,
                        'resHideIndex',
                        resultHideIndex,
                        'hidden',
                        hidden
                    );

                    return (
                        <ResultStep
                            key={`${step.name}-step-${nth}`}
                            title={step.label}
                            active={active}
                            hidden={hidden}
                        />
                    );
                })}
            </ResultStepContainer>
            <Divider />
            <Steps progressDot direction="vertical" current={currMatchIndex}>
                {Object.values(stepContent.matchStep).map((step, nth) => (
                    <Step key={`${step.name}-step-${nth}`} title={step.label} />
                ))}
            </Steps>

            {stepContent.matchStep[currMatchIndex].label.toUpperCase()}

            <div>
                {stepContent.matchStep[currMatchIndex].content({
                    step: stepContent[currMatchIndex]
                })}
            </div>

            <button onClick={() => takeMatchStep(-1)}>Tillbaka</button>
            <button onClick={() => takeMatchStep(1)}>Vidare</button>

            {/* Render content (forms) for each matchStep */}
        </Wrapper>
    );
};

export default withAdmin(NewResult);
