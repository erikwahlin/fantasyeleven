import React from 'react';
import { Button, Tooltip } from 'antd';
import styled, { css } from 'styled-components';

export const ButtonStandard = styled(Button)`
    outline: none;
    border: none;
    width: fit-content;
    min-width: 75px;
    margin: 0 10px;
    transition: 200ms;
    color: #000;

    background: ${p => (p.disabled ? 'whitesmoke' : 'white')};
    color: ${p => (p.disabled ? 'grey' : 'black')};

    ${p =>
        p.htmlType === 'submit' &&
        css`
            align-self: center;
            margin: 20px 0;
        `}

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;

export const FloatBtn = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    box-shadow: 0 0 10px black;
    font-size: 14px;
    background: white;
    font-weight: 700;
    border-radius: 50%;
    outline: none;
    width: 65px;
    height: 65px;
    z-index: 1;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;

export const SaveBtn = styled(FloatBtn)`
    color: ${p => (p.saved ? 'green' : 'black')};

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;

const TooltipStyled = styled(Tooltip)`
    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const CustomTooltip = ({
    condition = true,
    title,
    placement = 'top',
    customstyle,
    children
}) => (
    <>
        {condition ? (
            <TooltipStyled
                placement={placement}
                customstyle={customstyle}
                title={typeof title === 'string' ? <span>{title}</span> : null}
            >
                {children}
            </TooltipStyled>
        ) : (
            <>{children}</>
        )}
    </>
);
