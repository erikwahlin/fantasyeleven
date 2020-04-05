import React, { Component } from 'react';
import { withMyTeam } from '../MyTeam/ctx';
import { allClubs } from '../MyTeam/setup';
import Dropdown from 'react-dropdown';
import Paginate from './Paginate';
import 'react-dropdown/style.css';
import './dropdown.css';
import './styles.css';
import { FaInfoCircle } from 'react-icons/fa';

//import '../fonts/MrEavesXLModNarOT-Reg.ttf';

import {
	Wrapper,
	Title,
	PlayerPrice,
	Player,
	PlayerInfo,
	Input,
	ButtonContainer,
	ButtonDes,
	ButtonAsc,
	ResultBox,
	Section,
	LabelRow,
	PlayerRow,
	ButtonReset
} from './index.styled';

const config = {
	positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
	sortOptions: {
		name: 'namn',
		club: 'lag',
		price: 'pris',
		position: 'position'
	}
};

const INITIAL_STATE = {
	posOrClubSelected: { value: 'none', label: 'Alla spelare' },
	maxPriceSelected: { value: 'none', label: 'Högsta pris' },
	searchTerm: '',
	priceSort: 'falling',

	paginationSettings: {
		pageNumber: 1,
		pageSize: 20
	},

	result: []
};

//orderby
// namn alfabetiskt, lag alfabetiskt, pris, position
// asc or desc

