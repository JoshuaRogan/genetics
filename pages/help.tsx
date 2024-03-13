import {
	Box,
	Icon,
	SimpleGrid,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Accordion,
	UnorderedList, ListItem
} from '@chakra-ui/react';
import { IoHelpBuoyOutline } from 'react-icons/io5';

import React, { useEffect, useState } from 'react';
import CustomTab from '../components/CustomTab';
import MainWrapper from '../components/MainWrapper';

import AccordionCustomContent, {VideoElementAnswer} from '../components/AccordionCustomContent';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {AccordionCustomChildrenItem} from "../components/AccordionItem";

const tabs = ['getting-started', 'help-menu', 'technical-questions', 'supporting-information'];

export const getStaticProps: GetStaticProps<{
	faqGettingStarted: any;
	faqTechnicalQuestions: any;
	faqHelpMenu: any;
	faqSupportingInformation: any;
	helpVideoCharts: any,
	helpVideoSettings: any,
}> = async () => {
	const faqGettingStarted = require('../data/faq-getting-started.json');
	const faqTechnicalQuestions = require('../data/faq-technical-questions.json');
	const faqHelpMenu = require('../data/faq-help-menu.json');
	const faqSupportingInformation = require('../data/faq-supporting-information.json');

	const helpVideoSettings = require('../data/faq-help-menu-simulator-settings.json');
	const helpVideoCharts = require('../data/faq-help-menu-graphs-data.json');

	return {
		props: {
			faqGettingStarted,
			faqTechnicalQuestions,
			faqHelpMenu,
			faqSupportingInformation,
			helpVideoCharts,
			helpVideoSettings,
		},
	};
};

