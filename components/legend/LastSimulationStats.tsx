import { Box, List, ListItem } from '@chakra-ui/react';
import { Settings } from '../../types';
import Collapsible from '../Collapsible';

function LastSimulationStats({ settings, results }: { settings: Settings; results: number[][] }) {
	const initialFrequencyA1A1 = results[0][0];
	const initialFrequencyA1A2 = results[1][0];
	const initialFrequencyA2A2 = results[2][0];

	const finalFrequencyA1A1 = results[0][results[0].length - 1];
	const finalFrequencyA1A2 = results[1][results[1].length - 1];
	const finalFrequencyA2A2 = results[2][results[2].length - 1];

	return (
		<Collapsible header={`Genotype statistics (Last Simulation)`}>
			<Box>
				<List
					listStyleType="initial"
					listStylePosition="inside"
					p={0}
					paddingInlineStart="20px"
					m={0}
					sx={{
						'& li': {
							padding: '0.5rem 0',
						},
						'& li:not(:last-child)': {
							borderBottom: '1px dashed #708690',
						},
					}}
				>
					<ListItem minHeight="30px">
						Starting frequency of genotype <i>A₁A₁</i> = {initialFrequencyA1A1}
					</ListItem>
					<ListItem minHeight="30px">
						Starting frequency of genotype <i>A₁A₂</i> = {initialFrequencyA1A2}
					</ListItem>
					<ListItem minHeight="30px">
						Starting frequency of genotype <i>A₂A₂</i> = {initialFrequencyA2A2}
					</ListItem>
					<ListItem minHeight="30px">
						Final frequency of genotype <i>A₁A₁</i> = {finalFrequencyA1A1?.toFixed(4) || 0}
					</ListItem>
					<ListItem minHeight="30px">
						Final frequency of genotype <i>A₁A₂</i> = {finalFrequencyA1A2?.toFixed(4) || 0}
					</ListItem>
					<ListItem minHeight="30px">
						Final frequency of genotype <i>A₂A₂</i> = {finalFrequencyA2A2?.toFixed(4) || 0}
					</ListItem>
				</List>
			</Box>
		</Collapsible>
	);
}

export default LastSimulationStats;
