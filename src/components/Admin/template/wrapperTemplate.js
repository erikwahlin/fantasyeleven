import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: 0 auto 50px;
    border-radius: 10px;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px #eee;
    border-radius: 10px 10px 0 0;
`;
