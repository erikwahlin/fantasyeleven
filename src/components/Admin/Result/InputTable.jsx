import React from 'react';
import styled from 'styled-components';
import { withAdmin } from '../AdminState';
import { withResult } from './ResultState';
import { Wrapper } from '../template/wrapperTemplate';

import { Table } from 'antd';
import { clone, toSwe, effortToPoints, userMsg } from '../../../constants/helperFuncs';

import handleResultConflicts from '../../../constants/handleResultConflicts';

import createColumns from './createColumns';
import NewResult from '.';

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
`;

const InputTable = ({ adminContext, resultContext, roundIndex, matchIndex, side, ...props }) => {
    const otherside = side === 'home' ? 'away' : 'home';
    const { matchUpdater } = resultContext.setters;
    const { newRes, step, substep } = resultContext.state;
    const match = newRes[step];
    const { club, players } = match[side];

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
        let newMatch = clone(match);

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

        // RULES
        // if goals > 0, no cleanSheet for vs-team

        newMatch[side].players[pIndex].effort[key] = val;
        newMatch[side].players[pIndex].points[key] = effortToPoints({ key, val, player });

        // update poinst here***

        // update team goals
        if (key === 'goals') {
            newMatch[side].goals = 0;
            newMatch[side].players.forEach(p => {
                newMatch[side].goals += parseInt(p.effort.goals);
            });
        }

        matchUpdater(newMatch);

        handleResultConflicts({
            match: newMatch,
            player,
            key,
            val,
            side,
            otherside,
            pIndex,
            updater: matchUpdater
        });
    };

    const columns = createColumns({ setters: { updatePlayer } });

    return (
        <Wrapper className="Effort Outer unmarkable" customstyle="width: 100%;">
            <h3>{club}</h3>

            <Wrapper className="Effort Inner unmarkable" customstyle="width: 100%;">
                <TableStyled
                    className="InputTable unmarkable"
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: ['bottomCenter'], pageSize: 100 }}
                    scroll={{ y: 300 }}
                />
            </Wrapper>
        </Wrapper>
    );
};

export default withAdmin(withResult(InputTable));
