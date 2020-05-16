import React from 'react';
import { toSwe, toEng } from '../../../constants/helperFuncs';
import {
    playtimeOptions,
    initialEffort,
    positions,
    positionOrder
} from '../../../constants/gamePreset';

const createCol = ({ col, setters }) => {
    const { updatePlayer, setOrderBy } = setters;

    const wordForm = col === 'cleanSheets' || col === 'red' || col === 'playtime' ? 'sing' : 'plur';

    const width = {
        goals: 50,
        assists: 70,
        cleanSheets: 100,
        yellows: 55,
        red: 60,
        penaltyMisses: 100,
        penaltySaves: 120,
        playtime: 100
    };

    let res = {
        title: toSwe(col, 'efforts', wordForm) + (col === 'playtime' ? ' (min)' : ''),
        dataIndex: col,
        key: col,
        width: width[col],
        align: 'left'
    };

    if (col === 'cleanSheets' || col === 'red') {
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
        res.render = input => {
            const val = typeof input !== 'object' ? input : input.val;

            return (
                <>
                    <select
                        style={{ fontWeight: val != '0' ? '700' : 'normal' }}
                        value={val}
                        onChange={e =>
                            updatePlayer({
                                player: input.player,
                                key: col,
                                val: e.target.value
                            })
                        }
                    >
                        {playtimeOptions.map(opt => (
                            <option
                                key={opt.val}
                                value={opt.val}
                                disabled={opt.disabled ? true : false}
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </>
            );
        };
    } else {
        res.render = input => {
            const val = typeof input !== 'object' ? input : input.val;
            return (
                <>
                    <input
                        type="number"
                        value={val}
                        style={{ width: '50px', fontWeight: val > 0 ? '700' : 'normal' }}
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

        res.sorter = (a, b) => {
            let aVal = a[col];
            let bVal = b[col];
            if (typeof aVal === 'object') aVal = aVal.val;
            if (typeof bVal === 'object') bVal = bVal.val;

            return aVal - bVal;
        };
    }

    return res;
};

const effortColumns = ({ setters }) => {
    const columns = Object.keys(initialEffort).map(col => createCol({ col, setters }));

    columns.unshift({
        title: 'position',
        dataIndex: 'position',
        key: 'position',
        fixed: 'left',
        width: 120,
        align: 'left',
        filters: positions.map(pos => ({
            text: toSwe(pos, 'positions'),
            value: toSwe(pos, 'positions')
        })),
        onFilter: (value, record) => record.position.indexOf(value) === 0,
        sorter: {
            compare: (a, b) =>
                positionOrder[toEng(a.position, 'positioner')] -
                positionOrder[toEng(b.position, 'positioner')],
            multiple: 2
        },
        defaultSortOrder: 'ascend'
    });

    columns.unshift({
        title: 'namn',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 100,
        align: 'left',
        sorter: (a, b) => (a.name < b.name ? -1 : 1),
        defaultSortOrder: 'ascend'
    });

    return columns;
};

export default effortColumns;
