import React, { useState, useEffect } from 'react';
import './index.css';
import Navigation from '../Navigation';
import Logo from './fantasy11-white-logo.png';
import About from '../About';
import styled from 'styled-components';
import SignIn from '../SignIn/';
import { Link } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';
import apis from '../../constants/api';
import { Loading } from '../Elements';

const Wrapper = styled.div``;

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    font-size: 50px;
    width: 100%;
`;

const Ptag = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: auto;
    width: 100vw;
    font-family: 'Avenir';
    font-size: 30px;
    text-align: center;
    padding: 20px;
    padding-bottom: 0px;

    @media all and (max-width: 776px) {
        font-size: 5vw;
    }
`;

const Ptag2 = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: auto;
    width: 100vw;
    font-family: 'Avenir';
    font-size: 35px;
    text-align: center;
    padding: 20px;
    padding-top: 0px;
    font-style: italic;
`;

const PtagSmall = styled.div`
    width: 100%;
    height: fit-content;
    margin: 10px 0 0;
    padding: 0;
    font-size: 20px;
    font-style: italic;
    text-align: center;
`;

//breakpoing at 776px. do something else.
const LogoDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
    height: auto;
    width: 100vw;
    background-color: rgba(36, 132, 10, 0.3);
    /*     @media all and (max-width: 776px) {
        width: 100vw;
        justify-content: center;
    } */
`;

const StyledLink = styled(Link)`
    position: relative;
    top: 40px;
`;

const PlayBtn = styled.button`
    background-color: rgba(36, 132, 10, 0.3);
    color: white;
    font-size: 20px;
    height: 7vh;
    width: 15vw;
    min-width: 200px;
    padding: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    outline: none;
    cursor: pointer;
    /* margin-top: 35px; */

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    /*     @media all and (max-width: 1200px) {
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
    } */
`;

const isMobile = window.innerWidth < 776 ? true : false;

const Landing = () => {
    const [activeRound, setActiveRound] = useState(null);
    const [roundValue, setRoundValue] = useState(null);

    const readActiveRound = async () => {
        await apis
            .read({ action: 'readActiveRound' })
            .then(res => {
                if (res.status <= 200) {
                    const round = res.data.data;
                    setActiveRound(round);

                    let val = 0;
                    round.users.forEach(u => {
                        if (u.teamValue) {
                            val += u.teamValue;
                        }
                    });
                    setRoundValue(val);
                } else {
                    console.log('Active round not found.');
                    setRoundValue('Just nu är ingen omgång aktiv');
                }
            })
            .catch(err => {
                console.log(`Failed to get active round (${err})`);
                setRoundValue('Just nu är ingen omgång aktiv');
            });
    };

    useEffect(() => {
        readActiveRound();
    }, []);

    return (
        <>
            <Wrapper className="landing-bg">
                {/* <Navigation /> */}

                <Container className="landing-container">
                    <LogoDiv className="landing-big-logo">
                        <img src={Logo} />
                    </LogoDiv>

                    <Ptag className="landing-info">Omsättning inför helgens omgång</Ptag>
                    <Ptag2 className="landing-price">
                        {activeRound ? `${roundValue} kr` : '0 kr'}
                    </Ptag2>

                    {activeRound ? (
                        <PtagSmall className="landing-players">
                            Antal spelare {activeRound.users.length}
                        </PtagSmall>
                    ) : (
                        <PtagSmall>0 spelare</PtagSmall>
                    )}
                    <StyledLink to="/signin">
                        <PlayBtn>
                            <IoMdFootball />
                            &nbsp;Börja spela nu!
                        </PlayBtn>
                    </StyledLink>
                </Container>
            </Wrapper>

            {!isMobile && <About />}
        </>
    );
};

export default Landing;
