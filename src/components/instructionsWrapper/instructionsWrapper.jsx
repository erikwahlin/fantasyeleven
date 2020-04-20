import React from 'react';
import styled from 'styled-components';
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
const InstructionsWrapper = ({ buildStagePage, posOrClub, list, maxPrice }) => {
    //posOrClub = toSwe(posOrClub, 'positions', 'plural')
    const expr = numerus =>
        posOrClub.label === 'Alla spelare'
            ? 'spelare'
            : posOrClub.value === 'position'
            ? posOrClub.label.toLowerCase()
            : `${posOrClub.label}-spelare`;

    return (
        <StyledDiv className="unmarkable">
            <StyledP>
                {buildStagePage === 0 && list.length < 11
                    ? `Du kan inte ha fler ${expr('plural')} på planen`
                    : buildStagePage === 1 && list.length < 15
                    ? `Du kan inte ha fler ${expr('singular')} på din bänk`
                    : `Klicka på vidare för att ta dig till nästa steg.${
                          buildStagePage === 1 ? ' Kolla så att du inte gått över budgeten.' : ''
                      }`}
            </StyledP>
        </StyledDiv>
    );
};
export default InstructionsWrapper;
