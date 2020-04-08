import React, { Component } from 'react';
import { compose } from 'recompose';
import '../PlayerSearch/styles.css';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import Styled from 'styled-components';
import MyTeam from '../MyTeam/index';
import Navigation from '../Navigation';

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
		const pathname = this.props.location && this.props.location.pathname;
		return (
			<div style={{ height: '100vh' }} className="HomePage">
				{/* <Navigation pathname={this.props.location.pathname} /> */}
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
