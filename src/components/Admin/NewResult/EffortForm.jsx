import React, { useState, useRef, useEffect } from 'react';
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

const TableStyled = styled(Table)`
    width: 100%;

    & .ant-table {
        overflow-x: scroll;
        font-size: 12px;
    }

    & .ant-table-thead > tr > th,
    & .ant-table-tbody > tr > td {
        text-align: left;
        padding: 5px;
        background: rgba(230, 230, 230, 1);
        color: black;

        & input,
        & select {
            outline: none;
            border: none;
            text-align: left;
        }

        & select {
            padding: 0;
        }
    }

    & .ant-table-column-sorters {
        display: contents;
    }

    /* & tbody {
        & td {
        }

        & th,
        & td {
            text-align: center;
            padding: 5px;
        }

        color: black;

        & input,
        & select {
            outline: none;
            border: none;
        }
    } */
`;

const EffortForm = ({ adminContext, newResContext, roundIndex, matchIndex, side, ...props }) => {
    const { matchUpdater } = newResContext.setters;
    const { newRes, step, substep } = newResContext.state;
    const match = newRes[step];
    const { club, players } = match[side];

    console.log('side', side, 'club', club);

    const { updateRound } = adminContext.setters;
    const { rounds } = adminContext.state;
    const round = rounds[roundIndex];

    const orderRules = {
        position: {
            Goalkeeper: 1,
            Defender: 2,
            Midfielder: 3,
            Forward: 4
        }
    };

    const data = match[side].players.map((p, nth) => {
        const res = {
            key: nth + 1,
            name: p.name,
            position: toSwe(p.position, 'positions')
        };
        Object.keys(p.effort).forEach(key => {
            if (key === 'fulltime' || key === 'parttime') {
                res[key] = {};
            }
            res[key] = { player: p, val: p.effort[key] };
        });

        return res;
    });

    const updatePlayer = ({ player, key, val }) => {
        const newMatch = clone(match);

        const pIndex = (() => {
            let index = -1;
            newMatch[side].players.forEach((p, nth) => {
                if (p._id === player._id) {
                    index = nth;
                }
            });
            return index;
        })();

        if (pIndex < 0) return console.log('could not find player to update');

        newMatch[side].players[pIndex].effort[key] = val;

        // update team goals
        if (key === 'goals') {
            newMatch[side].goals = 0;
            newMatch[side].players.forEach(p => {
                newMatch[side].goals += parseInt(p.effort.goals);
            });
        }

        matchUpdater(newMatch);
    };

    const columns = effortColumns({ setters: { updatePlayer } });

    return (
        <Wrapper className="Effort Outer unmarkable" customStyle="width: 100%;">
            <h3>{club}</h3>

            <Wrapper className="Effort Inner unmarkable" customStyle="width: 100%;">
                <TableStyled
                    className="EffortForm unmarkable"
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: ['topCenter', 'bottomCenter'], pageSize: 50 }}
                    scroll={{ y: 240 }}
                />
            </Wrapper>
        </Wrapper>
    );
};

export default withAdmin(withNewRes(EffortForm));
