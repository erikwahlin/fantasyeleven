import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const PitchInfo = ({ teamContext }) => {
    const { team } = teamContext.state;
    const { value, round } = team;

    const pitchValue = value.pitch;

    const ready = true;

    const notReady = false;

    return (
        <Wrapper className="StageInfo">
            <Section>
                <Key className="Key">Din satsning</Key>
                <Val ready={ready} className="amount">
                    {pitchValue} kr
                </Val>
            </Section>

            <Section>
                <Key className="Key">Spelomgång</Key>
                <Val className="Val round">{round}</Val>
            </Section>
        </Wrapper>
    );
};

export default withTeam(PitchInfo);
