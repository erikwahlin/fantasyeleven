import React from 'react';

import styled from 'styled-components';
const StyledDiv = styled.div`
    box-sizing: border-box;
    background-color: #23324d;
    position: relative;
    font-size: 1.3em;
    width: inherit;
    width: 90%;
    
`
const StyledP = styled.p`
padding: 10px;
`
const InstructionsWrapper = ({ children }) => (
    <StyledDiv>
        <StyledP>{children}</StyledP>
    </StyledDiv>
);

export default InstructionsWrapper