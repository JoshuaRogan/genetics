import Link from 'next/link';

import MainWrapper from '../components/MainWrapper';

import { Box, Button, ButtonGroup, Text, Tooltip, useColorModeValue, ListItem, UnorderedList } from '@chakra-ui/react';

import FirstSectionSlide from '../components/landing-page/FirstSectionSlide';
import SecondSectionSlide from '../components/landing-page/SecondSectionSlide';
import ThirdSectionSlide from '../components/landing-page/ThirdSectionSlide';
import FourthSectionSlide from '../components/landing-page/FourthSectionSlide';
import FifthSectionSlide from '../components/landing-page/FifthSectionSlide';

function Index() {
	return (
		<MainWrapper>
			<Box as="section" p={7} maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }} mx={{ sm: 'auto' }}>
				<Text
					color="text"
					fontWeight={'extrabold'}
					fontSize={{ base: '24px', md: '40px', lg: '56px' }}
					align="center"
					padding={{ base: 2, md: 0 }}
					marginY={{ base: 4, md: 6, lg: 10 }}
				>
					Introduction
				</Text>
				<Text
					color="text"
					marginY={{ base: 3, md: 4 }}
					align={{
						base: 'center',
						md: 'left',
					}}
				>
					All living things, including us, belong to a population: a group of individuals of the same species that live
					in the same area and potentially reproduce together. Population genetics is the study of genetic variation
					within and among populations. It often explores the{' '}
					{
						<Tooltip
							label="Variants of a particular gene or DNA region"
							aria-label="A tooltip"
							color={useColorModeValue('black', 'white')}
							backgroundColor={useColorModeValue('purple.200', 'purple.500')}
							padding={2}
							hasArrow
						>
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
								tabIndex={0}
							>
								alleles
							</Text>
						</Tooltip>
					}{' '}
					and{' '}
					{
						<Tooltip
							label="An individual's set of alleles for a particular region of DNA"
							aria-label="A tooltip"
							color={useColorModeValue('black', 'white')}
							backgroundColor={useColorModeValue('purple.200', 'purple.500')}
							padding={2}
							hasArrow
						>
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
								tabIndex={0}
							>
								genotypes
							</Text>
						</Tooltip>
					}{' '}
					within a population. Learning about population genetics is crucial for understanding evolution, which is a
					change in the frequencies of a population’s alleles over time. Population genetics can help us better
					understand how allele frequencies may change based on natural selection, mutation, migration, and many other
					factors.
				</Text>
				<Text
					color="text"
					marginY={{ base: 3, md: 4 }}
					align={{
						base: 'center',
						md: 'left',
					}}
				>
					They also use population genetics to examine how natural selection, the movement of individuals between
					populations, or other factors change the frequency of alleles in a population over time. A change in the
					frequency of alleles in a population over time is evolution, so population genetics is crucial for
					understanding how evolution works.
				</Text>
				<Text
					color="text"
					align="center"
					fontWeight={'extrabold'}
					fontSize={{ base: '22px', md: '24px', lg: '30px' }}
					marginTop={{ base: 4, md: 16 }}
					padding={{ base: 2, md: 0 }}
				>
					You can use Population Genetics Explorer to test questions like the following:
				</Text>
				<Box
					as="section"
					display="flex"
					flexDirection="column"
					gap={{
						base: 8,
						md: 10,
					}}
					position="relative"
					left="50%"
					right="50%"
					mx="-50vw"
					w="100vw"
					py={{ base: '20px' }}
				>
					{/* Mice */}
					<FirstSectionSlide />

					{/* Sickled Cell */}
					<SecondSectionSlide />

					{/* Lynx */}
					<ThirdSectionSlide />

					{/* Mosquito */}
					<FourthSectionSlide />

					{/* Bluebird */}
					<FifthSectionSlide />
				</Box>

				<Text color="text" marginY={{ base: 3, md: 4 }}>
					It’s complicated to track all the genetic information in a population over time. So, biologists studying
					population genetics often use{' '}
					{
						<Tooltip
							label="Mathematical models describe real-world behaviors and processes using equations. They are a way to simplify and simulate reality, in order to explore the key components of a complex system."
							aria-label="A tooltip"
							color={useColorModeValue('black', 'white')}
							backgroundColor={useColorModeValue('purple.200', 'purple.500')}
							padding={2}
							hasArrow
						>
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
								tabIndex={0}
							>
								mathematical models
							</Text>
						</Tooltip>
					}{' '}
					. Models provide a powerful framework to explore questions and predictions about evolution.
				</Text>
				{/* <UnorderedList
					spacing={4}
					marginY={{ base: 10, md: 10, lg: 10 }}
					ml={{
						base: 4,
						md: 10,
						lg: 16,
					}}
				>
					<ListItem>
						The simulation tracks one specific gene region (or locus) with only two alleles. The symbol &quot;A
						<sub>1</sub>&quot; represents the allele being analyzed. The symbol &quot;A<sub>2</sub>&quot; is the other
						allele.
					</ListItem>
					<ListItem>
						The individuals in this population have two copies of a gene region. The copies can be the same or different
						allele.
					</ListItem>
					<ListItem>
						Individuals in the population reproduce sexually. These assumptions make the model easier to understand.
						Although it is simpler than reality, it provides a powerful framework that biologists use to explore and
						make predictions about evolution.
					</ListItem>
				</UnorderedList>  */}
				<Text color="text" marginY={{ base: 3, md: 10, lg: 16 }}>
					<strong>
						In this Click & Learn, you’ll explore a mathematical model that simulates the frequencies of alleles and
						genotypes
					</strong>{' '}
					in a population over time. This simulation tracks one specific gene region (or locus) with only two alleles.
					Use the model to explore your own questions about how frequencies are affected by different factors. Like all
					models, this model makes some simplifying{' '}
					{
						<Tooltip
							label="Conditions that a model assumes to be true, in order to make the system easier to understand and work with"
							aria-label="A tooltip"
							color={useColorModeValue('black', 'white')}
							backgroundColor={useColorModeValue('purple.200', 'purple.500')}
							padding={2}
							hasArrow
						>
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
								tabIndex={0}
							>
								assumptions
							</Text>
						</Tooltip>
					}{' '}
				</Text>

				<Text color="text" marginY={{ base: 3, md: 10, lg: 16 }}>
					You can explore the model using two different simulator modes:
					<UnorderedList
						spacing={4}
						marginY={{ base: 10, md: 10, lg: 10 }}
						ml={{
							base: 4,
							md: 10,
							lg: 16,
						}}
					>
						<ListItem>
							{' '}
							<strong>"Individual Simulations" </strong>generates one simulation for each group of settings you select.
							You can use this to compare how different settings may affect allele and genotype frequencies.{' '}
						</ListItem>
						<ListItem>
							{' '}
							<strong>"Replicated Simulations"</strong> generates multiple simulations with the same settings. You can
							use this to explore how random chance may affect allele and genotype frequencies in many independent
							populations
						</ListItem>
					</UnorderedList>
				</Text>
				<ButtonGroup
					w="100%"
					display={'flex'}
					flexDirection={{ base: 'column', md: 'row' }}
					justifyContent={{ base: 'center', md: 'space-around' }}
					alignItems={'center'}
					marginTop={25}
					marginBottom={25}
					spacing={{ base: 0, md: 4 }}
				>
					<Button as={Link} variant="primary" href="/individual">
						Go to Individual Simulations
					</Button>

					<Button as={Link} variant="primary" href="/replicated" marginTop={{ base: 4, md: 0 }}>
						Go to Replicated Simulations
					</Button>
				</ButtonGroup>
			</Box>
		</MainWrapper>
	);
}

export default Index;
