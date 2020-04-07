import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import { shortenName } from '../MyTeam/helperFuncs';
import onClickOutside from 'react-onclickoutside';
import pluppC from '../../media/pluppC.svg';
import { FaTrash, FaExchangeAlt, FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import allClubs from '../../constants/clubs'


const Container = styled.div`
	width: 50px;
	height: 50px;
	align-self: center;
	position: relative;
`;

const PlayerName = styled.span`
	position: absolute;
	width: 100px;
	left: -25px;
	top: 52px;
	font-size: 0.8em;
	text-align: center;
	text-shadow: 0 1px 2px #000;
	color: #eee;
`;

const PluppImg = styled.svg`
	width: 100%;
	position: relative;
	z-index: 1;

	${p => p.isMarked && 'filter: brightness(.9)'};
	opacity: ${p => (p.isSwitchable ? '.2' : '1')};

	cursor: pointer;

	height: 100%;
	border-radius: 50%;
		/* got to render different depending on which team is on the pitch. */
		background: ${props => props.player ?
		allClubs.find(obj => {
			return obj.long === props.player.club
		}).color :
		null}	
 	/*background: ${p => (p.origin === 'bench' && p.player ? '#333' : '#999')};*/
 	`;

const Options = styled.div`
	position: absolute;
	z-index: 1;
	left: -25px;
	top: -40px;
	width: 100px;
	height: 40px;
	margin: 0;
	padding: 0;

	display: flex;
	justify-content: space-between;

	& > button {
		width: 40px;
		height: 100%;
		margin: 0 5px;
		cursor: pointer;
		outline: none;
		border: none;

		border-radius: 3px;
		background: none;

		& > * {
			width: 100%;
			height: 100%;
		}
	}
`;

const DelBtn = styled.button`
	color: #222;
	font-size: 1em;
`;

const SubstituteBtn = styled.button`
	color: ${p => (p.origin === 'pitch' ? '#ccc' : '#ccc')};
	font-size: 1em;
`;

const SwitchIcon = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 0;
	text-align: center;
	color: #ccc;

	& > * {
		width: 65%;
		height: 65%;
		margin-top: 16%;
		left: unset;
		top: unset;
	}
`;

class Plupp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isMarked: false,
			isSwitchable: false,
			isQuickSwitchable: false
		};

		this.del = this.del.bind(this);
		this.handleClickInside = this.handleClickInside.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.markedPrivilege = this.markedPrivilege.bind(this);
		this.switchablePrivilege = this.switchablePrivilege.bind(this);
		this.syncWithSwitchers = this.syncWithSwitchers.bind(this);
		this.quickSwitch = this.quickSwitch.bind(this);

		this.delBtn = createRef(null);
		this.pluppRef = createRef(null);
		this.switchRef = createRef(null);
	}

	// on update
	componentDidUpdate = (pp, ps) => {
		this.syncWithSwitchers(pp, ps);
	};

	// check if plupp should be marked
	markedPrivilege = () => {
		const { marked } = this.props.myTeam.state.config.switchers;
		const self = this.pluppRef.current;

		if (marked) {
			if (self === marked.ref) {
				return true;
			}
		}

		return false;
	};

	// check if plupp should be switchable
	switchablePrivilege = () => {
		const { player, myTeam, pos, origin } = this.props;
		const { marked } = myTeam.state.config.switchers;
		const pluppRef = this.pluppRef.current;

		// is switchable if:
		// another plupp is marked, it contains a player or is on bench
		if ((player || origin === 'bench') && marked) {
			if (pos === marked.pos && pluppRef !== marked.ref) {
				return true;
			}
		}
		return false;
	};

	// update marked and switchable
	syncWithSwitchers = (pp, ps) => {
		// get new privileges
		const markedPrivilege = this.markedPrivilege();
		const switchablePrivilege = this.switchablePrivilege();

		// update state if needed
		if (this.state.isMarked !== markedPrivilege) {
			this.setState({ isMarked: markedPrivilege });
		}

		if (this.state.isSwitchable !== switchablePrivilege) {
			this.setState({ isSwitchable: switchablePrivilege });
		}

		// check if bench/pitch has space for another plupp
		const { isMarked, isQuickSwitchable } = this.state;
		const { player, pos, origin, myTeam } = this.props;
		const { config, team } = myTeam.state;

		const quickSwitchable = () => {
			const oppOrigin = origin === 'pitch' ? 'bench' : 'pitch';
			const limit = config.limit[oppOrigin][pos].max;
			const count = team.count[oppOrigin][pos];
			console.log(origin, oppOrigin, limit, count);
			return count < limit ? true : false;
		};

		const qs = isMarked && player ? quickSwitchable() : false;

		if (qs !== isQuickSwitchable) {
			this.setState({ isQuickSwitchable: qs });
		}
	};

	del = () => {
		const { myTeam, player } = this.props;
		const { setSwitchers, delPlayer } = myTeam.setters;

		// unmark, then clear switchers, then del ref
		this.setState({ isMarked: false }, () => {
			setSwitchers({ marked: null, target: null }, () => {
				delPlayer(player);
			});
		});
	};

	// (runs before click inside)
	handleClickOutside = e => {
		if (!this.state.isMarked) return;

		const { setSwitchers } = this.props.myTeam.setters;

		// if not on another plupp, player in list or paginationBtn
		// clear switch in state
		const listedPlayer = e.target.closest('div').classList.contains('ListedPlayer');
		const switchablePlupp = e.target.classList.contains('SwitchablePlupp');
		const paginate = e.target.closest('div').classList.contains('Paginate');

		if (!listedPlayer && !switchablePlupp && !paginate) {
			setSwitchers({ marked: null, target: null });
		}
	};

	// (runs after click outside)
	handleClickInside = e => {
		const { myTeam, player, pos, origin, lineupIndex } = this.props;
		const { setSwitchers, switchPlayers } = myTeam.setters;
		const { marked } = myTeam.state.config.switchers;
		const ref = this.pluppRef.current;

		// if switchers dont have a marked, mark this plupp
		if (!marked) {
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
			// if this is the marked plupp, unmark, clear switchers
			if (ref === marked.ref) {
				return setSwitchers({ marked: null, target: null });
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
					switchPlayers();
				}
			);
		}
	};

	quickSwitch = () => {
		const ref = this.pluppRef.current;
		const { player, pos, origin, lineupIndex, myTeam } = this.props;
		const { setSwitchers, switchPlayers } = myTeam.setters;
		const targetOrigin = origin === 'pitch' ? 'bench' : 'pitch';
		const targetIndex = myTeam.state.team[targetOrigin][pos].length;

		// else, target this plupp, prepare switch
		setSwitchers(
			{
				marked: {
					origin,
					pos,
					lineupIndex,
					player,
					ref
				},
				target: {
					origin: targetOrigin,
					pos,
					lineupIndex: targetIndex,
					player: null,
					ref: null
				}
			},
			() => {
				switchPlayers();
			}
		);
	};

	render() {

		const { isMarked, isSwitchable, isQuickSwitchable } = this.state;
		const { player, pos, origin, lineupIndex } = this.props;


		return (
			<Container>
				{player && <PlayerName className="PlayerName">{shortenName(player.name)}</PlayerName>}

				{isMarked && player && (
					<Options>
						<DelBtn ref={this.delBtn} onClick={this.del}>
							<FaTrash />
						</DelBtn>
						{isQuickSwitchable && (
							<SubstituteBtn origin={origin} onClick={this.quickSwitch}>
								{origin === 'pitch' ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}
							</SubstituteBtn>
						)}
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
					origin={origin}
					player={player}
				/>

				<SwitchIcon className="SwitchContainer" isSwitchable={isSwitchable}>
					<FaExchangeAlt alt="SwitchIcon" className="SwitchIcon" player={player} />
				</SwitchIcon>
			</Container>
		);
	}
}

export default withMyTeam(onClickOutside(Plupp));
