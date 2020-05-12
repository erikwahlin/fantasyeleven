import React, { Component, useState, useEffect } from 'react';

import { withAdmin } from '../AdminState';

import PlayerSearch from './PlayerSearch';

//import players from '../../../constants/players';
import getPlayers from '../../../constants/players';
import EditPlayer from './editPlayer';
/* import INITIAL_STATE from './config'; */
/* import { withTeam } from '../NewTeam/ctx'; */
import * as preset from '../../../constants/gamePreset';
import NewPlayer from './newPlayer';
import { AiFillDelete } from 'react-icons/ai';
import {
    clone,
    toSwe,
    toEng,
    homePitch,
    afterWinResize,
    shortenName
} from '../../../constants/helperFuncs';
import { allClubs } from '../../NewTeam/config';
/* import InfoModal from '../InfoModal'; */
import Paginate from '../../PlayerSearch/Paginate';
/* import Instructions from '../instructions/instructions'; */
import DropDown from 'react-dropdown';
/* import CaptainCard from '../CaptainCard/CaptainCard'; */
import 'react-dropdown/style.css';
import './dropdown_admin.css';
import '../../PlayerSearch/styles.css';
import Arrow from '../../../media/arrow.svg';
import { Wrapper, ContentWrapper } from '../template/wrapperTemplate';

/* import Cap from '../../media/Cap.svg'; */
/* import ViceCap from '../../media/ViceCap.svg'; */

/* import { GiCancel } from 'react-icons/gi'; */
import { FiSearch } from 'react-icons/fi';

//import '../fonts/MrEavesXLModNarOT-Reg.ttf';

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

//const players = getPlayers();

const Players = props => {
    const players = props.adminContext.state.players;

    return (
        <div>
            <PlayerSearch players={players} /* markedMode={this.checkMarkedMode()} */ />
        </div>
    );
};

export default withAdmin(Players);
