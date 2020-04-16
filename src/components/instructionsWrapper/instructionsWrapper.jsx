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
letter-spacing: 1.2px;  
padding: 10px;
`
const InstructionsWrapper = ({ buildStagePage, posOrClub, list, maxPrice }) => {
    //posOrClub = toSwe(posOrClub, 'positions', 'plural')
    const expr = (numerus) => posOrClub !== 'Alla spelare' ? toSwe(posOrClub, 'positions', numerus).toLowerCase() : 'spelare';

    return (

        <StyledDiv>
            <StyledP>
                {buildStagePage === 0 && list.length < 11 ?
                    (
                        `Du kan inte ha fler ${expr('plural')}  på planen`
                    ) : (
                        buildStagePage === 1 && list.length < 15 ?
                            (
                                `Du kan bara ha en ${expr('singular')} på din bänk`
                            ) : (
                                `Klicka på vidare för att ta dig till nästa steg.${buildStagePage === 1 ? ' Kolla så att du inte gått över budgeten.' : ''}`
                            )

                    )
                }
            </StyledP>
        </StyledDiv>
    );
}
export default InstructionsWrapper