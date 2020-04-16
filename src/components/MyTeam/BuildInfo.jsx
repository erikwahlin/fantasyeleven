import React from 'react';
import { withMyTeam } from './ctx';
import styled from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';

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
	color: ${p => (p.notReady ? 'red' : p.ready ? '#35892A' : 'white')};
`;

const ClearBtn = styled.button`
	width: 100px;
	height: 35px;
	background: #5AC5D3;
	border:none;
	border-radius: 15px;
	outline: none;
	cursor: pointer;
	font-family: 'Avenir';
	font-size: 1.1em;
	font-weight: 500;
	color: black;
	padding:5px;
`;

const AddPlayerBtn = styled(FaUserPlus)`
	width: 65px;
	height: 100%;
	color: white;

	cursor: pointer;
`;

const BuildInfo = ({ myTeam, origin }) => {
	const { team, config, game } = myTeam.state;
	const { buildStage, limit, mobileSearch } = config;
	const { key: activeStage } = buildStage;
	const { delPlayer, openPlayerSearch } = myTeam.setters;

	const maxPlayers = limit[origin].tot;
	const maxValue = limit.value[origin];

	const playerCount = team.list.filter(player => player.origin === origin).length;
	const teamValue = game.value[origin];

	const ready =
		buildStage.key === 'pitch' || buildStage.key === 'bench'
			? teamValue <= maxValue && playerCount === maxPlayers
			: true;

	const notReady = teamValue > maxValue;

	const clearPlayers = () => {
		// alla spelare på []
		const players = team.list.filter(player => player.origin === origin);
		players.forEach(player => delPlayer(player));
		// loop, kör delPlayer på []
	};

	return (
		<Wrapper className="BuildInfo unmarkable">
			<ChosenPlayers>
				<InfoTitle className="infoTitle">Valda {origin === 'pitch' ? 'spelare' : 'reserver'}</InfoTitle>
				<InfoP ready={ready} className="amount">
					{playerCount + '/' + maxPlayers}
				</InfoP>
			</ChosenPlayers>


			<ChosenPlayers>
				<InfoTitle className="infoTitle">Totalt pris</InfoTitle>
				<InfoP className="amount" ready={ready} notReady={notReady}>
					{teamValue + ' kr'}
				</InfoP>
			</ChosenPlayers>

			{buildStage.key === 'bench' && (
				<ChosenPlayers>
					<InfoTitle className="infoTitle">Budget</InfoTitle>
					<InfoP className="amount">{maxValue + ' kr'}</InfoP>
				</ChosenPlayers>
			)}

			{(activeStage === 'pitch' || activeStage === 'bench') && mobileSearch && (
				<AddPlayerBtn className="AddPlayerBtn" onClick={openPlayerSearch} />
			)}

			<ClearBtn onClick={clearPlayers}></ClearBtn>
		</Wrapper>
	);
};

export default withMyTeam(BuildInfo);
