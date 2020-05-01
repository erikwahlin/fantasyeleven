import React, { useState } from 'react';
import { clone } from '../../constants/helperFuncs';
import './form.css';

import { formTemplate } from './template';

const { FormContainer, FormField } = formTemplate;

const initialState = {
    ready: false,
    round: '',
    result: null
};

const ResultForm = () => {
    const [state, setState] = useState({ ...initialState });

    const autosave = (key, val) => {
        const newState = clone(state);

        newState[key] = val;

        setState({ ...newState });
    };

    const submit = e => {
        e.preventDefault();

        //alert('new result!');
    };

    return (
        <FormContainer
            className="FormContainer"
            title="Skapa ett nytt resultat"
            onSubmit={submit}
            submitVal="Skapa"
        >
            <FormField
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="text"
            />
        </FormContainer>
    );
};

export default ResultForm;
