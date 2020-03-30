import React, { Component } from 'react';
//import logo from './logo.svg';
//import '../App.css';

const INITIAL_STATE = {
	price: {
		lowHigh: false,
		highLow: false
	},
	searchTerm: '',
	team: ''
};

class PlayerSearch extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
		this.handleSortAsc = this.handleSortAsc.bind(this);
		this.handleSortDesc = this.handleSortDesc.bind(this);
		this.handleTeamOptionChange = this.handleTeamOptionChange.bind(this);
		this.filterByName = this.filterByName.bind(this);
		this.filterByTeam = this.filterByTeam.bind(this);
	}

	filterByName = (playersList, searchTerm) => {
		searchTerm = searchTerm.trim().toLowerCase();
		return playersList.filter(elem => {
			return elem.name.toLowerCase().includes(searchTerm);
		});
	};

	filterByTeam = (playerList, team) => {
		if (!team || team === 'default') return playerList;

		return playerList.filter(player => player.team === team);
	};

	handleSortAsc() {
		this.setState(prevState => ({
			price: {
				// object that we want to update
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
	}

	handleTextFilterChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	handleTeamOptionChange(event) {
		event.preventDefault();
		this.setState({ team: event.target.value });
	}

	render() {
		const { players } = this.props;
		if (!players) return <p>Didn't find any players</p>;

		//sorting functionality.
		//sort array of obj by position.
		//just sort position in alphabetic orders.

		const teams = [...new Set(players.map(item => item.team))];

		console.log('all teams', teams); // ['arsenal', 'aston villa'] -- ger alltså tillbaka en array med alla team i PL.

		//now - filter players array depending on Team? eg - user choose aston villa
		//sort by price. ascending and descending.

		//eventuellt göra om till en function med lite instruktioner som parameter 2.
		const sortPriceAsc = playerList => {
			return playerList.sort((a, b) => a.price - b.price);
		};

		const sortPriceDesc = playerList => {
			return playerList.sort((a, b) => b.price - a.price);
		};

		//sorterar från högt till lågt.
		const groupByTeam = (playerList, team = 'aston villa') => {
			return playerList.filter(player => {
				return team.indexOf(player.team.toLowerCase()) >= 0;
			});
		};

		let team = 'aston villa';
		console.log(groupByTeam(players, team)); // team är alltså det laget användaren väljer.
		console.log(sortPriceDesc(players)); //bygger ny array av objekt och ger tillbaka astonvilla-spelare.
		console.log(sortPriceAsc(players));

		// Apply search filters
		const filtered = this.filterByTeam(
			this.filterByName(players, this.state.searchTerm),
			this.state.team
		);

		return (
			<div className='App'>
				<button onClick={e => this.handleSortAsc(e)}>lågt till högt</button>
				<button onClick={e => this.handleSortDesc(e)}>
					högt till lågt
				</button>

				<select
					onChange={event => this.handleTeamOptionChange(event)}
					id='teams'
					defaultValue='default'
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

				<input
					name='name'
					onChange={this.handleTextFilterChange}
					placeholder='Spelarnamn ...'
				></input>

				<ul>
					{filtered.map((elem, i) => {
						return (
							<li key={i}>
								<strong>{elem.name}</strong>
								{' PRIS: '}
								{elem.price}
								{'Milj'}
								{' lag: '} {elem.team}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default PlayerSearch;
