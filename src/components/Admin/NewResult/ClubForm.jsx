import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import allClubs from '../../../constants/clubs';
import { withAdmin } from '../AdminState';
import { withNewRes } from './NewResState';
import { clone } from '../../../constants/helperFuncs';

const initialEffort = {
    goal: 0, // {playerObj, amount} ...
    assist: 0,
    cleanSheet: false,
    yellow: 0,
    red: false,
    penaltyMiss: 0,
    penaltySave: 0,
    playtime: '60 min eller mer'
};

const ClubForm = ({ adminContext, newResContext, role, stepContent, ...props }) => {
    const { matches, step, substep } = newResContext.state;
    const { home, away } = matches[step];

    const { matchUpdater } = newResContext.setters;

    const pickedClubs = (() => {
        let res = [];
        matches.forEach(match => {
            if (match.home.club) res.push(match.home.club);
            if (match.away.club) res.push(match.away.club);
        });

        return res;
    })();

    const autoSave = ({ homeAway, val }) => {
        const newMatch = clone(matches[step]);

        // save club
        newMatch[homeAway].club = val;

        // set initial player efforts
        const players = adminContext.state.players
            .filter(p => p.club === val)
            .map(p => ({
                ...p,
                effort: clone(initialEffort)
            }));

        newMatch[homeAway].players = players;

        matchUpdater(newMatch);
    };

    return (
        <form>
            <select
                type="select"
                value={home.club}
                onChange={e => autoSave({ homeAway: 'home', val: e.target.value })}
            >
                <option disabled value="">
                    - Välj hemmalag -
                </option>
                {allClubs.map(club => (
                    <option
                        key={club.short}
                        value={club.long}
                        disabled={pickedClubs.includes(club.long)}
                    >
                        {club.long}
                    </option>
                ))}
            </select>

            <select
                type="select"
                value={away.club}
                onChange={e => autoSave({ homeAway: 'away', val: e.target.value })}
            >
                <option disabled value="">
                    - Välj bortalag -
                </option>
                {allClubs.map(club => (
                    <option
                        key={club.short}
                        value={club.long}
                        disabled={pickedClubs.includes(club.long)}
                    >
                        {club.long}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default withAdmin(withNewRes(ClubForm));
