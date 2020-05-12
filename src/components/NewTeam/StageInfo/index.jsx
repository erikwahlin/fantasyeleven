import React from 'react';
import { withTeam } from '../ctx';
import styled from 'styled-components';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';
import CaptainCard from '../../CaptainCard/CaptainCard';
import CapImg from '../../../media/Cap.svg';
import ViceImg from '../../../media/ViceCap.svg';

import { Wrapper } from './template';


import PitchInfo from './PitchInfo';
import CaptainInfo from './CaptainInfo';
import BenchInfo from './BenchInfo';
import OverviewInfo from './OverviewInfo';

const StageInfo = ({ teamContext }) => {
    const { stageName } = teamContext.state.config.buildStage;

    // StageInfo based on cur stage
    const content = {
        pitch: <PitchInfo />,
        captain: <CaptainInfo />,
        bench: <BenchInfo />,
        overview: <OverviewInfo />
    };

    return <Wrapper className="StageInfo unmarkable">{content[stageName]}</Wrapper>;
};

export default withTeam(StageInfo);
