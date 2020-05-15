import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    /* max-width: 600px; */
    height: fit-content;
    /* margin: 0 auto 50px;
    margin-left:20px;   */
    margin: 0 auto;

    ${p =>
        p.customStyle &&
        css`
            ${p.customStyle}
        `};
`;

export const ContentWrapper = styled.div`
    background-color: #23334d;
    width: 100%;
    padding: 10px;
    display: flex;
    height: 100vh;
    color: white;
    ${p =>
        p.flexDirection &&
        css`
            flex-direction: ${p.flexDirection};
        `}

    flex-wrap: wrap;
    /* box-shadow: 0 0 10px #eee; */
`;
