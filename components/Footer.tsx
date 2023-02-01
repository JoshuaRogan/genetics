import Link from 'next/link';
import Image from 'next/image';
import FooterWrapper from '../styles/footer/FooterWrapper';

export default function Footer() {
	return (
		<FooterWrapper>
			<Link href={'/'}>Supporting information</Link>
			<Link href={'https://biointeractive.org'} target={'_blank'}>
				<Image
					src="/images/biointeractive.png"
					width={120}
					height={25}
					alt="Logo from the Population Genetics Simulator"
				/>
			</Link>
		</FooterWrapper>
	);
}
