import React, { useEffect, useState } from 'react';
import { withAuthentication } from '../Session';
import { withNewTeam } from '../NewTeam/ctx';
import apis from '../../constants/api';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
`;

const Card = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const P = styled.p`
    display: inline;
    flex: 1;
    fonst-size: 1em;
`;

const Label = styled(P)`
    font-weight: 100;
`;

const Val = styled(P)`
    font-weight: 700;
    margin-left: 20px;
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
                    <Wrapper>
                        {result.map(p => (
                            <Card key={p.uid}>
                                <Label>{p.name}</Label>
                                <Label>PRESTATION</Label>
                                {Object.keys(p.effort).map(key => (
                                    <div key={key}>
                                        <Label>{key}</Label>
                                        <Val>{p.effort[key]}</Val>
                                    </div>
                                ))}
                                <Label>POÄNG</Label>
                                {Object.keys(p.points).map(key => (
                                    <div key={key}>
                                        <Label>{key}</Label>
                                        <Val>{p.points[key]}</Val>
                                    </div>
                                ))}
                                }
                            </Card>
                        ))}
                    </Wrapper>
                </div>
            )}
        </div>
    );
};

export default withAuthentication(withNewTeam(MyTeams));
