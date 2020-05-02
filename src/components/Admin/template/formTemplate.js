import React from 'react';
import styled, { css } from 'styled-components';
import { Wrapper } from './wrapperTemplate';
import { InputNumber } from 'antd';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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

export const InputTemplate = ({ state, stateKey, label = stateKey, type, autosave, ...props }) => {
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
                    <UnderlayContainer
                        className="UnderlayContainer numberticks"
                        margin="0"
                        onClick={e => ticksHandler(e, 'inc')}
                    >
                        <IoIosArrowUp />

                        <AppearOnHover
                            className="underlay appear"
                            boxShadow="0px -1px 8px -4px #ccc"
                        />
                    </UnderlayContainer>

                    <UnderlayContainer
                        className="UnderlayContainer numberticks"
                        margin="0"
                        onClick={e => ticksHandler(e, 'dec')}
                    >
                        <IoIosArrowDown />

                        <AppearOnHover
                            className="underlay appear"
                            boxShadow="0px 2px 8px -3px #ccc"
                        />
                    </UnderlayContainer>
                </NumberTicks>
            )}

            <Label className={`form-input-label`}>{label}</Label>
        </Field>
    );
};

// add and remove anim-class for submit-btn

export const FormContainer = ({ title, children, ready = true, submitVal, onSubmit }) => {
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
