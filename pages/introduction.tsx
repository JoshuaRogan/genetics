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

function Index() {
	return (
		<MainWrapper>
			<Box as="section" p={7} maxWidth={{ base: '550px', md: '860px', lg: '1080px', xl: '1440px' }} mx={{ sm: 'auto' }}>
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
				<Box>
					<Stack as={Container} maxW={'3xl'} textAlign={'center'}>
						<Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} marginTop={10}>
							You can use Population Genetics Explorer to test questions like the following:
						</Heading>
					</Stack>

					<Box marginY={16}>
						<Flex flexWrap="wrap" gridGap={6} justify="center">
							<IntroCard
								title="Could, the high frequency of an allele"
								description="or dark fur color in rock pocket mice on dark soils be due to natural selection favoring individuals
								with the allele?"
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
								title="Is the high frequency of the allele associated with"
								description="Sickle cell disease in some human populations due to the fact that people who have one copy of the
								sickle cell allele are protected from malaria?"
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
								title="	How, does population size"
								description="	Like the small populations of the endangered Iberian lynxes, affect the frequency of alleles in a
								population over time?"
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

							<IntroCard
								title="How does the movement of mosquitoes"
								description="That are resistant to insecticides from one population to another affect the evolution of resistance to
								insecticide?"
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
						</Flex>
					</Box>
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
				<Text color="text" marginY={{ base: 3, md: 8 }}>
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
