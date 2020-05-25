import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import apis from '../../../constants/api';

import { withAdmin } from '../AdminState';

import {
    clone,
    userMsg,
    updatedStamp,
    addEffort,
    createEffort
} from '../../../constants/helperFuncs';

import { formTemplate, wrapperTemplate } from '../template';
import { ButtonStandard, CustomTooltip } from '../template/TemplateElems';

import allClubs from '../../../constants/clubs';

import { initialMatches } from '../../../constants/gamePreset';
import { FcCheckmark } from 'react-icons/fc';

const { Wrapper, OptionsWrapper } = wrapperTemplate;

const { FormContainer, InputTemplate } = formTemplate;

const ClubSelect = styled.select`
    border: none;
    outline: none;
    color: #fff;
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

        const addEffort = ({ matches, ...form }) => {
            //let res = clone(form);

            const newMatches = matches.map(match => {
                let res = clone(match);

                let homeInfo = {
                    count: {
                        tot: res.home.players.length,
                        Goalkeeper: res.home.players.filter(p => p.position === 'Goalkeeper')
                            .length,
                        Defender: res.home.players.filter(p => p.position === 'Defender').length,
                        Midfielder: res.home.players.filter(p => p.position === 'Midfielder')
                            .length,
                        Forward: res.home.players.filter(p => p.position === 'Forward').length,

                        fullTimers: {
                            tot: res.home.players.filter(p => p.effort.playtime === '60+').length,
                            Goalkeeper: res.home.players.filter(
                                p => p.position === 'Goalkeeper' && p.effort.playtime === '60+'
                            ).length,
                            Defender: res.home.players.filter(
                                p => p.position === 'Defender' && p.effort.playtime === '60+'
                            ).length,
                            Midfielder: res.home.players.filter(
                                p => p.position === 'Midfielder' && p.effort.playtime === '60+'
                            ).length,
                            Forward: res.home.players.filter(
                                p => p.position === 'Forward' && p.effort.playtime === '60+'
                            ).length
                        }
                    },
                    limit: {
                        '60+': {
                            // 2-4-2
                            tot: 11,
                            Goalkeeper: 1,
                            Defender: 4,
                            Midfielder: 4,
                            Forward: 2
                        },
                        goals: {
                            tot: 5,
                            Goalkeeper: 0,
                            Defender: 1,
                            Midfielder: 2,
                            Forward: 3
                        },
                        assists: {
                            tot: 5,
                            Goalkeeper: 0,
                            Defender: 1,
                            Midfielder: 2,
                            Forward: 3
                        }
                    }
                };

                res.home.players.forEach((p, nth) => {
                    let newPlayer = createEffort(p);
                    res.home.players[nth] = newPlayer;

                    res.home.goals +=
                        newPlayer.effort.goals; /*

                    // limit player-goals
                    if (res.home.players[nth].effort.goals > homeInfo.limit.goals[p.position]) {
                        let diff =
                            homeInfo.limit.goals[p.position] - res.home.players[nth].effort.goals;
                        res.home.players[nth].effort.goals -= diff;
                    }

                    res.home.goals += newPlayer.effort.goals;

                    // limit club-goals
                    if (res.home.goals > 5) {
                        let diff = res.home.goals - 5;

                        res.home.players[nth].effort.goals -= diff;
                        res.home.goals -= diff;
                    }

                    // limit player assists
                    if (res.home.players[nth].effort.assists > homeInfo.limit.assists[p.position]) {
                        let diff =
                            homeInfo.limit.assists[p.position] -
                            res.home.players[nth].effort.assists;
                        res.home.players[nth].effort.assists -= diff;
                    }

                    // clear penaltySaves for non keepers
                    if (p.position !== 'Goalkeeper') {
                        res.home.players[nth].effort.penaltySaves = 0;
                    } */

                    /* let newPlayer = createEffort(p, homeInfo);
                    res.home.players[nth] = newPlayer;

                    res.home.players[nth].effort.cleanSheet = true;

                    /* // limit fullTimers
                    if (
                        res.home.players.filter(p => p.effort.playtime === '60+').length >
                        homeInfo.limit['60+'][p.position]
                    ) {
                        res.home.players[nth].effort.playtime = '0';
                    } */
                });

                res.away.players.forEach((p, nth) => {
                    let newPlayer = createEffort(p);
                    res.away.players[nth] = newPlayer;

                    res.away.goals += newPlayer.effort.goals;
                });

                const cleanup = (club, side) => {
                    const otherSide = side === 'home' ? 'away' : 'home';

                    // clean up this club
                    res[side].players.forEach((p, nth) => {
                        // cleanSheet
                        if (res[otherSide].goals > 0) {
                            res[side].players[nth].effort.cleanSheet = false;
                        }

                        // playtime
                    });

                    // cleanup opposite club
                };

                res.home = cleanup(res.home, 'home');
                res.away = cleanup(res.away, 'away');

                return res;
            });

            //res.matches = newMatches;
            return {
                matches: newMatches,
                ...form
            };
        };

        //const resultAdded = addEffort(clone(form));

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
            newMatches[index][side].players = players
                .filter(p => p.club === club)
                .map(p => addEffort(p));

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

    const copyRound = roundId => {
        const round =
            roundId !== '' ? rounds.filter(r => r._id === roundId)[0] : clone(initialForm);

        if (!round) return console.log('Did not find round to copy...', roundId);

        autosave('matches', clone(round.matches));
    };

    return (
        <div>
            <OptionsWrapper>
                <ButtonStandard onClick={() => setNewnewRoundHidden(!newRoundHidden)}>
                    {newRoundHidden ? 'Skapa ny omgång' : 'Stäng ny omgång'}
                </ButtonStandard>
            </OptionsWrapper>

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

                    <InputTemplate
                        type="select"
                        state={form}
                        autosave={copyRound}
                        defaultValue=""
                        defaultOption=" - "
                        options={rounds}
                        label="Kopiera resultat från"
                        onSubmit={submit}
                    />

                    {/* <select defaultValue="" onChange={e => copyRound(e.target.value)}>
                        <option disabled value="">
                            - kopiera resultat från -
                        </option>
                        {rounds.map(round => (
                            <option key={round._id} value={round._id}>
                                {round.alias}
                            </option>
                        ))}
                    </select> */}

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
                        customstyle={`flex-direction: row; flex-wrap: wrap; margin-top: 30px;`}
                    >
                        <h4>Matcher</h4>
                        {form.matches.map((match, nth) => (
                            <ClubWrapper
                                key={nth}
                                className={`Match-${nth + 1}`}
                                customstyle={`flex-direction: row; flex-wrap: wrap;`}
                            >
                                <div style={{ position: 'relative' }}>
                                    <p
                                        style={{
                                            fontSize: '1em',
                                            color: 'white'
                                        }}
                                    >
                                        Match {nth + 1}
                                    </p>

                                    {match.home.club && match.away.club && (
                                        <FcCheckmark
                                            style={{
                                                position: 'absolute',
                                                right: '-20px',
                                                top: '0'
                                            }}
                                        />
                                    )}
                                </div>

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
                        customstyle="flex-direction: row; margin: 20px 0; width: 100%; color:#000;"
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
