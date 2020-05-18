import styled, { css } from 'styled-components';

export const OuterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    min-width: 420px;
    margin: 0;

    @media all and (max-width: 899px) {
        position: fixed;
        z-index: 1;
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
            z-index: 1;
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
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    font-size: 1.5em;
    padding: 0;
    background: none;
    color: white;
    margin: 5px;
    border: none;
    outline: none;

    & > svg {
        width: 100%;
        height: 100%;
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
    & > img {
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
    margin-bottom: 12px;
    font-weight: 600;
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

export const ButtonContainer = styled.div`
    width: 100%;
    height: 40px;
    font-family: 'Avenir';
    font-size: 1.1em;
    border: none;
    padding: 0;
    display: flex;
    margin-bottom: 6px;

    & > button {
        margin: 0;
        padding: 0;

        &:nth-child(1) {
            margin-right: 2px;
        }
        &:nth-child(2) {
            margin-left: 2px;
        }
        min-width: 40%;
        flex: 1;
    }
`;
export const StyledBtn = styled.button`
    height: 40px;
    font-family: 'Avenir';
    font-size: 1em;
    border: none;
    outline: none;
    color: black;
    background: #e2dddd;
    cursor: pointer;
    padding: 3px;
    &:hover {
        background: rgba(226, 221, 221, 0.5);
    }
`;
export const ButtonDes = styled(StyledBtn)``;
export const ButtonAsc = styled(StyledBtn)``;
export const ButtonReset = styled(StyledBtn)`
    margin-bottom: 12px;
    width: 100%;
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
