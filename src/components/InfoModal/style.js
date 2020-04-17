import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const modalStyle = {
    overlay: {
        zIndex: '1'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '50vw',
        minHeight: '50vh',
        background: '#011931',
        color: '#eee',
        borderRadius: '10px'
    }
};

export default modalStyle;

export const ModalWrapper = styled.div`
    /* temp style */
    flex: 0.8;
    text-align: center;
    min-width: 35px;
`;

export const OpenBtn = styled.button`
    background: none;
    border: none;
    outline: none;
    width: ${props => (props.isPitch ? '50%' : '100%')};
    height: ${props => (props.isPitch ? '50%' : '100%')};
    cursor: pointer;

    margin: 0;
    padding: 0;

    & > svg {
        width: ${props => (props.isPitch ? '10px' : '20px')};
        height: 100%;
    }
`;

export const ContentWrapper = styled.div`
    margin: auto;
    min-width: 50vw;
    min-height: 50vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    color: #eee;
`;

export const Title = styled.h1`
    font-size: 2em;
`;

export const Img = styled.img`
    width: 200px;
    height: 200px;
    margin: 20px auto;
    border-radius: 50%;
`;

export const ImgFallback = styled(FaUserCircle)`
    width: 100px;
    height: 100px;
    margin: 20px auto;
    color: #eee;
`;

export const Subtitle = styled.h2`
    font-size: 1.2em;
    font-weight: 700;
`;

export const Content = styled.div``;

export const Submit = styled.button`
    width: 170px;
    height: 50px;
    margin: auto;
    background: none;
    font-size: 0.8em;

    color: #eee;
    border: 1px solid #eee;
    border-radius: 1px;
    outline: none;
    cursor: pointer;
`;
