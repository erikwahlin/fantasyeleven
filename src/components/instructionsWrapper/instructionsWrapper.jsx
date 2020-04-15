import React from 'react';
import { toSwe } from '../../constants/helperFuncs'
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
const InstructionsWrapper = ({ buildStagePage, posOrClub, list }) => {
    //posOrClub = toSwe(posOrClub, 'positions', 'plural')
    return (

        <StyledDiv>
            <StyledP>
                {buildStagePage === 0 && list.length < 11 ?
                    (
                        `Du kan inte ha fler ${posOrClub !== 'Alla spelare' ? posOrClub : 'spelare'}  på planen`
                    ) : (
                        'Planen är full, gå till nästa sida för att välja din bänk inför helgens omgång.'
                    )
                }
            </StyledP>
        </StyledDiv>
    );
}
export default InstructionsWrapper