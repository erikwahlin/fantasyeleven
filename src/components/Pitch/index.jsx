import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import Plupp from '../MyTeam/Plupp';
import Bench from '../Bench';

import pitchImg from '../../media/pitch.png';

const Wrapper = styled.div`
	height: 422px; /* 0.906 */
	max-width: 580px; /* Or do we make pitch wider? */
	display: flex;
	flex-direction: column;
`;

const FieldContainer = styled.div`
	width: 576px;
	height: 500px;
	background: url(${p => p.bg});
	background-size: cover;
	background-repeat: no-repeat;
	@media screen and (max-width: 602px) {
		background-size: auto 100%;
	}

	flex: 1;
`;

const InfoContainer = styled.div`
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

const BenchContainer = styled.div`
	flex: 1;
	background: grey;
`;

const InfoP = styled.p`
	color: ${p => p.ready && '#35892A'};
`;

const FormationContainer = styled.div`
	margin: auto;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const PosLineup = styled.div`
	width: 100%;
	height: 100px;
	min-height: 117px;
	flex: 1;
	position: relative;
	display: flex;
	justify-content: space-evenly;
`;

const PluppContainer = styled.div`
	flex: 1;
	height: 100%;
	min-height: 117px;
	flex: 1;
	position: relative;
	display: flex;
	justify-content: space-evenly;
`;

const ClearPitch = styled.button`
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

const Pitch = props => {
	const { config, team, game } = props.myTeam.state;
	const { delPlayer } = props.myTeam.setters;

	const playerCount = team.list.length;

	const { pitch: pitchLimit } = config.limit;

	const clearPitch = () => {
		// alla spelare på []
		const pitchPlayers = team.list.filter(player => player.origin === 'pitch');
		pitchPlayers.forEach(player => delPlayer(player));
		// loop, kör delPlayer på []
	};

	/* 
	WIPWIPWIP
	const autoPick = () => {
		// for each pos, check if limit is reach
		// while limit is not reach fill with players of that pos
		// set origin field on player before add
		config.positions.forEach(pos => {
			

			config.searchablePlayers.forEach(player => {
				let pitchLimit = config.limit.pitch[pos].limit.max;
				let limitReached = team.count.pitch[pos]

				const add = () => {
					
					if (!limitReached) {
						console.log('fake adding player');
						
					}
				};
			})
		});
	}; */

	return (
		<Wrapper className="Pitch">
			<InfoContainer className="InfoContainer unmarkable">
				<ChosenPlayers>
					<InfoTitle className="infoTitle">Valda spelare</InfoTitle>
					<InfoP ready={playerCount === 15} className="amount">
						{playerCount + '/15'}
					</InfoP>
				</ChosenPlayers>

				<ClearPitch onClick={clearPitch}>Radera lag</ClearPitch>

				<ChosenPlayers>
					<InfoTitle className="infoTitle">Totalt pris</InfoTitle>
					<InfoP className="amount">{game.value + ' kr'}</InfoP>
				</ChosenPlayers>
			</InfoContainer>

			<FieldContainer className="FieldContainer" bg={pitchImg}>
				<FormationContainer className="FormationContainer">
					{config.positions.map((pos, nth) => (
						<PosLineup key={`lineup-${nth}`} className={`PosLineup ${pos}`}>
							{team.pitch[pos].map((player, nth) => (
								<PluppContainer
									key={player.uid}
									className={`PluppContainer ${pos} unmarkable`}
									player={player}
								>
									<Plupp
										origin="pitch"
										player={player}
										pos={player.position}
										lineupCount={team.pitch[pos].length}
										lineupIndex={nth}
									/>
								</PluppContainer>
							))}
						</PosLineup>
					))}
				</FormationContainer>
			</FieldContainer>
			<Bench />
		</Wrapper>
	);
};

export default withMyTeam(Pitch);
