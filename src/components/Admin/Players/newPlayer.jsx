import React, { useState } from 'react';
import { withAdmin } from '../AdminState';

import players from '../../../constants/players';

const unique = property => {
    return [...new Set(players.map(item => item[property]))];
};

const initialForm = {
    name: '',
    price: '',
    position: '',
    club: ''
};
const NewPlayer = ({ adminContext, players /* , onSubmit */ }) => {
    const { addPlayer } = adminContext.setters;
    const [fields, setFields] = useState(initialForm);

    const updateForm = (key, val) => {
        setFields({
            ...fields,
            [key]: val
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        addPlayer(fields);
    };

    return (
        <div onSubmit={onSubmit}>
            <h1>skapa en ny spelare</h1>;
            <form>
                <input
                    name="name"
                    defaultValue="NAMN"
                    type="text"
                    onChange={e => updateForm('name', e.target.value)}
                    /* label="Name" */
                />
                <input
                    name="price"
                    defaultValue="PRIS"
                    type="text"
                    onChange={e => updateForm('price', e.target.value)}
                    /* label="Name" */
                />
                <select
                    name="position"
                    defaultValue="POSITION"
                    id="position"
                    onChange={e => updateForm('position', e.target.value)}
                >
                    {unique('position').map(positions => {
                        return (
                            <option
                                key={positions}
                                /* selected={position === positions ? positions : ''} */
                                value={positions}
                            >
                                {positions}
                            </option>
                        );
                    })}
                    />
                </select>
                <select
                    name="club"
                    id="club"
                    defaultValue="CLUB"
                    onChange={e => updateForm('club', e.target.value)}
                >
                    {unique('club').map(clubs => {
                        return (
                            <option key={clubs} value={clubs}>
                                {clubs}
                            </option>
                        );
                    })}
                </select>
                <button type="submit">spara ny spelare </button>
            </form>
        </div>
    );
};

export default withAdmin(NewPlayer);
