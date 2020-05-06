import React, { useState, useEffect } from 'react';
import { withResult } from './ctx';
import apis from '../../../constants/api';

import { clone, userMsg } from '../../../constants/helperFuncs';
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
    const { contextState } = props.resultContext.setters;

    const createPlayerResult = async () => {
        const creatingMsg = userMsg({
            message: 'Skapar resultat...',
            dismiss: { duration: 2000 }
        });
        creatingMsg.add();

        // empty form
        setState(clone(initialState));

        const { season, round } = state;
        await apis
            .create('createResult', { season, round })
            .then(async res => {
                if (!res) return console.log('Failed to get back a post response.');

                const newRes = res.data.data;
                console.log('Created new player result!', newRes);

                // update result state with post response
                contextState('playerResult', newRes);

                // display confirmation
                const confirmation = userMsg({
                    message: 'Nytt resultat skapat!',
                    dismiss: {
                        duration: 2000
                    },
                    type: 'success'
                });
                confirmation.add();
            })

            .catch(err => {
                console.log('Failed to create new player result.', err);
            });
    };

    const submit = e => {
        if (!ready.season || !ready.round) {
            const invalidMsg = userMsg({
                message: 'Vänligen fyll i alla fält.',
                type: 'warning',
                dismiss: { duration: 2000 }
            });
            return invalidMsg.add();
        }

        e.preventDefault();

        createPlayerResult();
    };

    const autosave = (key, val) => {
        const newState = clone(state);

        newState[key] = val;

        setState({ ...newState });
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
                onSubmit={submit}
            />

            <InputTemplate
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="number"
                helper="använd siffror"
                ready={ready.round}
                onSubmit={submit}
            />
        </FormContainer>
    );
};

export default withResult(ResultForm);
