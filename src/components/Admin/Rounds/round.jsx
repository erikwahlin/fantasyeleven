import React, { useState } from 'react';
import { withAdmin } from '../AdminState';

import styled, { css } from 'styled-components';

import { Wrapper, OptionsWrapper } from '../template/wrapperTemplate';
import Arrow from '../../../media/arrow.svg';

import { clone, updatedStamp, roundStatus } from '../../../constants/helperFuncs';

import Result from '../Result';
import { ButtonStandard, CustomTooltip } from '../template/TemplateElems';

import { Table, Card, Tooltip } from 'antd';
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
    color: ${p => (p.status === 'Aktiv' ? 'green' : p.status === 'Avslutad' ? 'orange' : '#fff')};
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

        & > span {
            font-weight: 700;
        }
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
    const noneIsActive = !settings.activeRound._id;
    const round = rounds[roundIndex];
    const { ended } = round;
    const { updateRound, deleteRound, updateSettings } = adminContext.setters;

    const status = roundStatus({ active, ended });

    const [open, setOpen] = useState(false);
    const [resultOpen, setResultOpen] = useState(false);
    const closeResult = () => {
        setResultOpen(false);
    };

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

    const activateRound = () => {
        const sure = window.confirm(
            `Är du säker på att du vill aktivera ${round.alias}? \n
            Aktiverad omgång måste avslutas (poäng delas ut) före en
            ny omgång kan aktiveras.
            `
        );

        if (!sure) return;

        const newActiveRound = {
            _id: round._id,
            alias: round.alias,
            season: round.season,
            number: round.number
        };

        console.log('new active round', newActiveRound);

        updateSettings({
            key: 'activeRound',
            val: newActiveRound,
            msg: `${round.alias} är nu aktiv!`
        });

        const newRound = clone(round);
        newRound.updated.unshift(updatedStamp({ user, tag: 'Round activated' }));
        updateRound(newRound);
    };

    const endRound = () => {
        const sure = window.confirm(
            'Är du säker på att du vill avsluta omgången? \n Poäng utefter resultatet delas ut och omgången arkiveras.'
        );

        if (!sure) return;

        const endedRound = clone(round);

        endedRound.ended = true;

        updateRound(endedRound);

        if (settings.activeRound._id === round._id) {
            updateSettings({ key: 'activeRound', val: {}, msg: 'Omgång avslutad' });
        }
    };

    const matchTableData = round.matches.map((match, nth) => ({
        key: nth + 1,
        match: nth + 1,
        homeTeam: match.home.club,
        homeGoals: match.home.goals,
        hyphen: '-',
        awayGoals: match.away.goals,
        awayTeam: match.away.club
    }));

    // TEMP 'til we got functionality for ended round

    return (
        <div className="Result">
            <Wrapper className="Result" customStyle="margin: 10px auto;">
                <Header className="Header" open={open} onClick={toggleHandler}>
                    <Title>
                        {round.alias}
                        {(active || ended) && (
                            <>
                                {' '}
                                <TitleSpan status={status}>{status.toUpperCase()}</TitleSpan>
                            </>
                        )}
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
                        <i>{`senast ändrad ${round.updated[0].at.date} kl. ${round.updated[0].at.time} av ${round.updated[0].by.username}`}</i>
                    </span>

                    <ArrowIcon className="arrowIcon" src={Arrow} alt="arrow" open={open} />
                    {/* Klicka för att {open ? 'dölja' : 'visa'} */}
                </Header>

                <RoundContent className="RoundContent" open={open}>
                    <Wrapper>
                        <InfoCard title="INFO" bordered={false}>
                            <p>
                                Alias <span>{round.alias.toUpperCase()}</span>
                            </p>
                            <p>
                                Säsong <span>{round.season.toUpperCase()}</span>
                            </p>
                            <p>
                                Omgångsnummer <span>{round.number}</span>
                            </p>
                            <CustomTooltip
                                title={`INAKTIV = påverkar inte spelet.
                                    AKTIV = användare lämnar in lag till denna omgång.
                                    FÄRDIGSPELAD = Poäng har utdelats, omgången är över.`}
                                placement="bottom"
                            >
                                <p>
                                    Status <span>{status.toUpperCase()}</span>
                                </p>
                            </CustomTooltip>
                        </InfoCard>

                        <MatchTable
                            className="MatchTable unmarkable"
                            dataSource={matchTableData}
                            pagination={{ position: ['bottomCenter'], pageSize: 20 }}
                        >
                            <Column title="Match" dataIndex="match" key="match" />
                            <Column title="HEMMA" dataIndex="homeTeam" key="homeTeam" />
                            <Column title="" dataIndex="homeGoals" key="homeGoals" />
                            <Column title="" dataIndex="hyphen" key="hyphen" />
                            <Column title="" dataIndex="awayGoals" key="awayGoals" />
                            <Column title="BORTA" dataIndex="awayTeam" key="awayTeam" />
                        </MatchTable>
                    </Wrapper>

                    <OptionsWrapper
                        className="Options"
                        style={{ width: '100%', height: 'fit-content', display: 'flex' }}
                    >
                        <CustomTooltip
                            title="Omgången måste avslutas före den kan raderas"
                            condition={active}
                        >
                            <ButtonStandard
                                type="primary"
                                onClick={() => delHandler()}
                                customstyle="color: red;"
                                disabled={active}
                            >
                                Radera
                            </ButtonStandard>
                        </CustomTooltip>

                        {!active && (
                            <CustomTooltip
                                condition={!active && !noneIsActive}
                                title="Aktiverad omgång måste avslutas först"
                            >
                                <ButtonStandard
                                    type="default"
                                    onClick={() => activateRound()}
                                    disabled={!active && !noneIsActive}
                                >
                                    Aktivera
                                </ButtonStandard>
                            </CustomTooltip>
                        )}

                        {!resultOpen && (
                            <CustomTooltip title="Visa/ändra resultat">
                                <ButtonStandard
                                    type="default"
                                    onClick={() => setResultOpen(!resultOpen)}
                                >
                                    Resultat
                                </ButtonStandard>
                            </CustomTooltip>
                        )}

                        <CustomTooltip title="Stäng omgång">
                            <ButtonStandard type="primary" onClick={() => setOpen(!open)}>
                                Stäng
                            </ButtonStandard>
                        </CustomTooltip>

                        <CustomTooltip title="Omgången markeras som färdigspelad och poäng delas ut till användarna.">
                            <ButtonStandard type="primary" onClick={() => endRound()}>
                                Avsluta omgång
                            </ButtonStandard>
                        </CustomTooltip>

                        {/* Radera omgång, temp för dev */}
                        {/* <CustomTooltip title="Radera">
                            <ButtonStandard type="primary" onClick={() => delHandler()}>
                                Radera (temp)
                            </ButtonStandard>
                        </CustomTooltip> */}
                    </OptionsWrapper>

                    {resultOpen && (
                        <Result roundIndex={roundIndex} closeResult={() => setResultOpen(false)} />
                    )}
                </RoundContent>
            </Wrapper>
        </div>
    );
};

export default withAdmin(Round);
