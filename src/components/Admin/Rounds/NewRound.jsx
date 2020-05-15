import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import apis from '../../../constants/api';

import { withAdmin } from '../AdminState';

import { clone, userMsg } from '../../../constants/helperFuncs';

import { formTemplate } from '../template';

import TeamPicker from './TeamPicker';

const { FormContainer, InputTemplate } = formTemplate;

const initialForm = {
    createdAt: '',
    updatedAt: '',
    alias: '',
    season: '',
    round: '',
    matches: [],
    active: false,
    result: null
};

const NewRound = props => {
    const { rounds } = props.adminContext.state;
    const { createRound } = props.adminContext.setters;

    const [form, setForm] = useState(clone(initialForm));

    const formReady = {
        createdAt: true,
        updatedAt: true,
        alias: form.alias.length && rounds.every(r => r.alias !== form.alias),
        season: form.season.length,
        round: !isNaN(parseFloat(form.round)) && parseInt(form.round) > 0,
        matches: (() => {
            const tenMatches = form.matches.length === 10;
            const pickedClubs = form.matches.every(match => match.home.club && match.away.club);
            return tenMatches && pickedClubs ? true : false;
        })(),
        active: true,
        result: true
    };

    const submitDisabled = (() => {
        let disabled = false;

        Object.values(formReady).forEach(field => {
            if (!field || field === false) {
                disabled = true;
            }
        });

        return disabled;
    })();

    const submit = e => {
        if (submitDisabled) {
            const invalidMsg = userMsg({
                message: 'Vänligen fyll i obligatoriska fält.',
                type: 'error',
                dismiss: { duration: 2000 }
            });
            return invalidMsg.add();
        }

        e.preventDefault();

        const onSuccess = () => {
            setForm(clone(initialForm));
        };

        createRound(form, onSuccess);
    };

    const autosave = (key, val) => {
        const newForm = clone(form);

        newForm[key] = val;

        newForm.createdAt = Date.now();

        newForm.updatedAt = Date.now();

        setForm({ ...newForm });
    };

    return (
        <div>
            <FormContainer
                className="FormContainer"
                title="Skapa en ny omgång"
                onSubmit={submit}
                submitVal="Skapa"
                submitDisabled={submitDisabled}
            >
                <InputTemplate
                    state={form}
                    stateKey="alias"
                    label="Alias"
                    autosave={autosave}
                    type="text"
                    helper="Måste vara unikt."
                    ready={formReady.alias}
                    onSubmit={submit}
                />

                <InputTemplate
                    state={form}
                    stateKey="season"
                    label="Säsong"
                    autosave={autosave}
                    type="text"
                    helper='Exempel "19/20"'
                    ready={formReady.season}
                    onSubmit={submit}
                />

                <InputTemplate
                    state={form}
                    stateKey="round"
                    label="Omgångsnummer"
                    autosave={autosave}
                    type="number"
                    helper="Använd siffror"
                    ready={formReady.round}
                    onSubmit={submit}
                />

                {/* <TeamPicker
                    form={form}
                    formKey="matches"
                    autosave={autosave}
                    ready={formReady.matches}
                    onSubmit={submit}
                /> */}

                <InputTemplate
                    state={form}
                    stateKey="active"
                    label="Sätt som aktiv"
                    autosave={autosave}
                    type="checkbox"
                    helper="Om aktiv knyts kommande registreringar till denna omgång"
                    ready={false}
                    onSubmit={submit}
                />
            </FormContainer>
        </div>
    );
};

export default withAdmin(NewRound);
