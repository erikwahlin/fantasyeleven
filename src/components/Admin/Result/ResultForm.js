import React, { useState, useEffect } from 'react';
import { withAdmin } from '../AdminState';
import apis from '../../../constants/api';

import { clone, userMsg } from '../../../constants/helperFuncs';
import '../form.css';

import { formTemplate } from '../template';

import DropDown from 'react-dropdown';

const { FormContainer, InputTemplate } = formTemplate;

const initialState = {
    ready: false,
    season: '',
    round: '',
    result: null
};

const ResultForm = ({ adminContext }) => {
    const { createResult } = adminContext.setters;
    const [state, setState] = useState(clone(initialState));

    const creatingMsg = userMsg({
        message: 'Skapar resultat...'
    });

    const submitCallback = () => {
        // empty form, hide msg
        setState(clone(initialState));
        creatingMsg.remove();
    };

    const submit = e => {
        e.preventDefault();

        if (!ready.season || !ready.round) {
            const invalidMsg = userMsg({
                message: 'Vänligen fyll i alla fält.',
                type: 'warning',
                dismiss: { duration: 2000 }
            });
            return invalidMsg.add();
        }

        creatingMsg.add();

        const { season, round } = state;

        createResult({ payload: { season, round }, callback: submitCallback });
    };

    const autosave = (key, val) => {
        const newState = clone(state);

        newState[key] = val;

        setState({ ...newState });
    };

    const ready = {
        round: state.round
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
            <input type="text" />

            {/* <InputTemplate
                state={state}
                stateKey="round"
                label="Omgång"
                autosave={autosave}
                type="dropdown"
                helper=""
                ready={ready.round}
                onSubmit={submit}
            /> */}
        </FormContainer>
    );
};

export default withAdmin(ResultForm);
