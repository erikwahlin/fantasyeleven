import React from 'react';
import Navigation from '../Navigation';
import pitchImg from '../../media/pitch.png';
import styled, { css } from 'styled-components';

const PitchWrap = styled.div`
    position: relative;
    min-width: 576px;
    height: 522px;

    margin-bottom: 30px;

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
    position:fixed;
    bottom:0px;

}

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
        `};
`;

const InfoText = styled.div``;

const About = ({ location }) => (
    <div
        className="AboutPage"
        style={{
            display: 'flex',
            backgroundColor: '#E2DDDD',
            height: '100vh',
            justifyContent: 'center'
        }}
    >
        {/* <Navigation pathname={location.pathname} /> */}
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
            {/* <div className="wrap" style={{ height: '80%' }}> */}
            <InfoText style={{ height: '20%' }}>
                <h1 style={{ fontSize: '2.1em', color: '#00840A' }}>Hur fungerar det?</h1>
                <p
                    style={{
                        width: '380px',
                        fontSize: '1.1em',
                        lineHeight: '1.5em',
                        color: 'black'
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
            {/* </div> */}
        </div>
    </div>
);

export default About;
