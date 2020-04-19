import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: ${p => p.width || 100}%;
`;

const InfoBtn = styled.button`
    flex: 0.3;
    color: #101d33;
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
    border: white solid 1px;
    margin: 0;
    padding: 5px;
`;

const Label = styled(P)`
    font-weight: 100;
`;

const Val = styled(P)`
    font-weight: 700;
`;

const ResultCard = ({ player, width }) => {
    return (
        <Card key={player.uid} className="ResultCard" width={width}>
            <Row className="ResultRow name">
                <Label className="ResultLabel name">{player.name}</Label>
                <InfoBtn className="InfoBtn">i</InfoBtn>
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
                    {Object.keys(player.points).map(key => (
                        <Row key={key} className={`ResultRow ${key}`}>
                            <Label className={`ResultLabel ${key}`}>{key}</Label>
                            <Val className={`ResultVal ${key}`}>{player.points[key]}</Val>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Card>
    );
};

export default ResultCard;
