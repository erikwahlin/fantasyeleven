import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import {
    UnderlayContainer,
    Underlay,
    AppearOnHover,
    DisappearOnHover,
    clickedClass
} from './underlay';
import { Wrapper } from './wrapperTemplate';
import ResultCard from './ResultCard';
import Arrow from '../../../media/arrow.svg';

const ResultHeader = styled.div`
    width: 100%;
    margin: 10px;
    margin-bottom: ${p => (p.open ? '0' : '10px')};
    padding: 10px;
    background: ${p => (p.open ? '#172232' : '#23334d')};
    font-weight:500;
    display: flex;
    justify-content: space-between;

    cursor: pointer;
`;

const ResultTitle = styled.h2`
    & span {
        font-weight: 500;
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

const ResultContent = styled.div`
    background: #23334d;

    display: ${p => (p.open ? 'flex' : 'none')};

    width: 100%;
    padding: 10px;

    flex-wrap: wrap;
`;

const ResultTemplate = ({ season, round, players }) => {
    const [open, setOpen] = useState(false);
    const [sortedPlayers, setSortedPlayers] = useState(players);

    const sum = () => {
        if (!players) return;

        return players.reduce((tot, next) => {
            return tot + next.points.sum;
        }, 0);
    };

    const toggleHandler = e => {
        setOpen(!open);

        console.log('toggle handler');
        //clickedClass(e);
    };

    return (
        <>
            {sortedPlayers && (
                <Wrapper className="Result" margin="0 auto">
                    <ResultHeader className="ResultHeader" open={open} onClick={toggleHandler}>
                        <ResultTitle>
                            Säsong <span>{season}</span> - omgång <span>{round}</span>
                        </ResultTitle>

                        <ToggleBtn className="ToggleBtn">
                            <ArrowIcon className="arrowIcon" src={Arrow} alt="arrow" open={open} />
                            {/* Klicka för att {open ? 'dölja' : 'visa'} */}
                        </ToggleBtn>
                    </ResultHeader>

                    <ResultContent className="ResultContent" open={open}>
                        {sortedPlayers.map(player => (
                            <ResultCard key={player._id} player={player} width={50} />
                        ))}
                        <OptionContainer>
                            <ToggleBtn
                                onClick={() => setOpen(!open)}
                                customstyle="font-size: 1.2em; box-shadow: 6px 6px 7px -8px #000"
                            >
                                Stäng resultat
                            </ToggleBtn>
                        </OptionContainer>
                    </ResultContent>
                </Wrapper>
            )}
        </>
    );
};

export default ResultTemplate;
