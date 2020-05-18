import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import apis from '../../../constants/api';

import { withAdmin } from '../AdminState';

import { clone, userMsg, updatedStamp } from '../../../constants/helperFuncs';

import { formTemplate, wrapperTemplate } from '../template';
import { ButtonStandard, CustomTooltip } from '../template/TemplateElems';

import allClubs from '../../../constants/clubs';

import { initialMatches } from '../../../constants/gamePreset';

const { Wrapper, OptionsWrapper } = wrapperTemplate;

const { FormContainer, InputTemplate } = formTemplate;

const ClubSelect = styled.select`
    border: none;
    outline: none;
    color: ${p => (p.value ? '#fff' : '#000')};
`;

const ClubWrapper = styled(Wrapper)`
    justify-content: space-evenly;
    & > * {
        margin: 0 10px;
    }
`;

const ToggleWrapper = styled.div`
    width: 100%;
    height: fit-content;
    ${p =>
        p.hidden &&
        css`
            ${p.toggle || 'height'}: 0;
        `};

    transition: 3s;
`;

const initialForm = {
    createdAt: '',
    updatedAt: '',
    alias: '',
    season: '',
    number: '',
    matches: initialMatches(),
    ended: false,
    users: []
};

const NewRound = props => {
    const { rounds, players, settings, user } = props.adminContext.state;
    const { createRound } = props.adminContext.setters;
    const noneIsActive = !settings.activeRound._id;

    const [form, setForm] = useState(clone(initialForm));
    const [prevHome, setPrevHome] = useState(null);
    const [prevAway, setPrevAway] = useState(null);
    const [prevClub, setPrevClub] = useState({ home: '', away: '' });
    const [takenClubs, setTakenClubs] = useState(allClubs.map(c => c.long));
    const [newRoundHidden, setNewnewRoundHidden] = useState(true);

    const formReady = {
        createdAt: true,
        updatedAt: true,
        alias: form.alias.length && rounds.every(r => r.alias !== form.alias),
        season: form.season.length,
        number: !isNaN(parseFloat(form.number)) && parseInt(form.number) > 0,
        matches: (() => {
            const fullPick = form.matches.every(match => match.home.club && match.away.club);
            return fullPick ? true : false;
        })(),
        active: true,
        result: true
    };

    const submitDisabled = (() => {
        let disabled = false;

        Object.values(formReady).forEach(field => {
            if (!field || field === false) {
                disabled = true;
            }
        });

        return disabled;
    })();

    const submit = e => {
        if (submitDisabled) {
            const invalidMsg = userMsg({
                message: 'Vänligen fyll i obligatoriska fält.',
                type: 'error',
                dismiss: { duration: 2000 }
            });

            return invalidMsg.add();
        }

        e.preventDefault();

        // on create success, clear form, hide new round form
        const onSuccess = () => {
            setForm(clone(initialForm));
            setNewnewRoundHidden(!newRoundHidden);
        };

        createRound({ payload: form, onSuccess });
    };

    const trackTaken = club => {
        let taken = false;
        form.matches.forEach((match, nth) => {
            if (match.home.club === club) taken = { index: nth, homeAway: 'home' };
            if (match.away.club === club) taken = { index: nth, homeAway: 'away' };
        });
        return taken;
    };

    const autosave = (key, val) => {
        setForm({
            ...form,
            created: updatedStamp({ user, tag: 'Round created' }),
            updated: updatedStamp({ user, tag: 'Round created' }),
            [key]: val
        });
    };

    const updateMatch = ({ index, side, club }) => {
        const newMatches = clone(form.matches);
        const taken = trackTaken(club);
        console.log('club', club, 'taken', taken, 'prev', side);

        // if overwriting a prev club, remove prev club from taken arr
        if (prevClub[side] !== '') {
            takenClubs.splice(takenClubs.indexOf(prevClub[side]), 1);
        }

        // add selected club/players to match
        if (club !== '') {
            newMatches[index][side].club = club;
            newMatches[index][side].players = players.filter(p => p.club === club);

            // add club/players to taken-arr

            setTakenClubs([...takenClubs, club]);
        }

        // if new selected is empty, clear club/players
        else {
            newMatches[index][side].club = '';
            newMatches[index][side].players = [];
        }

        autosave('matches', newMatches);
    };

    return (
        <div>
            <div style={{ margin: '0', width: '100%', textAlign: 'center' }}>
                <button
                    onClick={() => setNewnewRoundHidden(!newRoundHidden)}
                    style={{ outline: 'none' }}
                >
                    {newRoundHidden ? 'Skapa ny omgång' : 'Stäng ny omgång'}
                </button>
            </div>

            <ToggleWrapper className="toggleWrapper" hidden={newRoundHidden}>
                <FormContainer className="FormContainer" title="Skapa en ny omgång">
                    <InputTemplate
                        state={form}
                        stateKey="alias"
                        label="Alias"
                        autosave={autosave}
                        type="text"
                        helper="Måste vara unikt."
                        ready={formReady.alias}
                        onSubmit={submit}
                    />

                    <InputTemplate
                        state={form}
                        stateKey="season"
                        label="Säsong"
                        autosave={autosave}
                        type="text"
                        helper='Exempel "19/20"'
                        ready={formReady.season}
                        onSubmit={submit}
                    />

                    <InputTemplate
                        state={form}
                        stateKey="number"
                        label="Omgångsnummer"
                        autosave={autosave}
                        type="number"
                        helper="Använd siffror"
                        ready={formReady.number}
                        onSubmit={submit}
                    />

                    {/* <InputTemplate
                        state={form}
                        stateKey="active"
                        label="Sätt som aktiv"
                        autosave={autosave}
                        type="checkbox"
                        helper={
                            noneIsActive
                                ? 'Om aktiv knyts kommande registreringar till denna omgång'
                                : 'Andra omgångar måste avaktiveras först'
                        }
                        ready={false}
                        onSubmit={submit}
                        disabled={!noneIsActive}
                    /> */}
                    <Wrapper
                        customStyle={`flex-direction: row; flex-wrap: wrap; margin-top: 30px;`}
                    >
                        <h4>Matcher</h4>
                        {form.matches.map((match, nth) => (
                            <ClubWrapper
                                key={nth}
                                className={`Match-${nth + 1}`}
                                customStyle={`flex-direction: row; flex-wrap: wrap;`}
                            >
                                <p style={{ fontSize: '1em', color: 'grey' }}>Match {nth + 1}</p>

                                <ClubSelect
                                    onClick={e =>
                                        setPrevClub({ ...prevClub, home: e.target.value })
                                    }
                                    onKeyDown={e =>
                                        setPrevClub({ ...prevClub, home: e.target.value })
                                    }
                                    className="home"
                                    type="select"
                                    value={match.home.club}
                                    onChange={e =>
                                        updateMatch({
                                            index: nth,
                                            side: 'home',
                                            club: e.target.value
                                        })
                                    }
                                >
                                    <option disabled value="">
                                        - Hemma -
                                    </option>
                                    <option value="">(ta bort klubb)</option>
                                    {allClubs.map(club => (
                                        <option
                                            key={club.short}
                                            value={club.long}
                                            disabled={takenClubs.includes(club.long)}
                                        >
                                            {club.long}
                                        </option>
                                    ))}
                                </ClubSelect>

                                <ClubSelect
                                    onClick={e =>
                                        setPrevClub({ ...prevClub, away: e.target.value })
                                    }
                                    onKeyDown={e =>
                                        setPrevClub({ ...prevClub, away: e.target.value })
                                    }
                                    className="away"
                                    type="select"
                                    value={match.away.club}
                                    onChange={e =>
                                        updateMatch({
                                            index: nth,
                                            side: 'away',
                                            club: e.target.value
                                        })
                                    }
                                >
                                    <option disabled value="">
                                        - Borta -
                                    </option>
                                    <option value="">(ta bort klubb)</option>
                                    {allClubs.map(club => (
                                        <option
                                            key={club.short}
                                            value={club.long}
                                            disabled={takenClubs.includes(club.long)}
                                        >
                                            {club.long}
                                        </option>
                                    ))}
                                </ClubSelect>
                            </ClubWrapper>
                        ))}
                    </Wrapper>

                    <OptionsWrapper
                        className="Options"
                        customStyle="flex-direction: row; margin: 20px 0; width: 100%;"
                    >
                        <ButtonStandard
                            type="default"
                            onClick={() => setNewnewRoundHidden(!newRoundHidden)}
                        >
                            Stäng
                        </ButtonStandard>

                        <CustomTooltip
                            condition={submitDisabled}
                            title="Obligatoriska fält: Alias, Säsong, Omgångsnummer samt 2 lag/match"
                        >
                            <ButtonStandard
                                type="primary"
                                htmlType="submit"
                                onClick={submit}
                                disabled={submitDisabled}
                            >
                                Skapa
                            </ButtonStandard>
                        </CustomTooltip>
                    </OptionsWrapper>
                </FormContainer>
            </ToggleWrapper>
        </div>
    );
};

export default withAdmin(NewRound);
