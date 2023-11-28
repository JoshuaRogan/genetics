import { ChatIcon } from '@chakra-ui/icons';
import { Box, Icon, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Accordion } from '@chakra-ui/react';
import { IoFlagOutline, IoHelpBuoyOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';

import React, { useEffect, useState } from 'react';
import CustomTab from '../components/CustomTab';
import MainWrapper from '../components/MainWrapper';

import AccordionCustomContent from '../components/AccordionCustomContent';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const tabs = ['getting-started', 'help-menu', 'technical-questions', 'supporting-information'];

export const getStaticProps: GetStaticProps<{
	faqGettingStarted: any;
	faqTechnicalQuestions: any;
	faqHelpMenu: any;
	faqSupportingInformation: any;
}> = async () => {
	const faqGettingStarted = require('../data/faq-getting-started.json');
	const faqTechnicalQuestions = require('../data/faq-technical-questions.json');
	const faqHelpMenu = require('../data/faq-help-menu.json');
	const faqSupportingInformation = require('../data/faq-supporting-information.json');

	return {
		props: {
			faqGettingStarted,
			faqTechnicalQuestions,
			faqHelpMenu,
			faqSupportingInformation,
		},
	};
};

function FAQPage({
	faqGettingStarted,
	faqTechnicalQuestions,
	faqHelpMenu,
	faqSupportingInformation,
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
							<SimpleGrid width="100%" columns={{ base: 1 }} paddingY={2} spacing={4} placeItems="center">
								<CustomTab
									heading="Help Menu"
									tabIcon={<Icon as={IoHelpBuoyOutline} w={8} h={8} />}
									maxW={{ base: '150px' }}
								/>
							</SimpleGrid>
						</TabList>
						<TabPanels maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }} mx="auto">
							<TabPanel>
								<Accordion variant="faq">
									<AccordionCustomContent data={faqHelpMenu} />
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
