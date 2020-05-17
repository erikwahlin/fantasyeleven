import { Button } from 'antd';
import styled, { css } from 'styled-components';

export const ButtonStandard = styled(Button)`
    outline: none;
    border: none;
    min-width: 75px;
    margin: 0 10px;
    transition: 200ms;

    background: ${p => (p.disabled ? 'whitesmoke' : 'white')};
    color: ${p => (p.disabled ? 'grey' : 'black')};

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;

export const SaveBtn = styled.button`
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
    color: ${p => (p.saved ? 'green' : 'black')};

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;
