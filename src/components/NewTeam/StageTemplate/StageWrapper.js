import styled from 'styled-components';

const StageWrapper = styled.div`
    /* grid-row: 2;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    position: relative; */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: auto;
    margin-top: 0;

    @media screen and (min-width: 900px) {
        grid-column: 2;
    }

    @media all and (max-width: 899px) {
        /* pre 480 */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        @media all and (max-height: 700px) {
            justify-content: flex-start;
        }
    }
`;

export default StageWrapper;
