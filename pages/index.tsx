import NextLink from 'next/link';
import { Box, Button, ButtonGroup, Img, Link, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import MainWrapper from '../components/MainWrapper';

function Index() {
	return (
		<MainWrapper>
			<Box
				as="section"
				padding={7}
				marginTop={{
					md: '7%',
					lg: '0',
				}}
				maxWidth={{ md: '90%', lg: '80%' }}
				mx={{ sm: 'auto' }}
			>
				<Box
					display="grid"
					gridTemplateColumns={{
						base: '1fr',
						md: '1fr 1fr',
					}}
					flexDirection={{
						base: 'column',
						md: 'row',
					}}
					justifyContent={{
						base: 'center',
						md: 'space-between',
					}}
					placeItems="center"
					gap={{
						base: 5,
						md: 10,
					}}
				>
					<Box display="flex" flexDirection="column" alignItems={{ base: 'center', md: 'start' }} gap="15px">
						<Text
							color="text"
							align={{ base: 'center', md: 'start' }}
							fontWeight={'extrabold'}
							fontSize={{ base: '24px', md: '36px', lg: '50px' }}
							marginTop={{ base: 4, md: 6, lg: 12 }}
							lineHeight={{ base: '1.2', md: '1.1' }}
						>
							Dive into Population Genetics Science
						</Text>
						<Text color="text" marginY={{ base: 3 }} width="80%" align={{ base: 'center', md: 'start' }}>
							Welcome to the Population Genetics Explorer, your gateway to understanding genetic evolution. Dive into
							the fascinating world of genetics and explore the dynamic frequencies of alleles, natural selection, and
							more through mathematical simulations within populations.
						</Text>
						<Button
							as={NextLink}
							href="/introduction"
							variant="primary"
							bgGradient="linear(to-r, purple.400, purple.500)"
							_hover={{
								bgGradient: 'linear(to-r, purple.500, purple.600)',
								shadow: 'xl',
							}}
							alignSelf={{
								base: 'center',
								md: 'start',
							}}
							animation="all ease-in 5.2s"
							borderRadius="25px"
							shadow="md"
						>
							Learn More
						</Button>
					</Box>

					<Img
						src="/images/homepage-hero-image.svg"
						height={{
							base: '250px',
							md: '350px',
							lg: '400px',
							xl: '450px',
						}}
						placeSelf="center"
					/>
				</Box>

				<Box
					maxWidth={{
						base: '100%',
						md: '90%',
						lg: '80%',
					}}
					marginX="auto"
				>
					<Text color="text" marginY={{ base: 6, md: 8, lg: 16 }} textAlign="center">
						Take a hands-on approach to understanding genetic evolution. Use the simulators to explore and test your own
						questions on the impacts of natural selection, population size, and more.
					</Text>
					<ButtonGroup
						width={{
							base: '100%',
							xl: '80%',
						}}
						display={'flex'}
						flexDirection={{ base: 'column', md: 'row' }}
						justifyContent={{ base: 'center', md: 'space-around' }}
						alignItems={'center'}
						marginBottom={25}
						marginX="auto"
						spacing={{ base: 0, md: 4 }}
					>
						<Button as={NextLink} variant="primary" href="/individual">
							Go to Individual Simulations
						</Button>

						<Button as={NextLink} variant="primary" href="/replicated" marginTop={{ base: 4, md: 0 }}>
							Go to Replicated Simulations
						</Button>
					</ButtonGroup>
					<Text color="text" textAlign="center">
						Need any help? Check out our{' '}
						<Link
							as={NextLink}
							href="/faq"
							textDecoration="underline"
							color={useColorModeValue('purple.500', 'purple.300')}
							fontWeight="semibold"
						>
							FAQ page
						</Link>{' '}
						for answers to get you started.
					</Text>
				</Box>
			</Box>
		</MainWrapper>
	);
}

export default Index;
