import React, { Component } from 'react';
import FormInput from '../../FormInput/FormInput';
//value have to be state, do we send it from admin?
const EditPlayer = ({ player, handleChange, playerState }) => {
    console.log(player);
    const { club, name, position, price } = player;

    return (
        <div>
            <form>
                <FormInput
                    name={price}
                    value={playerState.price}
                    onChange={handleChange}
                    type="text"
                    label={price}
                />
                <FormInput
                    name={name}
                    value={playerState.name}
                    onChange={handleChange}
                    type="text"
                    label={name}
                />
                <FormInput
                    name={club}
                    value={playerState.club}
                    onChange={handleChange}
                    type="text"
                    label={club}
                />{' '}
                <FormInput
                    name={position}
                    value={playerState.position}
                    onChange={handleChange}
                    type="text"
                    label={position}
                />
            </form>
        </div>
    );
};

export default EditPlayer;
