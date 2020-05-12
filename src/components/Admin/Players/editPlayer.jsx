import React, { useState, useEffect } from 'react';
import { withAdmin } from '../AdminState';
import FormInput from '../../FormInput/FormInput';
import players from '../../../constants/players';
import styled, { css } from 'styled-components';
import Profile from '../../../media/profile.png';

const MyForm = styled.form`
    display: flex;
    flex-direction: column;
    color: #d3d6dc;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Avenir';
`;

const MyInput = styled.input`
    background: #2f3e55;
    border: none;
    color: white;
    padding: 8px;
    margin-bottom: 20px;
    min-width: 230px;
    font-weight: normal;
    outline: none;
`;

const MySelect = styled.select`
    background: #2f3e55;
    border: none;
    color: white;
    margin-bottom: 20px;
    outline: none;
    -webkit-appearance: menulist-button;
    height: 33px;
`;

const MyButton = styled.button`
    border: 1px solid #2f3e55;
    color: white;
    padding: 5px;
    margin-bottom: 5px;
    min-width: 230px;
    font-weight: normal;
    outline: none;

    &:hover {
        background: #2f3e55;
    }
`;

//change of name
const EditPlayer = ({ adminContext, editPlayer, deletePlayerCallback }) => {
    const initial_player = {
        _id: '',
        createdAt: '',
        updatedAt: '',
        popularity: '',
        name: '',
        price: '',
        club: '',
        position: ''
    };

    const [player, setPlayer] = useState(initial_player);

    useEffect(() => {
        setPlayer(editPlayer);
    }, []);

    //const { club, name, position, price } = editPlayer;

    const unique = property => {
        return [...new Set(players.map(item => item[property]))];
    };

    const { deletePlayer, updatePlayer } = adminContext.setters;
    const deleteConfirm = () => {
        const conf = window.confirm(`Är du säker på att du vill ta bort ${editPlayer.name}?`);
        if (conf) {
            deletePlayer(editPlayer);
            deletePlayerCallback();
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Redigera spelare</h1>
            <img src={Profile} style={{ width: '130px', marginBottom: '30px' }} />
            <MyForm onSubmit={e => updatePlayer(e, player)}>
                <p>Spelarnamn</p>
                <MyInput
                    onChange={e => setPlayer({ ...player, name: e.target.value })}
                    name="name"
                    value={player.name}
                    type="text"
                    label="Name"
                />
                <p>Pris</p>
                <MyInput
                    onChange={e => setPlayer({ ...player, price: e.target.value })}
                    name="price"
                    value={player.price}
                    type="text"
                    /* label="Name" */
                />
                {/* 
                <select defaultValue={price} name="price" id="price">
                    {unique('price').map((priceTag, id) => {
                        return (
                            <option key={priceTag} value={priceTag}>
                                {priceTag}
                            </option>
                        );
                    })}
                </select>
 */}{' '}
                <p>Klubb</p>
                <MySelect
                    name="club"
                    id="club"
                    value={player.club}
                    onChange={e => setPlayer({ ...player, club: e.target.value })}
                >
                    {unique('club').map(clubs => {
                        return (
                            <option key={clubs} value={clubs}>
                                {clubs}
                            </option>
                        );
                    })}
                </MySelect>
                <p>Position</p>
                <MySelect
                    name="position"
                    value={player.position}
                    id="position"
                    onChange={e => setPlayer({ ...player, position: e.target.value })}
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
                </MySelect>
                <MyButton type="submit">Spara</MyButton>
            </MyForm>
            <MyButton onClick={deleteConfirm}>Ta bort spelare</MyButton>
        </div>
    );
};

export default withAdmin(EditPlayer);
