import React from 'react';
import Icon from 'antd/lib/icon';
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import './ClubPicker.css';
import { initialMatches } from '../../../constants/gamePreset';
import allClubs from '../../../constants/clubs';
import { clone } from '../../../constants/helperFuncs';

const getMatchNum = index => {
    const num = index + 1;
    return num <= 2 ? 1 : num % 2 === 0 ? num / 2 : (num + 1) / 2;
};

const dataArray = [
    ...allClubs.map((club, nth) => {
        return {
            icon: 'question-circle-o',
            color: '#fff',
            title: club.long,
            /* text: getMatch(nth), */
            src: nth,
            text: 'Match...'
        };
    })
];

// all teams in list // 2 teams per match //

export default class ClubPicker extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'list-sort-demo'
    };

    constructor(props) {
        super(props);

        this.state = {
            matches: initialMatches().map(club => {
                return club;
            }),
            newPos: [],
            data: clone(dataArray)
        };

        this.callback = this.callback.bind(this);
        this.getMatchNum = this.getMatchNum.bind(this);
        this.updateDataIndex = this.updateDataIndex.bind(this);
    }

    updateDataIndex = () => {
        const { data, newPos } = this.state;

        this.setState({
            data: data.map((d, nth) => {
                console.log('newpos for', d.title, newPos[d.title]);
                return {
                    ...d,
                    text: newPos[d.title]
                };
            })
        });
        /*  this.state.data.forEach(d => {
            const listClub = this.state.list.filter(l => l.src === index)[0];
        });

        const club = this.state.list.filter(l => l.src === index)[0];
        newIndex = club.newPos;
        console.log(club.club.long, club.newPos, 'matchNum:', getMatchNum(newIndex)); */
    };

    getMatchNum = index => {
        if (this.state.list.length) return 'hej';
        const club = this.state;

        const num = index + 1;
        return num <= 2 ? 1 : num % 2 === 0 ? num / 2 : (num + 1) / 2;
    };

    callback = list => {
        if (typeof list === 'string') return list;
        //console.log('callbackRes', list);
        const newPos = {};

        list.forEach(item => {
            newPos[item.club.long] = item.newPos;
        });

        this.setState({ newPos }, () => {
            this.updateDataIndex();
        });
        //return info;
    };

    render() {
        const childrenToRender = data =>
            data.map((item, i) => {
                const { icon, color, title, text, src } = item;

                console.log(title, text);

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
                <div className={`${this.props.className}`} style={{ overflowY: 'scroll' }}>
                    <ListSort
                        dragClassName="list-drag-selected"
                        appearAnim={{
                            animConfig: { marginTop: [5, 30], opacity: [1, 0] }
                        }}
                        customcallback={this.callback}
                    >
                        {childrenToRender(this.state.data)}
                    </ListSort>
                </div>
            </div>
        );
    }
}
