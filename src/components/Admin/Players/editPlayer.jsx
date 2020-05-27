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
    font-weight: 500;
    font-family: 'Avenir';
    width:300px;

    & p {
        
    font-family: 'Avenir';
    font-size: 1.2em;
    color: white; 
    margin-bottom:4px;
    font-weight:500;

    }
`;

const MyInput = styled.input`
    background: #e2dddd;
    border: none;
    color: black;
    padding: 8px;
    margin-bottom: 20px;
    min-width: 230px;
    font-weight: normal;
    outline: none;
`;

const MySelect = styled.select`
    background: #e2dddd;
    border: none;
    color: black;
    margin-bottom: 20px;
    outline: none;
    -webkit-appearance: menulist-button;
    height: 40px;
    padding:8px;
`;

const MyButton = styled.button`
    border:none;
    background-color:rgba(36,132,10, 0.6);
    color: white;
    padding: 5px;
    margin-bottom: 5px;
    min-width: 230px;
    font-weight: 500;
    height:40px;

    &:hover {
        background: rgba(91, 170, 69, 0.3);
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
                <MyButton onClick={deleteConfirm}>Ta bort spelare</MyButton>
            </MyForm>
            
        </div>
    );
};

export default withAdmin(EditPlayer);
