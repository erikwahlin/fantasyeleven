import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import apis from '../../../constants/api';

import { withAdmin } from '../AdminState';

import { clone, userMsg } from '../../../constants/helperFuncs';

import { formTemplate, wrapperTemplate } from '../template';

import TeamPicker from './ClubPicker';

import allClubs from '../../../constants/clubs';

import { initialMatches } from '../../../constants/gamePreset';

const { Wrapper } = wrapperTemplate;

const { FormContainer, InputTemplate } = formTemplate;

const ClubSelect = styled.select`
    & > option {
        color: red !important;
    }
`;

const ClubWrapper = styled(Wrapper)`
    justify-content: space-evenly;
    & > * {
        margin: 0 10px;
    }
`;

const initialForm = {
    createdAt: '',
    updatedAt: '',
    alias: '',
    season: '',
    round: '',
    matches: initialMatches(),
    active: false,
    result: null
};

const NewRound = props => {
    const { rounds } = props.adminContext.state;
    const { createRound } = props.adminContext.setters;

    const [form, setForm] = useState(clone(initialForm));
    const [takenClubs, setTakenClubs] = useState([]);

    const formReady = {
        createdAt: true,
        updatedAt: true,
        alias: form.alias.length && rounds.every(r => r.alias !== form.alias),
        season: form.season.length,
        round: !isNaN(parseFloat(form.round)) && parseInt(form.round) > 0,
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

        const onSuccess = () => {
            setForm(clone(initialForm));
        };

        createRound(form, onSuccess);
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
        const newForm = clone(form);

        newForm[key] = val;

        newForm.createdAt = Date.now();

        newForm.updatedAt = Date.now();

        setForm({ ...form, createdAt: Date.now(), updatedAt: Date.now(), [key]: val });
    };

    /* const saveMany = (newProps) => {
        const newForm = clone(form);

        newForm.createdAt = Date.now();

        newForm.updatedAt = Date.now();

        setForm({...form, ...newProps})
    } */

    const updateMatch = ({ index, homeAway, club }) => {
        const newMatches = clone(form.matches);

        const taken = trackTaken(club);

        if (taken !== false) {
            newMatches[taken.index][taken.homeAway].club = '';
            console.log('cleaned up:', newMatches[taken.index][taken.homeAway].club);
        }

        if (club !== '') {
            newMatches[index][homeAway].club = allClubs.filter(c => c.long === club)[0].long;
        } else {
            const clubToDrop = newMatches[index][homeAway].club;
            takenClubs.splice(takenClubs.indexOf(clubToDrop), 1);
            newMatches[index][homeAway].club = '';
        }

        autosave('matches', newMatches);

        if (!taken) {
            setTakenClubs([...takenClubs, club]);
        }
    };

    return (
        <div>
            <FormContainer
                className="FormContainer"
                title="Skapa en ny omgång"
                onSubmit={submit}
                submitVal="Skapa"
                submitDisabled={submitDisabled}
            >
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
                    stateKey="round"
                    label="Omgångsnummer"
                    autosave={autosave}
                    type="number"
                    helper="Använd siffror"
                    ready={formReady.round}
                    onSubmit={submit}
                />

                <InputTemplate
                    state={form}
                    stateKey="active"
                    label="Sätt som aktiv"
                    autosave={autosave}
                    type="checkbox"
                    helper="Om aktiv knyts kommande registreringar till denna omgång"
                    ready={false}
                    onSubmit={submit}
                />
                <Wrapper customStyle={`flex-direction: row; flex-wrap: wrap;`}>
                    {form.matches.map((match, nth) => (
                        <ClubWrapper
                            key={nth}
                            className={`Match-${nth + 1}`}
                            customStyle={`flex-direction: row; flex-wrap: wrap;`}
                        >
                            <p style={{ fontSize: '1em', color: 'grey' }}>Match {nth + 1}</p>

                            <ClubSelect
                                className="home"
                                type="select"
                                value={match.home.club}
                                onChange={e =>
                                    updateMatch({
                                        index: nth,
                                        homeAway: 'home',
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
                                className="away"
                                type="select"
                                value={match.away.club}
                                onChange={e =>
                                    updateMatch({
                                        index: nth,
                                        homeAway: 'away',
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
            </FormContainer>
        </div>
    );
};

export default withAdmin(NewRound);
