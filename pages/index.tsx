import Link from 'next/link';

import MainWrapper from '../components/MainWrapper';

import HomeContainer from '../styles/home/HomeContainer';
import StyledButtonLink from '../styles/home/StyledButtonLink';
import { Button, ButtonGroup, Text } from '@chakra-ui/react';

function HomePage() {
	return (
		<MainWrapper>
			<HomeContainer>
				<Text color="text" fontWeight={'extrabold'} fontSize={{ base: '24px', md: '40px', lg: '56px' }} align="center">
					Population Genetics Explorer
				</Text>
				<Text color="text">What is allele frequency? What is genotype frequency?</Text>
				<Text color="text">
					Why does it matter? What do scientists use them for? Give some relatable examples. possibly use pictures.
				</Text>
				<Text color="text">
					What’s H-W equilibrium? What are the assumption for H-W equilibrium. (Do we need to introduce the equation?)
					How does the allele frequency look when it’s at a H-W equilibrium for 100 generation (static image)? How does
					the genotype frequency look like when it’s at a H-W equilibrium for 100 generation (static image) maybe they
					can toggle between the two images.
				</Text>
				<Text color="text" fontWeight="bold">
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
					<Button as={Link} href="/individual" w={{ base: '80%', md: '30%' }} variant={'primary'}>
						Go to Individual Simulations
					</Button>

					<Button
						as={Link}
						href="/replicated"
						w={{ base: '80%', md: '30%' }}
						marginTop={{ base: 2, md: 0 }}
						variant={'primary'}
					>
						Go to Replicated Simulations
					</Button>
				</ButtonGroup>

				{/* <div>
					<Link href="/individual">
						<StyledButtonLink textColor={'#333333'}>Go to Individual Simulations</StyledButtonLink>
					</Link>
					<Link href="/replicated">
						<StyledButtonLink textColor={'#333333'}>Go to Replicated Simulations</StyledButtonLink>
					</Link>
				</div> */}
			</HomeContainer>
		</MainWrapper>
	);
}

export default HomePage;
