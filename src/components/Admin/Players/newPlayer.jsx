import React from 'react';

import players from '../../../constants/players';

const unique = property => {
    return [...new Set(players.map(item => item[property]))];
};
const NewPlayer = ({ players, onSubmit }) => {
    return (
        <div onSubmit={event => onSubmit(event, players)}>
            <h1>skapa en ny spelare</h1>;
            <form>
                <input
                    name="name"
                    defaultValue="NAMN"
                    type="text"
                    /* label="Name" */
                />
                <input
                    name="price"
                    defaultValue="PRIS"
                    type="text"
                    /* label="Name" */
                />
                <select name="position" defaultValue="POSITION" id="position">
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
                <select name="club" id="club" defaultValue="CLUB">
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

export default NewPlayer;
