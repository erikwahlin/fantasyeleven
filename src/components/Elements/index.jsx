import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    margin: 0 auto;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const WrapperCol = styled(Wrapper)`
    display: flex;
    flex-direction: column;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const WrapperRow = styled(Wrapper)`
    display: flex;
    flex-direction: row;
    justify-content: center;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const CustomConfirm = ({
    condition,
    title,
    okText,
    cancelText,
    onConfirm,
    onCancel,
    children
}) => {
    return condition ? (
        <Popconfirm
            title={title || ''}
            okText={okText}
            cancelText={cancelText}
            onConfirm={onConfirm || null}
            onCancel={onCancel || null}
        >
            {children}
        </Popconfirm>
    ) : (
        <>{children}</>
    );
};

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

export const Loading = styled(LoadingOutlined)`
    font-size: 40px;
    position: fixed;
    right: 50vw;
    top: 50vh;

    ${p =>
        p.position === 'relative' &&
        css`
            position: relative;
            left: 0;
            right: unset;
            top: 0;
            bottom: unset;
            text-align: center;
        `}

    ${p =>
        p.customStyle &&
        css`
            ${p.customStyle}
        `}
`;
