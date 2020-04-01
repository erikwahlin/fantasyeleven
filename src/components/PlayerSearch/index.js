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
	maxPriceSelected: { value: 'none', label: '- Högsta pris -'},
	searchTerm: '',
	priceSort: 'falling'
};

//orderby
// namn alfabetiskt, lag alfabetiskt, pris, position
// asc or desc

class PlayerSearch extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };

		this.handleTextFilterChange = this.handleTextFilterChange.bind(this);

		this.updateState = this.updateState.bind(this);
		this.resetSettings = this.resetSettings.bind(this);

		this.onSelectPosOrClub = this.onSelectPosOrClub.bind(this);
		this.onSelectPrice = this.onSelectPrice.bind(this);
		this.handleSort = this.handleSort.bind(this);

		this.filterByMaxPrice = this.filterByMaxPrice.bind(this);
		this.filterByName = this.filterByName.bind(this);
	
	}

	// update settings in state
	updateState = (key, val) => {
		this.setState({
			[key]: val
		});
	};
	handleSort = (e) => {
		console.log(this.sortedPlayerList(this.props.players) )
		if(e.target.value === 'falling') {
			this.setState({priceSort: 'falling'})
		} else  {
			this.setState({priceSort: 'rising'})
		}
	}
	// reset filter & order
	resetSettings = () => {
		this.setState({
			...INITIAL_STATE
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

	handleTextFilterChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	sortedPlayerList = (playerList) => {
		if(this.state.priceSort === 'falling') {
			return playerList.sort((a,b) => b.price - a.price) 
		} else { 
			return playerList.sort((a,b) => a.price - b.price)
		}
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

		const filterOptions = [ //options for dropDown
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
		const priceOptions = priceTags.sort((a,b) => b-a).map(price => {
			return {'value': 'maxPrice', 'label': price}
		}) //append kr to price.
		//default option for dropdown - All players are shown.
  		const posOrClubdefaultOption = this.state.posOrClubSelected;


		const filtered = this.filterByMaxPrice(this.filterPlayers(this.filterByName(players)))
		

		// Apply order-config
		//const sorted = this.applySortBy(filtered);
		const sorted = this.sortedPlayerList(filtered)
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
				<br />
				<Input
					type="text"
					name="name"
					onChange={this.handleTextFilterChange}
					placeholder='SÖK SPELARE'
				></Input>
				<br /> 
				Sortera efter pris: <br/>
				<Button style={this.state.priceSort === 'falling' ? { color:'red'} : {color: 'white'}} value='falling' onClick={this.handleSort}>Fallande</Button>
				<Button style={this.state.priceSort === 'rising' ? { color:'red'} : {color: 'white'}} value='rising' onClick={this.handleSort}>Stigande</Button>
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
											<PlayerInfo onClick={e => setters.addHandler(player)}>
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
