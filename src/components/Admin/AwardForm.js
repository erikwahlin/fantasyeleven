import React, { useState } from 'react';
import { clone } from '../../constants/helperFuncs';
import './form.css';

import { formTemplate } from './template';

const { FormContainer, InputTemplate } = formTemplate;

const initialState = {
    ready: false,
    round: '',
    first: '',
    second: '',
    third: ''
};

const AwardForm = () => {
    const [state, setState] = useState({ ...initialState });

    const setShrink = () => {};

    const autosave = (key, val, type) => {
        const newState = clone(state);
        console.log('vaaal', val);

        let formatted = val;

        if (type === 'number' || type === 'percent') {
            const empty = isNaN(val) || val === '0' || val < 1;
            if (empty) {
                formatted = '';
            }
        }

        if (type === 'percent') {
            if (val > 100) formatted = 100;
        }

        newState[key] = formatted;

        setState({ ...newState });
    };

    const submit = e => {
        e.preventDefault();

        //alert('award hej!');
    };

    return (
        <FormContainer
            className="FormContainer Award"
            title="Skapa en ny utdelningsmodell"
            onSubmit={submit}
            submitVal="Skapa"
        >
            <InputTemplate
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="text"
            />

            <InputTemplate
                state={state}
                stateKey="first"
                label="Förstaplatsen %"
                autosave={(key, val) => autosave(key, val, 'percent')}
                type="number"
                min={0}
                max={100}
            />

            <InputTemplate
                state={state}
                stateKey="second"
                label="Andraplatsen %"
                autosave={(key, val) => autosave(key, val, 'percent')}
                type="number"
                min={0}
                max={100}
            />

            <InputTemplate
                state={state}
                stateKey="third"
                label="Tredjeplatsen %"
                autosave={(key, val) => autosave(key, val, 'percent')}
                type="number"
                min={0}
                max={100}
            />
        </FormContainer>
    );
};

export default AwardForm;
