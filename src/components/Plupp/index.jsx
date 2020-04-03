import React, { Component, createRef } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import onClickOutside from 'react-onclickoutside';
import pluppW from '../../media/pluppW.png';
import pluppB from '../../media/pluppB.png';
import pluppC from '../../media/pluppC.svg';
import switchImg from '../../media/switchIcon.png';

const Container = styled.div`
	width: 50px;
	height: 50px;
	align-self: center;
	position: relative;
`;

const PluppImg = styled.img`
	width: 100%;
	position: relative;
	z-index: 1;

	${p => p.isMarked && 'filter: brightness(.9)'};
	opacity: ${p => (p.isSwitchable ? '.2' : '1')};

	cursor: pointer;
`;

const Options = styled.div`
	position: absolute;
	z-index: 1;
	top: -68px;
	left: -10px;
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

const SwitchContainer = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 0;
`;

const SwitchIcon = styled.img`
	width: 20px;
	margin: auto;
	position: relative;
	left: 15px;
	top: 15px;
`;

class Plupp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isMarked: false,
			isSwitchable: false
		};

		this.setMarked = this.setMarked.bind(this);
		this.updateCtx = this.updateCtx.bind(this);
		this.del = this.del.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.switchHandler = this.switchHandler.bind(this);

		this.checkSwitchable = this.checkSwitchable.bind(this);

		this.delBtn = createRef(null);
		this.pluppRef = createRef(null);
		this.switchRef = createRef(null);
	}

	checkSwitchable = () => {
		const { player, myTeam, pos, pitchOrBench } = this.props;
		const { a: marked, b: target } = myTeam.state.config.switch;
		const pluppRef = this.pluppRef.current;

		// decide if switchable
		// if plupp contains player or its on bench, and any plupp is marked
		if ((player || pitchOrBench === 'bench') && marked) {
			// if plupp-pos is marked pos, but not marked plupp
			if (marked) {
				if (pos === marked.pos && pluppRef !== marked.ref) {
					return true;
				}
			}
		}
		return false;
	};

	// check if switchable
	componentDidMount = () => {
		this.setState({ isSwitchable: this.checkSwitchable() });
	};

	// sync switchable
	componentDidUpdate = () => {
		const newState = this.checkSwitchable();

		if (newState !== this.state.isSwitchable) {
			this.setState({ isSwitchable: newState });
		}
	};

	setMarked = newVal => {
		this.setState({ isMarked: newVal }, () => {
			// update ctx state
			this.updateCtx(newVal);
		});
	};

	updateCtx = (newVal = true) => {
		const { myTeam, player, pos, lineupIndex } = this.props;
		const playFromStart = player ? player.playFromStart : null;

		//if (!newVal) return myTeam.setters.setMarkedPlupp({ clear: true });

		myTeam.setters.setMarkedPlupp({
			playFromStart,
			pos,
			index: lineupIndex,
			ref: this.pluppRef.current
		});
	};

	del = () => {
		this.setMarked(false);

		// clear marked in state before ref-del
		this.props.myTeam.setters.setMarkedPlupp({ clear: true });

		const { myTeam, player } = this.props;

		// del ref
		myTeam.setters.delHandler(player);
	};

	clickHandler = e => {
		const { myTeam, player, pos, pitchOrBench, lineupIndex } = this.props;
		const { setters, state } = myTeam;
		const { a: marked, b: target } = state.config.switch;
		const ref = this.pluppRef.current;

		// if this is not target b (pitchOrBench, pos, index)
		// try comparing ref!

		// if marked in state, set target else marked
		if (marked) {
			console.log('this is a target', ref);
		} else {
			console.log('this is a marked', ref);

			this.setState({ isMarked: true }, () => {
				// set this as marked
				setters.setMarkedPlupp({
					pitchOrBench,
					pos,
					lineupIndex,
					player,
					ref
				});
			});
		}
		/*const {
			b: targetCompare
		} = config.switch const pluppCompare = [pitchOrBench, pos, lineupIndex];
		const playerCompare = [targetCompare.pitchOrBench, targetCompare.pos
		const stateCompare = 
		
		if(){
			
		} */
		/* if (config.switch.b) {
			config.switch.b = null;
			setters.updateState('config', config);
			return;
		} */

		//this.setMarked(!this.state.isMarked);

		// toggle marked
	};

	handleClickOutside = e => {
		if (!this.state.isMarked) return;

		console.log('click outside', this.pluppRef);

		/*
		const { state, setters } = this.props.myTeam;
		const { config } = state;
		*/

		// if not on another plupp (later player in list)
		// clear switch in state
		if (!e.target.classList.contains('SwitchablePlupp')) {
			this.setState({ isMarked: false }, () => {
				this.props.myTeam.setters.setMarkedPlupp({ clear: true });
			});
		}

		/*
		// if clicked on plupp, handle possible switch, else unmark
		if (e.target.classList.contains('SwitchablePlupp')) {
			if (!config.switch.a) {
				setters.setMarkedPlupp({ clear: true });
				this.checkSwitchable();
			}
			//this.switchHandler(e);
		} else {
		}
		this.setMarked(false); */
	};

	switchHandler = e => {
		const { player } = this.props;
		const { state: ctx, setters } = this.props.myTeam;
		const { pitchOrBench, pos, index } = ctx.config.switch.a;

		const getClickedProps = () => {
			//if (!clickedId)

			const res = e.target.id.split('-');
			return {
				pitchOrBench: res[1],
				pos: res[2],
				index: res[1] === 'pitch' ? parseInt(res[3]) : 0,
				player: ctx.team[res[1]][res[2]][res[3]] || null
			};
		};

		const clickedProps = getClickedProps();
		console.log(clickedProps);

		// player, pitchOrBench, pos, index

		// A
		const config = {
			a: {
				pitchOrBench,
				pos,
				index,
				player: player || null
			},
			b: {
				pitchOrBench: clickedProps.pitchOrBench,
				pos: clickedProps.pos,
				index: clickedProps.index,
				player: clickedProps.player || null
			}
		};

		console.log(config);

		// skip unmark if
		//if (config.b.player) {
		this.setMarked(false);
		//}

		setters.switchPlayers(config);
	};

	render() {
		const { isMarked, isSwitchable } = this.state;
		const { player, pos, pitchOrBench, lineupIndex } = this.props;

		return (
			<Container>
				{isMarked && player && (
					<Options>
						<DelBtn ref={this.delBtn} onClick={this.del}>
							X
						</DelBtn>
					</Options>
				)}

				<PluppImg
					ref={this.pluppRef}
					id={`switch-${pitchOrBench}-${pos}-${lineupIndex}`}
					className={`${isSwitchable ? 'Switchable' : ''}Plupp`}
					alt={`player-plupp ${pitchOrBench}`}
					src={pluppC}
					isMarked={this.state.isMarked}
					onClick={this.clickHandler}
					isSwitchable={isSwitchable}
				/>

				<SwitchContainer className="Switch" isSwitchable={isSwitchable}>
					<SwitchIcon
						src={switchImg}
						alt="SwitchBtn"
						className="SwitchIcon"
						player={player}
						ref={this.switchRef}
					/>
				</SwitchContainer>
			</Container>
		);
	}
}

export default withMyTeam(onClickOutside(Plupp));
