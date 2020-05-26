import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

import { Form } from '../../general-form-styled/form-styling';

const Input = styled.input`
    background-color: #e2dddd;
    outline: none;
    height: 3em;
    width: 90%;
    font-size: 1.2em;
    font-weight: 500;
    border-radius: 0 4px 4px 0;
    border: 1px solid lightgray;
    color: black;
    padding-left: 15px;
    font-family: 'Avenir';
`;

const InputWrap = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px;
`;

/* const Form = styled.form`
    margin: 0 auto;
    width: 55%;
    height: 400px;
    padding: 100px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;
 */
const Placeholder = styled.span`
    background: rgba(36, 132, 10, 0.6);
    color: white;
    border-radius: 4px 0 0 4px;
    height: 3em;
    width: 10em;
    font-size: 1.2em;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SubmitButton = styled.button`
    padding: 12px;
    background-color: rgba(36, 132, 10, 0.6);
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: -20px;
    border: none;
    width: 30%;
    outline:none;
`;

const GoogleButton = styled.button`
    padding: 12px;
    background-color: rgb(5, 66, 122);
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: -20px;
    border: none;
    width: 60%;
`;

const FacebookButton = styled.button`
    padding: 12px;
    background-color: rgb(5, 66, 122);
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: -20px;
    border: none;
    width: 60%;
`;
const TwitterButton = styled.button`
    padding: 12px;
    background-color: rgb(5, 66, 122);
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: -20px;
    border: none;
    width: 60%;
`;
const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SocialButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Wrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
`;

const SignInPage = () => (
    <Wrapper>
        <SignInForm />
    </Wrapper>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.ADMIN);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <InputWrap>
                    <Placeholder>E-postadress</Placeholder>
                    <Input name="email" value={email} onChange={this.onChange} type="text" />
                </InputWrap>
                <InputWrap>
                    <Placeholder>Lösenord</Placeholder>
                    <Input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                    />
                </InputWrap>

                <ButtonWrap>
                    <SubmitButton disabled={isInvalid} type="normal submit">
                        Logga in
                    </SubmitButton>
                    {/*                     <SignInGoogle />
                    <SignInFacebook /> */}
                    {/* <SignInTwitter /> */}
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <PasswordForgetLink />
                        <SignUpLink />
                    </div>
                </ButtonWrap>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email,
                    roles: []
                });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <SocialButtonWrap onSubmit={this.onSubmit}>
                <GoogleButton type="submit">
                    {' '}
                    <FcGoogle /> &nbsp; Logga in med Google
                </GoogleButton>

                {error && <p>{error.message}</p>}
            </SocialButtonWrap>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: []
                });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <SocialButtonWrap onSubmit={this.onSubmit}>
                <FacebookButton type="submit">
                    {' '}
                    <FaFacebookF /> &nbsp; Logga in med Facebook
                </FacebookButton>

                {error && <p>{error.message}</p>}
            </SocialButtonWrap>
        );
    }
}

class SignInTwitterBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithTwitter()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: []
                });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <div
                style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}
            >
                <SocialButtonWrap onSubmit={this.onSubmit}>
                    <TwitterButton type="submit">
                        <FaTwitter /> &nbsp; Logga in med Twitter
                    </TwitterButton>

                    {error && <p>{error.message}</p>}
                </SocialButtonWrap>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <PasswordForgetLink />
                    <SignUpLink />
                </div>
            </div>
        );
    }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);

const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);

/* const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase); */

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };
