import React, { Component } from 'react';
import INITIAL_STATE from './config';
import { withTeam } from '../NewTeam/ctx';
import * as preset from '../../constants/gamePreset';
import {
    clone,
    toSwe,
    toEng,
    homePitch,
    afterWinResize,
    shortenName
} from '../../constants/helperFuncs';
import allClubs from '../../constants/clubs';
import InfoModal from '../InfoModal';
import Paginate from './Paginate';
import Instructions from '../instructions/instructions';
import DropDown from 'react-dropdown';
import CaptainCard from '../CaptainCard/CaptainCard';
import 'react-dropdown/style.css';
import './dropdown.css';
import './styles.css';
import arrowDown from '../../media/arrowDown.svg';
import arrowUp from '../../media/arrowUp.svg';
import Cap from '../../media/Cap.svg';
import ViceCap from '../../media/ViceCap.svg';

import { GiCancel } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import {
    OuterWrapper,
    InnerWrapper,
    CancelBtn,
    Title,
    PlayerPrice,
    Player,
    Input,
    AltButtonCol,
    AltButtonRow,
    AltButton,
    ResultContainer,
    ResultBox,
    LabelRow,
    PlayerRow,
    ButtonReset,
    SearchFieldWrapper,
    ArrowWrapper,
    CapWrap,
    MultiPick,
    ColorTag
} from './index.styled';

class PlayerSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.setFilter_name = this.setFilter_name.bind(this);

        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
        this.setFilter_pos = this.setFilter_pos.bind(this);
        this.setFilter_club = this.setFilter_club.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.applyFilter_maxPrice = this.applyFilter_maxPrice.bind(this);
        this.applyFilter_name = this.applyFilter_name.bind(this);
        this.applyFilter_club = this.applyFilter_club.bind(this);
        this.playerClickHandler = this.playerClickHandler.bind(this);
        this.groupByPosition = this.groupByPosition.bind(this);
        this.togglePlayerModal = this.togglePlayerModal.bind(this);
        this.checkIfSlider = this.checkIfSlider.bind(this);
        this.handleListClickSort = this.handleListClickSort.bind(this);
        this.setMultiPick = this.setMultiPick.bind(this);
    }

    componentDidMount = (pp, ps) => {
        // on win resize, check if playerSearch should slide in or not
        afterWinResize(() => {
            this.checkIfSlider();
        }, 300);
    };

    // check if playerSearch should slide in
    checkIfSlider = () => {
        const { mobileSearch: oldVal } = this.props.teamContext.state.config;
        const newVal = window.innerWidth < 900 ? true : false;

        if (oldVal !== newVal) {
            this.props.teamContext.setters.toggleMobileSearch();
        }
    };

    // player info modal
    togglePlayerModal = () => {
        this.setState(ps => ({ playerModal: !ps.playerModal }));
    };

    // when clicking on listed player
    playerClickHandler = player => {
        const { position: pos } = player;
        const { markedMode, teamContext } = this.props;
        const { team } = teamContext.state;
        const { addPlayer, setSwitchers, switchPlayers, closePlayerSearch } = teamContext.setters;

        const pitchPlayers = Object.values(team.players.pitch).reduce((res, next) => {
            return res.concat(next);
        }, []);

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

        if (!this.state.multiPick || pitchPlayers.length >= 10) closePlayerSearch(); // 10 players = full pitch, because of pre state-update
    };

    // reset filter & order
    resetSettings = () => {
        this.setState({
            ...INITIAL_STATE
        });
    };

    handleListClickSort = (e, type) => {
        const { sortBy, sortDirection } = this.state;

        if (sortBy !== type) {
            this.setState({ sortBy: type });
        }
        if (sortDirection === 'desc') {
            this.setState({ sortDirection: 'asc' });
        } else if (sortDirection === 'asc') {
            this.setState({ sortDirection: 'desc' });
        }
    };

    // sort by (player price) rising/falling
    handleSort = newDirection => {
        const { sortDirection, sortBy } = this.state;

        if (newDirection !== sortDirection) {
            this.setState({ sortDirection: newDirection });
        }
    };

    /*
     *
     *
     * SET FILTERS
     **************/

    // set filter: pos/club
    setFilter_pos = selected => {
        // clone for mutation
        let res = clone(selected);

        // update state
        this.setState({ filterPos: res }, () => {
            this.goToFirstPage();
        });
    };

    setFilter_club = selected => {
        // clone for mutation
        let res = clone(selected);

        // update state
        this.setState({ filterClub: res }, () => {
            this.goToFirstPage();
        });
    };

    // set filter: player max-price
    setFilter_maxPrice = selected => {
        // clone for mutation
        const res = clone(selected);

        /* // substr for valid data
        const splitLabel = res.label.indexOf(' kr');
        const splitVal = res.value.indexOf('__');

        //res.value = res.value.substring(0, splitVal);
        res.number =
            res.label !== 'Alla prisklasser' ? parseInt(res.value.substring(0, splitVal)) : null; */

        // update state
        this.setState({ filterMaxPrice: res }, () => {
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
    applyFilter_pos = playerList => {
        const { filterPos } = this.state;
        // if no active posClub-filter or plupp is marked, bail
        if (!filterPos.value || this.props.markedMode) return playerList;

        // else, filter
        return playerList.filter(player => toSwe(player.position, 'positions') === filterPos.value);
    };

    // return players according to pos/club-filter
    applyFilter_club = playerList => {
        const { filterClub } = this.state;

        // if no active posClub-filter or plupp is marked, bail
        if (!filterClub.value || this.props.markedMode) return playerList;

        // else, filter
        return playerList.filter(player => player.club === filterClub.value);
    };

    // return players according to max-price-filter
    applyFilter_maxPrice = playerList => {
        const maxPrice = this.state.filterMaxPrice.value;
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
     *
     *
     * APPLY SORT-SETTINGS
     **********************/
    applySort = playerList => {
        const { sortBy: sortProp, sortDirection } = this.state;

        return playerList.sort((a, b) =>
            sortDirection === 'desc' ? b[sortProp] - a[sortProp] : a[sortProp] - b[sortProp]
        );
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

    setMultiPick = newVal => {
        this.setState(ps => ({ multiPick: typeof newVal === 'boolean' ? newVal : !ps.multiPick }));
    };

    render() {
        const {
            paginationSettings,
            filterPos,
            filterClub,
            filterMaxPrice,
            searchTerm,
            sortBy,
            sortDirection
        } = this.state;
        const { players, teamContext, markedMode } = this.props;
        const { closePlayerSearch } = teamContext.setters;
        const { mobileSearch, searchOpen, switchers, buildStage } = teamContext.state.config;
        const { team } = teamContext.state;
        const { captain, viceCaptain } = team;

        let resultLabel = markedMode
            ? toSwe(switchers.marked.pos, 'positions', 'plur')
            : filterPos.value
            ? filterPos.value
            : filterClub.value
            ? filterClub.value
            : '';

        if (!players) return <p>Didn't find any players</p>;

        // filter options
        const posOptions = [
            { value: '', label: 'Alla positioner' },

            ...preset.positions.map(pos => ({
                value: toSwe(pos, 'positions'),
                label: toSwe(pos, 'positions', 'plur')
            }))
        ];

        const clubOptions = [
            { value: null, label: 'Alla klubbar' },
            ...allClubs.map(club => ({ value: club.long, label: club.long }))
        ];

        const priceOptions = [
            { value: null, label: 'Alla prisklasser' },
            ...[...new Set(players.map(item => Math.round(item.price)))]
                .sort((a, b) => b - a)
                .map(price => ({ value: Number(price), label: `max ${price} kr` }))
        ];

        //options for dropdown.
        const maxPriceDefaultOption = this.state.filterMaxPrice;

        /* const priceOptions = [
            { value: 'maxPrice', label: 'Alla prisklasser' },
            ...priceTags
                .sort((a, b) => b - a)
                .map((price, nth) => {
                    return { value: `${parseInt(price)}`, label: `max ${price} kr` };
                }) //append kr to price.
        ]; */

        //default option for dropdown - All players are shown.
        const posOrClubdefaultOption = this.state.posOrClubSelected;

        const filtered = this.applyFilter_maxPrice(
            this.applyFilter_pos(this.applyFilter_club(this.applyFilter_name(players)))
        );

        // Apply order-config
        //const sorted = this.applySortBy(filtered);
        //return either sorted by price or popularity
        const sorted = this.applySort(filtered);

        // WIP-test. split into result-sections based on sort
        const paginate = (playersList, pageSize, pageNumber, mobileSearch) => {
            //stores the amount of players / page in variable;

            const playersPerPage = mobileSearch
                ? playersList
                : playersList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return playersPerPage;
            // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        };

        const paginated = paginate(
            sorted,
            paginationSettings.pageSize,
            paginationSettings.pageNumber,
            this.props.teamContext.state.config.mobileSearch
        );

        const clubAbbr = club => {
            if (!club) return '';
            return allClubs.filter(item => item.long === club)[0].short;
        };

        return (
            <OuterWrapper className="OuterWrapper PlayerSearch">
                <InnerWrapper
                    className="InnerWrapper PlayerSearch"
                    mobileSearch={mobileSearch}
                    searchOpen={searchOpen}
                >
                    {mobileSearch && (
                        <CancelBtn onClick={closePlayerSearch} className="CancelBtn">
                            <GiCancel />
                        </CancelBtn>
                    )}
                    {/* FILTER */}
                    {/* temp */}
                    {buildStage.stageName === 'captain' ? (
                        <CapWrap>
                            <CaptainCard obj={captain && captain}>
                                <img src={Cap} alt="Captain" /> Kapten:{' '}
                            </CaptainCard>
                            <CaptainCard obj={viceCaptain && viceCaptain}>
                                <img src={ViceCap} alt="Vice Captain" /> Vice Kapten:{' '}
                            </CaptainCard>
                            <p className="capInfo">
                                Din kapten får dubbla poäng, lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Maecenas convallis rhoncus sem, vitae tristique
                                mauris ullamcorper eu.
                            </p>
                        </CapWrap>
                    ) : (
                        <>
                            {/* <Title className="SearchPlayer-Title unmarkable">Sök spelare</Title> */}
                            <AltButtonCol>
                                <DropDown
                                    className="filter-pos dropdown playerserach unmarkable"
                                    options={posOptions}
                                    onChange={this.setFilter_pos}
                                    value={filterPos}
                                    arrowClosed={
                                        <img
                                            className="dropdown-arrow"
                                            src={arrowDown}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                    arrowOpen={
                                        <img
                                            className="dopdown-arrow arrow-open"
                                            src={arrowUp}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                />
                                {/*  <img className="arrow-icon" src={Arrow} alt="arrow" /> */}

                                {/* club filter */}
                                <DropDown
                                    className="filter-club dropdown playerserach unmarkable"
                                    options={clubOptions}
                                    onChange={this.setFilter_club}
                                    value={filterClub}
                                    arrowClosed={
                                        <img
                                            className="dropdown-arrow"
                                            src={arrowDown}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                    arrowOpen={
                                        <img
                                            className="dopdown-arrow arrow-open"
                                            src={arrowUp}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                />

                                <DropDown
                                    className="FilterByMaxPrice dropdown playerserach unmarkable"
                                    onChange={this.setFilter_maxPrice}
                                    value={maxPriceDefaultOption}
                                    options={priceOptions}
                                    value={filterMaxPrice}
                                    arrowClosed={
                                        <img
                                            className="dropdown-arrow"
                                            src={arrowDown}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                    arrowOpen={
                                        <img
                                            className="dopdown-arrow arrow-open"
                                            src={arrowUp}
                                            alt="dropdown-arrow-icon"
                                        />
                                    }
                                />
                                <SearchFieldWrapper>
                                    <Input
                                        type="text"
                                        name="name"
                                        className="FilterByName unmarkable"
                                        onChange={this.setFilter_name}
                                        placeholder="Sök spelare"
                                        value={searchTerm}
                                    ></Input>
                                    <FiSearch />
                                </SearchFieldWrapper>
                            </AltButtonCol>

                            <AltButtonCol>
                                <p className="alt-label">Sortera efter</p>
                                <AltButtonRow className="alt-button-row playersearch">
                                    <AltButton
                                        className="sort-by-button unmarkable"
                                        onClick={() => this.setState({ sortBy: 'price' })}
                                        active={sortBy === 'price'}
                                    >
                                        Pris
                                    </AltButton>
                                    <AltButton
                                        className="sort-by-button unmarkable"
                                        onClick={() => this.setState({ sortBy: 'popularity' })}
                                        active={sortBy === 'popularity'}
                                    >
                                        Popularitet
                                    </AltButton>
                                </AltButtonRow>

                                <AltButtonRow className="alt-button-row playersearch">
                                    <AltButton
                                        className="sort-desc unmarkable"
                                        onClick={() => this.handleSort('desc')}
                                        active={sortDirection === 'desc'}
                                    >
                                        Fallande
                                    </AltButton>
                                    <AltButton
                                        className="sort-asc unmarkable"
                                        sortDirection={sortDirection}
                                        onClick={() => this.handleSort('asc')}
                                        active={sortDirection === 'asc'}
                                    >
                                        Stigande
                                    </AltButton>
                                </AltButtonRow>
                            </AltButtonCol>

                            <ButtonReset
                                onClick={this.resetSettings}
                                className="ResetFilter unmarkable"
                            >
                                Nollställ filter
                            </ButtonReset>

                            {/* RESULT */}
                            {paginated.length ? (
                                <ResultContainer className="ResultContainer">
                                    <Paginate
                                        mobileSearch={mobileSearch}
                                        className="Paginate"
                                        goToPage={this.goToPage}
                                        settings={paginationSettings}
                                        playerCount={filtered.length}
                                        pageCount={Math.ceil(
                                            filtered.length / paginationSettings.pageSize
                                        )}
                                    />

                                    {mobileSearch && (
                                        <MultiPick
                                            className="multi-pick"
                                            multiPick={this.state.multiPick}
                                            onClick={this.setMultiPick}
                                        >
                                            <p className="label">Välj flera</p>
                                            <Switch
                                                className="multi-pick-switch"
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                checked={this.state.multiPick}
                                            />
                                        </MultiPick>
                                    )}

                                    <LabelRow className="LabelRow unmarkable">
                                        <div className="labelPosition">
                                            <p> {resultLabel}</p>
                                        </div>
                                        <div
                                            onClick={e => this.handleListClickSort(e, 'popularity')}
                                            className="tooltip labelPercentage"
                                        >
                                            %<span className="tooltiptext">Popularitet</span>
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
                                                <PlayerRow
                                                    key={`${player._id}-${i}`}
                                                    className="PlayerRow"
                                                >
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
                                                        onClick={e =>
                                                            this.playerClickHandler(player)
                                                        }
                                                    >
                                                        <p className="player">
                                                            {shortenName(player.name)}
                                                        </p>
                                                        <p className="sum">
                                                            <strong>{clubAbbr(player.club)}</strong>
                                                            &nbsp; &nbsp;
                                                            {toSwe(player.position, 'positions')}
                                                        </p>
                                                    </Player>

                                                    <PlayerPrice className="PlayerPopularity">
                                                        <p className="player_popularity">
                                                            {player.popularity}
                                                        </p>
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
                                </ResultContainer>
                            ) : null}

                            {!paginated.length && (
                                <Instructions
                                    benchPlayers={teamContext.state.team.players.bench} // array of benchplayers from state
                                    pitchPlayers={teamContext.state.team.players.pitch}
                                    buildStagePage={buildStage.stageName}
                                    posOrClub={
                                        filterPos ? filterPos : filterClub ? filterClub : null
                                    }
                                />
                            )}
                        </>
                    )}
                </InnerWrapper>
            </OuterWrapper>
        );
    }
}

export default withTeam(PlayerSearch);
