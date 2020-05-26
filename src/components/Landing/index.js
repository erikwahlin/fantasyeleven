import React from 'react';
import './index.css';
import Navigation from '../Navigation';
import Logo from './fantasy11-white-logo.png';
import About from '../About';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Container = styled.div``;

const Ptag = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 7vh;
    width: 400px;
    font-family: 'Avenir';
    font-size: 25px;
    margin-left: 300px;
    text-align: center;
    padding: 4px;
`;

const Ptag2 = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 7vh;
    width: 150px;
    font-family: 'Avenir';
    font-size: 30px;
    margin-left: 620px;
    text-align: center;
    padding: 4px;
`;
//breakpoing at 776px. do something else.
const LogoDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 30px;
    height: auto;
    width: 480px;
    background-color: rgba(0, 0, 0, 0.5);
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
            </Container>
        </Wrapper>
        {!isMobile && <About />}
    </>
);

export default Landing;
