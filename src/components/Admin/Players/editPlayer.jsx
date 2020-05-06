import React, { Component } from 'react';
import FormInput from '../../FormInput/FormInput';
import players from '../../../constants/players';
//value have to be state, do we send it from admin?
//to render in dropdown
//get all player prices.
//get all clubs
//get all positions
import styled, { css } from 'styled-components';
import Profile from '../../../media/profile.png';

const MyForm = styled.form`
    display:flex;
    flex-direction:column;
    color:#D3D6DC;
    font-size: 14px;
    font-weight: bold;
    font-family:'Avenir';

`;

const MyInput = styled.input`
    background: #2f3e55;
    border:none;
    color:white;
    padding:8px;
    margin-bottom:20px;
    min-width:230px;
    font-weight:normal;

`;

const MySelect = styled.select`
    background: #2f3e55;
    border:none;
    color:white;
    margin-bottom:20px;
    outline:none;
    -webkit-appearance: menulist-button;
    height:33px;

`;

const MyButton = styled.button`
    border:1px solid #2f3e55;
    color:white;
    padding:5px;
    margin-bottom:5px;
    min-width:230px;
    font-weight:normal;

    &:hover {
        background:#2f3e55;
    }

`;

//change of name
const EditPlayer = ({ pickedPlayer, playerConfig, onSubmit, onClick }) => {
    const { club, name, position, price } = pickedPlayer;

    const unique = property => {
        return [...new Set(players.map(item => item[property]))];
    };

    return (
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <img src={Profile} style={{width:'130px', marginBottom:'30px'}}/>
            <MyForm onSubmit={event => onSubmit(event, players, pickedPlayer)}>
                <p>Spelarnamn</p>
                <MyInput
                    onSubmit={onSubmit}
                    name="name"
                    defaultValue={name}
                    type="text"
                    label="Name"
                />
                <p>Pris</p>
                <MyInput
                    onSubmit={onSubmit}
                    name="price"
                    defaultValue={price}
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
 */}            <p>Klubb</p>
                <MySelect name="club" id="club" defaultValue={club}>
                    {unique('club').map(clubs => {
                        return (
                            <option key={clubs} value={clubs}>
                                {clubs}
                            </option>
                        );
                    })}
                </MySelect>
                <p>Position</p>
                <MySelect name="position" defaultValue={position} id="position">
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
            <MyButton onClick={() => onClick(pickedPlayer)}>Ta bort spelare</MyButton>
        </div>
    );
};

export default EditPlayer;
