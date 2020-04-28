import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';
import FormInput from '../FormInput/FormInput';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    width: 120px;
    height: 60px;
    /* align-self: flex-end; */
    color: white;
    background-color: ${props => (props.disabled === false ? '#001c3e' : 'lightgrey')};
    border: 1px solid white;
    &:hover {
        cursor: ${props => (props.disabled === false ? 'pointer' : 'normal')};
        background-color: ${props => (props.disabled === false ? 'white' : '')};
        color: ${props => (props.disabled === false ? 'black' : '')};
    }

    @media all and (max-width: 480px) {
        width: 100vw;
    }
`;
const StyledH1 = styled.h1`
    text-align: center;
    /* margin-top: 20px; */
    font-size: 3em;
`;

const Wrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0px 1px 30px -6px rgba(255, 255, 255, 0.91);
    margin: 0 auto;
    width: 40%;
    background-color: #001c3e;
    justify-content: center;
    display: flex;
    flex-direction: column;
    @media all and (max-width: 480px) {
        width: 100vw;
        box-shadow: none;
        justify-content: space-between;
        height: 100vh;
        /* bottom: 0; */
    }
    @media all and (min-width: 481px) and (max-width: 1200px) {
        width: 80vw;
    }
`;
const SignUpPage = () => (
    <Wrapper>
        <StyledH1>Skapa ett konto</StyledH1>
        <SignUpForm />
    </Wrapper>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = [];

        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles
                });
            })
            //      .then(() => {
            //        return this.props.firebase.doSendEmailVerification();
            //      })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    onChangeCheckbox = event => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };

    render() {
        const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state;
        const pwValidation = (pw1, pw2) => {
            if ((pw1.length === 0 && pw2.length === 0) || pw2.length === 0) {
                return '';
            }
            if (pw2.length < 6) {
                return 'ditt lösenord är kortare än 6 bokstäver';
            }
            if (pw1.length >= 6 && pw2.length >= 6 && pw1 !== pw2) {
                return 'dina lösenord är inte identiska';
            }
        };
        const isPWInvalid =
            passwordTwo.length < 6 || passwordOne !== passwordTwo || passwordTwo.length < 6;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <FormInput
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    label="Användarnamn"
                    required
                />
                <FormInput
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    label="Mailadress"
                    required
                />
                <FormInput
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    isInvalid={isPWInvalid}
                    label="Lösenord"
                    required
                />
                {error && <p>{error.message}</p>}
                <FormInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    isInvalid={isPWInvalid}
                    label="Lösenord Igen"
                    required
                />
                {<p>{pwValidation(passwordOne, passwordTwo)}</p>}
                {/*                 <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label> */}
                <Button disabled={isInvalid} type="submit">
                    Registrera
                </Button>

                {/* error && <p>{error.message}</p> */}
            </Form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Har du inget konto? <Link to={ROUTES.SIGN_UP}>Registrera dig</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
