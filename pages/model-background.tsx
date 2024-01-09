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
	ListItem,
	List,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer
} from '@chakra-ui/react';
import {IoBookSharp, IoFlagOutline, IoHelpBuoyOutline, IoLibrary, IoSettings, IoSparkles} from 'react-icons/io5';
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
	NSubf, NSubB, P1, Q0, Mu, V, M, PM, F, Alpha, PSquared, QSquared, P, Q, T
} from "../components/Variable";
import HelpLink, {
	AlleleFrequencyLink,
	AlleleLink,
	AssortMatingLink,
	GenerationsLink, GeneticDriftLink,
	GenotypeLink, HardyWeinAssumLink,
	HardyWeinEquilLink,
	InbreedingLink,
	InifinitePopulationLink,
	MigrationLink,
	MutationLink,
	PopulationBottleNeckLink,
	PopulationSizeLink,
	SelectionLink
} from "../components/HelpLink";
import {renderMathML} from "../utils/math-ml";

export const TAB_BASIC = 'basic-settings';
export const TAB_ADDITIONAL = 'additional-settings';
export const TAB_ASSUMPTIONS = 'assumptions';
export const TAB_SUMMARY_TABLE = 'model-summary';

const tabs = [TAB_BASIC, TAB_ADDITIONAL, TAB_ASSUMPTIONS, TAB_SUMMARY_TABLE];

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


function MathEquation({equationName}) {
	const mathXMLString = renderMathML(equationName);

	return <Box
		fontSize="3xl"
		textAlign="center"
		margin="15px auto"
		dangerouslySetInnerHTML={{ __html: mathXMLString }}
	/>
}

function SmallMathEquation({equationName}) {
	const mathXMLString = renderMathML(equationName);

	return <Box
		fontSize="sm"
		textAlign="center"
		margin="15px auto"
		dangerouslySetInnerHTML={{ __html: mathXMLString }}
	/>
}

function Italic({children, ...props}) {
	return <Text as={'span'} fontStyle='italic' {...props}>{children}</Text>
}

