import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const PitchInfo = ({ teamContext }) => {
    const { team, round } = teamContext.state;
    const { value } = team;

    const pitchValue = value.pitch;

    const ready = true;

    let roundOutput = 'Just nu är ingen omgång aktiv.';
    let roundReady = false;
    let roundNotReady = true;

    if (round) {
        roundOutput = round.alias;
        roundReady = true;
        roundNotReady = false;
    }

    return (
        <Wrapper className="StageInfo">
            <Section>
                <Key className="Key">Din satsning</Key>
                <Val ready={ready} className="amount">
                    {pitchValue} kr
                </Val>
            </Section>

            <Section>
                <Key className="Key">Omgång</Key>
                <Val ready={roundReady} notReady={roundNotReady} className="Val round">
                    {roundOutput}
                </Val>
            </Section>
        </Wrapper>
    );
};

export default withTeam(PitchInfo);
