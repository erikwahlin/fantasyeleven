import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import apis from '../../../constants/api';

import { withAdmin } from '../AdminState';

import { clone, userMsg } from '../../../constants/helperFuncs';

import { formTemplate } from '../template';

import NewRound from './NewRound';
import RoundList from './RoundList';

const { FormContainer, InputTemplate } = formTemplate;

const initialForm = {
    createdAt: '',
    updatedAt: '',
    alias: '',
    season: '',
    round: '',
    active: false,
    result: null
};

const Rounds = props => {
    const { createRound } = props.adminContext.setters;

    const [form, setForm] = useState(clone(initialForm));

    const formReady = {
        createdAt: true,
        updatedAt: true,
        alias: form.alias.length,
        season: form.season.length,
        round: !isNaN(parseFloat(form.round)) && parseInt(form.round) > 0,
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

    return (
        <div>
            <NewRound />

            <RoundList />
        </div>
    );
};

export default withAdmin(Rounds);
