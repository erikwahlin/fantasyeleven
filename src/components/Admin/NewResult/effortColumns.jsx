import React from 'react';
import { toSwe } from '../../../constants/helperFuncs';
import { playtimeOptions, initialEffort } from '../../../constants/gamePreset';

const createCol = ({ col, setters }) => {
    const { updatePlayer } = setters;

    const wordForm = col === 'cleanSheets' || col === 'red' || col === 'playtime' ? 'sing' : 'plur';

    const res = {
        title: toSwe(col, 'effort', wordForm) + (col === 'playtime' ? ' (min)' : ''),
        dataIndex: col,
        key: col
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
        res.render = input => (
            <>
                <select
                    defaultValue="0"
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
    } else {
        res.render = input => {
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
};

const effortColumns = ({ setters }) =>
    Object.keys(initialEffort).map(col => createCol({ col, setters }));

export default effortColumns;
