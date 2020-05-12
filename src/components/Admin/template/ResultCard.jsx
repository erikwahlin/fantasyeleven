import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { toSwe } from '../../../constants/helperFuncs';
import InfoModal from '../../InfoModal';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: ${p => p.width || 300}px;
    margin: 20px;
    /* box-shadow: 0 0 10px black; */
    overflow-y: hidden;
    height: fit-content;
    cursor: pointer;
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

const CardHeader = styled(Row)`
    height: fit-content;
`;

const Content = styled(Row)`
    display: ${p => (p.cardOpen ? 'flex' : 'none')};
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

const PlayerInfo = styled(InfoModal)`
    & .ModalOpenBtn {
        width: unset;
        height: unset;

        & > svg {
            position: relative;
            top: 5px;
        }
    }
`;

const ResultCard = ({ player, width }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);

    const cardClickHandler = e => {
        if (
            e.target.classList.contains('playerinfo') ||
            e.target.closest('.playerinfo') ||
            modalOpen
        ) {
            return;
        }

        if (!cardOpen) {
            setCardOpen(true);
        } else {
            setCardOpen(false);
        }
    };

    return (
        <Card
            key={player._id}
            className="ResultCard unmarkable"
            width={width}
            cardOpen={cardOpen}
            onClick={cardClickHandler}
        >
            <CardHeader className="CardHeader" viewport>
                <LabelStrong flex={3} className="name">
                    {player.name}
                </LabelStrong>

                <LabelStrong className="points">{player.points.sum}p.</LabelStrong>

                {cardOpen && (
                    <PlayerInfo
                        modalStyle={{ background: '#40a9ff' }}
                        openBtnStyle={`width: 28px; height: 28px;`}
                        iconStyle="position: relative; top: 5px; fill: #40a9ff;"
                        isPitch={false}
                        title={player.name}
                        subtitle={`${player.club} - ${toSwe(player.position, 'positions')}`}
                        img="https://source.unsplash.com/random"
                        openCallback={() => setModalOpen(true)}
                        closeCallback={() => setModalOpen(false)}
                    />
                )}
            </CardHeader>

            {cardOpen && (
                <Content className="ResultRow container" cardOpen={cardOpen}>
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
                                        <Val className={`ResultVal ${key}`}>
                                            {player.points[key]}
                                        </Val>
                                    </Row>
                                )
                        )}
                    </Col>
                </Content>
            )}
        </Card>
    );
};

export default ResultCard;
