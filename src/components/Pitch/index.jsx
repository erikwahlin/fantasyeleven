import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import { shortenName, getRefSize, afterWinResize } from '../MyTeam/helperFuncs';
import Plupp from '../Plupp';
import Bench from '../Bench';
import pitchImg from '../../media/pitch.png';
import InfoContainer from './InfoContainer';

const Wrapper = styled.div`
	/* height: 422px; */ /* 0.906 */
	/* max-width: 580px; */ /* Or do we make pitch wider? */
	/* max-width: 576px; */

	/* display: flex;
	flex-direction: column;

	

	background: hotpink;

	text-align: center;
	& > * {
	} */

	grid-row: 2;

	/* height: ${p => (p.pitchSize ? p.pitchSize.h + 80 : 0)}px; */

	display: grid;
	grid-template-columns: 100%;
	position: relative;
	width: 100%;
	max-width: 800px;
	margin: auto;
	margin-top: 0;

	@media screen and (min-width: 800px) {
		grid-column: 2;
	}
`;

const FieldContainer = styled.div`
	/* min-height:522px; */
	/* background: url(${p => p.bg});
	background-size: contain;
	background-repeat: no-repeat; */

	/* 	@media screen and (max-width: 602px) {
		background-size: auto 100%;
	}

	flex: 1; */

	
`;

const PitchImg = styled.img`
	width: 100%;
	max-width: 900px;
	position: absolute;
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

const BenchContainer = styled.div`
	flex: 1;
	background: grey;
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
/* 
function useWindowSize(ref) {
	//const isClient = typeof window === 'object';

	function getRefSize() {
		if (!ref) return { width: 'not set', height: 'not set' };

		console.log(ref.current);
		return {
			width: ref.current ? ref.current.innerWidth : undefined,
			height: ref.current ? ref.current.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = React.useState(getRefSize);

	React.useEffect(() => {
		if (!ref) {
			if (!ref) return { width: 'not set', height: 'not set' };
		}

		function handleResize() {
			setWindowSize(getRefSize());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
} */

const Pitch = props => {
	const { config, team, game } = props.myTeam.state;
	const { togglePlayerSearch } = props.myTeam.setters;

	const playerCount = team.list.length;
	const teamValue = game.value;

	/* let pitchRef = React.useRef(null);

	const [pitchSize, setPitchSize] = React.useState(null);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		const curSize = getRefSize(pitchRef);
		if (curSize !== pitchSize) {
			setPitchSize(getRefSize(pitchRef));
		}
	}, [pitchRef]);

	React.useEffect(() => {
		if (!mounted) {
			setMounted(true);
			afterWinResize(() => setPitchSize(getRefSize(pitchRef)), 500);
		}
	}, []);

	console.log('pitchsize', pitchSize); */

	return (
		<Wrapper className="Pitch" /* pitchSize={pitchSize} */>
			<InfoContainer playerCount={playerCount} teamValue={teamValue} />

			<FieldContainer className="FieldContainer" bg={pitchImg} onClick={togglePlayerSearch}>
				<PitchImg /* ref={pitchRef} */ src={pitchImg} />
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
			{/* <Bench /> */}
		</Wrapper>
	);
};

export default withMyTeam(Pitch);
