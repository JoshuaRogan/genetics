import Link from 'next/link';

import MainWrapper from '../components/MainWrapper';

import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';

function HomePage() {
	return (
		<MainWrapper>
			<Box as="section" p={7} maxWidth={{ base: '550px', md: '786px', lg: '860px', xl: '1080px' }} mx={{ sm: 'auto' }}>
				<Text
					color="text"
					fontWeight={'extrabold'}
					fontSize={{ base: '24px', md: '40px', lg: '56px' }}
					align="center"
					padding={{ base: 2, md: 0 }}
				>
					Population Genetics Explorer
				</Text>
				<Text color="text" marginY={{ base: 3, md: 4 }}>
					What is allele frequency? What is genotype frequency?
				</Text>
				<Text color="text" marginY={{ base: 3, md: 4 }}>
					Why does it matter? What do scientists use them for? Give some relatable examples. possibly use pictures.
				</Text>
				<Text color="text" marginY={{ base: 3, md: 4 }}>
					What’s H-W equilibrium? What are the assumption for H-W equilibrium. (Do we need to introduce the equation?)
					How does the allele frequency look when it’s at a H-W equilibrium for 100 generation (static image)? How does
					the genotype frequency look like when it’s at a H-W equilibrium for 100 generation (static image) maybe they
					can toggle between the two images.
				</Text>
				<Text color="text" fontWeight="bold" marginY={{ base: 3, md: 6 }}>
					Lead to the simulator
				</Text>
				<Text color="text">
					In real life, a lot of other factors affect the allele frequency and genotype frequency. What are they? give a
					few examples. possibly provide graphs and pics related to the examples. Let’s learn about the factors and
					explore how the frequencies will look like with different factors.{' '}
				</Text>

				<ButtonGroup
					w="100%"
					display={'flex'}
					flexDirection={{ base: 'column', md: 'row' }}
					justifyContent={{ base: 'center', md: 'space-around' }}
					alignItems={'center'}
					marginTop={25}
					marginBottom={25}
					spacing={0}
				>
					<Button as={Link} href="/individual" variant={'primary'} w={{ base: '70%', md: '40%' }}>
						Go to Individual Simulations
					</Button>

					<Button
						as={Link}
						href="/replicated"
						variant={'primary'}
						w={{ base: '70%', md: '40%' }}
						marginTop={{ base: 2, md: 0 }}
					>
						Go to Replicated Simulations
					</Button>
				</ButtonGroup>
			</Box>
		</MainWrapper>
	);
}

export default HomePage;
