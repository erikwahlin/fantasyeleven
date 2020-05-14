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
import { clone } from '../../../constants/helperFuncs';

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
    fulltime: [],
    parttime: []
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
    penalyMiss: 0,
    penaltySave: 0,
    fulltime: false,
    parttime: false
};

const EffortForm = ({ adminContext, newResContext, role, ...props }) => {
    const { matches, step, substep } = newResContext.state;
    const match = matches[step];
    const { club, players } = match[role];

    /* const players = adminContext.state.players.filter(p => p.club === club);

    players = players.map(p => ({
        ...p,
        effort: clone(initialEffort)
    })) */

    const columns = Object.keys(players[0].effort).map(col => {
        const res = {
            title: col,
            dataIndex: col,
            key: col,
            render: () => (
                <>
                    <input type="number" style={{ width: '50px' }} />
                </>
            )
        };

        if (col === 'cleanSheet' || col === 'fulltime' || col === 'parttime' || col === 'red') {
            res.render = () => (
                <>
                    <input type="checkbox" />
                </>
            );
        }

        return res;
    });

    columns.unshift({
        title: 'namn',
        dataIndex: 'name',
        key: 'name'
    });

    columns.unshift({
        title: 'position',
        dataIndex: 'position',
        key: 'position'
    });

    const data = match[role].players.map((p, nth) => ({
        key: nth + 1,
        name: p.name,
        position: p.position,
        goal: p.effort.goal, // {playerObj, amount} ...
        assist: p.effort.assist,
        cleanSheet: p.effort.cleanSheet,
        yellow: p.effort.yellow,
        red: p.effort.red,
        penalyMiss: p.effort.penalyMiss,
        penaltySave: p.effort.penaltySave,
        fulltime: p.effort.fulltime,
        parttime: p.effort.parttime
    }));

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
