import React, { Component } from 'react';
import { withAdmin } from '../AdminState';

import EditPlayer from './editPlayer';
/* import INITIAL_STATE from './config'; */
/* import { withTeam } from '../NewTeam/ctx'; */
import * as preset from '../../../constants/gamePreset';
import NewPlayer from './newPlayer';
import { clone, toSwe, toEng, shortenName, userMsg } from '../../../constants/helperFuncs';
import { allClubs } from '../../NewTeam/config';
/* import InfoModal from '../InfoModal'; */
import Paginate from '../../PlayerSearch/Paginate';
/* import Instructions from '../instructions/instructions'; */
import DropDown from 'react-dropdown';
/* import CaptainCard from '../CaptainCard/CaptainCard'; */
/* import 'react-dropdown/style.css'; */
import './dropdown_admin.css';
import '../../PlayerSearch/styles.css';
import Arrow from '../../../media/arrow.svg';
import { Wrapper, ContentWrapper } from '../template/wrapperTemplate';

/* import Cap from '../../media/Cap.svg'; */
/* import ViceCap from '../../media/ViceCap.svg'; */

/* import { GiCancel } from 'react-icons/gi'; */
import { FiSearch } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';

import {
    OuterWrapper,
    InnerWrapper,
    CancelBtn,
    Title,
    PlayerPrice,
    Player,
    Input,
    ButtonContainer,
    ButtonDes,
    ButtonAsc,
    ResultContainer,
    ResultBox,
    LabelRow,
    PlayerRow,
    ButtonReset,
    SearchFieldWrapper,
    ArrowWrapper,
    CapWrap
} from './style.js';

const INITIAL_STATE = {
    posOrClubSelected: { value: '', label: 'Position/klubb', eng: 'All players' },
    maxPriceSelected: { value: 'none', label: 'Maxpris', number: null },
    searchTerm: '',
    sortBy: 'price',
    priceSort: 'falling',

    paginationSettings: {
        pageNumber: 1,
        pageSize: 20
    },

    result: [],
    playerModal: false,

    editPlayer: null,
    newPlayer: null
};

class PlayerSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.setFilter_name = this.setFilter_name.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
        this.setFilter_posClub = this.setFilter_posClub.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.applyFilter_maxPrice = this.applyFilter_maxPrice.bind(this);
        this.applyFilter_name = this.applyFilter_name.bind(this);
        this.playerClickHandler = this.playerClickHandler.bind(this);
        this.deletePlayerCallback = this.deletePlayerCallback.bind(this);
        this.groupByPosition = this.groupByPosition.bind(this);
        this.handleSortByClick = this.handleSortByClick.bind(this);
        this.handleListClickSort = this.handleListClickSort.bind(this);
        this.onSubmitEditPlayer = this.onSubmitEditPlayer.bind(this);
    }

    onSubmitEditPlayer = (event, playerList, editPlayer) => {
        event.preventDefault();
        console.log(editPlayer);
        console.log(playerList);
        const config = {
            name: 0,
            price: 1,
            club: 2,
            pos: 3
        };

        const { name, price, club, pos } = config;
        const newProp = config => event.target[config].value;

        if (newProp(name) !== editPlayer.name) {
            editPlayer.name = newProp(name);
        }
        if (newProp(club) !== editPlayer.club) {
            editPlayer.club = newProp(club);
        }
        if (newProp(pos) !== editPlayer.position) {
            editPlayer.position = newProp(pos);
        }
        if (newProp(price) !== editPlayer.price) {
            editPlayer.price = newProp(price);
        }
        editPlayer.updatedAt = Date.now();
        console.log(editPlayer);
        this.setState({ updatedPlayer: !this.state.updatedPlayer });
    };

    addPlayer = (event, playersList) => {
        event.preventDefault();

        const { addPlayer } = this.props.adminContext.setters;

        addPlayer();
    };

    playerClickHandler = player => {
        this.setState({ editPlayer: null, updatedPlayer: false }, () => {
            this.setState({
                editPlayer: player,
                newPlayer: false
            });
        });
    };

    deletePlayerCallback = () => {
        this.setState({ editPlayer: null });
    };

    // reset filter & order
    resetSettings = () => {
        this.setState({
            ...INITIAL_STATE
        });
    };

    handleListClickSort = (e, type) => {
        const { sortBy, priceSort } = this.state;
        if (sortBy !== type) {
            this.setState({ sortBy: type });
        }
        if (priceSort === 'falling') {
            this.setState({ priceSort: 'rising' });
        } else if (priceSort === 'rising') {
            this.setState({ priceSort: 'falling' });
        }
    };
    /*     handleSEKClick = e => {
        const { sortBy, priceSort } = this.state;

        console.log(e.target);
    }; */

    handleSortByClick = e => {
        let cName = cName => e.target.className.includes(cName);
        if (cName('popularity')) {
            this.setState({ sortBy: 'popularity' });
        }
        if (cName('price')) {
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
     * SET FILTERS
     **************/

    // set filter: pos/club
    setFilter_posClub = selected => {
        // clone for mutation
        const res = clone(selected);

        // substr to get valid data
        const splitVal = res.value.indexOf('__');
        res.value = res.value.substring(0, splitVal);

        res.eng = res.value === 'position' ? toEng(res.label, 'positioner', 'sing') : res.label;

        // update state
        this.setState({ posOrClubSelected: res }, () => {
            this.goToFirstPage();
        });
    };

    // set filter: player max-price
    setFilter_maxPrice = selected => {
        // clone for mutation
        const res = clone(selected);
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
                player[this.state.posOrClubSelected.value] === this.state.posOrClubSelected.eng
        );
    };

    // return players according to max-price-filter
    applyFilter_maxPrice = playerList => {
        const maxPrice = this.state.maxPriceSelected.value;
        const noFilter =
            isNaN(maxPrice) ||
            !maxPrice ||
            maxPrice === '' ||
            maxPrice < 1 ||
            maxPrice.label === 'Maxpris'
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
        var groupBy = (arr, key) => {
            return arr.reduce(function (tot, cur) {
                (tot[cur[key]] = tot[cur[key]] || []).push(cur);
                return tot;
            }, {});
        };

        return groupBy(items, 'position');
    };

    /*
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
        const { paginationSettings, posOrClubSelected } = this.state;
        const { markedMode, adminContext, teamContext } = this.props;
        const { players } = adminContext.state;

        let resultLabel = posOrClubSelected.label;

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

        const priceOptions = [
            { value: 'maxPrice', label: 'Alla prisklasser' },
            ...priceTags
                .sort((a, b) => b - a)
                .map((price, nth) => {
                    return { value: `${parseInt(price)}`, label: `max ${price} kr` };
                }) //append kr to price.
        ];

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

        // get short club name (according to reuter)
        const clubAbbr = club => {
            if (!club || club === '') return 'no club';
            const res = allClubs.filter(item => item.long === club)[0];
            return res.short;
        };

        return (
            <Wrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ContentWrapper>
                    <OuterWrapper className="OuterWrapper PlayerSearch">
                        <InnerWrapper className="InnerWrapper PlayerSearch">
                            <>
                                <button
                                    style={{
                                        border: '1px solid #2f3e55',
                                        color: 'white',
                                        padding: '5px',
                                        marginBottom: '5px',
                                        fontWeight: '700',
                                        outline: 'none'
                                    }}
                                    onClick={() =>
                                        this.setState({
                                            newPlayer: !this.state.newPlayer,
                                            editPlayer: null
                                        })
                                    }
                                >
                                    Lägg till ny spelare
                                    <FaUserPlus style={{ position: 'relative', left: '10px' }} />
                                </button>
                                <Title className="SearchPlayer-Title unmarkable">
                                    Sök befintlig spelare
                                </Title>

                                <ArrowWrapper>
                                    <DropDown
                                        className="FilterByPosClub dropdown playerserach unmarkable"
                                        options={filterOptions}
                                        onChange={this.setFilter_posClub}
                                        value={posOrClubdefaultOption}
                                    />
                                    <img src={Arrow} alt="arrow" />
                                </ArrowWrapper>
                                <ArrowWrapper>
                                    <DropDown
                                        className="FilterByMaxPrice dropdown playerserach unmarkable"
                                        onChange={this.setFilter_maxPrice}
                                        value={maxPriceDefaultOption}
                                        options={priceOptions}
                                    />
                                    <img src={Arrow} alt="arrow" />
                                </ArrowWrapper>
                                <SearchFieldWrapper>
                                    <Input
                                        type="text"
                                        name="name"
                                        className="FilterByName unmarkable"
                                        onChange={this.setFilter_name}
                                        placeholder="Fritext"
                                        onFocus={e => (e.target.placeholder = '')}
                                        onBlur={e => (e.target.placeholder = 'Sök spelare')}
                                    ></Input>
                                    <FiSearch />
                                </SearchFieldWrapper>
                                <ButtonReset
                                    onClick={this.resetSettings}
                                    className="ResetFilter unmarkable"
                                >
                                    <strong>Återställ filter</strong>
                                </ButtonReset>

                                {/* RESULT */}
                                {paginated.length && (
                                    <ResultContainer className="ResultContainer">
                                        {!this.props.teamContext.state.config.mobileSearch && (
                                            <Paginate
                                                className="Paginate"
                                                goToPage={this.goToPage}
                                                settings={paginationSettings}
                                                playerCount={filtered.length}
                                                pageCount={Math.ceil(
                                                    filtered.length / paginationSettings.pageSize
                                                )}
                                            />
                                        )}
                                        <LabelRow className="LabelRow unmarkable">
                                            <div className="labelPosition">
                                                <p style={{ color: 'white' }}> {resultLabel}</p>
                                            </div>
                                            <div
                                                onClick={e => this.handleListClickSort(e, 'price')}
                                                className="tooltip labelPrice"
                                            >
                                                SEK{' '}
                                                <span className="tooltiptext">
                                                    Pris/spelare i svenska kronor
                                                </span>
                                            </div>
                                        </LabelRow>

                                        <ResultBox className="ResultBox unmarkable">
                                            {paginated.map((player, i) => {
                                                return (
                                                    <PlayerRow key={i} className="PlayerRow">
                                                        <Player
                                                            className="ListedPlayer"
                                                            onClick={e =>
                                                                this.playerClickHandler(player)
                                                            }
                                                        >
                                                            <p className="player">
                                                                {shortenName(player.name)}
                                                            </p>
                                                            <p className="sum">
                                                                <strong>
                                                                    {clubAbbr(player.club)}
                                                                </strong>
                                                                &nbsp; &nbsp;
                                                                {toSwe(
                                                                    player.position,
                                                                    'positions',
                                                                    'plural'
                                                                )}
                                                            </p>
                                                        </Player>

                                                        <PlayerPrice className="PlayerPrice">
                                                            <p className="player_price">
                                                                {Math.round(player.price)}
                                                            </p>
                                                        </PlayerPrice>
                                                    </PlayerRow>
                                                );
                                            })}
                                        </ResultBox>
                                    </ResultContainer>
                                )}
                            </>
                        </InnerWrapper>
                    </OuterWrapper>
                </ContentWrapper>

                <Wrapper>
                    <ContentWrapper
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '30px',
                            padding: '10px'
                        }}
                    >
                        {this.state.newPlayer && <NewPlayer players={players} />}
                        {this.state.updatedPlayer && <div>Du lyckades uppdatera en spelare</div>}

                        {this.state.editPlayer && (
                            <EditPlayer
                                editPlayer={this.state.editPlayer}
                                deletePlayerCallback={this.deletePlayerCallback}
                            />
                        )}
                    </ContentWrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}

export default withAdmin(PlayerSearch);
