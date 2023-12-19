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
import Variable, {
	A1,
	A1A1,
	A1A2,
	A2,
	A2A2,
	P0,
	WA1A1,
	WA2A2,
	WA1A2,
	N,
	NSubE,
	NSubm,
	NSubf
} from "../components/Variable";

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

function UnorderedAnswerList({...props}) {
	return <UnorderedList marginLeft={25} {...props} />
}

function AnswerText({children, ...props}) {
	return <Text marginBottom={3} {...props}>{children}</Text>
}

function IndentedText({children, ...props}) {
	return <AnswerText marginLeft={25} {...props}>{children}</AnswerText>
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
										<InThisModel>The frequency of A1, the allele of interest, is written as <Variable isBold>p</Variable> . It is the number of A1 alleles divided by the total number of alleles in the population.</InThisModel>
										<UnorderedAnswerList>
											<ListItem>If p = 0, there are no <A1/> alleles in the population. In this case, <A1/> has been “eliminated” from the population.</ListItem>
											<ListItem>If p = 1, all the alleles in the population are <A1/> alleles. In this case, <A1/> has reached “fixation” in the population.</ListItem>
										</UnorderedAnswerList>
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

									<AccordionCustomItem title={'Hardy-Weinberg equilibrium'} anchor={'Hardy-Weinberg-equilibrium'}>
										<AnswerText>When all the allele and genotype frequencies in a population stay constant from generation to generation. This happens when all the Hardy-Weinberg assumptions are met.</AnswerText>
										<LearnMore>A mathematical model of Hardy-Weinberg equilibrium was independently developed in 1908 by Godfrey Hardy (a mathematician) and Wilhelm Weinberg (a physician). This model can act as a null hypothesis as biologists explore whether populations are evolving.</LearnMore>
										<AnswerText>
											In the Hardy-Weinberg equilibrium model, there are expected proportions for the genotype frequencies based on the allele frequencies:
											<Text>
												<br/>
												<Text>P(<A1A1/>) = <Variable>p<sup>2</sup></Variable></Text>
												<Text>P(<A1A2/>) = <Variable>2pq</Variable></Text>
												<Text>P(<A2A2/>) = <Variable>q<sup>2</sup></Variable></Text>
											</Text>
										</AnswerText>
									</AccordionCustomItem>


									<AccordionCustomItem title={'Hardy-Weinberg assumptions'} anchor={'Hardy-Weinberg-assumptions'}>
										<AnswerText>Conditions that must be met for a population to be in Hardy-Weinberg equilibrium. The conditions include the following:</AnswerText>

										<AnswerText>
											<UnorderedAnswerList>
												<ListItem>Each individual has two genome copies (is diploid).</ListItem>
												<ListItem>Individuals reproduce sexually.</ListItem>
												<ListItem>Generations do not overlap.</ListItem>
												<ListItem>Allele frequencies in males and females are equal.</ListItem>
												<ListItem>No selection (<WA1A1 /> = <WA1A2 /> = <WA2A2 />  or <WA1A1 /> = 1, <WA1A2 /> = 1, <WA2A2 /> = 1). All individuals have the same chances of survival and reproduction.</ListItem>
												<ListItem>No mutation (<Variable>μ</Variable> = 0, <Variable>v</Variable> = 0). No new alleles are formed by mutation, and existing alleles do not change.</ListItem>
												<ListItem>No migration (<Variable>m</Variable> = 0). There is no movement of individuals or their alleles in or out of the population. </ListItem>
												<ListItem>No assortative mating (<Variable>α</Variable> = 0). Individuals do not selectively choose their mates. In other words, mating is random.</ListItem>
												<ListItem>Infinitely large population (<Variable>N</Variable> → ∞). The population is so large that it is unaffected by genetic drift.</ListItem>
											</UnorderedAnswerList>
										</AnswerText>
										<InThisModel>The base model for the simulator is the Hardy-Weinberg equilibrium model, which meets all of the assumptions above. If you introduce evolutionary factors (like selection,  mutation, or migration) into the model, it will violate the assumptions and may deviate from Hardy-Weinberg equilibrium.</InThisModel>
										<LearnMore> Deviations from Hardy-Weinberg equilibrium may include allele and genotype frequencies changing across generations, or genotype frequencies differing from their expected proportions. Some deviations are predictable, while others are more stochastic.</LearnMore>
										<AnswerText>Not all violations of the assumptions will lead to deviations. So even if a population’s genotype frequencies match the expected proportions for Hardy-Weinberg equilibrium, that does not mean all assumptions are met.</AnswerText>
									</AccordionCustomItem>


									<AccordionCustomItem title={'Generations'} anchor={'generations'}>
										<AnswerText>A generation is the group of individuals that are born and live around the same time. For example, a child, a parent, and a grandparent represent three generations.</AnswerText>
										<InThisModel><Variable isBold>t</Variable> is the number of generations that will be simulated.</InThisModel>
										<LearnMore>The model assumes that mating occurs at one time period in each generation, so different generations do not overlap. This means that alleles in one generation come only from the immediately previous generation, not any older generations.</LearnMore>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Population size'} anchor={'population-size'}>
										<AnswerText>The number of individuals in the population.</AnswerText>
										<InThisModel><N isBold/> is the population size. For diploid organisms like humans, each individual has two genome copies, meaning that there are 2N alleles in the population.</InThisModel>
										<LearnMore>Models with unequal numbers of males and females use the effective population size (<NSubE />):</LearnMore>
										<IndentedText>
											<NSubE /> = (4<NSubm/> x <NSubf />) / (<NSubm/> + <NSubf />)
										</IndentedText>
										<AnswerText>where <NSubm/> and <NSubf /> are the number of males and females respectively.</AnswerText>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Infinitely large population'} anchor={'infinite-population'}>
										<AnswerText>A theoretical population with an infinite number of individuals. Modeling infinitely large populations allows us to ignore random effects. </AnswerText>
										<InThisModel>An infinite population is one of the Hardy-Weinberg assumptions.</InThisModel>
										<LearnMore> In an infinitely large population, random events affecting allele frequencies become negligible, which eliminates the role of chance. As a result, the population is not affected by genetic drift, which can be helpful if you are studying the impact of other evolutionary forces. Allele frequencies of the next generation are derived precisely from the previous generation so you do not need to run multiple replications with the same settings.</LearnMore>
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
