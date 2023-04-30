import React from 'react';
import styled from 'styled-components';

import Collapsible from './Collapsible';
import {
	findAverageElimIndex,
	findAverageFixationIndex,
	findNumOfEliminations,
	findNumOfFixations,
	getAverageFinalFreq,
} from '../utils/bulkStats';
import { Checkbox, Text } from '@chakra-ui/react';
import { Settings } from '../types';
import SimulationLegendSettings from './legend/SimulationLegendSettings';
import LegendStats from './legend/LegendStats';
import LastSimulationStats from './legend/LastSimulationStats';

const StyledSubtitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-weight: 700;
	font-size: 16px;
	letter-spacing: 0.3px;
	height: 30px;
`;

const StyledLegendContainer = styled.div`
	margin: 10px 0;
`;

const StyledListStats = styled.ul`
	padding-inline-start: 20px;
	margin: 0;
`;

const StyledListItemStats = styled.li`
	padding: 5px 0;
	list-style-position: inside;
`;

function BulkLegendStats({ results }: { results: number[][] }) {
	return (
		<StyledLegendContainer>
			<StyledSubtitle>Statistics</StyledSubtitle>
			<StyledListStats>
				<StyledListItemStats>
					{' '}
					Average generations for A1 to reach fixation = {findAverageFixationIndex(results)}
				</StyledListItemStats>
				<StyledListItemStats>
					{' '}
					Number of simulations where A1 reaches fixation = {findNumOfFixations(results)}{' '}
				</StyledListItemStats>
				<StyledListItemStats>
					{' '}
					Percentage of simulations where A1 reaches fixation = {(findNumOfFixations(results) / results.length) *
						100}%{' '}
				</StyledListItemStats>

				<StyledListItemStats>
					{' '}
					Average generations for A1 to reach elimination = {findAverageElimIndex(results)}
				</StyledListItemStats>
				<StyledListItemStats>
					{' '}
					Number of simulations where A1 reaches elimination = {findNumOfEliminations(results)}{' '}
				</StyledListItemStats>
				<StyledListItemStats>
					{' '}
					Percentage of simulations where A1 reaches elimination ={' '}
					{(findNumOfEliminations(results) / results.length) * 100}%{' '}
				</StyledListItemStats>

				<StyledListItemStats> Average Freq {getAverageFinalFreq(results)}</StyledListItemStats>
			</StyledListStats>
		</StyledLegendContainer>
	);
}

const LegendStyled = styled.div`
	background: transparent;
	padding: 2px 10px;
`;

const LegendHider = styled.div`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

const LegendChecker = styled.div``;

const StyledCheckboxLabel = styled.label`
	display: flex;
	color: #2f80ed;
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.3px;
	text-transform: uppercase;
`;

const StyledLegendManagerWrapper = styled.div`
	border-bottom: 1px solid #4f4f4f;
	margin-bottom: 10px;

	&:last-child {
		border-bottom: none;
		margin-bottom: 0px;
	}
`;

function LegendManager({
	settings,
	result,
	index,
	enabledSettings,
	isReplicated,
	results,
}: {
	settings: Settings;
	result: number[];
	results: number[][];
	enabledSettings: any;
	index: number;
	isReplicated: boolean;
}) {
	const [isActive, setIsActive] = React.useState(true);
	const simulationNumber = index + 1;

	const handleCheckboxChange = (event) => {
		setIsActive(event.target.checked);
	};

	return (
		<StyledLegendManagerWrapper key={index}>
			<LegendChecker>
				<StyledCheckboxLabel>
					<Checkbox variant="redBox" isChecked={isActive} onChange={handleCheckboxChange} />
					<Text as="p" style={{ marginLeft: 8 }}>{`Simulation #${simulationNumber}`}</Text>
				</StyledCheckboxLabel>
			</LegendChecker>
			<LegendHider isActive={isActive}>
				<SimulationLegendSettings settings={settings} enabledSettings={enabledSettings} isReplicated={isReplicated} />
				<LegendStats result={result} />
			</LegendHider>
		</StyledLegendManagerWrapper>
	);
}

function BulkLegend({
	settings,
	results,
	enabledSettings,
}: {
	settings: Settings;
	results: number[][];
	enabledSettings: any;
}) {
	return (
		<>
			<SimulationLegendSettings settings={settings} enabledSettings={enabledSettings} isReplicated={false} />
			<BulkLegendStats results={results} />
		</>
	);
}

function AlleleLegend({
	settings,
	results,
	graphNumber,
	isReplicated,
	enabledSettings,
}: {
	settings: Settings;
	results: number[][];
	enabledSettings: any;
	graphNumber: number;
	isReplicated: boolean;
}) {
	// Make the initial settings immutable
	return (
		<div>
			<Collapsible header={`Legend for Graph ${graphNumber}`}>
				{isReplicated ? (
					<BulkLegend settings={settings[0]} results={results} enabledSettings={enabledSettings[0]} />
				) : null}
				{!isReplicated &&
					results.map(function (result, index) {
						return (
							<LegendManager
								key={index}
								index={index}
								result={result}
								results={results}
								settings={settings[index]}
								enabledSettings={enabledSettings[index]}
								isReplicated={isReplicated}
							/>
						);
					})}
			</Collapsible>
		</div>
	);
}

export default function LegendContainer({
	alleleResults,
	genoTypeResults,
	settings,
	enabledSettings,
	graphNumber,
	isReplicated,
}) {
	const isGenoType = genoTypeResults;

	if (alleleResults.length === 0) {
		return null;
	}

	if (!isGenoType) {
		return (
			<LegendStyled>
				<AlleleLegend
					settings={settings}
					results={alleleResults}
					enabledSettings={enabledSettings}
					graphNumber={graphNumber}
					isReplicated={isReplicated}
				/>
			</LegendStyled>
		);
	}

	return <LastSimulationStats settings={settings[settings.length - 1]} results={genoTypeResults} />;
}
