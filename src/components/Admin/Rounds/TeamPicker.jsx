import React from 'react';
import Icon from 'antd/lib/icon';
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import './TeamPicker.css';
import { initialMatches } from '../../../constants/gamePreset';
import allClubs from '../../../constants/clubs';

const dataArray = [
    ...allClubs.map(club => ({
        icon: 'question-circle-o',
        color: '#fff',
        title: club.long,
        text: ''
    }))
    /* {
        icon: 'question-circle-o',
        color: '#FF5500',
        title: 'Senior Product Designer',
        text: 'Senior Product Designer'
    },
    {
        icon: 'plus-circle-o',
        color: '#5FC296',
        title: 'Senior Animator',
        text: 'Senior Animator'
    },
    {
        icon: 'check-circle-o',
        color: '#2DB7F5',
        title: 'Visual Designer',
        text: 'Visual Designer'
    },
    {
        icon: 'cross-circle-o',
        color: '#FFAA00',
        title: 'Computer Engineer',
        text: 'Computer Engineer'
    } */
];

export default class TeamPicker extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'list-sort-demo'
    };

    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
    }

    callback = (info = '') => {
        return info;
    };

    render() {
        const childrenToRender = dataArray.map((item, i) => {
            console.log('iiiitem', item);
            const { icon, color, title, text } = item;
            return (
                <div key={i} index={i} className={`${this.props.className}-list`}>
                    <div className={`${this.props.className}-icon`}>
                        <Icon type={icon} style={{ color }} />
                    </div>
                    <div className={`${this.props.className}-text`}>
                        <h1>{title}</h1>
                        <p>{text}</p>
                    </div>
                </div>
            );
        });
        return (
            <div className={`${this.props.className}-wrapper`}>
                <div className={this.props.className}>
                    <ListSort
                        dragClassName="list-drag-selected"
                        appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
                        callback={this.callback}
                    >
                        {childrenToRender}
                    </ListSort>
                </div>
            </div>
        );
    }
}
