import React, { Component } from 'react';
import './collapsible.css';
import Arrow from '../../media/arrowG.svg';
import { Payout } from './overview.styles';

class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open });
    }
    render() {
        return (
            <div>
                <div onClick={e => this.togglePanel(e)} className="header">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '85%'
                        }}
                    >
                        <h5>Resultat</h5>
                        <img src={Arrow} alt="arrow" />
                    </div>
                </div>
                {this.state.open ? (
                    <div className="content">
                        <div className="contentWrapper">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginBottom: '15px'
                                }}
                            >
                                <div>
                                    <h5>Totalpoäng</h5>
                                    <p className="stakeSum">{this.props.totalPoints}</p>
                                </div>

                                <div>
                                    <h5>Din ranking</h5>
                                    <p className="stakeSum">1</p>
                                </div>
                            </div>
                            <Payout>
                                <h6>Utdelning</h6>
                                <p className="revenueSum">22 000kr</p>
                            </Payout>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Collapsible;
