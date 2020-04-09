import styled, { css } from 'styled-components';

//import '../fonts/MrEavesXLModNarOT-Reg.ttf';

export const Wrapper = styled.div`
	display: flex;

	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	grid-row: 2;
	grid-column: 3;

	${p =>
		p.mobileSearch &&
		css`
			display: block;
			position: fixed;
			z-index: 1;
			opacity: ${p.searchOpen ? '1' : '0'};
			left: ${p.searchOpen ? '0' : '110vw'};
			top: 0;
			height: 100%;
			width: 100%;
			background: #011931;
		`}

	transition: all .5s;
`;

export const CancelBtn = styled.button`
	width: 30px;
	height: 30px;
	position: absolute;
	right: 0;
	font-size: 1.5em;
	padding: 0;
	background: none;
	color: white;
	margin: 5px;
	border: none;
	outline: none;

	& > svg {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
`;

export const SearchFieldWrapper = styled.div`
	position: relative;
	& > svg {
		position: absolute;
		right: 8px;
		top: 10px;
	}
`;

export const Title = styled.h2`
	font-size: 1.5em;
	line-height: 30px; /* in line with titles above pitch */
	margin: 0;
	margin-bottom: 12px;
`;

export const Input = styled.input`
	width: 100%;
	margin-bottom: 6px;
	/* position: relative; */
	font-family: 'Avenir';
	font-size: 0.9em;
	font-weight: bold;
	color: white;
	padding: 8px 52px 8px 10px;
	border: 1px solid white;
	border-radius: 2px;
	box-sizing: border-box;
	outline: none;
	background: rgba(2, 31, 61, 1);
	cursor: text;
	::placeholder {
		color: white;
	}
	::focus {
		border: 2px solid white;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	height: 30px;
	font-family: 'Avenir';
	font-size: 0.8em;
	border: none;
	padding: 0;
	display: flex;
	margin-bottom: 6px;

	& > button {
		width: 49%;
	}
`;

export const ButtonDes = styled.button`
	margin-right: auto;
	height: 30px;
	font-family: 'Avenir';
	font-size: 0.8em;
	border: 1px solid white;
	border-radius: 2px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	cursor: pointer;
	padding: 3px;
`;

export const ButtonAsc = styled.button`
	height: 30px;
	font-family: 'Avenir';
	font-size: 0.8em;
	border: 1px solid white;
	border-radius: 2px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	cursor: pointer;
	padding: 3px;
`;

export const ButtonReset = styled.button`
	width: 100%;
	height: 30px;
	font-family: 'Avenir';
	font-size: 0.8em;
	border: 1px solid white;
	border-radius: 2px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	cursor: pointer;
	margin-bottom: 12px;
`;

export const ResultBox = styled.div`
	background: #f5f5f5;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;

	max-height: 478px; /* temp */
	overflow-y: scroll;
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const LabelRow = styled.div`
	width: 100%;
	height: 30px !important;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: #00fff5;
	color: black;
	font-weight: 700;
	font-size: 0.8em;
`;

export const PlayerRow = styled.div`
	width: 100%;
	display: flex;
	background: #f5f5f5;
	color: black;
	border: 5px solid #ddd;
	border: none;
	border-bottom: 4px solid #021f3d;

	height: 40px;
`;

export const PlayerInfoBtn = styled.button`
	background: #f5f5f5;
	border: none;
	outline: none;
	font-size: 1.7em;
	cursor: pointer;
`;

export const Player = styled.div`
	flex: 3;
	padding: 5px;
	cursor: pointer;

	& > p {
		font-size: 12px;
		margin: 0;
	}

	& > p.player {
		font-weight: 700;
	}
`;

export const PlayerPrice = styled.div`
	flex: 1;
	/* padding: 5px; */
	align-items: flex-end;
`;