class PlayerSearch extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };

		this.handleTextFilterChange = this.handleTextFilterChange.bind(this);

		this.updateStatePage = this.updateStatePage.bind(this);
		this.resetSettings = this.resetSettings.bind(this);
		//this.paginate = this.paginate.bind(this)
		this.onSelectPosOrClub = this.onSelectPosOrClub.bind(this);
		this.onSelectPrice = this.onSelectPrice.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.updateResultPage = this.updateResultPage.bind(this);
		this.filterByMaxPrice = this.filterByMaxPrice.bind(this);
		this.filterByName = this.filterByName.bind(this);
		this.playerClickHandler = this.playerClickHandler.bind(this);
		this.displayPlayerInfo = this.displayPlayerInfo.bind(this);
		this.sectionFilter = this.sectionFilter.bind(this);
	}

	playerClickHandler = player => {
		const { position: pos } = player;
		const { state, setters } = this.props.myTeam;
		const { marked, target } = state.config.switchers;
		const { addPlayer, setSwitchers, switchPlayers } = setters;

		if (marked && !target) {
			// set switcher-target
			setSwitchers(
				{
					target: {
						origin: 'list',
						pos,
						lineupIndex: null,
						player,
						ref: null
					}
				},
				() => {
					console.log('Switch-target set.');
					switchPlayers();
				}
			);
		} else {
			console.log('clicked player', player);
			addPlayer(player);
		}
	};

	// update settings in state
	updateStatePage = () => {
		this.setState(prevState => {
			let paginationSettings = Object.assign({}, prevState.paginationSettings);
			paginationSettings.pageNumber = 1;
			return { paginationSettings };
		});
	};

	handleSort = e => {
		console.log(this.sortedPlayerList(this.props.players));
		if (e.target.value === 'falling') {
			this.setState({ priceSort: 'falling' });
		} else {
			this.setState({ priceSort: 'rising' });
		}
	};
	// reset filter & order
	resetSettings = () => {
		this.setState({
			...INITIAL_STATE
		});
	};

	// filter-funcs
	onSelectPosOrClub = option => {
		const selected = this.state.posOrClubSelected;
		console.log('You selected ', selected);
		this.updateStatePage();
		this.setState({ posOrClubSelected: option });
	};

	onSelectPrice = option => {
		const selected = this.state.maxPriceSelected;
		console.log('You selected ', selected);
		this.updateStatePage();
		this.setState({ maxPriceSelected: option });
	};

	filterPlayers = playerList => {
		if (this.state.posOrClubSelected.value === 'none') return playerList;
		return playerList.filter(
			player => player[this.state.posOrClubSelected.value] === this.state.posOrClubSelected.label
		);
	};

	filterByMaxPrice = playerList => {
		const maxPrice = this.state.maxPriceSelected.label;
		if (isNaN(maxPrice) || !maxPrice || maxPrice === '' || maxPrice <= 0) return playerList;

		return playerList.filter(player => player.price <= maxPrice);
	};

	filterByName = playersList => {
		const searchTerm = this.state.searchTerm.trim().toLowerCase();
		return playersList.filter(player => {
			return player.name.toLowerCase().includes(searchTerm);
		});
	};

	updateResultPage = pageNumber => {
		this.setState(prevState => ({
			paginationSettings: {
				...prevState.paginationSettings,
				pageNumber
			}
		}));
	};

	handleTextFilterChange(event) {
		this.updateStatePage();
		this.setState({ searchTerm: event.target.value });
	}

	sortedPlayerList = playerList => {
		if (this.state.priceSort === 'falling') {
			return playerList.sort((a, b) => b.price - a.price);
		} else {
			return playerList.sort((a, b) => a.price - b.price);
		}
	};

	displayPlayerInfo = player => {
		alert('Coming soon.');
	};

	sectionFilter = items => {
		const splitByPosition = () => {
			const res = [];
			config.positions.forEach(pos => res.push([]));

			items.forEach(item => {
				switch (item.position) {
					case 'Goalkeeper':
						res[0].push(item);
						break;
					case 'Defender':
						res[1].push(item);
						break;
					case 'Midfielder':
						res[2].push(item);
						break;
					case 'Forward':
						res[3].push(item);
						break;
					default:
						break;
				}
			});
			return res;
			//return this.state.sortOrder === '<' ? res : res.reverse();
		};
		return splitByPosition();
		/* switch (sortBy) {
				case 'position':
					return splitByPosition();
				default:
					return [[...items]];
			} */
	};

	render() {
		const { paginationSettings } = this.state;
		const { players } = this.props;

		if (!players) return <p>Didn't find any players</p>;

		const clubs = [...new Set(players.map(item => item.club))];
		const priceTags = [...new Set(players.map(item => item.price))];

		const filterOptions = [
			//options for dropDown
			{ value: 'none', label: '- Alla spelare -' },
			{
				type: 'group',
				name: '- Positioner - ',
				items: [
					...config.positions.map(position => {
						return { value: 'position', label: position };
					})
				]
			},
			{
				type: 'group',
				name: '- Klubbar -',
				items: [
					...clubs.map(club => {
						return { value: 'club', label: club };
					})
				]
			}
		];
		//options for dropdown.
		const maxPriceDefaultOption = this.state.maxPriceSelected;

		const priceOptions = priceTags
			.sort((a, b) => b - a)
			.map(price => {
				return { value: 'maxPrice', label: price };
			}); //append kr to price.
		//default option for dropdown - All players are shown.
		const posOrClubdefaultOption = this.state.posOrClubSelected;

		const filtered = this.filterByMaxPrice(this.filterPlayers(this.filterByName(players)));

		// Apply order-config
		//const sorted = this.applySortBy(filtered);
		const sorted = this.sortedPlayerList(filtered);

		// WIP-test. split into result-sections based on sort
		const paginate = (playersList, page_size, page_number) => {
			// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
			return playersList.slice((page_number - 1) * page_size, page_number * page_size);
		};

		const paginated = paginate(sorted, paginationSettings.pageSize, paginationSettings.pageNumber);

		const result = this.sectionFilter(paginated);

		const clubAbbr = club => {
			return allClubs.filter(item => item.long === club)[0].short;
		};

		//console.log('search output', result);

		return (
			<Wrapper className="PlayerSearch">
				{/* FILTER */}
				{/* (FILTER) <br />  */}
				{/* temp */}
				<Title className="SearchPlayer-Title unmarkable">Sök spelare</Title>
				<Dropdown
					options={filterOptions}
					onChange={this.onSelectPosOrClub}
					value={posOrClubdefaultOption}
					placeholder="Select an option"
				/>
				<Dropdown
					onChange={this.onSelectPrice}
					value={maxPriceDefaultOption}
					options={priceOptions}
					placeholder="Maxpris/spelare"
				/>

				<Input
					type="text"
					name="name"
					onChange={this.handleTextFilterChange}
					placeholder="Sök spelare"
				></Input>

				<h2 className="FilterTitle unmarkable">Sortera efter pris</h2>
				<ButtonContainer>
					<ButtonDes
						style={this.state.priceSort === 'falling' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
						value="falling"
						onClick={this.handleSort}
					>
						Fallande
					</ButtonDes>
					<ButtonAsc
						style={this.state.priceSort === 'rising' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
						value="rising"
						onClick={this.handleSort}
					>
						Stigande
					</ButtonAsc>
				</ButtonContainer>

				<ButtonReset onClick={this.resetSettings}>
					<strong>Återställ filter</strong>
				</ButtonReset>

				{/* RESULT */}
				<Paginate
					updateResultPage={this.updateResultPage}
					settings={paginationSettings}
					playerCount={filtered.length}
				/>
				<ResultBox className="ResultBox unmarkable">
					{result.map((section, nth) => {
						return (
							<Section key={nth}>
								{section.length ? (
									<LabelRow>
										<div className="labelPosition">
											<p> {`${section[0].position}s`}</p>
										</div>{' '}
										<div className="labelPrice">
											<p>SEK</p>
										</div>
									</LabelRow>
								) : null}
								{section.map((player, i) => {
									return (
										<PlayerRow key={i} className="PlayerRow">
											<PlayerInfo className="PlayerInfo" onClick={e => this.displayPlayerInfo(player)}>
												<FaInfoCircle className="info" />
											</PlayerInfo>
											<Player className="ListedPlayer" onClick={e => this.playerClickHandler(player)}>
												<p className="player">{player.name}</p>
												<p className="sum">
													<strong>{clubAbbr(player.club)}</strong>
													&nbsp; &nbsp;
													{player.position}
												</p>
											</Player>
											<PlayerPrice className="PlayerPrice">
												<p className="player_price">{Math.round(player.price)}</p>
											</PlayerPrice>
										</PlayerRow>
									);
								})}
							</Section>
						);
					})}
				</ResultBox>
			</Wrapper>
		);
	}
}

export default withMyTeam(PlayerSearch);
