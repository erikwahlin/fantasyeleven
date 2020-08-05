import styled, { css } from 'styled-components';

export const OuterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    min-width: 420px;
    margin: 0;

    @media all and (max-width: 899px) {
        position: fixed;
        z-index: 3;
        opacity: 1;
        left: 110vw;
        top: 0;
        height: 100%;
        width: 100%;
        background: #011931;
    }

    @media all and (min-width: 900px) {
        margin: 0 auto 0 0;
        max-width: 550px;
        height: 825px;
    }
`;

export const InnerWrapper = styled.div`
    overflow-y: scroll;
    display: flex;
    width: 55%;
    height: 100%;
    max-width: 500px;
    flex-direction: column;
    position: relative;
    margin: 0 auto;

    ${p =>
        p.mobileSearch &&
        css`
            display: block;
            position: fixed;
            z-index: 3;
            opacity: ${p.searchOpen ? '1' : '0'};
            right: ${p.searchOpen ? '0' : '-110vw'};
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(1, 25, 49, 0.5);
        `}

    transition: all .5s;

    @media all and (min-width: 900px) {
        & > * {
            width: 100%;
        }
    }
`;

export const CancelBtn = styled.button`
    position: fixed;
    font-size: 1.5em;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 12px 12px 0;
    border: none;
    outline: none;
    z-index: 3;
    border-radius: 0 0 10px 10px;
    right: 223px;

    @media all and (max-width: 500px) {
        right: 50vw;
        transform: translateX(27px);
    }

    & > svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`;

export const SearchFieldWrapper = styled.div`
    position: relative;
    & > svg {
        position: absolute;
        right: 20px;
        top: 16px;
        font-size: 1.5em;
        color: #005c07;
    }
`;

export const ArrowWrapper = styled.div`
    position: relative;
    & > [class='arrow-icon'] {
        position: absolute;
        right: 20px;
        top: 20px !important;
        font-size: 1.5em;
        cursor: pointer;
    }
`;

export const Title = styled.h2`
    font-size: 2em;
    line-height: 30px; /* in line with titles above pitch */
    margin: 0;
    padding-bottom: 12px;
    font-weight: 600;

    @media all and (max-width: 899px) {
        padding: 12px 0;
        background: black;
    }
`;

export const Input = styled.input`
    width: 100%;
    margin-bottom: 20px;
    /* position: relative; */
    font-family: 'Avenir';
    font-size: 1.3em;
    font-weight: 500;
    color: black !important;
    padding: 10px 52px 10px 12px;
    border: none;
    box-sizing: border-box;
    outline: none;
    background: #e2dddd;
    cursor: text;
    ::placeholder {
        color: black;
    }
    ::focus {
        border: 2px solid white;
    }
`;

export const StyledBtn = styled.button`
    font-family: 'Avenir';
    height: 40px;
    border: none;
    outline: none;
    color: black;
    background: #e2dddd;
    cursor: pointer;
    padding: 3px;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    font-family: 'Avenir';
    font-size: 1.1em;
    border: none;
    padding: 0;
    display: flex;
    margin-bottom: 8px;
`;

export const AltButtonCol = styled(ButtonContainer)`
    display: flex;
    flex-direction: column;

    & > [class*='label'] {
        flex: 1;
        color: white;
        background: #005c07;

        margin: 0;
        padding: 0 12px;
        font-family: Avenir;
        font-weight: 700;
        font-size: 1em;
        min-height: 30px;
        line-height: 30px;
    }
`;

export const AltButtonRow = styled(ButtonContainer)`
    & > button {
        margin: 0;
        padding: 0;

        /* &:nth-child(1) {
            margin-right: 2px;
        }
        &:nth-child(2) {
            margin-left: 2px;
        } */
        min-width: 40%;
        flex: 1;
    }
`;

export const AltButton = styled(StyledBtn)`
    background: ${p => (p.mobileSearch ? 'lightgrey' : 'rgba(226, 221, 221, 0.5)')};
    font-family: Avenir;

    ${p =>
        p.active &&
        ` 
    background: #e2dddd;
        box-shadow: none;
        font-weight: bold;
    `};
`;

export const ButtonReset = styled(StyledBtn)`
    margin-bottom: 12px;
    width: 100%;
    min-height: 40px;
`;

export const ResultContainer = styled.div`
    overflow-y: hidden;
`;

export const ResultBox = styled.div`
    background: #e2dddd;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    /* max-height: 478px; */ /* temp */
    overflow-y: scroll;
`;

export const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const LabelRow = styled.div`
    width: 100%;
    /* height: 30px !important; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #005c07;
    color: black;
    font-weight: 700;
    font-size: 1em;
    min-height: 30px !important;
`;

export const PlayerRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: #e2dddd;

    color: black;
    border: 5px solid #ddd;
    border: none;
    border-bottom: 4px solid #021f3d;
    font-size: 1em !important;
    min-height: 60px !important;
`;

export const PlayerInfoBtn = styled.button`
    background: #021f3d;
    border: none;
    outline: none;
    font-size: 1.7em;
    cursor: pointer;
    color: white;
`;

export const Player = styled.div`
    flex: 3;
    padding: 2px;
    cursor: pointer;

    & > p {
        font-size: 11px;
        margin: 0;
    }

    & > p.player {
        font-weight: 700;
    }
`;

export const PlayerPrice = styled.div`
    flex: 1;
    /* padding: 5px; */
    align-items: flex-end;
`;

export const CapWrap = styled.div`
    margin-top: 7rem;
`;

export const MultiPick = styled(StyledBtn)`
    width: 100%;
    backgroundcolor: white;
    margin: 10px 0;
    color: black;

    display: flex;
    flex-direaction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #e2dddd;

    & > [class='label'] {
        flex: 1;
        text-align: left;
        font-family: 'Avenir';
        font-size: 1.1em;
        /* font-weight: ${p => (p.multiPick ? 'bold' : 'normal')}; */
        ${p => p.multiPick && `color: #005c07`};
        margin: 0;
    }

    & > [aria-checked='true'] {
        background-color: #005c07;
    }
`;

export const ColorTag = styled.div`
    width: 30px;
    height: 30px;
    border-radius: ${p => p.radius || '50%'};
    color: ${p => p.color || 'black'};

    ${p => p.style && `${p.style}`};
`;
