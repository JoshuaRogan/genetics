import React from 'react';
import styled from 'styled-components';
import { Settings } from '../data/popGenVariables';
import Checkbox from './Checkbox';
import Collapsible from './Collapsible';

const StyledListCategory = styled.ul`
	display: flex;
	width: 100%;
	min-height: 30px;
	flex-direction: row;
	list-style-type: initial;
	align-items: center;
	border-top: 1px dashed #708690;
	padding-inline-start: 20px;

	/* @media ${(props) => props.theme._mq.MOBILE} {
		flex-direction: column;
		align-items: flex-start;
	} */
`;

const StyledListItem = styled.li`
	width: 100%;
	&:last-child {
		border-bottom: 1px dashed #708690;
	}
`;

const StyledCategoryItem = styled.li`
	min-width: 30%;
	width: fit-content;
	margin-right: 20px;
	padding-right: 20px;
	padding: 5px 0;
	list-style-position: inside;

	/* @media ${(props) => props.theme._mq.MOBILE} {
		margin-right: 0;
	} */
`;

const StyledList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

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

// TODO: Extract this into a separate component
function LegendSettings({ settings }: { settings: Settings }) {
	return (
		<StyledLegendContainer>
			<StyledSubtitle>Settings</StyledSubtitle>
			<StyledList>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>Generations (t) = {settings.t} </StyledCategoryItem>
						<StyledCategoryItem>Population Size (N) = {settings.N} </StyledCategoryItem>
						<StyledCategoryItem>
							Initial frequency of Allele A (p<sub>0</sub>) = {settings.p}{' '}
						</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>Fitness coefficient for A1A1 (WA1A1) = {settings.WAA}</StyledCategoryItem>
						<StyledCategoryItem>Fitness coefficient for A1A2 (WA1A2) = {settings.WAa}</StyledCategoryItem>
						<StyledCategoryItem>Fitness coefficient for A2A2 (WA2A2) = {settings.Waa}</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>
							Forward mutation rate (μ) = {settings.mu}*10<sup>{settings['mu-exp']}</sup>
						</StyledCategoryItem>
						<StyledCategoryItem>
							Reverse mutation rate (v) = {settings.nu}*10<sup>{settings['nu-exp']}</sup>
						</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem> Migrant rate (m) = {settings.m}</StyledCategoryItem>
						<StyledCategoryItem> Migrant allele frequency (pM) = {settings.pm}</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>Inbreeding coefficient (F) = {settings.F} </StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>
							{' '}
							Positive assortative mating frequency (α) = {settings.assortMating}{' '}
						</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
				<StyledListItem>
					<StyledListCategory>
						<StyledCategoryItem>
							Bottleneck Generations: {settings['gen-to-over-start']} to {settings['gen-to-over-end']}
						</StyledCategoryItem>
						<StyledCategoryItem>Bottleneck population size (NB) = {settings.Nb}</StyledCategoryItem>
					</StyledListCategory>
				</StyledListItem>
			</StyledList>
		</StyledLegendContainer>
	);
}

const StyledListStats = styled.ul`
	padding-inline-start: 20px;
	margin: 0;
`;

const StyledListItemStats = styled.li`
	padding: 5px 0;
	list-style-position: inside;
`;

// TODO: Extract this into a separate component
function LegendStats({ result }: { result: number[] }) {
	return (
		<StyledLegendContainer>
			<StyledSubtitle>Statistics</StyledSubtitle>
			<StyledListStats>
				<StyledListItemStats> Final Allele Freq = {result[result.length - 1]}</StyledListItemStats>
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
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.3px;
	color: #2f80ed;
	text-transform: uppercase;
`;

function LegendManager({ settings, result, index }: { settings: Settings; result: number[]; index: number }) {
	const [isActive, setIsActive] = React.useState(true);
	const simualtionNumber = index + 1;

	const handleCheckboxChange = (event) => {
		setIsActive(event.target.checked);
	};

	return (
		<div key={index}>
			<Collapsible header={`Legend for Graph ${simualtionNumber}`}>
				<LegendChecker>
					<StyledCheckboxLabel>
						<Checkbox checked={isActive} onChange={handleCheckboxChange} />
						<span style={{ marginLeft: 8 }}>{`Simulation ${simualtionNumber}`}</span>
					</StyledCheckboxLabel>
				</LegendChecker>
				<LegendHider isActive={isActive}>
					<LegendSettings settings={settings} />
					<LegendStats result={result} />
				</LegendHider>
			</Collapsible>
		</div>
	);
}

function AlleleLegend({ settings, results }: { settings: Settings; results: number[][] }) {
	// Make the initial settings immutable
	return (
		<div>
			{results.map(function (result, index) {
				return <LegendManager key={index} index={index} result={result} settings={settings[index]} />;
			})}
		</div>
	);
}

function GenoTypeLegend({ settings, results }) {
	return (
		<div>
			<h4> Stats (Last Simulation) </h4>
			<ul>
				<li>Initial frequency of genotype A1A1 = {results[0][0]}</li>
				<li>Initial frequency of genotype A1A2 = {results[1][0]}</li>
				<li>Initial frequency of genotype A2A2 = {results[2][0]}</li>
				<li>Final frequency of genotype A1A1 = {results[0][results[0].length - 1].toFixed(4)}</li>
				<li>Final frequency of genotype A1A2 = {results[1][results[1].length - 1].toFixed(4)}</li>
				<li>Final frequency of genotype A2A2 = {results[2][results[2].length - 1].toFixed(4)}</li>
			</ul>
		</div>
	);
}

export default function LegendContainer({ alleleResults, genoTypeResults, settings }) {
	const isGenoType = genoTypeResults;

	if (alleleResults.length === 0) {
		return null;
	}

	if (!isGenoType) {
		return (
			<LegendStyled>
				<AlleleLegend settings={settings} results={alleleResults} />
			</LegendStyled>
		);
	}

	return (
		<LegendStyled>
			<GenoTypeLegend settings={settings[settings.length - 1]} results={genoTypeResults} />
		</LegendStyled>
	);
}
