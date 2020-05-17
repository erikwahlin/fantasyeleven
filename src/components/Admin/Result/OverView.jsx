import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../template/wrapperTemplate';

import { withAdmin } from '../AdminState';
import { withResult } from './ResultState';

import allClubs from '../../../constants/clubs';
import { Table } from 'antd';

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

const OverView = ({ adminContext, resultContext }) => {
    const matches = resultContext.state.newRes;

    const teamEfforts = [
        'club',
        'goals',
        'assists',
        'cleanSheet',
        'yellows',
        'reds',
        'penaltyMisses',
        'penaltySaves',
        'fullTimers',
        'partTimers'
    ];

    const columns = teamEfforts.map(eff => {
        let res = {
            title: eff,
            dataIndex: eff,
            key: eff,
            width: 100
        };

        if (eff === 'club') {
            res.fixed = 'left';
        }
        return res;
    });

    const data = [];

    matches.forEach((match, nth) => {
        let res = {
            key: nth + 1
        };

        teamEfforts.forEach((eff, nth) => {
            res[eff] = 'x';
        });

        data.push(res);
    });

    return (
        <Wrapper className="OverView Wrapper unmarkable">
            <h2>Översikt</h2>

            <Wrapper className="Effort Inner unmarkable" customStyle="width: 100%;">
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

export default withAdmin(withResult(OverView));
