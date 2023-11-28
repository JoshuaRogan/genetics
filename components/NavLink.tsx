import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NavLink = ({ children, href, variant }: { children: ReactNode; href: string; variant?: string }) => {
	const router = useRouter();
	const highlightColor = useColorModeValue('gray.600', 'gray.700');

	const highlight = router.pathname === href ? highlightColor : '';

	return (
		<Link
			variant={variant ?? 'navigationLink'}
			href={href}
			as={NextLink}
			bg={highlight}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.600', 'gray.700'),
			}}
		>
			{children}
		</Link>
	);
};

export default NavLink;
