import React, { useState } from 'react';
import { clone } from '../../constants/helperFuncs';
import './form.css';

import { formTemplate } from './template';

const { FormContainer, FormGroup } = formTemplate;

const initialState = {
    ready: false,
    round: '',
    first: '',
    second: '',
    third: ''
};

const AwardForm = () => {
    const [state, setState] = useState({ ...initialState });

    const autosave = (key, val) => {
        const newState = clone(state);

        newState[key] = val;

        setState({ ...newState });
    };

    const submit = e => {
        e.preventDefault();

        alert('award hej!');
    };

    return (
        <FormContainer
            className="FormContainer Award"
            title="Skapa en ny utdelningsmodell"
            onSubmit={submit}
            submitVal="Skapa"
        >
            <FormGroup
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="text"
            />

            <FormGroup
                state={state}
                stateKey="first"
                label="Förstaplatsen %"
                autosave={(key, val) => autosave(key, parseInt(val))}
                type="percent"
            />

            <FormGroup
                state={state}
                stateKey="second"
                label="Andraplatsen %"
                autosave={autosave}
                type="percent"
            />

            <FormGroup
                state={state}
                stateKey="third"
                label="Tredjeplatsen %"
                autosave={autosave}
                type="percent"
            />
        </FormContainer>
    );
};

export default AwardForm;
