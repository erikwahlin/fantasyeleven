import React from 'react';
import { withMyTeam } from './ctx';
import styled from 'styled-components';
import BuildStages from './BuildStages';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 900px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const ChosenPlayers = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const InfoTitle = styled.h2`
	margin: 0;
	margin-bottom: 0.2rem;
`;

const InfoP = styled.p`
	color: ${p => (p.notReady ? 'hotpink' : p.ready ? '#35892A' : 'white')};
`;

const ClearBtn = styled.button`
	width: 100px;
	height: 50px;
	background: #031e3d;
	border: 1px solid white;
	border-radius: 2px;
	outline: none;
	cursor: pointer;
	font-family: 'Avenir';
	font-size: 0.9em;
	font-weight: bold;
	color: white;
`;

const BuildInfo = ({ teamValue, myTeam, origin }) => {
	const { team, config } = myTeam.state;
	const { buildStage } = config;
	const { delPlayer } = myTeam.setters;
	const maxPlayers = origin === 'pitch' ? 11 : 4;
	const maxValue = origin === 'bench' ? 30 : null;
	const playerCount = team.list.filter(player => player.origin === origin).length;

	const pitchReady = playerCount === 11;
	const benchReady = buildStage === 'bench' && teamValue <= maxValue && playerCount === maxPlayers;
	const benchNotReady = buildStage === 'bench' && teamValue > maxValue;

	const clearPlayers = () => {
		// alla spelare på []
		const players = team.list.filter(player => player.origin === origin);
		players.forEach(player => delPlayer(player));
		// loop, kör delPlayer på []
	};

	console.log('playercount', playerCount);

	return (
		<Wrapper className="BuildInfo unmarkable">
			<ChosenPlayers>
				<InfoTitle className="infoTitle">Valda {origin === 'pitch' ? 'spelare' : 'reserver'}</InfoTitle>
				<InfoP ready={pitchReady} className="amount">
					{playerCount + '/' + maxPlayers}
				</InfoP>
			</ChosenPlayers>

			<ClearBtn onClick={clearPlayers}>Radera spelare</ClearBtn>

			<ChosenPlayers>
				<InfoTitle className="infoTitle">Totalt pris</InfoTitle>
				<InfoP className="amount" ready={benchReady} notReady={benchNotReady}>
					{teamValue + ' kr'}
				</InfoP>
			</ChosenPlayers>

			{buildStage.key === 'bench' && (
				<ChosenPlayers>
					<InfoTitle className="infoTitle">Budget</InfoTitle>
					<InfoP className="amount">{maxValue + ' kr'}</InfoP>
				</ChosenPlayers>
			)}
		</Wrapper>
	);
};

export default withMyTeam(BuildInfo);
