import React from 'react';
import styled from 'styled-components';

import Collapsible from './Collapsible';
import {
	findAverageElimIndex,
	findAverageFixationIndex,
	findNumOfEliminations,
	findNumOfFixations,
	getAverageFinalFreq,
	getStandardDeviationOfResults,
} from '../utils/bulkStats';
import { Box, Checkbox, Text, useColorModeValue } from '@chakra-ui/react';
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
				<StyledListItemStats>
					{' '}
					Standard deviation among all simulations at end {getStandardDeviationOfResults(results)}
				</StyledListItemStats>
			</StyledListStats>
		</StyledLegendContainer>
	);
}
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
	padding-bottom: 10px;
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
	const checkboxId = `simulation-${simulationNumber}-checkbox`;

	const handleCheckboxChange = (event) => {
		setIsActive(event.target.checked);
	};

	return (
		<StyledLegendManagerWrapper key={index}>
			<LegendChecker>
				<Box
					display="flex"
					alignItems="center"
					fontWeight={700}
					fontSize={16}
					textTransform="uppercase"
					color={useColorModeValue('gray.800', 'purple.200')}
				>
					<Checkbox
						id={checkboxId}
						variant="redBox"
						isChecked={isActive}
						onChange={handleCheckboxChange}
						aria-label={`Show/Hides the simulation #${simulationNumber} list of settings and stats`}
					/>
					<Text as="label" htmlFor={checkboxId} style={{ marginLeft: 8 }}>{`Simulation #${simulationNumber}`}</Text>
				</Box>
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
			<Collapsible header={`Settings / Statistics for Graph ${graphNumber}`}>
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
			<Box bg="transparent" mb={55}>
				<AlleleLegend
					settings={settings}
					results={alleleResults}
					enabledSettings={enabledSettings}
					graphNumber={graphNumber}
					isReplicated={isReplicated}
				/>
			</Box>
		);
	}

	return <LastSimulationStats settings={settings[settings.length - 1]} results={genoTypeResults} />;
}
