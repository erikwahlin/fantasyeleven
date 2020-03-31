import React, { Component } from 'react';
import styled from 'styled-components';
import { withMyTeam } from '../MyTeam/ctx';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dropdown.css'
import { PlayerPrice , PlayerInfo, PlayerInfoBtn, Select, Input, Button, ResultBox, Section, LabelRow, PlayerRow,} from './index.styled'


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
	posOrClubSelected: { value: 'none', label: '- Alla spelare -'},
	position: 'default',
	club: 'default',
	maxPriceSelected: { value: 'none', label: '- Högsta pris -'},
	searchTerm: '',

	sortBy: 'position',
	sortOrder: '<',

	price: {
		lowHigh: false,
		highLow: false
	}
};

//orderby
// namn alfabetiskt, lag alfabetiskt, pris, position
// asc or desc

class PlayerSearch extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };

		this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
		//this.handleSortAsc = this.handleSortAsc.bind(this);
		//this.handleSortDesc = this.handleSortDesc.bind(this);
		//this.handleTeamOptionChange = this.handleTeamOptionChange.bind(this);

		this.updateState = this.updateState.bind(this);
		this.resetSettings = this.resetSettings.bind(this);
		this.maxPriceHandler = this.maxPriceHandler.bind(this);
		this.onSelectPosOrClub = this.onSelectPosOrClub.bind(this)
		this.onSelectPrice = this.onSelectPrice.bind(this)

		this.filterByPosition = this.filterByPosition.bind(this);
		this.filterByClub = this.filterByClub.bind(this);
		this.filterByMaxPrice = this.filterByMaxPrice.bind(this);
		this.filterByName = this.filterByName.bind(this);
	}

	// update settings in state
	updateState = (key, val) => {
		this.setState({
			[key]: val
		});
	};

	// reset filter & order
	resetSettings = () => {
		this.setState({
			...INITIAL_STATE
		});
	};

	// parse price-input before state update
	maxPriceHandler = maxPrice => {
		this.setState({
			maxPrice: parseFloat(maxPrice)
		});
	};

	// filter-funcs
	onSelectPosOrClub = option =>  {
		const selected = this.state.posOrClubSelected;
		console.log('You selected ', selected)
		this.setState({posOrClubSelected: option})
	  }

	onSelectPrice = option =>  {
		const selected = this.state.maxPriceSelected;
		console.log('You selected ', selected)
		this.setState({maxPriceSelected: option})
	  }

	filterPlayers = playerList => {
		if(this.state.posOrClubSelected.value === 'none') return playerList;
		return playerList.filter(player => player[this.state.posOrClubSelected.value] === this.state.posOrClubSelected.label)
	}
	
	filterByPosition = playerList => {
		const pos = this.state.position;
		if (!pos || pos === 'default') return playerList;

		return playerList.filter(player => player.position === pos);
	};

	filterByClub = playerList => {
		const club = this.state.club;
		if (!club || club === 'default') return playerList;

		return playerList.filter(player => player.club === club);
	};

	filterByMaxPrice = playerList => {
		const maxPrice = this.state.maxPriceSelected.label;
		if (isNaN(maxPrice) || !maxPrice || maxPrice === '' || maxPrice <= 0)
			return playerList;

		return playerList.filter(player => parseFloat(player.price) <= maxPrice);
	};

	filterByName = playersList => {
		const searchTerm = this.state.searchTerm.trim().toLowerCase();
		return playersList.filter(player => {
			return player.name.toLowerCase().includes(searchTerm);
		});
	};

	// sort by (WIP, needs cleaner structure)
	applySortBy = playerList => {
		const { sortBy, sortOrder } = this.state;

		const sortIt = (a, b) => {
			if (sortBy === 'position') {
				const sortValA = config.positions.indexOf(a[sortBy]);
				const sortValB = config.positions.indexOf(b[sortBy]);

				if (sortValA < sortValB) {
					return sortOrder === '<' ? -1 : 1;
				} else {
					return sortOrder === '<' ? 1 : -1;
				}
			} else if (sortBy === 'price') {
				const sortValA = parseFloat(a[sortBy]);
				const sortValB = parseFloat(b[sortBy]);

				if (sortValA < sortValB) {
					return sortOrder === '<' ? -1 : 1;
				} else {
					return sortOrder === '<' ? 1 : -1;
				}
			}

			if (a[sortBy] < b[sortBy] && sortBy !== 'price') {
				return sortOrder === '<' ? -1 : 1;
			} else {
				return sortOrder === '<' ? 1 : -1;
			}
		};

		return sortBy === 'default' ? playerList : playerList.sort(sortIt);
	};

	handleTextFilterChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		const { players } = this.props;
		if (!players) return <p>Didn't find any players</p>;

		const {
			position,
			club,
			maxPrice,
			//searchTerm,
			sortBy,
			sortOrder
		} = this.state;

		const clubs = [...new Set(players.map(item => item.club))];
		const priceTags = [...new Set(players.map(item => item.price))];

		const filterOptions = [
			{ value: 'none', label: '- Alla spelare -'},
			{
			 type: 'group', name: '- Positioner - ', items: [
			   ...config.positions.map( position => {
				return {'value': 'position','label': position}
			  })
			 ]
			},
			{
			 type: 'group', name: '- Klubbar -', items: [
				...clubs.map( club => {
					return {'value': 'club','label': club}
				  })
			 ]
			}
		  ];
		  //options for dropdown.
		const maxPriceDefaultOption = this.state.maxPriceSelected;
		const priceOptions = priceTags.map(price => {
			return {'value': 'maxPrice', 'label': price}
		}) //append kr to price.
		//default option for dropdown - All players are shown.
  		const posOrClubdefaultOption = this.state.posOrClubSelected;
 
		// Apply filters
		/* const filtered = this.filterByPosition(
			this.filterByClub(this.filterByMaxPrice(this.filterByName(players)))
		); */

		const filtered = this.filterByMaxPrice(this.filterPlayers(this.filterByName(players)))

		//const maxPriced = this.filterByMaxPrice(this.filterByName(filtered);

		// Apply order-config
		const sorted = this.applySortBy(filtered);

		// WIP-test. split into result-sections based on sort
		const sectionFilter = items => {
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
				return this.state.sortOrder === '<' ? res : res.reverse();
			};

			switch (sortBy) {
				case 'position':
					return splitByPosition();
				default:
					return [[...items]];
			}
		};

		const result = sectionFilter(sorted);

		//console.log('search output', result);

		// MyTeam context
		const { state, setters } = this.props.myTeam;

		return (
			<div className='App'>

				{/* FILTER */}
				(FILTER) <br /> {/* temp */}
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
				 placeholder='Maxpris/spelare'
				 />
				{/* Position filter */}
{/* 				<Select
					onChange={e => this.updateState('position', e.target.value)}
					value={position}
				>
					<option value='default'>- Alla positioner -</option>
					{config.positions.map(pos => {
						return (
							<option key={pos} value={pos}>
								{pos}
							</option>
						);
					})}
				</Select>
				<br />
				{/* club filter */}
				{/* <Select
					onChange={e => this.updateState('club', e.target.value)}
					id='clubs'
					value={club}
				>
					<option value='default'>- Alla klubbar -</option>
					{clubs.map(club => {
						return (
							<option key={club} value={club}>
								{club}
							</option>
						);
					})}
				</Select> */}


				<br />
				{/* Max Price filter */}

{/* 				<Input
					type='number'
					step='0.1'
					onChange={e => this.maxPriceHandler(e.target.value)}
					placeholder='Maxpris (kr)'
					value={maxPrice}
				></Input> */}


				<br />
				{/* Player name filter */}
				<Input
					type='text'
					name='name'
					onChange={this.handleTextFilterChange}
					placeholder='Spelarnamn'
				></Input>
				<br />
				<br />
				{/* SORT */}
				(SORTERING) <br /> {/* temp */}
				{/* Sort By */}
				<Select
					onChange={e => this.updateState('sortBy', e.target.value)}
					value={sortBy}
				>
					{Object.entries(config.sortOptions).map(([key, val]) => {
						return (
							<option key={key} value={key}>
								sortera efter {val}
							</option>
						);
					})}
				</Select>
				<br />
				{/* Sort Order */}
				<Select
					onChange={e => this.updateState('sortOrder', e.target.value)}
					value={sortOrder}
				>
					<option value='<'>visa stigande {'<'}</option>
					<option value='>'>visa fallande {'>'}</option>
				</Select>
				<br />
				<br />
				<Button onClick={this.resetSettings}>Återställ filter</Button>
				<br />
				<br />
				{/* RESULT */}
				<ResultBox>
					{result.map((section, nth) => {
						return (
							<Section key={nth}>
								<LabelRow>*Section Label*</LabelRow>
								{section.map((player, i) => {
									return (
										<PlayerRow key={i}>
											<PlayerInfoBtn>info</PlayerInfoBtn>
											<PlayerInfo
												onClick={e => setters.addPlayer(player)}
											>
												<p>{player.name}</p>
												<p>
													{player.club} - {player.position}
												</p>
											</PlayerInfo>
											<PlayerPrice>
												<p>{player.price} kr</p>
											</PlayerPrice>
										</PlayerRow>
									);
								})}
							</Section>
						);
					})}
				</ResultBox>
			</div>
		);
	}
}

export default withMyTeam(PlayerSearch);
