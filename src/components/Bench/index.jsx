import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import pluppB from '../../media/pluppB.png';
import Plupp from '../Plupp';

const Wrapper = styled.div`
	width: 100%;
	height: 100px;

	display: flex;
	justify-content: space-evenly;

	background: #fff;
	box-shadow: 0 0 5px #eee;
	border-radius: 30px;
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
		top: 8px;
		font-size: 0.6em;
		text-align: center;
		color: black;
	}
`;

/* const Plupp = styled.img`
	width: 50px;
	align-self: center;

	${p => p.position};
	${p => p.lineupCount};
	${p => p.lineupIndex};
`; */

const Bench = props => {
	const { state, setters } = props.myTeam;
	const { config, team } = state;

	const clickHandler = pos => {
		const player = team.bench[pos][0];

		if (player) {
			setters.delHandler(player);
		}
	};

	return (
		<Wrapper className="Bench">
			{config.positions.map((pos, nth) => (
				<PluppContainer key={`pos-${nth}`} className={`PluppContainer ${pos}`}>
					<Plupp lineupCount={team.bench[pos].length} lineupIndex={nth} />
					{/* <Plupp
						alt="player-plupp"
						src={pluppB}
						position={pos}
						lineupCount={team.pitch[pos].length}
						lineupIndex={nth}
						onClick={e => clickHandler(pos)}
					/> */}
					{team.bench[pos][0] && <span className="playerName">{team.bench[pos][0].name}</span>}
				</PluppContainer>
			))}
		</Wrapper>
	);
};

export default withMyTeam(Bench);