function FAQPage({
	faqGettingStarted,
	faqTechnicalQuestions,
	faqHelpMenu,
	faqSupportingInformation,
	helpVideoCharts,
	helpVideoSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const urlTab = params.get('tab');
		if (urlTab) {
			const tabIndex = tabs.indexOf(urlTab);
			if (tabIndex > -1) {
				setTabIndex(tabIndex);
			}
		}
	}, []);

	const handleTabsChange = (index) => {
		setTabIndex(index);
	};

	return (
		<>
			<MainWrapper>
				<Box
					as="main"
					id="main-content"
					p={7}
					maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }}
					mx={{ sm: 'auto' }}
				>
					<Text
						as="h1"
						color="text"
						fontWeight={'extrabold'}
						fontSize={{ base: '24px', md: '40px', lg: '56px' }}
						align="center"
						padding={{ base: 2, md: 0 }}
						marginY={{ base: 4, md: 6, lg: 10 }}
					>
						Help Section
					</Text>
					<Text
						as="h2"
						color="text"
						fontWeight={'light'}
						fontSize={{ base: '14px', md: '18px' }}
						align="center"
						padding={{ base: 2, md: 0 }}
					>
						Welcome to the help section. Here you can find answers to some of the most common questions.
					</Text>
					<Tabs
						variant="unstyled"
						position="relative"
						left="50%"
						right="50%"
						mx="-50vw"
						w="100vw"
						py={{ base: '20px', md: '40px' }}
						index={tabIndex}
						onChange={handleTabsChange}
					>
						<TabList
							maxWidth={{
								base: '80%',
								md: '90%',
								lg: '786px',
								xl: '1080px',
							}}
							mx="auto"
						>
							<SimpleGrid width="100%" columns={{ base: 2 }} paddingY={2} spacing={4} placeItems="center">
								<CustomTab
									heading="Simulator Settings"
									tabIcon={<Icon as={IoHelpBuoyOutline} w={8} h={8} />}
									maxW={{ base: '150px' }}
								/>
								<CustomTab
									heading="Graphs and Data"
									tabIcon={<Icon as={IoHelpBuoyOutline} w={8} h={8} />}
									maxW={{ base: '150px' }}
								/>
							</SimpleGrid>

						</TabList>
						<TabPanels maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }} mx="auto">
							<TabPanel>
								<Accordion variant="faq">
									{/*<AccordionCustomContent data={helpVideoSettings} />*/}

									<AccordionCustomChildrenItem title={"Which simulator mode should I use if I want to compare populations with different settings on the same graph?"}>
										<Text>
											Use the “Individual Simulations” mode.
										</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"Which simulator mode should I use if I want to compare multiple independent populations that have the same settings on the same graph?"}>
										<Text>
											Use the “Replicated Simulations” mode.
										</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"Where can I find more information on the simulator settings?"}>
										<Text>
											Select the question mark next to each setting to show a short explanation with links to more information. You can learn more by opening the “Model Background” section in the bottom menu/footer of the resource.
										</Text>
										<br/>
										<Text> For more information on using this resource, refer to the materials on <a href="https://www.biointeractive.org/classroom-resources/population-genetics-explorer" className={"faq-link"}>this
											resource’s webpage</a>.</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I change the simulator settings?"}>
										<Text>
											Settings for the base model are shown at the top of the “Simulator Settings” section. Settings for other factors are shown by selecting the “Additional Settings” bar. Once “Additional Settings” is open, choose the appropriate section by selecting the checkbox to the left of the section.
										</Text>

										<br/>

										<Text>To adjust each setting, move the slider or input a new value in the corresponding box.</Text>

										<VideoElementAnswer src={'videos/faq_2.mp4'} alt="A 15 second video showing a pointer clicking on and moving the slider for the parameter population size to change the value and then clicking on the expandable section for advanced factors to reveal another set of parameters, selecting assortative mating, and moving the slider to change the value." index={0} />
									</AccordionCustomChildrenItem>


									<AccordionCustomChildrenItem title={"How can I activate a simulator setting?"}>
										<Text> Settings activate automatically when you move the slider or input a value. A border around a value indicates that it is currently being edited. </Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I deactivate a simulator setting?"}>
										<Text>Only settings under “Additional Settings” can be deactivated. Deselect the checkbox to the left of the section you want to deactivate. Once a section is deselected, you will no longer be able to change its settings until you reselect its checkbox.</Text>
										<VideoElementAnswer src={'videos/faq_3.mp4'} alt="A 15 second video showing a pointer clicking on and moving the slider for the parameter population size to change the value and then clicking on the expandable section for advanced factors to reveal another set of parameters, selecting assortative mating, and moving the slider to change the value." index={0} />
									</AccordionCustomChildrenItem>


									<AccordionCustomChildrenItem title={"How can I generate a shareable link (URL) to my simulator settings?"}>
										<Text>You can generate a link (URL) for a set of simulation settings by selecting the “Generate Shareable Link” button below the "Additional Settings" section. Navigating to this URL will prepopulate the simulator with your current settings. The URL will be automatically copied to your clipboard and can be shared with others.</Text>
										<VideoElementAnswer src={'videos/faq_8.mp4'} alt="A 15 second video showing a pointer clicking on and moving the slider for the parameter population size to change the value and then clicking on the expandable section for advanced factors to reveal another set of parameters, selecting assortative mating, and moving the slider to change the value." index={11} />


									</AccordionCustomChildrenItem>




								</Accordion>
							</TabPanel>
							<TabPanel>
								<Accordion variant="faq">
									<AccordionCustomChildrenItem title={"How can I generate a graph of my simulation?"}>
										<Text>After entering the simulator settings, select the "Run Simulation" button.</Text>
										<br/>
										<Text>When using “Individual Simulations,” you can <strong>add</strong> more simulations to the existing graph (and optionally change some of the input settings) by selecting the “Add a New Simulation” button. Selecting “Run Simulation” will <strong>replace</strong> the existing graph with a new simulation.</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I zoom in on part of the graph?"}>
										<Text>Click-and-drag across the part of the graph on which you want to zoom in. To zoom out, select the "Reset Zoom" button that appears in the top-right corner of the graph.</Text>
										<VideoElementAnswer src={'videos/faq_4.mp4'} alt="A 13 second video showing a pointer clicking on the run simulation button and then moving the pointer along the line on the graph showing the values of the data points." index={34} />
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I save the graph as an image or download the data?"}>
										<Text>To save the graph or data, select the menu icon in the upper-right corner of the graph and select your preferred option.</Text>
										<UnorderedList>
											<ListItem>PNG</ListItem>
											<ListItem>JPEG</ListItem>
											<ListItem>PDF</ListItem>
											<ListItem>SVG</ListItem>
										</UnorderedList>
										<br />
										<Text>You can download the data table in these formats:</Text>
										<UnorderedList>
											<ListItem>CSV</ListItem>
											<ListItem>XLS</ListItem>
										</UnorderedList>

										<VideoElementAnswer src={'videos/faq_5.mp4'} alt="" index={0} />
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I view the data represented in the graph?"}>
										<Text>Select the icon labeled “Show /Hide Data Table” located underneath each graph. Alternatively, you can select the menu icon in the upper- right corner of the graph and select “View Data Table” or “Hide Data Table.” You can also download the data, as described in the “How can I save the graph as an image or download the data?” question above and answer.</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I increase the contrast of the graph?"}>
										<Text>Selecting the sun or moon icon in the upper right of the simulator changes the contrast on the simulator. To choose a high-contrast version of the graph for printing and projecting, select the sun icon.</Text>
									</AccordionCustomChildrenItem>

									<AccordionCustomChildrenItem title={"How can I view settings and statistics for a simulation?\n"}>
										<Text>The settings used in a simulation and summary statistics are available in the “Settings/Statistics for Graph 1” and “Genotype Statistics (For Last Simulation)” sections below each graph. Settings and statistics are automatically generated for each simulation. For Graph 2, only the data for the most recent simulation is shown.</Text>
										<br/>
										<Text>You can copy-and-paste these settings/statistics into a data manipulation program to perform additional analysis or into another document (e.g., to accompany a data table).
										</Text>
									</AccordionCustomChildrenItem>
								</Accordion>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</MainWrapper>
		</>
	);
}

export default FAQPage;
