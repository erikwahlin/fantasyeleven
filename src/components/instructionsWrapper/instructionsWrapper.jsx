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
const InstructionsWrapper = ({ buildStagePage, posOrClub, list, maxPrice }) => {
    //posOrClub = toSwe(posOrClub, 'positions', 'plural')
    return (

        <StyledDiv>
            <StyledP>
                {buildStagePage === 0 && list.length < 11 ?
                    (
                        `Du kan inte ha fler ${posOrClub !== 'Alla spelare' ? posOrClub : 'spelare'}  på planen`
                    ) : (
                        buildStagePage === 1 && list.length < 15 ? (
                            'Du kan bara ha 1 spelare från varje position till ett värde av max 30 kr.'
                        )
                            :
                            (
                                `Klicka på vidare för att ta dig till nästa steg.${buildStagePage === 1 ? ' Kolla så att du inte gått över budgeten.' : ''}`
                            )

                    )
                }
            </StyledP>
        </StyledDiv>
    );
}
export default InstructionsWrapper