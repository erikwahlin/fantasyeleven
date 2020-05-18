import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import allClubs from '../../../constants/clubs';
import { withAdmin } from '../AdminState';
import { withResult } from './NewResState';
import { clone } from '../../../constants/helperFuncs';
import { initialEffort } from '../../../constants/gamePreset';

const ClubForm = ({ adminContext, matches, match, homeAway, autosave, ...props }) => {
    const autoSave = ({ homeAway, val }) => {
        const newMatches = clone(matches);

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

        autosave('matches', newMatches);
    };

    return (
        <form className="ClubForm unmarkable">
            <select
                type="select"
                value={home.club}
                onChange={e => update({ homeAway: 'home', val: e.target.value })}
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
                onChange={e => update({ homeAway: 'away', val: e.target.value })}
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

export default withAdmin(ClubForm);
