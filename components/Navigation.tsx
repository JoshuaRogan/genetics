import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import {
	Box,
	Flex,
	Link,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
	Text,
	useColorMode,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';

export default function Navigation() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const colorModeLabel = colorMode === 'dark' ? 'Toggle for light mode' : 'Toggle for dark mode';

	return (
		<>
			<Box bg="navBar" px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<HStack spacing={8} alignItems={'center'}>
						<Link href={'/'} as={NextLink} variant="footerLink" width="auto">
							<Image
								src="/images/logo.svg"
								width={60}
								height={25}
								alt="Logo from the Population Genetics Simulator"
								style={{ filter: 'brightness(2)' }}
							/>
						</Link>
						<HStack as={'nav'} spacing={4} display={{ base: 'none', lg: 'flex' }} color="navBarText">
							<NavLink href="/introduction">
								<Text fontWeight={'bold'}>Introduction</Text>
							</NavLink>
							<NavLink href="/individual">
								<Text fontWeight={'bold'}>Individual Simulations</Text>
							</NavLink>
							<NavLink href="/replicated">
								<Text fontWeight={'bold'}>Replicated Simulations</Text>
							</NavLink>
							<NavLink href="/faq">
								<Text fontWeight={'bold'}>FAQ</Text>
							</NavLink>
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button
								variant="themeSwitcher"
								title={colorModeLabel}
								aria-label={colorModeLabel}
								onClick={toggleColorMode}
							>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							<IconButton
								variant="baseStyle"
								size={'md'}
								icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
								aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
								display={{ lg: 'none' }}
								color="whitesmoke"
								bg={useColorModeValue('whiteAlpha.200', 'whiteAlpha.200')}
								onClick={isOpen ? onClose : onOpen}
							/>
						</Stack>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ lg: 'none' }}>
						<Stack as={'nav'} spacing={4} color="navBarText">
							<NavLink href="/introduction">
								<Text fontWeight={'bold'}>Introduction</Text>
							</NavLink>
							<NavLink href="/individual">
								<Text fontWeight={'bold'}>Individual Simulations</Text>
							</NavLink>
							<NavLink href="/replicated">
								<Text fontWeight={'bold'}>Replicated Simulations</Text>
							</NavLink>
							<NavLink href="/faq">
								<Text fontWeight={'bold'}>FAQ</Text>
							</NavLink>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
