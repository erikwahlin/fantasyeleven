import React from 'react';
import Navigation from '../Navigation';

const About = ({ location }) => (
	<div className="AboutPage">
		<Navigation pathname={location.pathname} />

		<h1>Om</h1>
		<p>Blah di blah di bluh...</p>
	</div>
);

export default About;
