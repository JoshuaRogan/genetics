import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => {
	const router = useRouter();
	const highlightColor = useColorModeValue('gray.600', 'gray.700');

	const highlight = router.pathname === href ? highlightColor : '';

	return (
		<Link
			px={8}
			py={4}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.600', 'gray.700'),
			}}
			href={href}
			as={NextLink}
			bg={highlight}
		>
			{children}
		</Link>
	);
};

export default NavLink;
