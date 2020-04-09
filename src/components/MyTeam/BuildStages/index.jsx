import React, { useRef, useEffect } from 'react';
import { withMyTeam } from '../ctx';
import styled from 'styled-components';
import Pitch from '../Pitch';
import Bench from '../Bench';

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

const BenchContent = () => {
	return (
		<>
			<h2>BÄNK</h2>
			<Bench />
		</>
	);
};

const Powerups = () => {
	return (
		<>
			<h2>Superkrafter</h2>
			<hr />
			<h3>Kapten Trippel</h3>
			<h3>Hål i nätet</h3>
			<h3>Guds hand</h3>
			<h3>8cm dobbar</h3>
		</>
	);
};

const BuildStages = ({ buildStage, myTeam, ...props }) => {
	const { list: playerList } = myTeam.state.team;
	const pitchCount = playerList.filter(player => player.origin === 'pitch').length;
	const benchCount = playerList.filter(player => player.origin === 'bench').length;
	const { setStage, updateFilterKeys } = myTeam.setters;

	const callback = key => {
		console.log('tab change callback...');
	};

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
			content: <BenchContent />,
			condition: benchCount === 4,
			ref: useRef()
		},
		{
			tab: 'Powerups',
			key: 'powerups',
			content: <Powerups />,
			condition: true,
			ref: useRef()
		},
		{
			tab: 'Överblick',
			key: 'overview',
			content: <h2>Överblick...</h2>,
			condition: true,
			ref: useRef()
		}
	];

	const navHandler = input => {
		let index = buildStage.index + input;

		console.log(buildStage.index, index);

		if (index < 0 || index > tabs.length - 1) return;

		console.log('gonna update, res', index);

		setStage({
			key: tabs[index].key,
			index: index
		});

		updateFilterKeys();
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
					{buildStage.key === 'overview' ? 'Lämna in lag!' : 'Vidare'}
				</NavBtn>
			</NavContainer>
		</Wrapper>
	);
};

export default withMyTeam(BuildStages);
