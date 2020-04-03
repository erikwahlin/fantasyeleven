import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
//import PluppB from '../../media/pluppB.png';
import PluppG from '../../media/pluppG.svg';
import Plupp from '../Plupp';

const Wrapper = styled.div`
	width: 100%;
	height: 150px;

	display: flex;
	justify-content: space-evenly;

	background: none;

	border-top: 1px solid white;
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
	const { state } = props.myTeam;
	const { config, team } = state;

	return (
		<Wrapper className="Bench">
			{config.positions.map((pos, nth) => (
				<PluppContainer key={`pos-${nth}`} className={`PluppContainer ${pos}`}>
					<Plupp
						bench={true}
						pos={pos}
						player={team.bench[pos][0]}
						lineupCount={team.bench[pos].length}
						lineupIndex={0}
						pitchOrBench={'bench'}
					/>
					{/* <Plupp
						alt="player-plupp"
						src={pluppG}
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
