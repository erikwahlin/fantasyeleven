import React from 'react';
import styled from 'styled-components';
const Positiondiv = styled.div`
    position: absolute;
    width: 27vw;
    background-color: rgba(51, 170, 51, 0.6);

    top: 20px;
    left: 40px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;

    @media all and (max-width: 480px) {
        width: 19vw;
        font-size: 3vw;
        left: 2.5vw;
        top: 0vw;
        z-index: 1;
    }
`;

const Position = ({ pos }) => {
    return <Positiondiv>{pos}</Positiondiv>;
};

export default Position;
