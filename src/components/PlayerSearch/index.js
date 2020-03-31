import React, { Component } from 'react';
//import logo from './logo.svg';
import './index.css';

const config = {
	positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
	sortOptions: {
		name: 'namn',
		team: 'lag',
		price: 'pris',
		position: 'position'
	}
};

const INITIAL_STATE = {
	position: 'default',
	team: 'default',
	maxPrice: 'default',
	searchTerm: '',

	sortBy: 'default',
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

		this.filterByPosition = this.filterByPosition.bind(this);
		this.filterByTeam = this.filterByTeam.bind(this);
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
	filterByPosition = playerList => {
		const pos = this.state.position;
		if (!pos || pos === 'default') return playerList;

		return playerList.filter(player => player.position === pos);
	};

	filterByTeam = playerList => {
		const team = this.state.team;
		if (!team || team === 'default') return playerList;

		return playerList.filter(player => player.team === team);
	};

	filterByMaxPrice = playerList => {
		const maxPrice = this.state.maxPrice;
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

	/* handleSortAsc() {
		this.setState(prevState => ({
			price: {
				//	 object that we want to update
				...prevState.price, // keep all other key-value pairs
				highLow: !this.state.highLow // update the value of specific key
			}
		}));
	}

	handleSortDesc() {
		this.setState(prevState => ({
			price: {
				// object that we want to update
				...prevState.price, // keep all other key-value pairs
				lowHigh: !this.state.lowHigh // update the value of specific key
			}
		}));
	} */

	handleTextFilterChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	/* handleTeamOptionChange(event) {
		event.preventDefault();
		this.setState({ team: event.target.value });
	} */

	render() {
		const { players } = this.props;
		if (!players) return <p>Didn't find any players</p>;

		//sorting functionality.
		//sort array of obj by position.
		//just sort position in alphabetic orders.

		const teams = [...new Set(players.map(item => item.team))];
		const priceTags = [...new Set(players.map(item => item.price))]
		console.log('all pricetags', priceTags)
		console.log('all teams', teams); // ['arsenal', 'aston villa'] -- ger alltså tillbaka en array med alla team i PL.

		// Apply filters
		const filtered = this.filterByPosition(
			this.filterByTeam(this.filterByMaxPrice(this.filterByName(players)))
		);

		// Apply order-config
		const sorted = this.applySortBy(filtered);

		const { position, team, maxPrice, searchTerm } = this.state;

		return (
			<div className='App'>
				{/* FILTER */}

				{/* Position filter */}
				<select
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
				</select>

				<br />

				{/* Team filter */}
				<select
					onChange={e => this.updateState('team', e.target.value)}
					id='teams'
					value={team}
				>
					<option value='default'>- Alla lag -</option>
					{teams.map(team => {
						return (
							<option key={team} value={team}>
								{team}
							</option>
						);
					})}
				</select>

				<br />

				{/* Max Price filter */}
				
				<select
				onChange={e => this.maxPriceHandler(e.target.value)}
				placeholder='Maxpris'
				>
					<option value='default'>- Välj maxpris -</option>
					{priceTags.sort((a,b) => b-a).map(price => {
						return (
							<option key={price} value={price}>
								{price} kr
							</option>
						);
					})}
				</select> 
				
				<input
					type='number'
					step='0.5'
					onChange={e => this.maxPriceHandler(e.target.value)}
					placeholder='Maxpris (milj.)'
					value={maxPrice}
				></input>

				<br />

				{/* Player name filter */}
				<input
					type='text'
					name='name'
					onChange={this.handleTextFilterChange}
					placeholder='Spelarnamn'
				></input>

				{/* SORT */}

				{/* Sort By */}
				<select
					onChange={e => this.updateState('sortBy', e.target.value)}
					defaultValue='default'
				>
					<option value='default'>- Sortera efter -</option>
					{Object.entries(config.sortOptions).map(([key, val]) => {
						return (
							<option key={key} value={key}>
								{val}
							</option>
						);
					})}
				</select>

				{/* Sort Order */}
				<select
					onChange={e => this.updateState('sortOrder', e.target.value)}
					defaultValue='<'
				>
					<option value='<'>Stigande</option>
					<option value='>'>Fallande</option>
				</select>

				<button onClick={this.resetSettings}>Återställ filter</button>

				<br />

				{/* RESULT */}
				<ul>
					{sorted.map((elem, i) => {
						return (
							<li key={i}>
								<strong>{elem.name}</strong> Lag: {elem.team} |
								Position: {elem.position} | Pris: {elem.price}milj.
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default PlayerSearch;
