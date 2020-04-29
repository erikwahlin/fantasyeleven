import React from 'react';
import styled from 'styled-components';
const Positiondiv = styled.div`
    position: absolute;
    width: 100px;
    background-color: rgba(51, 170, 51, 0.6);

    top: 20px;
    left: 30px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;
`;

const Position = ({ pos }) => {
    return <Positiondiv>{pos}</Positiondiv>;
};

export default Position;
