import React, { useRef, useEffect } from 'react';
import { withMyTeam } from '../ctx';
import styled from 'styled-components';
import Pitch from '../Pitch';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Wrapper = styled.div`
	grid-row: 2;
	/* display: flex;
	grid-template-columns: 100%;
	grid-template-rows: 80px auto;
	position: relative; */
	width: 100%;
	height: 100%;
	max-width: 800px;
	/* margin: auto;
    margin-top: 0; */

	display: flex;
	flex-direction: column;
	justify-content: stretch;

	@media screen and (min-width: 900px) {
		grid-column: 2;
	}
`;

const TabContainer = styled(Tabs)`
	flex: 1;

	display: flex;
	flex-direction: column-reverse;

	& .tablist {
		width: 100%;
	}

	& .ant-tabs-nav-container-scrolling {
		padding: 0;
	}

	& .ant-tabs-nav-scroll {
		width: 100%;
	}

	& .ant-tabs-nav {
		width: 100%;
		& > div {
			width: 100%;
			display: flex;
		}
	}

	& .ant-tabs-tab {
		flex: 1;
		margin: 0;
	}

	& .ant-tabs-content {
		flex: 1;
	}
`;

const Tab = styled(TabPane)``;

const callback = key => {
	console.log('Tab', key);
};

const NavContainer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-around;
`;

const NavBtn = styled.button`
	width: 100px;
	height: 50px;
	background: #031e3d;
	border: 1px solid white;
	border-radius: 2px;
	outline: none;
	cursor: pointer;
	font-family: 'Avenir';
	font-size: 0.9em;
	font-weight: bold;
	color: white;
	opacity: ${p => (p.disabled ? '.5' : '1')};
`;

const BuildStages = ({ buildStage, myTeam, ...props }) => {
	const pitchCount = myTeam.state.team.list.filter(player => player.origin === 'pitch').length;
	const { setStage } = myTeam.setters;

	const callback = key => {};

	const tabRef = useRef(null);

	const tabs = [
		{
			tab: 'Pitch',
			key: 'pitch',
			content: <Pitch />,
			condition: pitchCount === 11,
			ref: useRef()
		},
		{
			tab: 'Bench',
			key: 'bench',
			content: <h2>BENCH</h2>,
			condition: true,
			ref: useRef()
		},
		{
			tab: 'Powerups',
			key: 'powerups',
			content: <h2>POWERUPS</h2>,
			condition: true,
			ref: useRef()
		}
	];

	const tabBarGutter = tabRef.current ? tabRef.current.clientWidth / tabs.length : 100;

	const navHandler = input => {
		let index = buildStage.index + input;

		console.log(buildStage.index, index);

		if (index < 0 || index > tabs.length - 1) return;

		console.log('gonna update, res', index);

		setStage({
			key: tabs[index].key,
			index: index
		});
	};

	return (
		<Wrapper className="BuildStages unmarkable" ref={tabRef}>
			<TabContainer activeKey={buildStage.key} defaultActiveKey="pitch" onChange={callback}>
				{tabs.map((tab, nth) => (
					<Tab tab={tab.tab} key={tab.key} ref={tabs[nth].ref} disabled>
						{tab.content}
					</Tab>
				))}
			</TabContainer>
			<NavContainer className="StageNav-Container">
				<NavBtn className="StageNav prev" onClick={e => navHandler(-1)} disabled={buildStage.index < 1}>
					Tillbaka
				</NavBtn>
				<NavBtn
					className="StageNav next"
					onClick={e => navHandler(1)}
					disabled={!tabs[buildStage.index].condition}
				>
					Klar
				</NavBtn>
			</NavContainer>
		</Wrapper>
	);
};

export default withMyTeam(BuildStages);
