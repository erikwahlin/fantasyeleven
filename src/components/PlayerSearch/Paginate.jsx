import React, { Component } from 'react';
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

export default class Paginate extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { players, onClick } = this.props;
		const { pageNumber, pageSize } = this.props.state;
		//angle right - left
		//angle double right - left
		return (
			<div>
				<Wrapper className="Paginate unmarkable" onClick={e => onClick(e, players.length)}>
					<Btn className="firstPage">
						<FaAngleDoubleLeft />
					</Btn>

					<Btn className="backward">
						<FaAngleLeft />
					</Btn>

					{<PageNumber>{pageNumber + '/' + Math.ceil(players.length / pageSize)}</PageNumber>}

					<Btn className="forward">
						<FaAngleRight />
					</Btn>

					<Btn className="lastPage">
						<FaAngleDoubleRight />
					</Btn>
				</Wrapper>
			</div>
		);
	}
}
