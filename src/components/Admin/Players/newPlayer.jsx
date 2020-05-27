import React, { useState } from 'react';
import { withAdmin } from '../AdminState';
import Profile from '../../../media/profile.png';
import players from '../../../constants/players';
import styled, { css } from 'styled-components';
import { userMsg } from '../../../constants/helperFuncs';

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

const unique = property => {
    return [...new Set(players.map(item => item[property]))];
};

const initialForm = {
    name: '',
    price: '',
    position: 'Målvakt',
    club: 'Arsenal'
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

        if (fields.name === '' || isNaN(Number(fields.price))) {
            const invalidMsg = userMsg({
                type: 'warning',
                message: 'Vänligen fyll i samtliga fält',
                dismiss: { duration: 3000 }
            });

            invalidMsg.add();

            return;
        }

        addPlayer(fields);
        setFields(initialForm);
    };

    return (
        <div
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Skapa ny spelare</h1>
            <img src={Profile} style={{ width: '130px', marginBottom: '30px' }} />
            <MyForm>
                <p>Spelarnamn</p>
                <MyInput
                    name="name"
                    type="text"
                    onChange={e => updateForm('name', e.target.value)}
                    value={fields.name}
                    /* label="Name" */
                />
                <p>Pris</p>
                <MyInput
                    name="price"
                    type="text"
                    onChange={e => updateForm('price', e.target.value)}
                    value={fields.price}
                    /* label="Name" */
                />

                <p>Klubb</p>
                <MySelect
                    name="club"
                    id="club"
                    onChange={e => updateForm('club', e.target.value)}
                    value={fields.club}
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
                    id="position"
                    onChange={e => updateForm('position', e.target.value)}
                    value={fields.position}
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

                <MyButton type="submit">Spara ny spelare </MyButton>
            </MyForm>
        </div>
    );
};

export default withAdmin(NewPlayer);
