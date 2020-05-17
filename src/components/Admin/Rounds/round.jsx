import React, { useState } from 'react';
import { withAdmin } from '../AdminState';

import styled, { css } from 'styled-components';

import { Wrapper } from '../template/wrapperTemplate';
import Arrow from '../../../media/arrow.svg';

import { clone } from '../../../constants/helperFuncs';

import NewResult from '../NewResult';
import { ButtonStandard, SaveBtn } from '../template/TemplateElems';

import { Table, Card, Col, Row } from 'antd';
const { Column, ColumnGroup } = Table;

const Header = styled.div`
    width: 100%;
    margin: 10px;
    margin-bottom: ${p => (p.open ? '0' : '10px')};
    padding: 10px;
    background: ${p => (p.open ? '#172232' : '#23334d')};
    position: relative;

    display: flex;
    justify-content: space-between;

    cursor: pointer;
`;

const Title = styled.h2`
    & span {
        font-weight: 700;
    }
`;

const TitleSpan = styled.span`
    font-size: 14px;
    color: green;
`;

const ArrowIcon = styled.img`
    transform: rotate(${p => (p.open ? '180deg' : '0deg')});
`;

const RoundContent = styled.div`
    background: #23334d;

    display: ${p => (p.open ? 'flex' : 'none')};

    width: 100%;
    padding: 10px;

    flex-wrap: wrap;
`;

const InfoCard = styled(Card)`
    background: white;
    box-shadow: 0 0 10px #222;
    height: fit-content;
    margin: 20px 0;
    align-self: self-start;

    & p {
        font-size: 16px;
    }
`;

const MatchTable = styled(Table)`
    background: white;
    width: 100%;

    margin: 20px 0;

    & th,
    & td {
        color: black;
    }

    & th {
        font-weigth: 700;
    }
`;

const OptionsWrapper = styled(Wrapper)`
    width: 100%;
    flex-direction: row;
    margin: 20px 0;
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

const Round = ({ adminContext, roundIndex, active }) => {
    const { rounds, settings, user } = adminContext.state;
    const round = rounds[roundIndex];
    const { updateRound, deleteRound, updateSettings } = adminContext.setters;

    const [open, setOpen] = useState(false);
    const [resultMode, setResultMode] = useState(false);

    const toggleHandler = e => {
        setOpen(!open);

        console.log('toggle handler');
        //clickedClass(e);
    };

    const delHandler = () => {
        const conf = window.confirm(
            `Är du säker på att du vill radera ${round.alias}? Detta går inte att ångra.`
        );

        if (!conf) return;

        deleteRound({ payload: rounds[roundIndex] });
    };

    const setActive = newVal => {
        const verb = newVal ? 'aktivera' : 'inaktivera';
        const sure = window.confirm(
            `Är du säker på att du vill ${verb} ${round.alias}? ${
                newVal ? 'Eventuella redan aktiverade omgångar inaktiveras.' : ''
            }`
        );

        if (!sure) return;

        const newActiveRound = {
            _id: round._id,
            alias: round.alias,
            season: round.season,
            number: round.number
        };

        updateSettings({ key: 'activeRound', val: newVal ? newActiveRound : {} });
    };

    const matchTableData = round.matches.map((match, nth) => ({
        key: nth + 1,
        homeTeam: match.home.club,
        homeGoals: match.home.goals,
        hyphen: '-',
        awayGoals: match.away.goals,
        awayTeam: match.away.club
    }));

    return (
        <div className="Result">
            <Wrapper className="Result" customStyle="margin: 10px auto;">
                <Header className="Header" open={open} onClick={toggleHandler}>
                    <Title>
                        {round.alias} {active && <TitleSpan>(Aktiv!)</TitleSpan>}
                    </Title>

                    <span
                        style={{
                            float: 'right',
                            fontSize: '10px',
                            color: '#000',
                            position: 'absolute',
                            right: '5px',
                            top: '-15px'
                        }}
                    >
                        <i>
                            senast ändrad
                            {round.updatedAt}
                        </i>
                    </span>

                    <ArrowIcon className="arrowIcon" src={Arrow} alt="arrow" open={open} />
                    {/* Klicka för att {open ? 'dölja' : 'visa'} */}
                </Header>

                <RoundContent className="RoundContent" open={open}>
                    <Wrapper>
                        <InfoCard title="INFO" bordered={false}>
                            <p>Alias {round.alias}</p>
                            <p>Säsong {round.season}</p>
                            <p>Omgångsnummer {round.number}</p>
                            <p>Aktiv? {active ? 'JA!' : 'NEJ'}</p>
                        </InfoCard>

                        <MatchTable
                            className="MatchTable unmarkable"
                            dataSource={matchTableData}
                            pagination={{ position: ['bottomCenter'], pageSize: 20 }}
                        >
                            <Column title="Hemma" dataIndex="homeTeam" key="homeTeam" />
                            <Column title="" dataIndex="homeGoals" key="homeGoals" />
                            <Column title="" dataIndex="hyphen" key="hyphen" />
                            <Column title="" dataIndex="awayGoals" key="awayGoals" />
                            <Column title="Borta" dataIndex="awayTeam" key="awayTeam" />
                        </MatchTable>

                        {/* <div className="Matches">
                            <ul style={{ listStyle: 'none' }}>
                                <li>HEMMA - BORTA</li>
                                {round.matches.map(match => (
                                    <li key={match.id}>
                                        {match.home.club} {match.home.goals} - {match.away.goals}{' '}
                                        {match.away.club}
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </Wrapper>

                    <OptionsWrapper
                        className="Options"
                        style={{ width: '100%', height: 'fit-content', display: 'flex' }}
                    >
                        <ButtonStandard
                            type="primary"
                            onClick={() => delHandler()}
                            customstyle="color: red;"
                        >
                            Radera
                        </ButtonStandard>

                        <ButtonStandard type="primary" onClick={() => setActive(!active)}>
                            {!active ? 'Aktivera' : 'Inaktivera'}
                        </ButtonStandard>

                        {!resultMode && (
                            <ButtonStandard
                                type="primary"
                                onClick={() => setResultMode(!resultMode)}
                            >
                                Resultat
                            </ButtonStandard>
                        )}

                        <ButtonStandard type="primary" onClick={() => setOpen(!open)}>
                            Stäng
                        </ButtonStandard>
                    </OptionsWrapper>

                    {resultMode && <NewResult roundIndex={roundIndex} />}
                </RoundContent>
            </Wrapper>
        </div>
    );
};

export default withAdmin(Round);
