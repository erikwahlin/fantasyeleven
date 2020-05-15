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

import effortColumns from './effortColumns';

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

const TableStyled = styled(Table)`
    width: 100%;
    overflow-x: scroll;

    & input {
        outline: none;
    }
`;

const EffortForm = ({ adminContext, newResContext, role, ...props }) => {
    const { matchUpdater } = newResContext.setters;
    const { matches, step, substep } = newResContext.state;
    const match = matches[step];
    const { club, players } = match[role];

    const updatePlayer = ({ player, key, val }) => {
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

    const columns = effortColumns({ setters: { updatePlayer } });

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
        <Wrapper className="Effort Outer unmarkable">
            <h3>{club}'s prestationer</h3>

            <Wrapper className="Effort Inner unmarkable">
                <TableStyled
                    className="EffortForm unmarkable"
                    columns={columns}
                    dataSource={data}
                />
            </Wrapper>
        </Wrapper>
    );
};

export default withAdmin(withNewRes(EffortForm));
