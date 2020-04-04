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
		this.handleClickInside = this.handleClickInside.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);

		this.checkSwitchable = this.checkSwitchable.bind(this);
		this.syncWithSwitchers = this.syncWithSwitchers.bind(this);

		this.delBtn = createRef(null);
		this.pluppRef = createRef(null);
		this.switchRef = createRef(null);
	}

	// on mount
	componentDidMount = () => {
		this.setState({ isSwitchable: this.checkSwitchable() });
	};

	// on update
	componentDidUpdate = () => {
		this.syncWithSwitchers();
	};

	// check if switchable
	checkSwitchable = () => {
		const { player, myTeam, pos, origin } = this.props;
		const { marked, target } = myTeam.state.config.switchers;
		const pluppRef = this.pluppRef.current;
		//this.setState({ foundMarked: marked !== null });

		// decide if switchable
		// if plupp contains player or its on bench, and any plupp is marked
		if ((player || origin === 'bench') && marked !== null) {
			// if plupp-pos is marked pos, but not marked plupp
			if (marked) {
				if (pos === marked.pos && pluppRef !== marked.ref) {
					return true;
				}
			}
		}
		return false;
	};

	// update marked and switchable
	syncWithSwitchers = () => {
		const markedSwitcher = this.props.myTeam.state.config.switchers.marked;
		const ref = this.pluppRef.current;

		// should we mark?
		const shouldMark = (() => {
			if (markedSwitcher) {
				if (!this.state.isMarked && ref === markedSwitcher.ref) {
					return true;
				}
			}
			return false;
		})();

		// or unmark?
		const shouldUnmark = this.state.isMarked && !markedSwitcher;

		// mark
		if (shouldMark) {
			this.setState({ isMarked: true });
		}

		// unmark
		if (shouldUnmark) {
			this.setState({ isMarked: false });
		}

		// new switchable status
		const newIsSwitchable = this.checkSwitchable();

		// update switchable if necessary
		if (newIsSwitchable !== this.state.isSwitchable) {
			this.setState({ isSwitchable: newIsSwitchable });
		}
	};

	setMarked = newVal => {
		/* this.setState({ isMarked: newVal }, () => {
			// update ctx state
			this.updateCtx(newVal);
		}); */
	};

	updateCtx = (newVal = true) => {
		/* const { myTeam, player, pos, lineupIndex } = this.props;
		const playFromStart = player ? player.playFromStart : null;

		//if (!newVal) return myTeam.setters.setSwitchers({ clear: true });

		myTeam.setters.setSwitchers({
			playFromStart,
			pos,
			index: lineupIndex,
			ref: this.pluppRef.current
		}); */
	};

	del = () => {
		const { myTeam, player } = this.props;
		const { setSwitchers, delHandler } = myTeam.setters;

		// unmark, then clear switchers, then confirm and del ref
		this.setState({ isMarked: false }, () => {
			setSwitchers({ marked: null, target: null }, () => {
				console.log('Cleared switchers.');

				delHandler(player);
			});
		});
	};

	// (runs before click inside)
	handleClickOutside = e => {
		if (!this.state.isMarked) return;

		const { setSwitchers } = this.props.myTeam.setters;

		// if not on another plupp (later player in list!)
		// clear switch in state
		if (!e.target.classList.contains('SwitchablePlupp')) {
			setSwitchers({ marked: null, target: null }, () => {
				console.log('Cleared switchers.');
			});
		}
	};

	// (runs after click outside)
	handleClickInside = e => {
		const { myTeam, player, pos, origin, lineupIndex } = this.props;
		const { setSwitchers, switchPlayers } = myTeam.setters;
		const { marked, target } = myTeam.state.config.switchers;
		const ref = this.pluppRef.current;

		// if switchers dont have a marked, mark this plupp
		if (!marked) {
			console.log('this is a marked', ref);

			// set as marked, then update switchers
			setSwitchers({
				marked: {
					origin,
					pos,
					lineupIndex,
					player,
					ref
				}
			});
			// if switchers do have a marked...
		} else {
			console.log('this is a target', ref);

			// if this is the marked plupp, unmark, clear switchers
			if (ref === marked.ref) {
				setSwitchers({ marked: null, target: null }, () => {
					return console.log('Cleared switchers.');
				});
			}

			// else, target this plupp, prepare switch
			setSwitchers(
				{
					target: {
						origin,
						pos,
						lineupIndex,
						player,
						ref
					}
				},
				() => {
					console.log('Switch-target set.');
					switchPlayers();
				}
			);
		}
	};

	render() {
		const { isMarked, isSwitchable } = this.state;
		const { player, pos, origin, lineupIndex } = this.props;

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
					id={`switch-${origin}-${pos}-${lineupIndex}`}
					className={`${isSwitchable ? 'Switchable' : ''}Plupp`}
					alt={`player-plupp ${origin}`}
					src={pluppC}
					isMarked={this.state.isMarked}
					onClick={this.handleClickInside}
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
