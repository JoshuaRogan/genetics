import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Container, Stack, Link } from '@chakra-ui/react';
import { a11yFocus } from '../utils/a11y';

export default function Footer() {
	return (
		<Box bg="navBar" color="navBarText">
			<Container
				as={Stack}
				minW={'full'}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				px={{ base: 2, sm: 4, md: 6 }}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<Link href="/faq?tab=supporting-information" as={NextLink} variant="footerLink">
					Supporting information
				</Link>
				<Link href="https://biointeractive.org" target={'_blank'} as={NextLink} variant="footerLink">
					<Image src="/images/hhmi-biointeractive.svg" width={120} height={25} alt="Logo from HHMI BioInteractive" />
				</Link>
			</Container>
		</Box>
	);
}
