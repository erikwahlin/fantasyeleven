import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Button = styled.button`
    width: 120px;
    height: 60px;
    align-self: flex-end;
    color: white;
    background-color: ${props => (props.disabled === false ? '#001c3e' : 'lightgrey')};
    border: 1px solid white;
    &:hover {
        cursor: ${props => (props.disabled === false ? 'pointer' : 'normal')};
        background-color: ${props => (props.disabled === false ? 'white' : '')};
        color: ${props => (props.disabled === false ? 'black' : '')};
    }

    @media all and (max-width: 480px) {
        width: 100vw;
    }
`;
export const StyledH1 = styled.h1`
    text-align: center;
    /* margin-top: 20px; */
    font-size: 3em;
`;
export const OuterWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
export const InnerWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border-radius: 10px; */
    border: 1px solid #001233;
    width: 40%;
    background-color: #001c3e;

    @media all and (max-width: 480px) {
        width: 100vw;
        box-shadow: none;
        justify-content: space-between;
        height: 100vh;
    }
    @media all and (min-width: 481px) and (max-width: 1200px) {
        width: 70vw;
    }
`;
