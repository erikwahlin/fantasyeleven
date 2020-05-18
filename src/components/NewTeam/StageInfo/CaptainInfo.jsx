import React from 'react';
import { withTeam } from '../ctx';
import { toSwe, countPlayers } from '../../../constants/helperFuncs';

import { Wrapper, Section, Key, Val, Button, AddPlayerIcon, CaptainCard } from './template';
import capImg from '../../../media/Cap.svg';
import viceImg from '../../../media/ViceCap.svg';

const CaptainInfo = ({ teamContext }) => {
    const { team, mobileSearch } = teamContext.state;
    const { players, captain, viceCaptain } = team;
    const findCaptain = (players, cap) => {
        if (cap && players) return players.list.filter(player => player._id === cap)[0];
    };

    return (
        <>
            {mobileSearch && (
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
            )}
            <Wrapper>
                {' '}
                {/*                 Vill du välja {potentialCaptain.name} till{' '}
                <button onClick={this.setCap('captain')}></button> eller{' '}
                <button onClick={this.setCap('viceCaptain')}></button> */}
            </Wrapper>
        </>
    );
};

export default withTeam(CaptainInfo);
