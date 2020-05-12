import React, { useState } from 'react';
import { withAdmin } from '../AdminState';

import styled, { css } from 'styled-components';

import { Wrapper } from '../template/wrapperTemplate';
import Arrow from '../../../media/arrow.svg';

import { clone } from '../../../constants/helperFuncs';

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

const RoundItem = ({ round, updateRound }) => {
    const [open, setOpen] = useState(false);

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

        const newRound = { ...clone(round), active: newVal };

        updateRound(newRound);
    };

    return (
        <div className="Result">
            <Wrapper className="Result" margin="0 auto">
                <Header className="Header" open={open} onClick={toggleHandler}>
                    <Title>
                        {round.alias} {round.active && '(Aktiv!)'}
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
                        <p>{round.active === true ? 'Aktiv' : 'Inaktiv'}</p>
                        <p>Säsong {round.season}</p>
                        <p>Omgångsnummer {round.round}</p>
                    </div>

                    <OptionContainer>
                        <ToggleBtn
                            onClick={() => setActive(!round.active)}
                            customstyle={`font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000; color: ${
                                round.active ? 'hotpink' : 'green'
                            }`}
                        >
                            {!round.active ? 'Aktivera' : 'Inaktivera'}
                        </ToggleBtn>
                    </OptionContainer>

                    <OptionContainer>
                        <ToggleBtn
                            onClick={() => setOpen(!open)}
                            customstyle="font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000"
                        >
                            Minimera
                        </ToggleBtn>
                    </OptionContainer>
                </RoundContent>
            </Wrapper>
        </div>
    );
};

const RoundList = ({ adminContext }) => {
    const { rounds } = adminContext.state;
    const { updateRound } = adminContext.setters;

    return (
        <>
            {rounds.map((round, nth) => (
                <RoundItem key={`${round.alias}-${nth}`} round={round} updateRound={updateRound} />
            ))}
        </>
    );
};

export default withAdmin(RoundList);
