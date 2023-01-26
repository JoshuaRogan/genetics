import IndexPage from '../components/wrapper';
import styled from 'styled-components';
import Link from 'next/link';

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: space-around;
`;

const Button = styled.button`
	background: #bdbdbd;
	border-radius: 8px;
`;

function HomePage() {
	return (
		<IndexPage>
			<h2>Hello World</h2>
			<p>What is allele frequency? What is genotype frequency?</p>
			<p> Why does it matter? What do scientists use them for? Give some relatable examples. possibly use pictures.</p>
			<p>
				What’s H-W equilibrium? What are the assumption for H-W equilibrium. (Do we need to introduce the equation?) How
				does the allele frequency look when it’s at a H-W equilibrium for 100 generation (static image)? How does the
				genotype frequency look like when it’s at a H-W equilibrium for 100 generation (static image) maybe they can
				toggle between the two images.
			</p>
			<p>Lead to the simulator</p>
			<p>
				In real life, a lot of other factors affect the allele frequency and genotype frequency. What are they? give a
				few examples. possibly provide graphs and pics related to the examples. Let’s learn about the factors and
				explore how the frequencies will look like with different factors.{' '}
			</p>

			<ButtonWrapper>
				<Link href="/IndividualSimulator">
					<button>Go to Individual Simulations</button>
				</Link>

				<Link href="/replicated">
					<button>Go to Replicated Simulations</button>
				</Link>
			</ButtonWrapper>
		</IndexPage>
	);
}

export default HomePage;
