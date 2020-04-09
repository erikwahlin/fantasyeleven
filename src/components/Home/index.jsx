import React, { Component } from 'react';
import { compose } from 'recompose';
import '../PlayerSearch/styles.css';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import Styled from 'styled-components';
import MyTeam from '../MyTeam/index';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null
		};
	}

	componentDidMount() {
		this.props.firebase.users().on('value', snapshot => {
			this.setState({
				users: snapshot.val()
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}

	render() {
		return (
			<div className="HomePage">
				<MyTeam />
			</div>
		);
	}
}

const condition = authUser => !!authUser;

export default compose(
	withFirebase,
	//  withEmailVerification,
	withAuthorization(condition)
)(HomePage);
