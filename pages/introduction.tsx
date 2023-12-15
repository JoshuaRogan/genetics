import Link from 'next/link';

import MainWrapper from '../components/MainWrapper';

import {
	Box,
	Button,
	ButtonGroup,
	Text,
	Tooltip,
	useColorModeValue,
	ListItem,
	UnorderedList,
	Icon,
	Flex,
	Container,
	Stack,
	Heading,
} from '@chakra-ui/react';
import IntroCard from '../components/IntroCard';
import AriaTooltip from '../components/AriaTooltip';
import Head from 'next/head';

function Index() {
	return (
		<MainWrapper>
			<Head>
				<title>Introduction - Population Genetics Simulator</title>
			</Head>
			<Box
				as="main"
				id="main-content"
				p={7}
				maxWidth={{ base: '550px', md: '860px', lg: '1080px', xl: '1440px' }}
				mx={{ sm: 'auto' }}
			>
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
					All living things, including us, belong to a <strong>population</strong>:  a group of individuals of the same species that live in the same area and potentially reproduce together.
					<strong>Population genetics</strong> is the study of genetic variation
					within and among populations. It often explores the{' '}
					{
						<AriaTooltip label="Variants of a particular region of DNA.">
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
							>
								alleles
							</Text>
						</AriaTooltip>
					}{' '}
					and{' '}
					{
						<AriaTooltip label="An individual’s set of alleles for a particular region of DNA.">
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
							>
								genotypes
							</Text>
						</AriaTooltip>
					}{' '}
					within a population.
				</Text>

				<Text>
					Learning about population genetics is crucial for understanding <strong>evolution</strong>, which is a change in the frequencies of a population’s alleles over time. Population genetics can help us better understand how allele frequencies may change based on natural selection, mutation, migration, and many other factors.
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
				<Box>
					<Stack as={Container} maxW={'3xl'} textAlign={'center'}>
						<Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} marginTop={10}>
							You can use <i>Population Genetics Explorer</i> to test questions like the following:
						</Heading>
					</Stack>

					<Box marginY={16}>
						<Flex flexWrap="wrap" gridGap={6} justify="center">
							<IntroCard
								title=""
								description="Populations of rock pocket mice that live on dark-colored surfaces have higher frequencies of an allele for dark-colored fur. Can natural selection explain the rise in frequency of this allele? "
								imageProps={{
									src: '/images/rock-pocket-mouse.jpeg',
									alt: 'A picture of a mouse on a rock.',
								}}
								blobProps={{
									color: {
										light: 'purple.100',
										dark: 'purple.400',
									},
									variation: 'normal',
								}}
								aria-label="Section 1: Introduction"
							/>

							<IntroCard
								title=""
								description="Sickle cell disease is a genetic condition that results in sickle-shaped red blood cells. Does the fact that people who have one copy of the sickle cell allele are protected from malaria explain why sickle cell disease is more common in some populations?"
								imageProps={{
									src: '/images/sickled-cells.jpeg',
									alt: 'Two red crescent shaped objects float in front of several more circular red objects.',
								}}
								blobProps={{
									color: {
										light: 'red.100',
										dark: 'red.300',
									},
									variation: 'normal',
								}}
								aria-label="Section 2: Introduction"
							/>

							<IntroCard
								title=""
								description="Certain alleles make mosquitos more resistant to insecticide. How does the movement of these mosquitoes among populations affect the evolution of insecticide resistance?"
								imageProps={{
									src: '/images/mosquito.jpeg',
									alt: 'A close up picture of a mosquito.',
								}}
								blobProps={{
									color: {
										light: 'yellow.100',
										dark: 'yellow.400',
									},
									variation: 'normal',
								}}
								aria-label="Section 4: Population Size"
							/>

							<IntroCard
								title=""
								description="Iberian lynxes and other endangered species have small populations. How might population size affect the evolution of these species over time?"
								imageProps={{
									src: '/images/iberian-lynx.jpeg',
									alt: 'A picture of a lynx lying in a shaded grassy area.',
								}}
								blobProps={{
									color: {
										light: 'green.100',
										dark: 'green.400',
									},
									variation: 'normal',
								}}
								aria-label="Section 3: Population Size"
							/>
						</Flex>
					</Box>
				</Box>

				<Text color="text" marginY={{ base: 3, md: 4 }}>
					It’s complicated to track all the genetic information in a population over time. So, biologists studying
					population genetics often use{' '}
					{
						<AriaTooltip label="Mathematical models describe real-world behaviors and processes using equations. They are a way to simplify and simulate reality, in order to explore the key components of a complex system.">
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
							>
								mathematical models
							</Text>
						</AriaTooltip>
					}{' '}
					. Models provide a powerful framework to explore questions and predictions about evolution.
				</Text>
				<Text color="text" marginY={{ base: 3, md: 8 }}>
					<strong>
						In this tool, you’ll explore a mathematical model that simulates the frequencies of alleles and genotypes
					</strong>{' '}
					in a population over time. This simulator tracks one specific gene region (or locus) with only two alleles.
					Use the model to explore your own questions about how frequencies are affected by different factors. Like all
					models, this model makes some simplifying{' '}
					{
						<AriaTooltip label="Conditions that a model assumes to be true, in order to make the system easier to understand and work with.">
							<Text
								as="span"
								display="inline-block"
								color="text"
								textDecoration="wavy underline"
								textDecorationColor="purple.300"
								textUnderlineOffset={2}
								fontWeight={800}
								title="Conditions that a model assumes to be true, in order to make the system easier to understand and work with."
							>
								assumptions
							</Text>
						</AriaTooltip>
					}{' '}
				</Text>

				<Box marginY={{ base: 3, md: 10, lg: 16 }}>
					<Text color="text">You can explore the model using two different simulator modes:</Text>
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
				</Box>

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
