import React, { useState, useEffect } from 'react';
import { withResult } from './ctx';
import apis from '../../../constants/api';

import { clone } from '../../../constants/helperFuncs';
import '../form.css';

import { formTemplate } from '../template';

const { FormContainer, InputTemplate } = formTemplate;

const initialState = {
    ready: false,
    season: '',
    round: '',
    result: null
};

const ResultForm = props => {
    const [state, setState] = useState(clone(initialState));
    const { getPlayerResult } = props.resultContext.setters;

    const autosave = (key, val) => {
        const newState = clone(state);

        newState[key] = val;

        setState({ ...newState });
    };

    const createPlayerResult = async () => {
        const { season, round } = state;
        await apis
            .create('createResult', { season, round })
            .then(async res => {
                console.log('Created new player result!', res);

                setState(clone(initialState));

                await getPlayerResult();
            })
            .catch(err => {
                //setLoading(false);
                console.log('Failed to create new player result.', err);
            });
    };

    const submit = e => {
        e.preventDefault();

        createPlayerResult();
    };

    const ready = {
        season: typeof state.season === 'string' && state.season.length,
        round: parseInt(state.round) > 0
    };

    const submitDisabled = !ready.season || !ready.round;

    return (
        <FormContainer
            className="FormContainer"
            title="Skapa ett nytt resultat"
            onSubmit={submit}
            submitVal="Skapa"
            submitDisabled={submitDisabled}
        >
            <InputTemplate
                state={state}
                stateKey="season"
                label="Säsong"
                autosave={autosave}
                type="text"
                helper='exempel: "19/20"'
                ready={ready.season}
            />

            <InputTemplate
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="number"
                helper="använd siffror"
                ready={ready.round}
            />
        </FormContainer>
    );
};

export default withResult(ResultForm);
