import React from 'react';
import styled from 'styled-components';
import Pitch from '../Pitch';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Wrapper = styled.div``;

const TabContainer = styled(Tabs)``;

const Tab = styled(TabPane)``;

const callback = key => {
	console.log('Tab', key);
};

const BuildStages = props => {
	return (
		<Wrapper>
			<TabContainer defaultActiveKey="1" onChange={callback}>
				<Tab tab="Pitch" key="pitch">
					<Pitch />
				</Tab>
				<Tab tab="Bench" key="bench">
					<h2>BENCH</h2>
				</Tab>
			</TabContainer>
			<div className="StageNav-Container">
				<button className="StageNav prev">Tillbaka</button>
				<button className="StageNav next">Klar</button>
			</div>
		</Wrapper>
	);
};

export default BuildStages;
