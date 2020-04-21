import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 90%;
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CaptainCard = ({ children, captain }) => (
    <Wrapper>
        <div>{children}</div>
        <hr></hr>
        <div>{'aubameyang'}</div>
    </Wrapper>
);

export default CaptainCard;
