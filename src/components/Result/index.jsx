import React, { useEffect, useState } from 'react';
import { withAuthentication } from '../Session';
import { withTeam } from '../NewTeam/ctx';
import apis from '../../constants/api';
import styled from 'styled-components';
import ResultCard from './ResultCard';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const MyTeams = props => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [result, setResult] = useState(null);
    const [sum, setSum] = useState('');
    const round = '666'; // todo: create shared team context

    const calcSum = key => {
        if (!result) return;

        const res = result.reduce((tot, next) => {
            return tot + next.points.sum;
        }, 0);

        setSum(res);
    };

    // get curr user
    const userInit = async () => {
        console.log('user init');

        await props.firebase.auth.onAuthStateChanged(user => {
            console.log('user', user.uid);
            if (user) setUser(user.uid);
        });
    };

    // run user init once on start
    useEffect(() => {
        userInit();
    }, []);

    // load res after user init/change
    useEffect(() => {
        if (!user) return;

        resHandler();
    }, [user]);

    // load res after user init/change
    useEffect(() => {
        if (!result) return;

        calcSum();
    }, [result]);

    const resHandler = async () => {
        if (!user) return;
        if (loading) {
            setLoading(false);
            setResult(null);
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

    return (
        <div>
            <h1>My Teams...</h1>

            {loading && (
                <h3>
                    <i>Laddar resultat...</i>
                </h3>
            )}

            {!result && (
                <button style={{ color: 'black' }} onClick={resHandler}>
                    {!loading ? 'Hämta igen' : 'Avbryt'}
                </button>
            )}

            {result && (
                <>
                    <h3>
                        Resultat omgång {round}: <strong>{sum} poäng</strong>
                    </h3>
                    <Wrapper className="ResultWrapper">
                        {result.map(player => (
                            <ResultCard key={player._id} player={player} width={50} />
                        ))}
                    </Wrapper>
                </>
            )}
        </div>
    );
};

export default withAuthentication(withTeam(MyTeams));
