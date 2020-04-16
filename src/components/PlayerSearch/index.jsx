import React, { Component } from 'react';
import INITIAL_STATE from './config';
import { withNewTeam } from '../NewTeam/ctx';
import * as preset from '../../constants/gamePreset';
import {
    clone,
    toSwe,
    toEng,
    homePitch,
    afterWinResize,
    shortenName
} from '../../constants/helperFuncs';
import { allClubs } from '../NewTeam/config';
import Dropdown from 'react-dropdown';
import InfoModal from '../InfoModal';
import Paginate from './Paginate';
import InstructionsWrapper from '../instructionsWrapper/instructionsWrapper';
import 'react-dropdown/style.css';
import './dropdown.css';
import './styles.css';
import Arrow from '../../media/arrow.svg';
import { BrowserView, MobileView, isBrowser, isMobile, deviceDetect } from 'react-device-detect';

import { FaTrash, FaExchangeAlt, FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';

//import '../fonts/MrEavesXLModNarOT-Reg.ttf';

import {
    Wrapper,
    CancelBtn,
    Title,
    PlayerPrice,
    Player,
    Input,
    ButtonContainer,
    ButtonDes,
    ButtonAsc,
    ResultBox,
    Section,
    LabelRow,
    PlayerRow,
    ButtonReset,
    urlLink,
    SearchFieldWrapper,
    ArrowWrapper
} from './index.styled';

class PlayerSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.setFilter_name = this.setFilter_name.bind(this);

        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
        //this.paginate = this.paginate.bind(this)
        this.setFilter_posClub = this.setFilter_posClub.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.applyFilter_maxPrice = this.applyFilter_maxPrice.bind(this);
        this.applyFilter_name = this.applyFilter_name.bind(this);
        this.playerClickHandler = this.playerClickHandler.bind(this);
        this.groupByPosition = this.groupByPosition.bind(this);
        this.togglePlayerModal = this.togglePlayerModal.bind(this);
        this.checkIfSlider = this.checkIfSlider.bind(this);
        this.handleSortByClick = this.handleSortByClick.bind(this);
    }

    componentDidMount = (pp, ps) => {
        // on win resize, check if playerSearch should slide in or not
        afterWinResize(() => {
            this.checkIfSlider();
        }, 300);
    };

    // check if playerSearch should slide in
    checkIfSlider = () => {
        const { mobileSearch: oldVal } = this.props.NewTeam.state.config;
        const newVal = window.innerWidth < 900 ? true : false;

        if (oldVal !== newVal) {
            this.props.NewTeam.setters.toggleMobileSearch();
        }
    };

    // player info modal
    togglePlayerModal = () => {
        this.setState(ps => ({ playerModal: !ps.playerModal }));
    };

    // when clicking on listed player
    playerClickHandler = player => {
        const { position: pos } = player;
        const { markedMode, NewTeam } = this.props;
        const { addPlayer, setSwitchers, switchPlayers, closePlayerSearch } = NewTeam.setters;

        // if a plupp is already marked, prepare switch
        if (markedMode) {
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
                    switchPlayers();
                }
            );
            // if nothing marked, add player
        } else {
            addPlayer(player);
        }

        closePlayerSearch();
    };

    // reset filter & order
    resetSettings = () => {
        this.setState({
            ...INITIAL_STATE
        });
    };

    handleSortByClick = e => {
        if (e.target.className.includes('popularity')) {
            this.setState({ sortBy: 'popularity' });
        } else {
            this.setState({ sortBy: 'price' });
        }
    };

    // sort by (player price) rising/falling
    handleSort = e => {
        const { sortBy } = this.state;
        //first check wheter price or pupularity is clicked.
        //then sort it by falling of rising.
        // dont update if new val === old val
        if (sortBy === 'price') {
            if (this.state.priceSort === e.target.value) return;

            this.setState({ priceSort: e.target.value });
        }
        if (sortBy === 'popularity') {
            if (this.state.priceSort === e.target.value) return;

            this.setState({ priceSort: e.target.value });
        }
    };

    /*
     *
     *
     * SET FILTERS
     **************/

    // set filter: pos/club
    setFilter_posClub = selected => {
        // clone for mutation
        const res = clone(selected);

        // substr to get valid data
        const splitVal = res.value.indexOf('__');
        res.value = res.value.substring(0, splitVal);

        res.labelEng =
            res.value === 'position' ? toEng(res.label, 'positioner', 'sing') : res.label;

        // update state
        this.setState({ posOrClubSelected: res }, () => {
            this.goToFirstPage();
        });
    };

    // set filter: player max-price
    setFilter_maxPrice = selected => {
        // clone for mutation
        const res = clone(selected);

        // substr for valid data
        const splitLabel = res.label.indexOf(' kr');
        const splitVal = res.value.indexOf('__');
        res.label = res.label.substring(0, splitLabel);
        res.value = res.value.substring(0, splitVal);

        // update state
        this.setState({ maxPriceSelected: res }, () => {
            this.goToFirstPage();
        });
    };

    // set filter: name
    setFilter_name(event) {
        this.goToFirstPage();
        this.setState({ searchTerm: event.target.value });
    }

    /*
     *
     *
     * APPLY FILTERS
     ****************/

    // return players according to pos/club-filter
    applyFilter_posClub = playerList => {
        // if no active posClub-filter or plupp is marked, bail
        const noFilter = this.state.posOrClubSelected.value === '' ? true : false;

        if (noFilter || this.props.markedMode) return playerList;

        // else, filter
        return playerList.filter(
            player =>
                player[this.state.posOrClubSelected.value] === this.state.posOrClubSelected.labelEng
        );
    };

    // return players according to max-price-filter
    applyFilter_maxPrice = playerList => {
        const maxPrice = this.state.maxPriceSelected.label;
        const noFilter =
            isNaN(maxPrice) ||
            !maxPrice ||
            maxPrice === '' ||
            maxPrice < 1 ||
            maxPrice.label === 'Högsta pris'
                ? true
                : false;
        if (noFilter || this.props.markedMode) return playerList;

        return playerList.filter(player => player.price <= maxPrice);
    };

    // return players (names) according to searchTerm
    applyFilter_name = playersList => {
        if (this.state.searchTerm === '') return playersList;

        const searchTerm = this.state.searchTerm.trim().toLowerCase();

        return playersList.filter(player => {
            return player.name.toLowerCase().includes(searchTerm);
        });
    };
    /*
     *
     *
     * APPLY SORT-SETTINGS
     **********************/
    sortByPopularity = playerList => {
        const falling = this.state.priceSort === 'falling';

        return playerList.sort((a, b) =>
            falling ? b.popularity - a.popularity : a.popularity - b.popularity
        );
    };

    sortByPrice = playerList => {
        const falling = this.state.priceSort === 'falling' && this.state.sortBy === 'price';

        return playerList.sort((a, b) => (falling ? b.price - a.price : a.price - b.price));
    };

    // group players by position
    groupByPosition = items => {
        /* const res = [];
		preset.positions.forEach(pos => res.push([]));

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
		return res; */
        var groupBy = (arr, key) => {
            return arr.reduce(function (tot, cur) {
                (tot[cur[key]] = tot[cur[key]] || []).push(cur);
                return tot;
            }, {});
        };

        return groupBy(items, 'position');
    };

    /*
     *
     *
     * PAGINATION
     **************/

    // go to page
    goToPage = pageNumber => {
        this.setState(ps => ({
            paginationSettings: {
                ...ps.paginationSettings,
                pageNumber
            }
        }));
    };

    // go to first page in search result
    goToFirstPage = () => {
        this.setState(ps => ({
            paginationSettings: { ...ps.paginationSettings, pageNumber: 1 }
        }));
    };

    render() {
        const { paginationSettings, posOrClubSelected, searchTerm } = this.state;
        const { players, NewTeam, markedMode } = this.props;
        const { closePlayerSearch } = NewTeam.setters;
        const { mobileSearch, searchOpen, switchers, buildStage } = NewTeam.state.config;

        let resultLabel = markedMode
            ? toSwe(switchers.marked.pos, 'positions', 'plur')
            : posOrClubSelected.label;

        if (!players) return <p>Didn't find any players</p>;

        const clubs = [...new Set(players.map(item => item.club))];
        const priceTags = [...new Set(players.map(item => item.price))];

        const filterOptions = [
            //options for dropDown
            { value: '', label: 'Alla spelare' },
            {
                type: 'group',
                name: '- Positioner - ',
                items: [
                    ...preset.positions.map((position, nth) => {
                        return {
                            value: `position__${nth}`,
                            label: toSwe(position, 'positions', 'plur')
                        };
                    })
                ]
            },
            {
                type: 'group',
                name: '- Klubbar -',
                items: [
                    ...clubs.map((club, nth) => {
                        return { value: `club__${nth}`, label: club };
                    })
                ]
            }
        ];

        //options for dropdown.
        const maxPriceDefaultOption = this.state.maxPriceSelected;

        const priceOptions = priceTags
            .sort((a, b) => b - a)
            .map((price, nth) => {
                return { value: `maxPrice__${nth}`, label: price + ' kr' };
            }); //append kr to price.

        //default option for dropdown - All players are shown.
        const posOrClubdefaultOption = this.state.posOrClubSelected;

        const filtered = this.applyFilter_maxPrice(
            this.applyFilter_posClub(this.applyFilter_name(players))
        );

        // Apply order-config
        //const sorted = this.applySortBy(filtered);
        //return either sorted by price or popularity
        const sorted =
            this.state.sortBy === 'popularity'
                ? this.sortByPopularity(filtered)
                : this.sortByPrice(filtered);
        // WIP-test. split into result-sections based on sort
        const paginate = (playersList, pageSize, pageNumber) => {
            //stores the amount of players / page in variable;
            const playersPerPage = playersList.slice(
                (pageNumber - 1) * pageSize,
                pageNumber * pageSize
            );

            return playersPerPage;
            // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        };

        const paginated = paginate(
            sorted,
            paginationSettings.pageSize,
            paginationSettings.pageNumber
        );
        //const result = markedMode ? sorted : this.groupByPosition(paginated);
        const result = this.groupByPosition(paginated);
        //const result = paginated
        // get short club name (according to reuter)
        const clubAbbr = club => {
            return allClubs.filter(item => item.long === club)[0].short;
        };
        //console.log(Object.keys(result));
        //console.log(result);
        //console.log('search output', result);

        return (
            <Wrapper
                className="Wrapper PlayerSearch"
                mobileSearch={mobileSearch}
                searchOpen={searchOpen}
            >
                {mobileSearch && (
                    <CancelBtn onClick={closePlayerSearch}>
                        <GiCancel />
                    </CancelBtn>
                )}
                {/* FILTER */}
                {/* (FILTER) <br />  */}
                {/* temp */}
                <Title className="SearchPlayer-Title unmarkable">Välj spelare</Title>
                <ArrowWrapper>
                    <Dropdown
                        className="FilterByPosClub dropdown playerserach unmarkable"
                        options={filterOptions}
                        onChange={this.setFilter_posClub}
                        value={posOrClubdefaultOption}
                        placeholder="Select an option"
                    />
                    <img src={Arrow} alt="arrow" />
                </ArrowWrapper>
                <ArrowWrapper>
                    <Dropdown
                        className="FilterByMaxPrice dropdown playerserach unmarkable"
                        onChange={this.setFilter_maxPrice}
                        value={maxPriceDefaultOption}
                        options={priceOptions}
                        placeholder="Maxpris/spelare"
                    />
                    <img src={Arrow} alt="arrow" />
                </ArrowWrapper>
                <SearchFieldWrapper>
                    <Input
                        type="text"
                        name="name"
                        className="FilterByName unmarkable"
                        onChange={this.setFilter_name}
                        placeholder="Sök spelare"
                        onFocus={e => (e.target.placeholder = '')}
                        onBlur={e => (e.target.placeholder = 'Sök spelare')}
                    ></Input>
                    <FiSearch />
                </SearchFieldWrapper>

                <h2 className="FilterTitle unmarkable">
                    Sortera efter:
                    <span
                        className={`${
                            this.state.sortBy === 'price' ? 'clicked' : ''
                        } clickable price`}
                        onClick={this.handleSortByClick}
                    >
                        {' '}
                        pris{' '}
                    </span>
                    -
                    <span
                        className={`${
                            this.state.sortBy === 'popularity' ? 'clicked' : ''
                        } clickable popularity`}
                        onClick={this.handleSortByClick}
                    >
                        {' '}
                        popularitet
                    </span>
                </h2>
                <ButtonContainer className="ButtonContainer playersearch">
                    <ButtonDes
                        className="SortFalling unmarkable"
                        style={
                            this.state.priceSort === 'falling'
                                ? { fontWeight: 'bold' }
                                : { fontWeight: '500' }
                        }
                        value="falling"
                        onClick={this.handleSort}
                    >
                        Fallande
                    </ButtonDes>
                    <ButtonAsc
                        className="SortRising unmarkable"
                        style={
                            this.state.priceSort === 'rising'
                                ? { fontWeight: 'bold' }
                                : { fontWeight: '500' }
                        }
                        value="rising"
                        onClick={this.handleSort}
                    >
                        Stigande
                    </ButtonAsc>
                </ButtonContainer>

                <ButtonReset onClick={this.resetSettings} className="ResetFilter unmarkable">
                    <strong>Återställ filter</strong>
                </ButtonReset>

                {/* RESULT */}
                {paginated.length ? (
                    <React.Fragment>
                        <Paginate
                            goToPage={this.goToPage}
                            settings={paginationSettings}
                            playerCount={filtered.length}
                            pageCount={Math.ceil(filtered.length / paginationSettings.pageSize)}
                        />

                        <LabelRow className="unmarkable">
                            <div className="labelPosition">
                                <p> {resultLabel}</p>
                            </div>
                            {'   '}
                            <div className="labelPercentage">
                                <p>%</p>
                            </div>
                            <div className="labelPrice">
                                <p>SEK</p>
                            </div>
                        </LabelRow>

                        <ResultBox className="ResultBox unmarkable">
                            {paginated.map((player, i) => {
                                return (
                                    <PlayerRow key={i} className="PlayerRow">
                                        <InfoModal
                                            title={player.name}
                                            subtitle={`${player.club} - ${toSwe(
                                                player.position,
                                                'positions'
                                            )}`}
                                            img="https://source.unsplash.com/random"
                                            display={this.state.playerModal}
                                            togglePlayerModal={this.togglePlayerModal}
                                        >
                                            <p>Värde: {player.price} kr</p>
                                            <p>
                                                <a
                                                    style={{
                                                        color: '#eee',
                                                        textDecoration: 'none'
                                                    }}
                                                    href={homePitch(player.club)}
                                                >
                                                    Hemmaplan
                                                </a>
                                            </p>
                                        </InfoModal>

                                        <Player
                                            className="ListedPlayer"
                                            onClick={e => this.playerClickHandler(player)}
                                        >
                                            <p className="player">{shortenName(player.name)}</p>
                                            <p className="sum">
                                                <strong>{clubAbbr(player.club)}</strong>
                                                &nbsp; &nbsp;
                                                {toSwe(player.position, 'positions')}
                                            </p>
                                        </Player>

                                        <PlayerPrice className="PlayerPopularity">
                                            <p className="player_popularity">{player.popularity}</p>
                                        </PlayerPrice>

                                        <PlayerPrice className="PlayerPrice">
                                            <p className="player_price">
                                                {Math.round(player.price)}
                                            </p>
                                        </PlayerPrice>
                                    </PlayerRow>
                                );
                            })}
                        </ResultBox>
                    </React.Fragment>
                ) : (
                    <InstructionsWrapper
                        list={NewTeam.state.team.list}
                        buildStagePage={buildStage.index}
                        posOrClub={posOrClubSelected}
                    />
                )}
            </Wrapper>
        );
    }
}

export default withNewTeam(PlayerSearch);
