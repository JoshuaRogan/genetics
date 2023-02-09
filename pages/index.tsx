import Link from 'next/link';

import MainWrapper from '../components/MainWrapper';

import HomeContainer from '../styles/home/HomeContainer';
import ButtonWrapper from '../styles/home/ButtonWrapper';
import StyledButtonLink from '../styles/home/StyledButtonLink';
import HomePageTitle from '../styles/home/HomePageTitle';
import BoldText from '../styles/shared/BoldText';

function HomePage() {
	return (
		<MainWrapper>
			<HomeContainer>
				<HomePageTitle>Population Genetics Explorer</HomePageTitle>
				<p>What is allele frequency? What is genotype frequency?</p>
				<p>
					{' '}
					Why does it matter? What do scientists use them for? Give some relatable examples. possibly use pictures.
				</p>
				<p>
					What’s H-W equilibrium? What are the assumption for H-W equilibrium. (Do we need to introduce the equation?)
					How does the allele frequency look when it’s at a H-W equilibrium for 100 generation (static image)? How does
					the genotype frequency look like when it’s at a H-W equilibrium for 100 generation (static image) maybe they
					can toggle between the two images.
				</p>
				<BoldText>Lead to the simulator</BoldText>
				<p>
					In real life, a lot of other factors affect the allele frequency and genotype frequency. What are they? give a
					few examples. possibly provide graphs and pics related to the examples. Let’s learn about the factors and
					explore how the frequencies will look like with different factors.{' '}
				</p>

				<ButtonWrapper marginTop={30}>
					<Link href="/individual">
						<StyledButtonLink textColor={'#333333'}>Go to Individual Simulations</StyledButtonLink>
					</Link>
					<Link href="/replicated">
						<StyledButtonLink textColor={'#333333'}>Go to Replicated Simulations</StyledButtonLink>
					</Link>
				</ButtonWrapper>
			</HomeContainer>
		</MainWrapper>
	);
}

export default HomePage;
