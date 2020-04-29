import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon, CaptainCard } from './template';
import capImg from '../../../media/Cap.svg';
import viceImg from '../../../media/ViceCap.svg';

const CaptainInfo = ({ teamContext }) => {
    const { team } = teamContext.state;
    const { captain, viceCaptain } = team;
    const capObj = team.list.filter(p => p.uid === captain)[0] || { name: '' };
    const viceObj = team.list.filter(p => p.uid === viceCaptain)[0] || { name: '' };

    return (
        <Wrapper className="StageInfo">
            <Section className="Section">
                <CaptainCard
                    role="captain"
                    name={capObj.name}
                    img={capImg}
                    className="CaptainCard captain"
                />
            </Section>

            <Section className="Section">
                <CaptainCard
                    role="viceCaptain"
                    name={viceObj.name}
                    img={viceImg}
                    className="CaptainCard viceCaptain"
                />
            </Section>
        </Wrapper>
    );
};

export default withTeam(CaptainInfo);
