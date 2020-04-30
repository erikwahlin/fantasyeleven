import React from 'react';
import styled from 'styled-components';
import { Wrapper } from './wrapperTemplate';
import { InputNumber } from 'antd';

export const FormSubmit = styled.input`
    width: 120px;
    height: 60px;
    align-self: flex-end;
    color: #000;
    outline: none;
    border: none;
    box-shadow: 0 0 7px #eee;
    border-radius: 10px 0 0 0;

    @media all and (max-width: 480px) {
        width: 100vw;
    }
`;
export const FormTitle = styled.h1`
    text-align: center;
    /* margin-top: 20px; */
    font-size: 3em;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px #eee;
    border-radius: 10px 10px 0 0;
`;

export const Input = styled.input`
    text-indent: 10px;
`;

export const Label = styled.label`
    text-indent: 10px;
`;

export const FormGroup = ({ state, stateKey, label = stateKey, type, autosave }) => {
    const handlePercent = val => {
        console.log('val', val);
        autosave(stateKey, val);
    };

    return (
        <div className="group">
            {type === 'percent' ? (
                <InputNumber
                    type="number"
                    className={`form-input`}
                    value={state[stateKey]}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={handlePercent}
                />
            ) : (
                <Input
                    type={type}
                    value={state[stateKey]}
                    className={`form-input`}
                    onChange={e => {
                        autosave(stateKey, e.target.value);
                    }}
                />
            )}

            <Label
                className={`form-input-label ${
                    state[stateKey] !== null && state[stateKey] !== '' ? 'shrink' : ''
                } form-input-label`}
            >
                {label}
            </Label>
        </div>
    );
};

export const FormContainer = ({ title, children, ready = true, submitVal, onSubmit }) => (
    <Wrapper className="Wrapper form">
        <FormTitle className="FormTitle">{title}</FormTitle>
        <Form onSubmit={onSubmit} className="Form">
            {children}

            <FormSubmit
                className="submit"
                disabled={!ready}
                type="submit"
                value={submitVal}
            ></FormSubmit>
        </Form>
    </Wrapper>
);
