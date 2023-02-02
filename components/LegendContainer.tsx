import React from 'react';
import styled from 'styled-components';
import { Settings } from '../data/popGenVariables';
import Checkbox from './Checkbox';
import Collapsible from './Collapsible';

function LegendSettings({ settings }: { settings: Settings }) {
	return (
		<div>
			<h4>Settings</h4>
			<ul>
				<li>Generations (t) = {settings.t} </li>
				<li>Population Size (N) = {settings.N} </li>
				<li>
					Initial frequency of Allele A (p<sub>0</sub>) = {settings.p}{' '}
				</li>
				<li>Fitness coefficient for A1A1 (WA1A1) = {settings.WAA}</li>
				<li>Fitness coefficient for A1A2 (WA1A2) = {settings.WAa}</li>
				<li>Fitness coefficient for A2A2 (WA2A2) = {settings.Waa}</li>

				<li>
					Forward mutation rate (μ) = {settings.mu}*10<sup>{settings['mu-exp']}</sup>
				</li>
				<li>
					Reverse mutation rate (v) = {settings.nu}*10<sup>{settings['nu-exp']}</sup>
				</li>

				<li> Migrant allele frequency (pM) = {settings.pm}</li>
				<li>Inbreeding coefficient (F) = {settings.F} </li>
				<li> Positive assortative mating frequency (α) = {settings.assortMating} </li>
				<li>
					Bottleneck Generations: {settings['gen-to-over-start']} to {settings['gen-to-over-end']}
				</li>
				<li>Bottleneck population size (NB) = {settings.Nb}</li>
			</ul>
		</div>
	);
}

function LegendStats({ result }: { result: number[] }) {
	return (
		<div>
			<h4>Stats</h4>
			<ul>
				<li> Final Allele Freq = {result[result.length - 1]}</li>
			</ul>
		</div>
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
					<label>
						<Checkbox checked={isActive} onChange={handleCheckboxChange} />
						<span style={{ marginLeft: 8 }}>{`Simulation ${simualtionNumber}`}</span>
					</label>
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
