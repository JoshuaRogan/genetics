import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { Settings, VALID_SECTIONS } from '../../types';

function SimulationLegendSettings({
	settings,
	enabledSettings,
	isReplicated,
}: {
	settings: Settings;
	enabledSettings: any;
	isReplicated: boolean;
}) {
	return (
		<Box margin="10px 0">
			<Text fontWeight={700} fontSize="16px" letterSpacing="0.3px" height="30px">
				Settings
			</Text>
			<List listStyleType="none" p={0} m={0}>
				<LegendListItem>
					<LegendItemWrapper>
						<LegendItem>Number of Populations = {settings.Nb} </LegendItem>
					</LegendItemWrapper>
				</LegendListItem>

				{enabledSettings[VALID_SECTIONS.BASE] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem>Population Size (<i>N</i>) = {settings.N} </LegendItem>
							<LegendItem>Generations (<i>t</i>) = {settings.t} </LegendItem>
							<LegendItem>
								Starting frequency of Allele <i>A<sub>1</sub> (p<sub>0</sub></i>) = {settings.p}{' '}
							</LegendItem>
							{isReplicated && <LegendItem>Number of Populations (<i>Nb</i>) = {settings.Nb}</LegendItem>}
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.SELECTION] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem>
								Fitness coefficient for <i>A<sub>1</sub>A<sub>1</sub></i> (<i>W<sub>A1A1</sub></i>) = {settings.WAA}
							</LegendItem>
							<LegendItem>
								Fitness coefficient for <i>A<sub>1</sub>A<sub>2</sub></i> (<i>W<sub>A1A2</sub></i>) = {settings.WAa}
							</LegendItem>
							<LegendItem>
								Fitness coefficient for <i>A<sub>2</sub>A<sub>2</sub></i> (<i>W<sub>A2A2</sub></i>) = {settings.Waa}
							</LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.MUTATION] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem>
								Forward mutation rate (<i>μ</i>) = {settings.mu}*10<sup>{settings['mu-exp']}</sup>
							</LegendItem>
							<LegendItem>
								Reverse mutation rate (<i>v</i>) = {settings.nu}*10<sup>{settings['nu-exp']}</sup>
							</LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.MIGRATION] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem> Migrant rate (<i>m</i>) = {settings.m}</LegendItem>
							<LegendItem> Migrant allele frequency (<i>p<sub>M</sub></i>) = {settings.pm}</LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.INBREEDING] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem>Inbreeding coefficient (<i>F</i>) = {settings.F} </LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.ASSORT_MATING] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem> Positive assortative mating frequency (<i>α</i>) = {settings.assortMating} </LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}

				{enabledSettings[VALID_SECTIONS.BOTTLENECK_GEN] && (
					<LegendListItem>
						<LegendItemWrapper>
							<LegendItem>
								Bottleneck Generations: {settings['gen-to-over-start']} to {settings['gen-to-over-end']}
							</LegendItem>
							<LegendItem>Bottleneck population size (<i>N<sub>B</sub></i>) = {settings.BNb}</LegendItem>
						</LegendItemWrapper>
					</LegendListItem>
				)}
			</List>
		</Box>
	);
}

//
function LegendListItem({ children }) {
	return (
		<ListItem
			w="100%"
			sx={{
				'&:last-child': {
					borderBottom: '1px dashed #708690',
				},
			}}
		>
			{children}
		</ListItem>
	);
}

function LegendItemWrapper({ children }) {
	return (
		<List
			display="flex"
			flexDirection="row"
			width="100%"
			minHeight="30px"
			styleType="initial"
			alignItems="center"
			borderTop="1px dashed #708690"
			paddingInlineStart="20px"
		>
			{children}
		</List>
	);
}

function LegendItem({ children }) {
	return (
		<ListItem
			minWidth="30%"
			width="fit-content"
			marginRight="20px"
			paddingRight="20px"
			padding="5px 0"
			listStylePosition="inside"
		>
			{children}
		</ListItem>
	);
}

export default SimulationLegendSettings;
