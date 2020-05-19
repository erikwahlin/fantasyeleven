import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon } from './template';

const PitchInfo = ({ teamContext }) => {
    const { team, round } = teamContext.state;
    const { value } = team;

    const pitchValue = value.pitch;

    const ready = true;

    let roundOutput = 'För tillfället finnsingen aktiv omgång';

    if (round) {
        roundOutput = round.alias;
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
                <Val className="Val round">{roundOutput}</Val>
            </Section>
        </Wrapper>
    );
};

export default withTeam(PitchInfo);
