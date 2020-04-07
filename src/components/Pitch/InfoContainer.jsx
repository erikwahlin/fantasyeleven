import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 80px;
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
	color: ${p => p.ready && '#35892A'};
`;

const InfoContainer = ({ playerCount, teamValue }) => {
	return (
		<Wrapper className="InfoContainer unmarkable">
			<ChosenPlayers>
				<InfoTitle className="infoTitle">Valda spelare</InfoTitle>
				<InfoP ready={playerCount === 15} className="amount">
					{playerCount + '/15'}
				</InfoP>
			</ChosenPlayers>

			<ChosenPlayers>
				<InfoTitle className="infoTitle">Totalt pris</InfoTitle>
				<InfoP className="amount">{teamValue + ' kr'}</InfoP>
			</ChosenPlayers>
		</Wrapper>
	);
};

export default InfoContainer;
