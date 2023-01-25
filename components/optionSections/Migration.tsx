import styled from 'styled-components';
import React from 'react';
import {
	HelpContent,
	HelpContentToggle,
	NameColumn,
	SectionHeaderWrapper,
	SingleRowWrapper,
	SliderColumnAndValue,
} from './optionHelpers';
import Slider from '../sliders/Slider';
import {VALID_VARIABLES} from "../../data/popGenVariables";

export default function Migration({ isActive, name, onChange, toggleActive }) {
	const [isMigrationRateActive, setIsMigrationRateActive] = React.useState(false);
	const [isMigrantAlleleFreqActive, setIsMigrantAlleleFreqActive] = React.useState(false);

	return (
		<div aria-label="Migration Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						Migration Rate
						<HelpContentToggle onClick={() => setIsMigrationRateActive(!isMigrationRateActive)} />{' '}
					</div>
					<HelpContent
						variable={'m'}
						description="The rate at which migrant alleles enter the population per generation."
						inputName={'migration-rate'}
						isOpen={isMigrationRateActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						step={.001}
						start={0}
						label={'Migration Rate'}
						name={VALID_VARIABLES.MIGRATION_MIGRATION_RATE}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>


			<SingleRowWrapper>
				<NameColumn>
					<div>
						Migrant Allele Frequency
						<HelpContentToggle onClick={() => setIsMigrantAlleleFreqActive(!isMigrantAlleleFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={'Pm'}
						description="The frequency of the A allele among all migrant alleles entering the population."
						inputName={'migrant-allele-frequency'}
						isOpen={isMigrantAlleleFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						step={.001}
						start={0}
						label={'Migrant Allele Frequency'}
						name={VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			{/*<SingleRowWrapper>*/}
			{/*	<NameColumn>*/}
			{/*		<div>Number of Simulations</div>*/}
			{/*	</NameColumn>*/}
			{/*	<SliderColumnAndValue>*/}
			{/*		<SliderOne label={'Number of Simulations'} name={'number-of-simulations'} required />*/}
			{/*	</SliderColumnAndValue>*/}
			{/*</SingleRowWrapper>*/}
		</div>
	);
}
