import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import pitchImg from '../../media/pitch.png';
import pluppW from '../../media/pluppW.png';

import Plupp from '../Plupp';

import Bench from '../Bench';

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

	& > span.playerName {
		position: absolute;
		top: 18px;
		font-size: 0.7em;
		text-align: center;
		/* text-shadow: 0 0 6px #333; */
		color: #dda;
	}
`;

/* const Plupp = styled.img`
	width: 50px;
	align-self: center;

	${p => p.position};
	${p => p.lineupCount};
	${p => p.lineupIndex};
`; */

const Pitch = props => {
	const { state, setters } = props.myTeam;

	const { config, team, game } = state;

	const playerCount = team.list.length;

	const shortName = fullName => {
		const afterSpace = fullName.indexOf(' ') + 1;

		let lastName = fullName.substring(afterSpace);

		let midName = '';

		const firstName = lastName.length < 9 ? fullName[0] + '.' : '';

		if (lastName.includes('-')) {
			const afterHyphen = lastName.indexOf('-') + 1;

			midName = lastName[0] + '-';

			lastName = lastName[afterHyphen].toUpperCase() + lastName.substring(afterHyphen + 1);
		}

		return `${firstName} ${midName}${lastName}`;
	};

	return (
		<Wrapper className="Pitch">
			<InfoContainer className="InfoContainer">
				<ChosenPlayers>
					<InfoTitle className="infoTitle">Valda spelare</InfoTitle>
					<InfoP ready={playerCount === 15} className="amount">
						{playerCount + '/15'}
					</InfoP>
				</ChosenPlayers>

				<ChosenPlayers>
					<InfoTitle className="infoTitle">Totalt pris</InfoTitle>
					<InfoP className="amount">{game.value + 'kr'}</InfoP>
				</ChosenPlayers>
			</InfoContainer>

			<FieldContainer className="FieldContainer" bg={pitchImg}>
				<FormationContainer className="FormationContainer">
					{config.positions.map((pos, nth) => (
						<PosLineup key={`lineup-${nth}`} className={`PosLineup ${pos}`}>
							{team.pitch[pos].map((player, nth) => {
								const pitchOrBench = player.playFromStart ? 'pitch' : 'bench';

								return (
									<PluppContainer key={player.uid} className={`PluppContainer ${pos}`} player={player}>
										<span className="playerName">{shortName(player.name)}</span>
										<Plupp
											pitchOrBench={pitchOrBench}
											player={player}
											pos={player.position}
											lineupCount={team.pitch[pos].length}
											lineupIndex={nth}
										/>
										{/* <Plupp
										alt="player-plupp"
										src={pluppW}
										position={pos}
										lineupCount={team.pitch[pos].length}
										lineupIndex={nth}
										onClick={e => setters.delHandler(player)}
									/> */}
									</PluppContainer>
								);
							})}
						</PosLineup>
					))}
				</FormationContainer>
			</FieldContainer>
			<Bench />
		</Wrapper>
	);
};

export default withMyTeam(Pitch);
