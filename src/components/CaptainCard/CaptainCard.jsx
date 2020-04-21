import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
`;

const Captain = styled.div`
    font-size: 2em;
    border-top: 1px solid white;
    color: white;
`;
const Title = styled.div`
    font-size: 1.3em;
    color: white;
`;

const CaptainCard = ({ children, cap }) => (
    <Wrapper>
        <Title>{children}</Title>
        <hr></hr>
        <Captain>{cap && cap}</Captain>
    </Wrapper>
);

export default CaptainCard;
