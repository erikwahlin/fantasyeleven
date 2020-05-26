import React from 'react';
import Navigation from '../Navigation';
import pitchImg from '../../media/pitch.png';
import styled, { css } from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';

const Wrapper = styled.div`
    display:flex;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    justify-content: center;
    overflow: hidden;
`;



const PitchWrap = styled.div`
    position: relative;
    min-width: 576px;
    height: 20%;

    @media all and (max-width: 480px) {
        width: 100vw;
        height: 90vw;
    }

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
            filter: /* grayscale(1) */ brightness(70%);
        `}
`;

const PitchImg = styled.img`
    width: 100%;
    max-width: 576px;

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
        `};
`;

const InfoText = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
`;

const About = ({ location }) => (
    <ScrollAnimation animateIn="fadeIn">
    <Wrapper>
    
        <div
            className="How"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: '44%',
                width: '70%'
            }}
        >
            <PitchWrap>
                <PitchImg src={pitchImg} className="PitchImg" />
            </PitchWrap>

            <InfoText style={{ height: '20%' }}>
                <h1 style={{ fontSize: '2.1em', color: 'white' }}>Hur fungerar det?</h1>
                <p
                    style={{
                        width: '380px',
                        fontSize: '1.1em',
                        lineHeight: '1.5em',
                        color: 'white'
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </InfoText>
        </div>
        
    </Wrapper>
    </ScrollAnimation>
);

export default About;
