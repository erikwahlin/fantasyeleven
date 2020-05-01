import React from 'react';
import styled, { css } from 'styled-components';
import { Wrapper } from './wrapperTemplate';
import { InputNumber } from 'antd';

import { hej } from 'react-icons';

import { UnderlayContainer, Underlay, AppearOnHover, DisappearOnHover } from './underlay';

export const FormTitle = styled.h1`
    text-align: center;
    font-size: 3em;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px #eee;
`;

export const Field = styled.div`
    position: relative;
    display: flex;
    margin: 0;
    padding: 25px 0 0;
    box-shadow: inset 0px -2px 15px -15px black;
`;

export const Input = styled.input`
    text-indent: 10px;

    background: none !important;
    color: black !important;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;

    &:focus {
        outline: none;
    }

    &:focus ~ .form-input-label,
    &:not([value='']) ~ .form-input-label {
        top: 10px;
        font-size: 12px;
        color: #bbb;
    }

    &[class='valid'] {
        border-bottom: 1px solid green;
    }
    &[class='inValid'] {
        border-bottom: 1px solid red;
    }

    &[type='password'] {
        letter-spacing: 0.3em;
    }
`;

export const PercentInput = styled(Input)``;

export const PercentNav = styled.div``;

export const Label = styled.label`
    text-indent: 10px;

    top: 40px;
    font-size: 16px;
    color: black;

    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    transition: 300ms ease all;

    &[class='shrink'] {
        top: -10px;
        font-size: 12px;
        color: #bbb;
    }
`;

export const Submit = styled.input`
    width: 100%;
    height: 100%;
    padding: 10px 20px;

    position: relative;
    z-index: 1;
    left: 0;
    top: 0;
    outline: none;
    border: none;
    color: #000;
    background: none;
    font-weight: 700;
`;

export const FormField = ({ state, stateKey, label = stateKey, type, autosave, ...props }) => {
    const handlePercent = val => {
        const formatted = !val || isNaN(val) ? 0 : val;
        autosave(stateKey, formatted);
    };

    const value = state[stateKey];

    return (
        <Field className="field">
            <Input
                {...props}
                type={type}
                value={value}
                className={`form-input`}
                onChange={e => {
                    autosave(stateKey, e.target.value);
                }}
            />

            <Label className={`form-input-label`}>{label}</Label>
        </Field>
    );
};

// add and remove anim-class for submit-btn
const submitAnim = (e, className = 'clicked') => {
    const target = e.target.classList.contains('UnderlayContainer')
        ? e.target
        : e.target.closest('.UnderlayContainer');

    target.classList.add(className);

    setTimeout(() => {
        target.classList.remove(className);
    }, 1000);
};

export const FormContainer = ({ title, children, ready = true, submitVal, onSubmit }) => {
    const submitHandler = e => {
        submitAnim(e);
        onSubmit(e);
    };

    return (
        <Wrapper className="Wrapper form">
            <FormTitle className="FormTitle">{title}</FormTitle>
            <Form onSubmit={onSubmit} className="Form">
                {children}

                <UnderlayContainer className="UnderlayContainer" onClick={submitHandler}>
                    <Submit
                        className="Submit"
                        disabled={!ready}
                        type="submit"
                        value={submitVal}
                    ></Submit>

                    <DisappearOnHover
                        className="underlay disappear"
                        boxShadow="-8px -8px 4px -8px #eee"
                    />

                    <AppearOnHover
                        className="underlay appear"
                        boxShadow="-8px -8px 4px -8px #ccc"
                    />

                    <Underlay
                        className="underlay appearOnClick"
                        boxShadow="inset 7px 8px 8px -8px #ddd"
                    />
                </UnderlayContainer>
            </Form>
        </Wrapper>
    );
};
