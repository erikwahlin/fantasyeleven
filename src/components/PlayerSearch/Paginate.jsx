import React from 'react';
import styled from 'styled-components';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
const Wrapper = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-evenly;

	* {
		margin-right: 5px;
	}
	font-family: 'Avenir';
	margin-bottom: 12px;
`;

const Btn = styled.button`
	width: 30px;

	margin: 0 5px;
	font-size: 1.3em;
	outline: none;
	color: white;
	background: none;
	cursor: pointer;
	border: none;

	& > svg {
		margin: -2px 0;
	}
`;

const PageNumber = styled.div`
	height: 30px;
	text-align: center;
	line-height: 30px;
`;

const Paginate = props => {
	const { settings, playerCount, updateResultPage } = props;
	const { pageNumber, pageSize } = settings;

	const clickHandler = e => {
		const classes = ['firstPage', 'forward', 'backward', 'lastPage'];
		const cList = e.target.closest('button').classList || e.target.classList;
		const cName = classes.filter(c => cList.contains(c))[0];

		console.log(cName);

		//go to page according to cName
		const newPage = curr => {
			switch (cName) {
				case 'firstPage':
					return 1;
				case 'forward':
					return curr + 1;
				case 'backward':
					return curr - 1;
				default:
					// 'lastPage'
					return Math.ceil(playerCount / pageSize);
			}
		};

		updateResultPage(newPage(pageNumber));
	};

	//angle right - left
	//angle double right - left
	return (
		<div>
			<Wrapper className="Paginate unmarkable" onClick={clickHandler}>
				<Btn className="firstPage">
					<FaAngleDoubleLeft />
				</Btn>

				<Btn className="backward">
					<FaAngleLeft />
				</Btn>

				{<PageNumber>{pageNumber + '/' + Math.ceil(playerCount / pageSize)}</PageNumber>}

				<Btn className="forward">
					<FaAngleRight />
				</Btn>

				<Btn className="lastPage">
					<FaAngleDoubleRight />
				</Btn>
			</Wrapper>
		</div>
	);
};

export default Paginate;