function Underline({children, ...props}) {
	return <Text as={'span'} textDecoration={'underline'} {...props}>{children}</Text>
}

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
		debugger
		if (urlTab) {
			const tabIndex = tabs.indexOf(urlTab);
			if (tabIndex > -1) {
				setTabIndex(tabIndex);
			}
		}
	}, [window.location.search]);

	const handleTabsChange = (index) => {
		setTabIndex(index);

		// Update the URL param
		const currentUrl = new URL(window.location.href);

		// Create URLSearchParams object from the current URL's query string
		const searchParams = new URLSearchParams(currentUrl.search);

		// Set the new value of the "tab" parameter
		searchParams.set('tab', tabs[index]);

		// Update the URL without reloading the page (TBD if we actually want to do this)
		history.pushState(null, '', currentUrl.pathname + '?' + searchParams.toString());
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
								<CustomTab heading="Basic Settings" tabIcon={<Icon as={IoSettings} w={8} h={8} />} />
								<CustomTab heading="Additional Settings" tabIcon={<Icon as={IoSparkles} w={8} h={8} />} />
								<CustomTab heading="Assumptions and Limitations" tabIcon={<Icon as={IoBookSharp} w={7} h={7} />} />
								<CustomTab heading="Model Summary Table" tabIcon={<Icon as={IoLibrary } w={7} h={7} />} />
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
											In the Hardy-Weinberg equilibrium model, there are expected proportions for the <GenotypeLink linkText="genotype frequencies"/> based on the <AlleleFrequencyLink linkText="allele frequencies" /> :
											<Text>
												<br/>
												<SmallMathEquation equationName='hardy-1' />
												<SmallMathEquation equationName='hardy-2' />
												<SmallMathEquation equationName='hardy-3' />
												{/*<Text>P(<A1A1/>) = <Variable>p<sup>2</sup></Variable></Text>*/}
												{/*<Text>P(<A1A2/>) = <Variable>2pq</Variable></Text>*/}
												{/*<Text>P(<A2A2/>) = <Variable>q<sup>2</sup></Variable></Text>*/}
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
												<ListItem><strong>No <SelectionLink isLower /></strong> (<WA1A1 /> = <WA1A2 /> = <WA2A2 />  or <WA1A1 /> = 1, <WA1A2 /> = 1, <WA2A2 /> = 1). All individuals have the same chances of survival and reproduction.</ListItem>
												<ListItem><strong>No <MutationLink isLower /></strong> (<Variable>μ</Variable> = 0, <Variable>v</Variable> = 0). No new alleles are formed by mutation, and existing alleles do not change.</ListItem>
												<ListItem><strong>No <MigrationLink isLower /></strong> (<Variable>m</Variable> = 0). There is no movement of individuals or their alleles in or out of the population. </ListItem>
												<ListItem><strong>No <AssortMatingLink isLower /></strong> (<Variable>α</Variable> = 0). Individuals do not selectively choose their mates. In other words, mating is random.</ListItem>
												<ListItem><strong><InifinitePopulationLink /> </strong>(<Variable>N</Variable> → ∞). The population is so large that it is unaffected by genetic drift.</ListItem>
											</UnorderedAnswerList>
										</AnswerText>
										<InThisModel>The base model for the simulator is the Hardy-Weinberg equilibrium model, which meets all of the assumptions above. If you introduce evolutionary factors (like <Underline>
											<SelectionLink isLower /></Underline>, <Underline><MutationLink isLower /></Underline>, or <Underline><MigrationLink /></Underline>) into the model, it will violate the assumptions and may deviate from Hardy-Weinberg equilibrium.</InThisModel>
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
											<MathEquation equationName='population-size'/>
										</IndentedText>
										<AnswerText>where <NSubm/> and <NSubf /> are the number of males and females respectively.</AnswerText>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Infinitely large population'} anchor={'infinite-population'}>
										<AnswerText>A theoretical population with an infinite number of individuals. Modeling infinitely large populations allows us to ignore random effects. </AnswerText>
										<InThisModel>An infinite population is one of the <HardyWeinAssumLink />.</InThisModel>
										<LearnMore> In an infinitely large population, random events affecting allele frequencies become negligible, which eliminates the role of chance. As a result, the population is not affected by <GeneticDriftLink isLower />, which can be helpful if you are studying the impact of other evolutionary forces. Allele frequencies of the next generation are derived precisely from the previous generation so you do not need to run multiple replications with the same settings.</LearnMore>
									</AccordionCustomItem>
								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Additional
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'Evolution'} anchor={'evolution'}>
										<AnswerText>A change in a population’s <AlleleFrequencyLink linkText="allele frequencies"/> over time. Factors that can cause evolution include:  </AnswerText>
										<UnorderedAnswerList>
											<ListItem><GeneticDriftLink isLower /></ListItem>
											<ListItem><SelectionLink isLower /> </ListItem>
											<ListItem><MutationLink isLower /></ListItem>
											<ListItem><MigrationLink isLower /></ListItem>
										</UnorderedAnswerList>

										<AnswerText>
											<br/>More than one of these factors may act on a population at the same time.
										</AnswerText>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Genetic drift'} anchor={'genetic-drift'}>
										<AnswerText>Changes in allele frequency due to random chance. For example, some individuals may randomly die or not reproduce, causing their alleles to become less common by chance. Genetic drift occurs in any populations that are not <InifinitePopulationLink linkText={"infinitely large"}/>. It can be particularly important for small populations and during <PopulationBottleNeckLink linkText={"population bottlenecks"}/>.</AnswerText>
										<InThisModel>Genetic drift is modeled by “random sampling with replacement,” which involves randomly selecting alleles from each generation to be passed on to the next. For example, imagine a population with 10 copies of alleles: 5 <A1 /> and 5 <A2 />. The model randomly selects one allele, and then puts it back into the pool (making it 5 <A1 /> and 5 <A2/> again) to select another allele.
										</InThisModel>
									</AccordionCustomItem>



									<AccordionCustomItem title={'Population bottleneck'} anchor={'population-bottleneck'}>
										<AnswerText>An event that suddenly decreases population size for a number of generations, followed by an expansion. </AnswerText>
										<InThisModel><NSubB isBold/> is the number of individuals in the population during a bottleneck event. The bottleneck is modeled by changing the size of the population to <NSubB /> for a specified number of generations. While “bottleneck” generally refers to a temporary decrease in population size, the simulator allows any change in size (decrease or increase) that lasts for any number of generations, and it returns the population to its original size afterward.</InThisModel>

										<LearnMore>A bottleneck can be caused by environmental events, such as natural disasters, diseases or habitat destruction.</LearnMore>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Selection'} anchor={'selection'}>
										<AnswerText>When individuals with different genotypes have different chances of survival and reproduction. This causes different alleles to be passed on at different rates.</AnswerText>
										<InThisModel>This model uses fitness coefficients, which are the relative probabilities that an individual with a given genotype reproduces.</InThisModel>
										<UnorderedAnswerList>
											<ListItem><WA1A1 isBold/> the fitness coefficient for the <A1A1/> genotype, is the relative probability that an <A1A1/>  individual reproduces.</ListItem>
											<ListItem><WA1A2 isBold/>  the fitness coefficient for the <A1A2/> genotype, is the relative probability that an <A1A2/> individual reproduces.</ListItem>
											<ListItem><WA2A2 isBold/>  the fitness coefficient for the <A2A2/> genotype, is the relative probability that an <A2A2/> individual reproduces.</ListItem>
										</UnorderedAnswerList>

										<br/>
										<AnswerText>The fitness coefficient for at least one genotype is usually set to 1, and the fitness coefficients for the other genotypes are written as proportions relative to 1.</AnswerText>

										<LearnMore>After one generation of random mating, the allele frequency in this model is:</LearnMore>
										<AnswerText><MathEquation equationName='selection-formula' /> </AnswerText>
										<AnswerText>where <P1 /> is the frequency of allele <A1/> in Generation 1, <P0/> is the frequency of allele <A1/> in Generation 0, and <Q0 /> is the frequency of allele <A2/> in Generation 0.</AnswerText>

									</AccordionCustomItem>

									<AccordionCustomItem title={'Mutation'} anchor={'mutation'}>
										<AnswerText>A spontaneous change in the genetic material. For example, a given allele may spontaneously change into another allele.</AnswerText>
										<InThisModel>The model has two alleles, <A1/> and <A2/>, that may change into each other.</InThisModel>
										<UnorderedAnswerList>
											<ListItem>The forward mutation rate, <Mu isBold/>, is the probability that <A1/> changes into <A2/> per generation.</ListItem>
											<ListItem>The reverse mutation rate, <V isBold/>, is the probability that <A2/> changes into <A1/> per generation.</ListItem>
										</UnorderedAnswerList>

										<LearnMore>
											Mutation rates are typically small. In the human genome, the mutation rate is only 1.0×10<sup>−8</sup> or 0.00000001 mutations per site per generation for a nucleotide substitution. The mutation rate of a repeat element in humans is on the order of 1.1×10<sup>−4</sup> or 0.00011.
										</LearnMore>

										<AnswerText>
											This equation shows how allele frequencies change due to mutation in this model:
											<IndentedText marginTop={3}>
												{/*<P1/> = <P0/>(1 –  <Mu/>) + <V/>(1 - <P0/>)*/}
												<MathEquation equationName='mutation-rate' />
											</IndentedText>
										</AnswerText>

										<AnswerText>
											where <P1/> is the frequency of allele <A1/> in Generation 1 and <P0/> is the frequency of allele <A1/> in Generation 0.
										</AnswerText>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Migration'} anchor={'migration'}>
										<AnswerText>Specifically “genetic migration,” the movement of alleles into the population of interest from another “outside” population.</AnswerText>
										<InThisModel>The migration rate, <M isBold/>, is the proportion of alleles in the next generation that come from outside the population of interest. The model assumes individuals from the outside population can move into the population of interest, but not the other way around.</InThisModel>
										<AnswerText>The migrant allele frequency, <PM isBold/>, is the frequency of allele <A1/> in the alleles entering from the outside population. The model assumes this frequency is constant, meaning the outside population does not evolve. Therefore, this model is applicable for many simplistic migration scenarios such as the “source-sink,” “continent-to-island,” “one island,” and “Wright’s island” models.</AnswerText>

										<LearnMore>This equation shows how allele frequencies change due to migration in this model:

											<IndentedText>
												{/*<P1/> = (1 – <M/>)<P0/> + <M/>(<PM />)*/}
												<MathEquation equationName='migration-rate'/>
											</IndentedText>

											where <P1/> is the frequency of allele <A1/> in Generation 1 and <P0/> is the frequency of allele <A1/> in Generation 0.

										</LearnMore>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Inbreeding'} anchor={'inbreeding'}>
										<AnswerText>Mating between two genetically related individuals.</AnswerText>
										<InThisModel>
											The inbreeding coefficient <F isBold/> is the probability that both alleles in a random individual from the population were inherited from the same common ancestor (identical by descent).
											<UnorderedAnswerList>
												<ListItem>If <F/> = 0, there is no inbreeding in the population.</ListItem>
												<ListItem>If <F/> = 1, all alleles in the population came from the same ancestor. This is an extreme form of inbreeding found in model organisms that were specifically bred to remove all genetic variation. </ListItem>
											</UnorderedAnswerList>
										</InThisModel>

										<LearnMore>Inbreeding alone does not alter <AlleleFrequencyLink linkText="allele frequencies" />, but it can alter <GenotypeLink linkText="genotype frequencies"/>:
											<MathEquation equationName='inbreeding-1' />
											<MathEquation equationName='inbreeding-2' />
											<MathEquation equationName='inbreeding-3' />
										<UnorderedAnswerList>
											{/*<ListItem><i>P(<A1A1/>) = p<sup>2</sup> (1 − F) + Fp </i> </ListItem>*/}
											{/*<ListItem><i>P(<A1A2/>) = 2pq (1 − F)</i> </ListItem>*/}
											{/*<ListItem><i>P(<A2A2/>) = q<sup>2</sup> (1 − F) + Fq</i>     </ListItem>*/}
										</UnorderedAnswerList>
											<br/>
											<AnswerText>
												The inbreeding coefficient, <F/>, belongs to a family of genetics “F-statistics,” also called fixation statistics, that measure various aspects of heterozygosity in individuals within populations and between populations. In this simulator, the inbreeding coefficient <F/> is equivalent to Wright’s <Variable>F<sub>IS</sub></Variable> , which is the average kinship coefficient between pairs of individuals in the previous generation.
											</AnswerText>
										</LearnMore>
									</AccordionCustomItem>

									<AccordionCustomItem title={'Assortative mating'} anchor={'assortative-mating'}>
										<AnswerText>When individuals tend to choose mates with the same genotypes.</AnswerText>
										<InThisModel> The positive assortative mating frequency <Alpha isBold/> is the proportion of individuals in the population that choose mates with the same genotype.
											<UnorderedAnswerList>
												<ListItem>If <Alpha/> = 0, individuals always mate randomly.</ListItem>
												<ListItem>If <Alpha/> = 0.5, individuals mate randomly 50% of the time. They mate with individuals of the same genotype the other 50% of the time.</ListItem>
												<ListItem>If <Alpha/> = 1, individuals always mate with other individuals that have the same genotype.</ListItem>
											</UnorderedAnswerList>
										</InThisModel>
										<LearnMore> Assortative mating alone does not alter <AlleleFrequencyLink linkText="allele frequencies" />, but it can alter <GenotypeLink linkText="genotype frequencies"/>:
											<MathEquation equationName='assort-1' />
											<MathEquation equationName='assort-2' />
											<MathEquation equationName='assort-3' />
											{/*<UnorderedAnswerList>*/}
											{/*	<ListItem>P(<A1A1/>) =  [(1 – <Alpha/>)p<sup>2</sup> + α(p<sup>2</sup> + pq/2)] / D</ListItem>*/}
											{/*	<ListItem>P(<A1A2/>) =  = [(1 – <Alpha/>)2pq + α(pq)] / D</ListItem>*/}
											{/*	<ListItem>P(<A2A2/>) =  = [(1 – <Alpha/>)q<sup>2</sup> + α(q<sup>2</sup> + pq/2)] / D</ListItem>*/}
											{/*</UnorderedAnswerList>*/}

											<br/>
											<AnswerText>where <Italic>D = [(1 – α)<PSquared/> + α(<PSquared/> + pq/2)] + [(1 – α)2pq + α(pq)] + [(1 – α)<QSquared/> + α(<QSquared/> + pq/2)]</Italic>.</AnswerText>
											<AnswerText> where </AnswerText>
											<SmallMathEquation equationName='assort-4' />
											<AnswerText>In this simulator, only simple scenarios of positive assortative mating are implemented, and negative assortative mating/disassortative mating cannot be modeled.</AnswerText>
										</LearnMore>
									</AccordionCustomItem>

								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Assumptions and Limitations
								</Text>
								<Accordion variant="faq">
									<AccordionCustomItem title={'What are the assumptions of the model?'} anchor={'what-are-assumptions'}>
										<AnswerText>All models make assumptions to make their system easier to understand and work with. Some of the assumptions in this model are as follows:</AnswerText>
										<UnorderedAnswerList>
											<ListItem>We are focusing on a specific DNA region (e.g., gene) with only <strong>two</strong> alleles. The symbol <A1/> represents the allele being analyzed. The symbol <A2/> is the other allele.</ListItem>
											<ListItem>Each individual has two copies of the DNA region. The copies can be the same allele (two <A1/> or two <A2/>) or different alleles (one <A1/> and one <A2/>).</ListItem>
											<ListItem>Individuals in the population reproduce sexually.</ListItem>
										</UnorderedAnswerList>
										<br/>
										<AnswerText >More assumptions of the base model (without evolution) are described in the <HardyWeinAssumLink /> section. More assumptions of the full model are described in the limitations section below.</AnswerText>
									</AccordionCustomItem>

									<AccordionCustomItem title={'What are the limitations of the model? '} anchor={'limits'}>
										<AnswerText>All models have limitations based on how they are designed and what situations they are intended to cover. This model is not designed to cover the following situations:</AnswerText>
										<UnorderedAnswerList>
											<ListItem><strong>More than two alleles.</strong> The model includes only two alleles, <A1/> and <A2/>. </ListItem>
											<ListItem><strong>Population growth.</strong> The model does not include the population growing over time.</ListItem>
											<ListItem><strong>X-linked selection.</strong> The model assumes that any selection occurs on regions of DNA on autosomal chromosomes.</ListItem>
											<ListItem><strong>Migration among more than one evolving population. </strong>The model assumes that only the population of interest may evolve. The source population for the migrant alleles does not change genetically.</ListItem>
											<ListItem><strong>Negative assortative (disassortative) mating</strong>. The model includes only simple scenarios of positive assortative mating (individuals picking mates with the same genotype). It does not include negative assortative mating (individuals picking mates with a different genotype).</ListItem>
										</UnorderedAnswerList>
									</AccordionCustomItem>

								</Accordion>
							</TabPanel>
							<TabPanel>
								<Text color="text" textAlign={'center'} marginBottom={4}>
									Model Summary Table
								</Text>
								<TableContainer whiteSpace='normal'>
									<Table variant='simple'>
										<TableCaption>Model Summary Table</TableCaption>
										<Thead>
											<Tr>
												<Th>Symbols</Th>
												<Th>Meaning</Th>
												<Th>Section</Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Td><A1/></Td>
												<Td>the <strong>allele of interest</strong></Td>
												<Td><AlleleLink /></Td>
											</Tr>

											<Tr>
												<Td><A2/></Td>
												<Td>the <strong>other allele</strong></Td>
												<Td><AlleleLink /></Td>
											</Tr>

											<Tr>
												<Td><P/></Td>
												<Td><strong>frequency of allele <A1/></strong>, the number of <A1/> alleles divided by the total number of alleles in the population</Td>
												<Td><AlleleFrequencyLink /></Td>
											</Tr>

											<Tr>
												<Td><P0/></Td>
												<Td><strong>starting frequency of allele <A1/></strong>, the frequency of allele <A1/> in the starting generation (Generation 0)</Td>
												<Td><AlleleFrequencyLink /></Td>
											</Tr>

											<Tr>
												<Td><Q/></Td>
												<Td><strong>frequency of allele <A2/></strong>, the number of <A2/> alleles divided by the total number of alleles in the population</Td>
												<Td><AlleleFrequencyLink /></Td>
											</Tr>

											<Tr>
												<Td><A1A1/>, <A1A2/>, <A2A2/></Td>
												<Td><strong>genotypes</strong></Td>
												<Td><GenotypeLink /></Td>
											</Tr>

											<Tr>
												<Td>P(<A1A1/>), P(<A1A2/>), P(<A2A2/>)</Td>
												<Td><strong>frequency of each genotype</strong>, the number of individuals with the genotype divided by the total number of individuals in the population</Td>
												<Td><GenotypeLink /></Td>
											</Tr>

											<Tr>
												<Td><T/></Td>
												<Td>number of <strong>generations</strong> simulated</Td>
												<Td><GenerationsLink /></Td>
											</Tr>

											<Tr>
												<Td><N/></Td>
												<Td><strong>population size</strong>, the number of individuals in the population</Td>
												<Td><PopulationSizeLink /></Td>
											</Tr>

											<Tr>
												<Td><NSubB/></Td>
												<Td><strong>population size during a bottleneck</strong>, an event that suddenly decreases population size</Td>
												<Td><PopulationBottleNeckLink /></Td>
											</Tr>

											<Tr>
												<Td><WA1A1/>, <WA1A2/>, <WA2A2/></Td>
												<Td><strong>fitness coefficients</strong>, the relative probabilities that an individual of a given genotype reproduces</Td>
												<Td><SelectionLink /></Td>
											</Tr>

											<Tr>
												<Td><Mu/></Td>
												<Td><strong>forward mutation rate</strong>, the probability that allele <A1/> changes into <A2/></Td>
												<Td><MutationLink /></Td>
											</Tr>

											<Tr>
												<Td><V/></Td>
												<Td><strong>reverse mutation rate</strong>, the probability that allele <A2/> changes into <A1/></Td>
												<Td><MutationLink /></Td>
											</Tr>

											<Tr>
												<Td><M/></Td>
												<Td><strong>migration rate</strong>, the proportion of alleles coming from an outside population</Td>
												<Td><MigrationLink /></Td>
											</Tr>

											<Tr>
												<Td><PM/></Td>
												<Td><strong>migrant allele frequency</strong>, the frequency of allele <A1/> in the alleles coming from an outside population</Td>
												<Td><MigrationLink /></Td>
											</Tr>

											<Tr>
												<Td><F/></Td>
												<Td><strong>inbreeding coefficient</strong>, the probability that both alleles of a random individual in the population were inherited from the same common ancestor</Td>
												<Td><InbreedingLink /></Td>
											</Tr>

											<Tr>
												<Td><Mu/></Td>
												<Td><strong>positive assortative mating frequency</strong>, the proportion of individuals in the population that choose mates with the same genotype</Td>
												<Td><AssortMatingLink /></Td>
											</Tr>
										</Tbody>
									</Table>
								</TableContainer>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</MainWrapper>
		</>
	);
}

export default FAQPage;
