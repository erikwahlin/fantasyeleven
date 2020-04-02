import styled from 'styled-components';
import '../fonts/MrEavesXLModNarOT-Reg.ttf'


export const Wrapper = styled.div`
	& > div {
		height: 50px;
	}
`;

export const Select = styled.select`
	width: 202px;
	height: 30px;
	margin: 5px;
	border: none;
	outline: none;
	background: #fff;
	box-shadow: 0 0 5px #eee;
	cursor: pointer;
`;

export const Input = styled.input`
	width:100%;
	/* position: relative; */
	font-family:'Avenir';
	font-size:0.9em;
	font-weight:bold;
	color:white;
	padding:8px 52px 8px 10px;
	border:1px solid white;
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

export const ButtonDes = styled.button`
	margin-right: 5px;
	width: 48%;
	height: 30px;
	font-family:'Avenir';
	font-size:0.8em;
	border: 1px solid white;
	border-radius: 1px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	cursor: pointer;
	padding:3px;
`;

export const ButtonAsc = styled.button`
	width: 48%;
	height: 30px;
	font-family:'Avenir';
	font-size:0.8em;
	border: 1px solid white;
	border-radius: 1px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	cursor: pointer;
	padding:3px;
`;

export const ButtonReset = styled.button`
	width: 100%;
	height: 30px;
	font-family:'Avenir';
	font-size:0.8em;
	border: 1px solid white;
	border-radius: 1px;
	outline: none;
	color: white;
	background: rgba(2, 31, 61, 1);
	margin-top:1rem;
	cursor: pointer;
`;

export const ResultBox = styled.div`
	background: #F5F5F5;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const LabelRow = styled.div`
	width: 100%;
	height:30px !important;
	display: flex;
	justify-content:space-around;
	align-items:center;
	background: #00FFF5;
	color: black;
	font-weight: 700;
	font-size:0.8em;
`;

export const PlayerRow = styled.div`
	width: 100%;
	display: flex;
	background: #F5F5F5;
	color:black;
	border: 5px solid #ddd;
	border: none;
	border-bottom: 4px solid #021f3d;

`;

export const PlayerInfoBtn = styled.button`
	background: #F5F5F5;
	border: none;
	outline: none;
	font-size:1.7em;
	cursor: pointer;
	
`;

export const PlayerInfo = styled.div`
	flex: 3;
	padding: 5px;
`;

export const PlayerPrice = styled.div`
	flex: 1;
	padding: 5px;
	align-items:flex-end;
`;
