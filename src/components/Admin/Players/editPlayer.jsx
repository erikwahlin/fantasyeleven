import React, { Component } from 'react';
import FormInput from '../../FormInput/FormInput';
import players from '../../../constants/players';
//value have to be state, do we send it from admin?
//to render in dropdown
//get all player prices.
//get all clubs
//get all positions

//change of name
const EditPlayer = ({ pickedPlayer, playerConfig, onSubmit }) => {
    const { club, name, position, price } = pickedPlayer;

    const unique = property => {
        return [...new Set(players.map(item => item[property]))];
    };

    return (
        <div>
            <form onSubmit={event => onSubmit(event, players, pickedPlayer)}>
                <input
                    onSubmit={onSubmit}
                    name="name"
                    defaultValue={name}
                    type="text"
                    /* label="Name" */
                />
                <select defaultValue={price} name="price" id="price">
                    {unique('price').map((priceTag, id) => {
                        return (
                            <option key={priceTag} value={priceTag}>
                                {priceTag}
                            </option>
                        );
                    })}
                </select>

                <select name="club" id="club" defaultValue={club}>
                    {unique('club').map(clubs => {
                        return (
                            <option key={clubs} value={clubs}>
                                {clubs}
                            </option>
                        );
                    })}
                </select>
                <select name="position" defaultValue={position} id="position">
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
                <button type="submit">spara</button>
            </form>
        </div>
    );
};

export default EditPlayer;
