import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components'

const Form = styled.form`
	margin: 0 auto;
	width: 50%;
	display:flex;	
	flex-direction: column;
`
const InputWrap = styled.div`
color: white;
display:flex;
flex-direction: column;
margin-top: 10px
`
const Button = styled.button`
width: 90px;
height:40px;
align-self: flex-end;
color: white;
background-color:

`
const Input = styled.input`
background-color: rgba(2,31,61,1);
color: white;
outline: none;
height: 1.9em;
font-size: 1.0em;
border: none;
border-bottom: 1px solid white;
`
const Wrapper = styled.div`
background-color: rgba(2,31,61,1)
`
const SignUpPage = () => (
	<Wrapper>
		<h1>Börja spela</h1>
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
		this.setState({ [event.target.name]: event.target.value });
	};

	onChangeCheckbox = event => {
		this.setState({ [event.target.name]: event.target.checked });
	};

	render() {
		const {
			username,
			email,
			passwordOne,
			passwordTwo,
			isAdmin,
			error
		} = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';

		return (
			<Form onSubmit={this.onSubmit}>
				<InputWrap>
				Namn
				<Input
					name='username'
					value={username}
					onChange={this.onChange}
					type='text'
				/>
				</InputWrap>
				<InputWrap>
				Email
				<Input
					name='email'
					value={email}
					onChange={this.onChange}
						type='text'
				/>
				</InputWrap>
				<InputWrap>
				Lösenord
				<Input
					name='passwordOne'
					value={passwordOne}
					onChange={this.onChange}
					type='password'

				/>
				</InputWrap>
				<InputWrap>
				Lösenord igen
				<Input
					name='passwordTwo'
					value={passwordTwo}
					onChange={this.onChange}
					type='password'
				/>
				</InputWrap>
				<label>
					Admin:
					<input
						name='isAdmin'
						type='checkbox'
						checked={isAdmin}
						onChange={this.onChangeCheckbox}
					/>
				</label>
				<Button disabled={isInvalid} type='submit'>
					Registrera
				</Button>

				{error && <p>{error.message}</p>}
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
