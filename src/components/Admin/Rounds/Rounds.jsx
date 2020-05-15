import React, { useState } from 'react';
import { withAdmin } from '../AdminState';

import styled, { css } from 'styled-components';

import { Wrapper } from '../template/wrapperTemplate';
import Arrow from '../../../media/arrow.svg';

import { clone } from '../../../constants/helperFuncs';

import NewResult from '../NewResult';

const Header = styled.div`
    width: 100%;
    margin: 10px;
    margin-bottom: ${p => (p.open ? '0' : '10px')};
    padding: 10px;
    background: ${p => (p.open ? '#172232' : '#23334d')};

    display: flex;
    justify-content: space-between;

    cursor: pointer;
`;

const Title = styled.h2`
    & span {
        font-weight: 700;
    }
`;

const ArrowIcon = styled.img`
    transform: rotate(${p => (p.open ? '180deg' : '0deg')});
`;

const OptionContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

const ToggleBtn = styled.button`
    outline: none;
    border: none;
    margin: 0;
    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `}
`;

const RoundContent = styled.div`
    background: #23334d;

    display: ${p => (p.open ? 'flex' : 'none')};

    width: 100%;
    padding: 10px;

    flex-wrap: wrap;
`;

const Round = ({ round, settings, updateSettings, updateRound, active }) => {
    const [open, setOpen] = useState(false);
    const [resultMode, setResultMode] = useState(false);

    const toggleHandler = e => {
        setOpen(!open);

        console.log('toggle handler');
        //clickedClass(e);
    };

    const setActive = newVal => {
        const verb = newVal ? 'aktivera' : 'inaktivera';
        const sure = window.confirm(
            `Är du säker på att du vill ${verb} ${round.alias}? ${
                newVal ? 'Eventuella redan aktiverade omgångar inaktiveras.' : ''
            }`
        );

        if (!sure) return;

        const newSettings = {
            updatedBy: [
                {
                    user: 'Kim dev 3.0'
                },
                ...settings.updatedBy
            ],
            activeRound: newVal ? round : {}
        };

        updateSettings({ payload: newSettings });
    };

    return (
        <div className="Result">
            <Wrapper className="Result" margin="0 auto">
                <Header className="Header" open={open} onClick={toggleHandler}>
                    <Title>
                        {round.alias} {active && '(Aktiv!)'}
                    </Title>
                    <i style={{ float: 'right', fontSize: '.7em', color: '#fff' }}>
                        senast ändrad
                        {round.updatedAt}
                    </i>
                    <ToggleBtn className="ToggleBtn">
                        <ArrowIcon className="arrowIcon" src={Arrow} alt="arrow" open={open} />
                        {/* Klicka för att {open ? 'dölja' : 'visa'} */}
                    </ToggleBtn>
                </Header>

                <RoundContent className="RoundContent" open={open}>
                    <div>
                        <p>Alias {round.alias}</p>
                        <p>
                            Aktiv{' '}
                            <span style={{ color: active ? 'green' : 'black' }}>
                                {active ? 'JA!' : 'NEJ'}
                            </span>
                        </p>
                        <p>Säsong {round.season}</p>
                        <p>Omgångsnummer {round.round}</p>

                        <div className="Matches">
                            <ul style={{ listStyle: 'none' }}>
                                <li>HEMMA - BORTA</li>
                                {round.matches.map(match => (
                                    <li>
                                        {match.home.club} vs {match.away.club}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        className="Options"
                        style={{ width: '100%', height: 'fit-content', display: 'flex' }}
                    >
                        <OptionContainer>
                            <ToggleBtn
                                onClick={() => setActive(!active)}
                                customstyle={`font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000; color: ${
                                    active ? 'red' : '#fff'
                                }`}
                            >
                                {!active ? 'Aktivera' : 'Inaktivera'}
                            </ToggleBtn>
                        </OptionContainer>

                        {active && (
                            <OptionContainer>
                                <ToggleBtn
                                    onClick={() => setResultMode(true)}
                                    customstyle={`font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000; color: orange;`}
                                >
                                    {!resultMode ? 'Skapa resultat' : 'Stäng resultat'}
                                </ToggleBtn>
                            </OptionContainer>
                        )}

                        <OptionContainer>
                            <ToggleBtn
                                onClick={() => setOpen(!open)}
                                customstyle="font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000"
                            >
                                Minimera
                            </ToggleBtn>
                        </OptionContainer>
                    </div>

                    {resultMode && <NewResult round={round} />}
                </RoundContent>
            </Wrapper>
        </div>
    );
};

const Rounds = ({ adminContext }) => {
    const { rounds, settings } = adminContext.state;
    const { _id: activeRoundID } = settings.activeRound;
    const { updateRound, updateSettings } = adminContext.setters;

    return (
        <>
            {rounds.map((round, nth) => (
                <Round
                    key={`${round.alias}-${nth}`}
                    round={round}
                    settings={settings}
                    updateSettings={updateSettings}
                    updateRound={updateRound}
                    active={round._id === activeRoundID}
                />
            ))}
        </>
    );
};

export default withAdmin(Rounds);
