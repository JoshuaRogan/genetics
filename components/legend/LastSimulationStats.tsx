import { Box, List, ListItem, Text } from '@chakra-ui/react';
import Collapsible from '../Collapsible';

function LastSimulationStats({ settings, results, isReplicated }) {
	return (
		<Collapsible header={`Stats (Last Simulation)`}>
			<Box>
				<List
					listStyleType="initial"
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
					<ListItem listStylePosition="inside" minHeight="30px">
						Initial frequency of genotype A1A1 = {results[0][0]}
					</ListItem>
					<ListItem listStylePosition="inside" minHeight="30px">
						Initial frequency of genotype A1A2 = {results[1][0]}
					</ListItem>
					<ListItem listStylePosition="inside" minHeight="30px">
						Initial frequency of genotype A2A2 = {results[2][0]}
					</ListItem>
					<ListItem listStylePosition="inside" minHeight="30px">
						Final frequency of genotype A1A1 = {results[0][results[0].length - 1].toFixed(4)}
					</ListItem>
					<ListItem listStylePosition="inside" minHeight="30px">
						Final frequency of genotype A1A2 = {results[1][results[1].length - 1].toFixed(4)}
					</ListItem>
					<ListItem listStylePosition="inside" minHeight="30px">
						Final frequency of genotype A2A2 = {results[2][results[2].length - 1].toFixed(4)}
					</ListItem>
				</List>
			</Box>
		</Collapsible>
	);
}

export default LastSimulationStats;
