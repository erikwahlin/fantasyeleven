import React from 'react';
import { withNewTeam } from '../ctx';
import styled from 'styled-components';

const Wrapper = styled.div`
	color: white;
`;

const Title = styled.h2``;

const Power = styled.p`
	font-size: 1.5em;
`;

const Powerups = props => (
	<Wrapper>
		<Title>Superkrafter</Title>
		<br />
		<br />
		<br />
		<Power>Kapten Trippel</Power>
		<Power>Hål i nätet</Power>
		<Power>Guds hand</Power>
		<Power>8cm dobbar</Power>
	</Wrapper>
);

export default withNewTeam(Powerups);
