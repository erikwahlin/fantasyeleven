import React from 'react';
import styled, { css } from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';

export const Wrapper = styled.div`
    width: 100%;
    height: 85px;
    max-width: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    @media all and (max-width: 480px) {
        height: 16vw;
        & > * {
            justify-content: space-evenly;
        }
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Key = styled.h2`
    margin: 0;
    margin-bottom: 0.2rem;

    @media all and (max-width: 899px) {
        /* prev 480 */
        font-size: 14px;
    }

    @media all and (max-width: 480px) {
        font-size: 3vw;
    }
`;

export const Val = styled.p`
    color: ${p => (p.notReady ? 'red' : p.ready ? '#35892A' : 'white')};
    font-size: 24px;

    @media all and (max-width: 899px) {
        /* prev 480 */
        margin-bottom: 0;
    }

    @media all and (max-width: 480px) {
        font-size: 18px;
    }

    @media all and (max-width: 350px) {
        font-size: 5vw;
    }
`;

export const Button = styled.button`
    width: 100px;
    height: 35px;
    background: #fff;
    color: #001c3e;
    border: #fff solid 2px;
    border-radius: 1px;
    outline: none;
    cursor: pointer;
    font-family: 'Avenir';
    font-size: 1em;
    font-weight: 500;
    padding: 5px;
    align-self: center;

    @media all and (max-width: 899px) {
        /* prev 480 */
        width: auto;
        height: auto;
        padding: 7px;
        font-size: 18px;
    }

    @media all and (max-width: 480px) {
        font-size: 3.3vw;
        padding: 0;
        width: 100%;
        height: 60%;
    }
`;

export const AddPlayerIcon = styled(FaUserPlus)`
    width: 65px;
    height: 100%;
    color: white;
    align-self: center;

    cursor: pointer;

    @media all and (max-width: 899px) {
        /* prev 480 */
        width: 47px;
    }

    @media all and (max-width: 350px) {
        width: 14vw;
    }
`;

const CaptainWrapper = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    text-align: left;
`;

const CaptainTitle = styled.div`
    font-size: 1.2em;
    color: white;
    font-weight: 600;

    @media all and (max-width: 480px) {
        font-size: 3.5vw;
    }
`;

const CapImg = styled.img`
    margin-right: -6px;
    top: -2px;
    position: relative;
    z-index: -1;
    width: 1.6em;

    ${p =>
        p.vice &&
        css`
            margin-right: -7px;
            top: -3px;
        `};

    @media all and (max-width: 480px) {
        width: 5.6vw;
        margin-right: -1.3vw;
        top: -0.4vw;

        ${p =>
            p.vice &&
            css`
                margin-right: -1.4vw;
                top: -0.6vw;
            `};
    }
`;

const CaptainName = styled.div`
    font-size: 1.4em;
    color: white;
    font-weight: 500;
    /* margin-left: 2rem;
    margin-bottom: 1rem; */

    @media all and (max-width: 480px) {
        font-size: 4vw;
    }
`;

export const CaptainCard = ({ role, name, img }) => {
    const title = role === 'captain' ? 'apten' : 'ice kapten';

    return (
        <CaptainWrapper className="CaptainWrapper">
            <CaptainTitle className="CaptainTitle">
                <CapImg src={img} alt="Captain" className="CapImg" vice={role === 'viceCaptain'} />
                {title}
            </CaptainTitle>
            <hr></hr>
            <CaptainName className="CaptainName">{name && name}</CaptainName>
        </CaptainWrapper>
    );
};
