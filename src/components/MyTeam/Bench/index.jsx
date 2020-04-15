import React from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../ctx';
import * as preset from '../../../constants/gamePreset';
import pitchImg from '../../../media/pitch.png';
import BuildInfo from '../BuildInfo';
import { shortenName } from '../../../constants/helperFuncs';
import Plupp from '../Plupp';

const ContentWrap = styled.div`
	width:100%;
	display: flex;
	align-items:center;
	justify-content:center;
`;

const PitchImg = styled.img`
	max-width: 576px;
	position: absolute;
	filter: brightness(70%);
	opacity: 0.2;
`;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction:column;
	justify-content: center;
	align-items:center;
	background: none;
`;

const BenchContainer = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	justify-content: space-evenly;
	background: none;
`;

const PluppContainer = styled.div`
	height: 100%;
	min-height: 100px;
	flex: 1;
	position: relative;
	display: flex;
	justify-content: center;
`;

const PlayerName = styled.span`
	position: absolute;
	top: 8px;
	font-size: 0.6em;
	text-align: center;
	color: white;
`;

const Bench = props => {
	const { config, team, game } = props.myTeam.state;
	const playerCount = team.list.map(player => player.origin === 'bench').length;
	const teamValue = game.value;

	return (
		<div>
			<BuildInfo playerCount={playerCount} team={team} origin="bench" />
			<ContentWrap>
			<Wrapper className="Bench unmarkable">
				<h3>Avbytarbänk</h3>
				<BenchContainer>
					<PitchImg src={pitchImg} />
				{preset.positions.map((pos, nth) => (
					<PluppContainer key={`pos-${nth}`} className={`PluppContainer ${pos}`}>
						<Plupp
							pos={pos}
							player={team.bench[pos][0]}
							lineupCount={team.bench[pos].length}
							lineupIndex={0}
							origin="bench"
						/>
					</PluppContainer>
				))}
				</BenchContainer>
			</Wrapper>
			</ContentWrap>
		</div>
	);
};

export default withMyTeam(Bench);
