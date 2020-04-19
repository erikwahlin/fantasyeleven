import React, { useEffect, useState } from 'react';
import { withAuthentication } from '../Session';
import { withNewTeam } from '../NewTeam/ctx';
import apis from '../../constants/api';
import styled from 'styled-components';
import ResultCard from './ResultCard';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: ${p => p.width || 100}%;
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

const MyTeams = props => {
    const [loading, setLoading] = useState(false);
    const [appOnline, setAppOnline] = useState(true);
    const [user, setUser] = useState(null);
    const [result, setResult] = useState(null);

    // get curr user
    const userInit = async () => {
        /* if (!appOnline) {
            save();
            updatesearchablePlayers();
            return;
        } */

        console.log('user init');

        await props.firebase.auth.onAuthStateChanged(user => {
            console.log('user', user.uid);
            if (user) setUser(user.uid);
        });
    };

    useEffect(() => {
        userInit();
    }, []);

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

            <button style={{ color: 'black' }} onClick={resHandler}>
                {!loading ? 'Get result' : 'Cancel'}
            </button>

            {loading && (
                <h2>
                    <i>loading...</i>
                </h2>
            )}

            {result && (
                <div>
                    <h2>Result:</h2>
                    <Wrapper className="ResultWrapper">
                        {result.map(player => (
                            <ResultCard player={player} width={50} />
                        ))}
                    </Wrapper>
                </div>
            )}
        </div>
    );
};

export default withAuthentication(withNewTeam(MyTeams));
