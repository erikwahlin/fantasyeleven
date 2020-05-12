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

    &:hover {
        background: #2f3e55;
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

                <MyButton type="submit">spara ny spelare </MyButton>
            </MyForm>
        </div>
    );
};

export default withAdmin(NewPlayer);
