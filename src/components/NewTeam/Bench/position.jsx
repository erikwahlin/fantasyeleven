import React from 'react';
import styled from 'styled-components';
const Positiondiv = styled.div`
    position: relative;

    background-color: rgba(51, 170, 51, 0.6);

    width: 92px;
    margin: 0 auto;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;

    @media all and (max-width: 480px) {
        width: 19vw;
        font-size: 3vw;
        top: -1vw;
        z-index: 1;
    }
`;

const Position = ({ pos = '' }) => {
    return <Positiondiv className="Position">{pos}</Positiondiv>;
};

export default Position;
