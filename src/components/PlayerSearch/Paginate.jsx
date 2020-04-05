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
	const { settings, playerCount, goToPage } = props;
	const { pageNumber, pageSize } = settings;
	const lastPage = Math.ceil(playerCount / pageSize);

	const clickHandler = e => {
		const classes = ['firstPage', 'forward', 'backward', 'lastPage'];
		const cList = e.currentTarget.classList;
		const cName = classes.filter(c => cList.contains(c))[0];

		//go to page according to cName
		const newPage = () => {
			switch (cName) {
				case 'firstPage':
					return 1;
				case 'forward':
					return pageNumber < lastPage ? pageNumber + 1 : pageNumber;
				case 'backward':
					return pageNumber > 1 ? pageNumber - 1 : pageNumber;
				default:
					// 'lastPage'
					return lastPage;
			}
		};

		goToPage(newPage());
	};

	//angle right - left
	//angle double right - left
	return (
		<div>
			<Wrapper className="Paginate unmarkable">
				<Btn className="firstPage paginationBtn" onClick={clickHandler}>
					<FaAngleDoubleLeft />
				</Btn>

				<Btn className="backward paginationBtn" onClick={clickHandler}>
					<FaAngleLeft />
				</Btn>

				{<PageNumber>{pageNumber + '/' + Math.ceil(playerCount / pageSize)}</PageNumber>}

				<Btn className="forward paginationBtn" onClick={clickHandler}>
					<FaAngleRight />
				</Btn>

				<Btn className="lastPage paginationBtn" onClick={clickHandler}>
					<FaAngleDoubleRight />
				</Btn>
			</Wrapper>
		</div>
	);
};

export default Paginate;
