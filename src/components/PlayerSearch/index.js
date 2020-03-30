import React, { Component } from 'react';
//import logo from './logo.svg';
//import '../App.css';

const players = [
	{
		createdAt: 1585306549714,
		name: 'Ross Barkley',
		positions: 'Midfielder',
		price: '5.5',
		team: 'Chelsea',
		uid: '-M3QcYle7QT9dlZoSYxO'
	},
	{
		createdAt: 1585306549715,
		name: 'Ruben Loftus-Cheek',
		positions: 'Midfielder',
		price: '6.5',
		team: 'Chelsea',
		uid: '-M3QcYle7QT9dlZoSYxP'
	},
	{
		createdAt: 1585306549716,
		name: 'Christian Pulisic',
		positions: 'Midfielder',
		price: '7.0',
		team: 'Chelsea',
		uid: '-M3QcYlfEUj6fA5tfTeM'
	},
	{
		createdAt: 1585306549718,
		name: 'Mateo Kovacic',
		positions: 'Midfielder',
		price: '5.5',
		team: 'Chelsea',
		uid: '-M3QcYlfEUj6fA5tfTeN'
	},
	{
		createdAt: 1585306549719,
		name: 'Mason Mount',
		positions: 'Midfielder',
		price: '6.0',
		team: 'Chelsea',
		uid: '-M3QcYlgBoLqJcxsRJ6y'
	},
	{
		createdAt: 1585306549426,
		name: 'Bernd Leno',
		positions: 'Goalkeeper',
		price: '5.0',
		team: 'Arsenal',
		uid: '-M3QcYkDw8jrP415N0Ql'
	},
	{
		createdAt: 1585306549429,
		name: 'Emiliano Martines',
		positions: 'Goalkeeper',
		price: '4.3',
		team: 'Arsenal',
		uid: '-M3QcYkFIXM8B24jL2LL'
	},
	{
		createdAt: 1585306549431,
		name: 'Lecter Vellerin',
		positions: 'Defender',
		price: '8.3',
		team: 'Leicster',
		uid: '-M3QcYkG2jxJNLwkCGHY'
	},
	{
		createdAt: 1585306549431,
		name: 'Hector Bellerin',
		positions: 'Defender',
		price: '5.5',
		team: 'Arsenal',
		uid: '-M3QcYkG2jxJNLwkCGHY'
	},
	{
		createdAt: 1585306549433,
		name: 'Relcop real',
		positions: 'Forward',
		price: '5.5',
		team: 'Arsenal',
		uid: '-M3QcYkG2jxJNLwkCGHd'
	},
	{
		createdAt: 1585306549576,
		name: 'Henri Lansbury',
		positions: 'Midfielder',
		price: '4.5',
		team: 'Aston Villa',
		uid: '-M3QcYkg41Xo6AIvLoqe'
	},
	{
		createdAt: 1585306549577,
		name: 'Jack Grealish',
		positions: 'Midfielder',
		price: '7.0',
		team: 'Aston Villa',
		uid: '-M3QcYkhKvIpqKKn9gDa'
	},
	{
		createdAt: 1585306549579,
		name: 'Conor Hourihane',
		positions: 'Midfielder',
		price: '6.0',
		team: 'Aston Villa',
		uid: '-M3QcYkiV70KlIm-60NI'
	},
	{
		createdAt: 1585306549580,
		name: 'Keinan Davis',
		positions: 'Midfielder',
		price: '4.5',
		team: 'Aston Villa',
		uid: '-M3QcYkiV70KlIm-60NJ'
	},
	{
		createdAt: 1585306549580,
		name: 'Beckham',
		positions: 'Midfielder',
		price: '4.5',
		team: 'Manchester United',
		uid: '-M3QcYkiV70KlIm-60NJ'
	}
];

//sorting functionality.
//sort array of obj by position.
//just sort position in alphabetic orders.

const teams = [...new Set(players.map(item => item.team))];
console.log(teams); // ['arsenal', 'aston villa'] -- ger alltså tillbaka en array med alla team i PL.

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

//sort by name. // make a function which looks for string containing specific letters.

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
	}

	filterByName = (playersList, searchTerm) => {
		searchTerm = searchTerm.trim().toLowerCase();
		return playersList.filter(elem => {
			return elem.name.toLowerCase().includes(searchTerm);
		});
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
		return (
			<div className='App'>
				<button onClick={e => this.handleSortAsc(e)}>lågt till högt</button>
				<button onClick={e => this.handleSortDesc(e)}>
					högt till lågt
				</button>
				<select
					onChange={event => this.handleTeamOptionChange(event)}
					id='teams'
				>
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
					{this.filterByName(players, this.state.searchTerm).map(
						(elem, i) => {
							return (
								<li key={i}>
									<strong>{elem.name}</strong> {' PRIS: '}
									{elem.price}
									{'Milj'}
									{' lag: '} {elem.team}
								</li>
							);
						}
					)}
				</ul>
			</div>
		);
	}
}

export default PlayerSearch;
