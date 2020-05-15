import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon, CaptainCard } from './template';
import capImg from '../../../media/Cap.svg';
import viceImg from '../../../media/ViceCap.svg';

const CaptainInfo = ({ teamContext }) => {
    const { team } = teamContext.state;
    const { players, captain, viceCaptain } = team;
    const findCaptain = (players, cap) => {
        if (cap) return team.list.filter(player => player._id === cap);
    };
    console.log(findCaptain(players, captain));
    const cap = findCaptain(players, viceCaptain);
    console.log(cap);
    return (
        <Wrapper className="StageInfo">
            <Section className="Section">
                <CaptainCard
                    role="captain"
                    obj={findCaptain(players, captain)}
                    img={capImg}
                    className="CaptainCard captain"
                />
            </Section>

            <Section className="Section">
                <CaptainCard
                    role="viceCaptain"
                    obj={findCaptain(players, viceCaptain)}
                    img={viceImg}
                    className="CaptainCard viceCaptain"
                />
            </Section>
        </Wrapper>
    );
};

export default withTeam(CaptainInfo);
