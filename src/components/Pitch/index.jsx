import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import pitchImg from '../../media/pitch.png';
import pluppW from '../../media/pluppW.png';

import Plupp from '../Plupp';

import Bench from '../Bench';

const Wrapper = styled.div`
	width: 500px; /* 1.000 */
	height: 453px; /* 0.906 */

	display: flex;
	flex-direction: column;
`;

const PitchContainer = styled.div`
	background: url(${p => p.bg});
	background-size: cover;
	background-repeat: no-repeat;

	@media screen and (max-width: 602px) {
		background-size: auto 100%;
	}

	flex: 4;
`;

const BenchContainer = styled.div`
	flex: 1;
	background: grey;
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
	min-height: 100px;
	flex: 1;
	position: relative;
	display: flex;
	justify-content: space-evenly;
`;

const PluppContainer = styled.div`
	flex: 1;
	height: 100%;
	min-height: 100px;
	flex: 1;
	position: relative;
	display: flex;
	justify-content: space-evenly;

	& > span.playerName {
		position: absolute;
		font-size: 0.7em;
		text-align: center;
		text-shadow: 0 0 6px #333;
		color: ${p => (p.player.position === 'Goalkeeper' ? '#000' : '#dda')};
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

	const { config, team } = state;

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
			<PitchContainer className="PitchContainer" bg={pitchImg}>
				<FormationContainer className="FormationContainer">
					{config.positions.map((pos, nth) => (
						<PosLineup key={`lineup-${nth}`} className={`PosLineup ${pos}`}>
							{team.pitch[pos].map((player, nth) => (
								<PluppContainer key={player.uid} className={`PluppContainer ${pos}`} player={player}>
									<Plupp player={player} lineupCount={team.pitch[pos].length} lineupIndex={nth} />
									{/* <Plupp
										alt="player-plupp"
										src={pluppW}
										position={pos}
										lineupCount={team.pitch[pos].length}
										lineupIndex={nth}
										onClick={e => setters.delHandler(player)}
									/> */}
									<span className="playerName">{shortName(player.name)}</span>
								</PluppContainer>
							))}
						</PosLineup>
					))}
				</FormationContainer>
			</PitchContainer>
			<Bench />
		</Wrapper>
	);
};

export default withMyTeam(Pitch);
