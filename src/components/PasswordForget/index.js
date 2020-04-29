import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components'

const InputWrap = styled.div`
color: white;
display:flex;
flex-direction: row;
align-items: center;
margin: 5px;
`

const Input = styled.input`
background-color: white;
outline: none;
height: 1.9em;
width: 90%;
font-size: 1.0em;

border-radius: 0 4px 4px 0;
border: 1px solid lightgray;

`

const Placeholder = styled.span`
background: rgb(5, 66, 122);
color: white;
border-radius: 4px 0 0 4px;
height: 2.2em;
width: 10em;
font-size: 1.0em;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
`

const Form = styled.form`
margin: 0 auto;
	width: 50%;
	display:flex;	
	flex-direction: column;
	min-height: 100vh;
	display:flex;
	justify-content: center;
	`

const SubmitButton = styled.button`padding: 12px;
background-color: rgb(5, 66, 122);
border-radius: 4px;
color: white;
font-weight: bold;
font-size: 1.0em;
cursor: pointer;
margin-top: 40px;
border:none;
`

const Wrapper = styled.div`
background-color: rgba(2,31,61,1)
`


const PasswordForgetPage = () => (
	<Wrapper>
		<PasswordForgetForm />
	</Wrapper>
);

const INITIAL_STATE = {
	email: '',
	error: null
};

class PasswordForgetFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
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
		const { email, error } = this.state;

		const isInvalid = email === '';

		return (
			<Form onSubmit={this.onSubmit}>
				<InputWrap>
				<Placeholder>E-postadress</Placeholder>
				<Input
					name='email'
					value={this.state.email}
					onChange={this.onChange}
					type='text'
				/>
				</InputWrap>
				
				<SubmitButton disabled={isInvalid} type='submit'>
					Återställ lösenord
				</SubmitButton>

				{error && <p>{error.message}</p>}
			</Form>
		);
	}
}

const PasswordForgetLink = () => (
	<p>
		<Link to={ROUTES.PASSWORD_FORGET}>Glömt lösenord?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
