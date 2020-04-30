import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
`;

const Captain = styled.div`
    font-size: 1.4em;
    color: white;
    font-weight:500;
    margin-left:2rem;
    margin-bottom:1rem;
`;
const Title = styled.div`
    font-size: 1.6em;
    color: white;
    font-weight:600;
`;

const CaptainCard = ({ children, cap }) => (
    <Wrapper>
        <Title>{children}</Title>
        <hr></hr>
        <Captain>{cap && cap}</Captain>
    </Wrapper>
);

export default CaptainCard;
