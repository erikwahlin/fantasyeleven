import React from 'react';
import Navigation from '../Navigation';
import pitchImg from '../../media/pitch.png';
import styled, { css } from 'styled-components';

const PitchWrap = styled.div`
    position: relative;
    width: 576px;
    min-width: 400px;
    height: 20%;
    @media all and (max-width: 913px) {
        display: none;
    }
    /*     @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    } */
`;

const PitchImg = styled.img`
    width: 100%;
    max-width: 576px;
    min-width: 400px;
`;

const InfoText = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
`;

const How = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 44%;
    width: 70%;

    @media all and (max-width: 913px) {
        justify-content: center;
        align-items: center;
        height: 70%;
    }
`;

const Ptag = styled.p`
    width: 380px;
    font-size: 1.1em;
    line-height: 1.5em;
    color: white;

    @media all and (max-width: 913px) {
        font-size: 1.5em;
        line-height: 1.7em;
    }
`;
const AboutPage = styled.div`
    overflow: hidden;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    justify-content: center;
`;
const About = ({ location }) => (
    <AboutPage className="AboutPage">
        {/* <Navigation pathname={location.pathname} /> */}
        <How className="How">
            <PitchWrap>
                <PitchImg src={pitchImg} className="PitchImg" />
            </PitchWrap>

            <InfoText style={{ height: '20%' }}>
                <h1 style={{ fontSize: '2.1em', color: 'white' }}>Hur fungerar det?</h1>
                <Ptag>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Ptag>
            </InfoText>
        </How>
    </AboutPage>
);

export default About;
