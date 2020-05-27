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
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const OptionsWrapper = styled(Wrapper)`
    flex-direction: row;
    width: 100%;
    margin: 20px 0;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};

    & * {
        color: #000 !important;
    }
`;

export const ContentWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px;
    display: flex;
    height: 100vh;
    color: black;
    ${p =>
        p.flexDirection &&
        css`
            flex-direction: ${p.flexDirection};
        `}

    flex-wrap: wrap;
    /* box-shadow: 0 0 10px #eee; */
`;
