import styled from 'styled-components';

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
	width:20%;
	position: relative;
	margin: 5px;
	height: 30px;
	border: none;
	font-weight: bold;
	border-radius: 4px;
	outline: none;
	color: white;
	background: rgba(2,31,61,1);
	box-shadow: 0 0 5px #eee;
	cursor: text;
		::placeholder {
			color:white;
		}
`;

export const Button = styled.button`
	margin: 5px;
	width: 200px;
	height: 30px;
	border: none;
	border-radius: 4px;
	outline: none;

	background: #fff;
	box-shadow: 0 0 5px #eee;

	cursor: pointer;
`;

export const ResultBox = styled.div`
	width: 500px;
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
	display: flex;
	background: orange;
	font-weight: 700;
`;

export const PlayerRow = styled.div`
	width: 100%;
	display: flex;
	font-size: 0.7em;
	font-style: italic;
	border: 2px solid #ddd;
	padding: 5px;
`;

export const PlayerInfoBtn = styled.button`
	flex: 1;

	border: none;
	outline: none;
	background: #ddd;
	font-weight: 700;
	cursor: pointer;
`;
 
export const PlayerInfo = styled.div`
	flex: 3;
	padding: 5px;
`;

export const PlayerPrice = styled.div`
	flex: 1;
	padding: 5px;
`;