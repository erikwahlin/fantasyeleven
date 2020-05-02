import React, { useEffect, useState } from 'react';
import { withAuthentication } from '../../Session';
import { withTeam } from '../../NewTeam/ctx';
import apis from '../../../constants/api';
import styled from 'styled-components';
import ContentTemplate from './ContentTemplate';
import { Wrapper } from './wrapperTemplate';
import ResultCard from './ResultCard';

const ResultHeader = styled.div`
    cursor: pointer;
    width: 100%;
    margin: 10px;
    margin-bottom: ${p => (p.open ? '0' : '10px')};
    padding: 10px;

    box-shadow: ${p => (p.open ? 'none' : '0 0 10px #eee')};
`;

const ResultContent = styled.div`
    display: ${p => (p.open ? 'flex' : 'none')};

    width: 100%;
    padding: 10px;

    flex-wrap: wrap;
    box-shadow: 0 0 10px #eee;
`;

const Result = props => {
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false);
    const [user, setUser] = useState(null);
    const [result, setResult] = useState(null);
    const [sum, setSum] = useState('');
    const [open, setOpen] = useState(false);

    const round = '666'; // todo: create shared team context

    const userInit = async firebase => {
        await props.firebase.auth.onAuthStateChanged(user => {
            console.log('user', user.uid);

            if (!user) {
                return setFail(true);
            }

            setUser(user.uid);
        });
    };

    const resHandler = async () => {
        if (!user) return;

        if (loading) {
            return;
        }

        setLoading(true);

        await apis
            .get('getResult', user)
            .then(async res => {
                console.log('RES DATA', res.data);
                setResult(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    };

    const calcSum = key => {
        if (!result) return;

        const res = result.reduce((tot, next) => {
            return tot + next.points.sum;
        }, 0);

        setSum(res);
    };

    // run user init once on start
    useEffect(() => {
        if (!result) userInit();
    }, []);

    // load res after user init/change
    useEffect(() => {
        if (!user) return;

        resHandler();
    }, [user]);

    // set points sum
    useEffect(() => {
        if (!result) return;

        setLoading(false);

        calcSum();
    }, [result]);

    return (
        <div className="Result">
            {loading && (
                <h3>
                    <i>Laddar resultat...</i>
                </h3>
            )}

            {fail && (
                <h3>
                    <i>Något gick fel.</i>
                </h3>
            )}

            {result && (
                <>
                    <Wrapper className="Result">
                        <ResultHeader
                            className="ResultHeader"
                            onClick={() => setOpen(!open)}
                            open={open}
                        >
                            <h2>{`Resultat omgång ${round}: ${sum} poäng`}</h2>
                        </ResultHeader>
                        <ResultContent className="ResultContent" open={open}>
                            {result.map(player => (
                                <ResultCard key={player.uid} player={player} width={50} />
                            ))}
                        </ResultContent>
                    </Wrapper>
                </>
            )}
        </div>
    );
};

export default withAuthentication(withTeam(Result));
