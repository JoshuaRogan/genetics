import { ChatIcon } from '@chakra-ui/icons';
import {
	Box,
	Icon,
	SimpleGrid,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Accordion,
	UnorderedList,
	ListItem, List
} from '@chakra-ui/react';
import { IoFlagOutline, IoHelpBuoyOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';

import React, { useEffect, useState } from 'react';
import CustomTab from '../components/CustomTab';
import MainWrapper from '../components/MainWrapper';

import AccordionCustomContent from '../components/AccordionCustomContent';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import AccordionCustomItem from "../components/AccordionItem";
import Variable, {A1, A1A1, A1A2, A2, A2A2, P0} from "../components/Variable";

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

function AnswerText({children, ...props}) {
	return <Text marginBottom={3} {...props}>{children}</Text>
}

function InThisModel({children, ...props}) {
	return <AnswerText {...props}><i>In this model: </i>{children}</AnswerText>
}

function LearnMore({children, ...props}) {
	return <AnswerText {...props}><i>Learn more: </i>{children}</AnswerText>
}


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
						Model Background
					</Text>
					<Text
						as="h2"
						color="text"
						fontWeight={'light'}
						fontSize={{ base: '14px', md: '18px' }}
						align="center"
						padding={{ base: 2, md: 0 }}
					>
						This page provides background on biological concepts and terms used in the <i>Population
						Genetics Explorer simulator</i>. It contains the following sections:


					</Text>

					<Text marginY={{ base: 4, md: 6, lg: 10 }}>
						<UnorderedList >
							<ListItem><strong>Basic Settings </strong>covers the base model, which allows you to change the population size (and thus effect of genetic drift), number of generations, and the starting frequency of allele A1. </ListItem>
							<ListItem><strong>Additional Settings</strong> covers the other factors that can be included in the model, including the evolutionary factors selection, mutation, migration, inbreeding, assortative mating, and population bottlenecks. </ListItem>
							<ListItem><strong>Assumptions and Limitations</strong> discusses the assumptions and limitations of the model.</ListItem>
							<ListItem><strong>Model Summary Table</strong> summarizes the symbols and terms used in the model.</ListItem>
						</UnorderedList>
					</Text>
					{/* maybe a search ? */}
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
							<SimpleGrid width="100%" columns={{ base: 1, md: 2, xl: 4 }} paddingY={2} spacing={4} placeItems="center">
								<CustomTab heading="Basic Settings" tabIcon={<Icon as={IoFlagOutline} w={8} h={8} />} />
								<CustomTab heading="Additional Settings" tabIcon={<Icon as={MdComputer} w={8} h={8} />} />
								<CustomTab heading="Assumptions and Limitations" tabIcon={<Icon as={ChatIcon} w={7} h={7} />} />
								<CustomTab heading="Model Summary Table" tabIcon={<Icon as={ChatIcon} w={7} h={7} />} />
							</SimpleGrid>
						</TabList>

						<TabPanels maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }} mx="auto">
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Basic
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'Population'} anchor="population">
										<AnswerText>A group of individuals of the same species that live in the same area and potentially reproduce together.</AnswerText>
									</AccordionCustomItem>


									<AccordionCustomItem title={'Mathematical model'} anchor="math-model">
										<AnswerText> A model that describes real-world behaviors and processes using equations. Mathematical models are a way to simplify and simulate reality, in order to explore the key components of a complex system. </AnswerText>
									</AccordionCustomItem>


									<AccordionCustomItem title={'Allele'} anchor={'Allele'}>
										<AnswerText >Variants of a particular region of DNA, such as a gene</AnswerText>
										<InThisModel>The model has two alleles. The symbol <A1 isBold/> represents the allele of interest, and <A2 isBold/> represents the other allele. </InThisModel>
										<LearnMore>Systems with more alleles could be modeled by defining the <A1 /> allele as the allele of interest, and defining the <A2 /> allele as all the non-<A1 /> alleles combined.</LearnMore>
									</AccordionCustomItem>



									<AccordionCustomItem title={'Allele frequency'} anchor={'allele-frequency'}>
										<AnswerText>The frequency, or proportion, of alleles in the population that are a specific type. Each allele frequency will always be a number from 0 to 1.</AnswerText>
										<InThisModel>The frequency of A1, the allele of interest, is written as p. It is the number of A1 alleles divided by the total number of alleles in the population.</InThisModel>
										<UnorderedList>
											<ListItem>If p = 0, there are no <A1/> alleles in the population. In this case, <A1/> has been “eliminated” from the population.</ListItem>
											<ListItem>If p = 1, all the alleles in the population are <A1/> alleles. In this case, <A1/> has reached “fixation” in the population.</ListItem>
										</UnorderedList>
										<br/>
										<AnswerText>The frequency of the other allele, <A2/>, is written as <Variable isBold>q</Variable>. Since the model has only two alleles: <i>p</i> + <i>q</i> = 1</AnswerText>
										<LearnMore>  Subscripts may be added to indicate allele frequencies in specific generations. For example, <P0 isBold/> is the frequency of allele <A1/> in the starting generation (Generation 0).
										 </LearnMore>
									</AccordionCustomItem>


									<AccordionCustomItem title={'Genotype'} anchor={'Genotype'}>
										<AnswerText> An individual’s genotype for a particular region of DNA is their set of alleles for that region. For diploid organisms, including humans, this genotype will be a set of two alleles. This is because diploid organisms have two copies of their genome: one inherited from the sperm, and one inherited from the egg.</AnswerText>
										<InThisModel>The model has two alleles: <A1/> and <A2/>. So, it has three genotypes, written as <A1A1 isBold/>, <A1A2 isBold/>, and <A2A2 isBold/>.</InThisModel>
										<LearnMore>
											The frequency of each genotype is written as P(genotype). For example, P(<A1A1/>) is the frequency of the genotype <A1A1/>. The frequencies of all the genotypes add up to 1:
											<br/>
											<br/>
											P(<A1A1/>) + P(<A1A2/>) + P(<A2A2/>) = 1
										</LearnMore>
									</AccordionCustomItem>



								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Additional
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Assumptions and Limitations
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Model Summary Table
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'Test'} anchor="asdf">
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
									<AccordionCustomItem title={'Test'}>
										<h1>Hello World</h1>
									</AccordionCustomItem>
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
