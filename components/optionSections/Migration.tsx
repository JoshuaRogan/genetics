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
import {getPopGenVariableByName, VALID_VARIABLES} from "../../data/popGenVariables";

export default function Migration({ isActive, name, onChange, toggleActive }) {
	const [isMigrationRateActive, setIsMigrationRateActive] = React.useState(false);
	const [isMigrantAlleleFreqActive, setIsMigrantAlleleFreqActive] = React.useState(false);

	const migrationRate = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRATION_RATE);
	const migrantAllelFreq = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ);

	return (
		<div aria-label="Migration Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						{migrationRate.sliderName}
						<HelpContentToggle onClick={() => setIsMigrationRateActive(!isMigrationRateActive)} />{' '}
					</div>
					<HelpContent
						variable={migrationRate.variable}
						variableHTML={migrationRate.variableHTML}
						description={migrationRate.description}
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
						label={migrationRate.sliderName}
						name={VALID_VARIABLES.MIGRATION_MIGRATION_RATE}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>


			<SingleRowWrapper>
				<NameColumn>
					<div>
						{migrantAllelFreq.sliderName}
						<HelpContentToggle onClick={() => setIsMigrantAlleleFreqActive(!isMigrantAlleleFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={migrantAllelFreq.variable}
						variableHTML={migrantAllelFreq.variableHTML}
						description={migrantAllelFreq.description}
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
						start={0.500}
						label={migrantAllelFreq.sliderName}
						name={VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
