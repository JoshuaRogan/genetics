import { Box, List, ListItem, Text } from '@chakra-ui/react';

function LegendStats({ result }: { result: number[] }) {
	return (
		<Box margin="10px 0">
			<Text fontWeight={700} fontSize="16px" letterSpacing="0.3px" height="30px">
				Statistics
			</Text>
			<List paddingInlineStart="20px" m={0}>
				<ListItem padding="5px 0" listStylePosition="inside">
					Final Allele Freq = {result[result.length - 1]}
				</ListItem>
			</List>
		</Box>
	);
}

export default LegendStats;
