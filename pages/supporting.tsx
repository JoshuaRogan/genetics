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
			<Box
				as="section"
				p={7}
				// maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }}
				mx={{ sm: 'auto' }}
			>
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
					<TabPanels mx="auto">
						<TabPanel>
							<Accordion variant="faq">
								<AccordionCustomContent data={faqSupportingInformation} />
							</Accordion>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	);
}

export default FAQPage;
