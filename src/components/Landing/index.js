import React from 'react';
import './index.css';
import Navigation from '../Navigation';
import Logo from './fantasy11-white-logo.png';
import About from '../About';
import styled from 'styled-components';
import SignIn from '../SignIn/';
import { Link } from 'react-router-dom';
const Wrapper = styled.div``;
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: whitesmoke;
    font-size: 50px;
    width: 100%;
`;

const Ptag = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: auto;
    width: 550px;
    font-family: 'Avenir';
    font-size: 30px;
    margin-left: 300px;
    text-align: center;
    padding: 20px;
    @media all and (max-width: 776px) {
        width: 100vw;
        margin-left: 0px;
    }
    @media all and (max-width: 776px) {
        font-size: 20px;
    }
`;

const Ptag2 = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: auto;
    width: 200px;
    font-family: 'Avenir';
    font-size: 35px;
    margin-left: 700px;
    text-align: center;
    padding: 20px;
    @media all and (max-width: 776px) {
        width: 100vw;
        margin-left: 0px;
    }
`;
//breakpoing at 776px. do something else.
const LogoDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 30px;
    height: auto;
    width: 480px;
    background-color: rgba(0, 0, 0, 0.5);
    @media all and (max-width: 776px) {
        width: 100vw;
        justify-content: center;
    }
`;

const PlayBtn = styled.button`
    background-color: rgba(36, 132, 10, 0.6);
    position: absolute;
    right: 10%;
    color: white;
    font-size: 25px;
    height: 10%;
    width: 20vw;
    border:none;
    outline:none;

    &:hover {
        background-color: rgba(91, 170, 69, 0.3);
    }
    @media all and (max-width: 1200px) {
        right: 33vw;
        bottom: 10%;
        width: 33vw;
    }
    @media all and (max-width: 931px) {
        font-size: 30px;
    }
    @media all and (max-width: 776px) {
        width: 100vw;
        font-size: 35px;
        right: 0;
        bottom: 0;
    }
`;

const isMobile = window.innerWidth < 776 ? true : false;

const Landing = () => (
    <>
        <Wrapper className="landing-bg">
            {/* <Navigation /> */}

            <Container className="landing-container">
                <LogoDiv className="landing-big-logo">
                    <img src={Logo} />
                </LogoDiv>

                <Ptag className="landing-info">Omsättning inför helgens omgång</Ptag>
                <Ptag2 className="landing-price">245 000kr</Ptag2>
                <Link to="/signIn">
                    <PlayBtn>Börja spela nu!</PlayBtn>
                </Link>
            </Container>
        </Wrapper>

        {!isMobile && <About />}
    </>
);

export default Landing;
