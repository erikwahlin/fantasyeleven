import React from 'react';
import styled from 'styled-components';
import { countPlayers } from '../../constants/helperFuncs';
const StyledDiv = styled.div`
    box-sizing: border-box;
    background-color: #23324d;
    position: relative;
    font-size: 1.3em;
    width: inherit;
    width: 90%;
`;
const StyledP = styled.p`
    letter-spacing: 1.2px;
    padding: 10px;
`;
const Instructions = ({ benchPlayers, pitchPlayers, buildStagePage, posOrClub, list }) => {
    //posOrClub = toSwe(posOrClub, 'positions', 'plural')

    const expr = () =>
        posOrClub.label === 'Alla spelare'
            ? 'spelare'
            : posOrClub.value === 'position'
            ? posOrClub.label.toLowerCase()
            : `${posOrClub.label}-spelare`;

    return (
        <StyledDiv className="unmarkable">
            <StyledP>
                {buildStagePage === 'pitch' && countPlayers(pitchPlayers) < 11
                    ? `Du kan inte ha fler ${expr()} på planen`
                    : buildStagePage === 'bench' && countPlayers(benchPlayers) < 4
                    ? `Du kan inte ha fler ${expr()} på din bänk`
                    : `Klicka på vidare för att ta dig till nästa steg.${
                          buildStagePage === 'bench'
                              ? ' Kolla så att du inte gått över budgeten.'
                              : ''
                      }`}
            </StyledP>
        </StyledDiv>
    );
};
export default Instructions;
