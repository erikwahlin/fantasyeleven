import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: fit-content;
    margin: ${p => p.margin || '0 auto 50px'};
`;

export const ContentWrapper = styled.div`
    background: #23334d;
    width: 100%;
    padding: 10px;
    display: flex;
    ${p =>
        p.flexDirection &&
        css`
            flex-direction: ${p.flexDirection};
        `}

    flex-wrap: wrap;
    /* box-shadow: 0 0 10px #eee; */
`;
