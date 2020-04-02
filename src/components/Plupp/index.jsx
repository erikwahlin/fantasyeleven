import React, { Component, createRef } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import onClickOutside from 'react-onclickoutside';
import pluppW from '../../media/pluppW.png';
import pluppB from '../../media/pluppB.png';

const PluggImg = styled.img`
	width: 50px;
	align-self: center;

	${p => p.isMarked && 'filter: brightness(.9)'};

	${p => p.position};
	${p => p.lineupCount};
	${p => p.lineupIndex};
`;

const Options = styled.div`
	position: absolute;
	top: -42%;
	border-radius: 5px;
	font-size: 1em;
	padding: 5px;
	height: 30px;

	display: flex;
	justify-content: space-evenly;

	& > button {
		width: 50px;
		height: 100%;
		margin: 0 5px;
		cursor: pointer;
		outline: none;
		border: none;
		box-shadow: inset 0px 30px 10px #021f3d;
		border-radius: 3px;
		background: #ddd;
	}
`;

const DelBtn = styled.button`
	color: red;
	font-size: 1em;
`;

class Plupp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isMarked: false
		};

		this.del = this.del.bind(this);

		this.delBtn = createRef(null);
	}

	toggle = () => this.setState({ isMarked: !this.state.isMarked });

	clickHandler = () => {
		this.toggle();
	};

	del = () => {
		const { myTeam, player } = this.props;

		myTeam.setters.delHandler(player);
	};

	handleClickOutside = e => {
		if (e.target !== this.delBtn.current) return;

		this.del();
		this.setState({ isMarked: false });
	};

	render() {
		const { isMarked } = this.state;
		const { player, myTeam } = this.props;

		const pitchOrBench = () => {
			if (player) {
				if (player.playFromStart) {
					return 'pitch';
				}
			}
			return 'bench';
		};

		const img = pitchOrBench() === 'pitch' ? pluppW : pluppB;

		return (
			<>
				{isMarked && player && (
					<Options>
						<DelBtn ref={this.delBtn} onClick={e => myTeam.setters.delHandler(player)}>
							X
						</DelBtn>
					</Options>
				)}
				<PluggImg
					alt={`player-plupp ${pitchOrBench}`}
					src={img}
					isMarked={this.state.isMarked}
					onClick={this.clickHandler}
				/>
			</>
		);
	}
}

export default withMyTeam(onClickOutside(Plupp));
