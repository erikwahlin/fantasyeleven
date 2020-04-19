import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { toSwe } from '../../constants/helperFuncs';
import InfoModal from '../InfoModal';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: ${p => p.width || 300}px;
    margin: 20px;
    box-shadow: 0 0 10px black;
`;

const Col = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    margin: 0;
`;

const P = styled.p`
    flex: 1;
    fonst-size: 1em;
    margin: 0;
    padding: 5px;
`;

const Label = styled(P)`
    font-weight: 100;
    ${p =>
        p.flex &&
        css`
            flex: ${p.flex};
        `};
`;

const LabelStrong = styled(Label)`
    font-size: 1.2em;
    font-weight: 700;
`;

const Val = styled(P)`
    font-weight: 700;
`;

const ResultCard = ({ player, width }) => {
    const [modalOpen, setModalOpen] = useState(false);

    /* const toggleModal = () => {
        setModalOpen;
    }; */

    return (
        <Card key={player.uid} className="ResultCard" width={width}>
            <Row className="ResultRow name">
                <LabelStrong flex={3} className="ResultLabel name">
                    {player.name}
                </LabelStrong>
                <LabelStrong>{player.points.sum}p.</LabelStrong>
                <InfoModal
                    openBtnStyle={`width: 28px; height: 28px;`}
                    isPitch
                    title={player.name}
                    subtitle={`${player.club} - ${toSwe(player.position, 'positions')}`}
                    img="https://source.unsplash.com/random"
                    /* display={this.state.playerModal}
                    togglePlayerModal={this.togglePlayerModal} */
                />
            </Row>

            <Row className="ResultRow container">
                <Col className="ResultCol effort">
                    <Row className="ResultRow title">
                        <Label className="ResultLabel effort">PRESTATION</Label>
                    </Row>
                    {Object.keys(player.effort).map(key => (
                        <Row key={key} className={`ResultRow ${key}`}>
                            <Label className={`ResultLabel ${key}`}>{key}</Label>
                            <Val className={`ResultVal ${key}`}>{player.effort[key]}</Val>
                        </Row>
                    ))}
                </Col>

                <Col className="ResultCol points">
                    <Row className="ResultRow title">
                        <Label className="ResultLabel points">POÄNG</Label>
                    </Row>
                    {Object.keys(player.points).map(
                        key =>
                            key !== 'sum' && (
                                <Row key={key} className={`ResultRow ${key}`}>
                                    <Label className={`ResultLabel ${key}`}>{key}</Label>
                                    <Val className={`ResultVal ${key}`}>{player.points[key]}</Val>
                                </Row>
                            )
                    )}
                </Col>
            </Row>
        </Card>
    );
};

export default ResultCard;
