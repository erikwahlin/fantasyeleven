import React from 'react';
import styled, { css } from 'styled-components';
import { Wrapper } from './wrapperTemplate';
import { InputNumber } from 'antd';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FcCheckmark } from 'react-icons/fc';

import {
    clickedClass,
    UnderlayContainer,
    Underlay,
    AppearOnHover,
    DisappearOnHover
} from './underlay';

export const FormTitle = styled.h1`
    text-align: center;
    font-size: 3em;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #23334d;
`;

export const Field = styled.div`
    position: relative;
    display: flex;
    margin: 0;
    padding: 25px 0 0;
    box-shadow: inset 0px -7px 15px -15px black;
`;

export const Input = styled.input`
    text-indent: 10px;

    background: none !important;

    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    min-width: 150px;
    flex: 1;
    border: none;
    border-radius: 0;

    &:focus {
        outline: none;
    }

    &:focus ~ .form-input-label,
    &:not([value='']) ~ .form-input-label {
        top: 10px;
        font-size: 12px;
        opacity: 0.6;
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

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield;
    }
`;

export const PercentInput = styled(Input)``;

export const PercentNav = styled.div``;

export const Label = styled.label`
    text-indent: 10px;

    top: 40px;
    font-size: 16px;

    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    transition: 300ms ease all;
`;

export const Helper = styled.label`
    top: 40px;
    font-size: 12px;
    font-style: italic;

    font-weight: 100;
    position: absolute;
    pointer-events: none;
    right: 10px;
    transition: 300ms ease all;

    top: 10px;
    font-size: 12px;
    opacity: 0.6;
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
    background: none;
    font-weight: 700;

    cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

    ${p =>
        p.disabled &&
        css`
            opacity: 0.1;
        `}
`;

const NumberTicks = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 50px;
    margin: 0;
    padding: 0 10px;

    & > * {
        cursor: pointer;
        flex: 1;
        width: 100%;
    }
`;

export const InputTemplate = ({
    state,
    stateKey,
    label = stateKey,
    helper,
    type,
    autosave,
    ready,
    ...props
}) => {
    const ticksHandler = (e, dir, interval = 1) => {
        const num = parseInt(state[stateKey]);

        const val = isNaN(num) ? 0 : num;

        let newVal = dir === 'inc' ? val + 1 : val - 1;

        if (props.max && newVal > props.max) {
            newVal = props.max;
        } else if (props.min && newVal < props.min) {
            newVal = props.min;
        }

        autosave(stateKey, newVal);
    };

    const value = state[stateKey];

    return (
        <Field className="InputContainer">
            <Input
                {...props}
                type={type}
                value={value}
                className={`form-input`}
                onChange={e => {
                    autosave(stateKey, e.target.value);
                }}
            />

            {type === 'number' && (
                <NumberTicks className="NumberTicks">
                    <IoIosArrowUp onClick={e => ticksHandler(e, 'inc')} />
                    <IoIosArrowDown onClick={e => ticksHandler(e, 'dec')} />
                </NumberTicks>
            )}

            <Label className={`form-input-label`}>
                {label} {ready ? <FcCheckmark /> : null}
            </Label>

            <Helper className="helper">{helper}</Helper>
        </Field>
    );
};

// add and remove anim-class for submit-btn

export const FormContainer = ({
    title,
    children,
    ready = true,
    submitVal,
    submitDisabled = false,
    onSubmit
}) => {
    const submitHandler = e => {
        clickedClass(e);
        onSubmit(e);
    };

    return (
        <Wrapper className="Wrapper form">
            <FormTitle className="FormTitle">{title}</FormTitle>
            <Form onSubmit={onSubmit} className="Form">
                {children}

                <UnderlayContainer className="UnderlayContainer submit" onClick={submitHandler}>
                    <Submit
                        className="Submit"
                        disabled={!ready}
                        type="submit"
                        value={submitVal}
                        disabled={submitDisabled}
                    ></Submit>

                    <Underlay
                        className="underlay"
                        boxShadow="-6px -6px 7px -8px #000"
                        opacity="1"
                    />

                    <Underlay
                        className="underlay appearOnClick"
                        boxShadow="inset 8px 8px 6px -10px #000"
                    />
                </UnderlayContainer>
            </Form>
        </Wrapper>
    );
};
