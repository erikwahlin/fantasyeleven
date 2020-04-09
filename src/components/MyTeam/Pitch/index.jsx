import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../ctx';
import Plupp from '../Plupp';
import pitchImg from '../../../media/pitch.png';
import InfoContainer from '../../Pitch/InfoContainer';

const Wrapper = styled.div`
	grid-row: 2;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 80px auto;
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 800px;
	margin: auto;
	margin-top: 0;

	@media screen and (min-width: 900px) {
		grid-column: 2;
	}
`;

const FieldContainer = styled.div`
	width: 100%;
	max-width: 700px;
	height: 100%;
	position: relative;
	margin: auto;

	& > {
		@media screen and (max-height: 665px) and (max-width: 500px) {
			height: 70vh;
		}
	}
`;

const PitchImg = styled.img`
	width: 100%;
	height: 100%;
	max-width: 700px;
	position: absolute;
`;

const FormationContainer = styled.div`
	margin: auto;
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;

	/* ${p => p.bg && 'background: url(' + p.bg + ')'};
	background-size: 100% 100%;
	background-repeat: no-repeat; */
`;

const PosLineup = styled.div`
	width: 100%;
	height: 100px;
	/* min-height: 117px; */
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
	const { togglePlayerSearch, delPlayer } = props.myTeam.setters;

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
		<Wrapper className="Pitch" /* pitchSize={pitchSize} */>
			<InfoContainer playerCount={playerCount} teamValue={teamValue} />

			<FieldContainer className="FieldContainer" bg={pitchImg} onClick={togglePlayerSearch}>
				<PitchImg src={pitchImg} />
				<FormationContainer className="FormationContainer" bg={pitchImg}>
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
