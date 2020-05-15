import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import allClubs from '../../../constants/clubs';
import { withAdmin } from '../AdminState';
import { withNewRes } from './NewResState';
import { Wrapper } from '../template/wrapperTemplate';

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Table,
    Tag,
    Space
} from 'antd';
import { clone, toSwe } from '../../../constants/helperFuncs';

//const columns =

/* [
    {
        title: 'Namn',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position'
    },
    {
        title: 'Mål',
        dataIndex: 'goals',
        key: 'goals',
        render: goals => <><input type='number' value={goals}/></>
    },
    {
        title: 'Rött',
        key: 'red',
        dataIndex: 'red',
        render: checked => (
            <>
                <input type="checkbox" />
            </>
        )
    }
]; */

/* 
    goal: [], // {playerObj, amount} ...
    assist: [],
    cleanSheet: [],
    yellow: [],
    red: [],
    penalyMiss: [],
    penaltySave: [],
    playtime: '60 min eller mer'
     */

const FormStyled = styled(Form)`
    width: 100%;

    & input {
        width: fit-content;
    }
`;

const TableStyled = styled(Table)`
    width: 100%;
    overflow-x: scroll;
`;

const initialEffort = {
    goal: 0, // {playerObj, amount} ...
    assist: 0,
    cleanSheet: false,
    yellow: 0,
    red: false,
    penaltyMiss: 0,
    penaltySave: 0,
    playtime: '60 min eller mer'
};

const EffortForm = ({ adminContext, newResContext, role, ...props }) => {
    const { matchUpdater } = newResContext.setters;
    const { matches, step, substep } = newResContext.state;
    const match = matches[step];
    const { club, players } = match[role];

    /* const players = adminContext.state.players.filter(p => p.club === club);

    players = players.map(p => ({
        ...p,
        effort: clone(initialEffort)
    })) */

    const updatePlayer = ({ player, key, val }) => {
        console.log('about to update player', player.name, 'key', key, 'val', val);
        const newMatch = clone(match);

        const findIndex = () => {
            let index = -1;
            newMatch[role].players.forEach((p, nth) => {
                if (p._id === player._id) {
                    index = nth;
                }
            });
            return index;
        };

        const pIndex = findIndex();

        if (pIndex < 0) return console.log('could not find player to update');

        newMatch[role].players[pIndex].effort[key] = val;

        // update team goals
        if (key === 'goal') {
            newMatch[role].goals = 0;
            newMatch[role].players.forEach(p => {
                newMatch[role].goals += parseInt(p.effort.goal);
            });
        }

        matchUpdater(newMatch);
    };

    const columns = Object.keys(players[0].effort).map(col => {
        const wordForm =
            col === 'cleanSheet' || col === 'red' || col === 'playtime' ? 'sing' : 'plur';
        const res = {
            title: toSwe(col, 'effort', wordForm),
            dataIndex: col,
            key: col
        };

        if (col === 'cleanSheet' || col === 'red') {
            res.render = input => (
                <>
                    <input
                        type="checkbox"
                        checked={input.val}
                        onChange={e =>
                            updatePlayer({
                                player: input.player,
                                key: col,
                                val: e.target.checked
                            })
                        }
                    />
                </>
            );
        } else if (col === 'playtime') {
            res.render = input => (
                <>
                    <select
                        defaultValue=""
                        onChange={e =>
                            updatePlayer({
                                player: input.player,
                                key: col,
                                val: e.target.value
                            })
                        }
                    >
                        <option value="" disabled>
                            - speltid -
                        </option>
                        <option value=">60">60 min eller mer</option>
                        <option value="<60">1-59 min</option>
                        <option value="0">bänkad (0 min)</option>
                    </select>
                </>
            );
        } else {
            res.render = input => {
                console.log('input', input, 'col', col);
                return (
                    <>
                        <input
                            type="number"
                            value={typeof input !== 'object' ? input : input.val}
                            style={{ width: '50px' }}
                            min="0"
                            onChange={e =>
                                updatePlayer({
                                    player: input.player,
                                    key: col,
                                    val: e.target.value < 0 ? 0 : e.target.value
                                })
                            }
                        />
                    </>
                );
            };
        }

        return res;
    });

    columns.unshift({
        title: 'position',
        dataIndex: 'position',
        key: 'position'
    });

    columns.unshift({
        title: 'namn',
        dataIndex: 'name',
        key: 'name'
    });

    const data = match[role].players.map((p, nth) => {
        const res = {
            key: nth + 1,
            name: p.name,
            position: p.position
        };
        Object.keys(p.effort).forEach(key => {
            if (key === 'fulltime' || key === 'parttime') {
                res[key] = {};
            }
            res[key] = { player: p, val: p.effort[key] };
        });

        return res;
    });

    return (
        <Wrapper>
            <h3>{club}'s prestationer</h3>

            <Wrapper>
                <TableStyled columns={columns} dataSource={data} />
            </Wrapper>
        </Wrapper>
    );
};

export default withAdmin(withNewRes(EffortForm));
