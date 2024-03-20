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
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import { a11yFocus } from '../utils/a11y';

export default function Navigation() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const colorModeLabel = colorMode === 'dark' ? 'Toggle for light mode' : 'Toggle for dark mode';

	return (
		<>
			<Box bg="navBar" px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<HStack spacing={8} alignItems={'center'}>
						<Link href={'/'} as={NextLink} variant="footerLink" display="flex" flexDirection="row" gap="3">
							<Image
								src="/images/logo.svg"
								width={60}
								height={25}
								alt="Population Genetics Simulator home"
								style={{ filter: 'brightness(2)' }}
							/>
							<Text
								fontSize={{
									xs: '2xs',
									sm: 'sm',
									base: 'md',
								}}
								fontWeight="bold"
								maxWidth="150px"
								lineHeight="1.2"
								textDecoration="none"
							>
								Population Genetics Explorer
							</Text>
						</Link>
						<HStack as={'nav'} spacing={4} display={{ base: 'none', lg: 'flex' }} color="navBarText">
							<NavLink href="/introduction">
								<Text fontWeight={'bold'}>Introduction</Text>
							</NavLink>
							<Menu>
								<MenuButton
									as={Button}
									variant="menu"
									rightIcon={<ChevronDownIcon />}
									_hover={{
										textDecoration: 'none',
										bg: useColorModeValue('gray.600', 'gray.700'),
									}}
								>
									Simulations
								</MenuButton>
								<MenuList bg={useColorModeValue('#333333', 'gray.900')}>
									<MenuItem
										as={NextLink}
										href="/individual"
										bg={useColorModeValue('#333333', 'gray.900')}
										_hover={{
											textDecoration: 'none',
											bg: useColorModeValue('gray.600', 'gray.700'),
										}}
										_focus={{
											ring: false,
											outlineColor: 'purple.200',
											outlineOffset: 0,
											outlineWidth: 2,
											_dark: {
												outlineColor: 'purple.400',
											},
										}}
									>
										<Text fontWeight={'bold'}>Individual Simulations</Text>
									</MenuItem>
									<MenuItem
										as={NextLink}
										href="/replicated"
										bg={useColorModeValue('#333333', 'gray.900')}
										_hover={{
											textDecoration: 'none',
											bg: useColorModeValue('gray.500', 'gray.700'),
										}}
										_focus={{
											ring: false,
											outlineColor: 'purple.200',
											outlineOffset: 0,
											outlineWidth: 2,
											_dark: {
												outlineColor: 'purple.400',
											},
										}}
									>
										<Text fontWeight={'bold'}>Replicated Simulations</Text>
									</MenuItem>
								</MenuList>
							</Menu>

							<NavLink href="/model-background">
								<Text fontWeight={'bold'}>Model Background</Text>
							</NavLink>
							<NavLink href="/help">
								<Text fontWeight={'bold'}>Help</Text>
							</NavLink>
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<Stack
							direction={'row'}
							spacing={{
								xs: 4,
								base: 7,
							}}
						>
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
						<Stack as="nav" spacing="2" color="navBarText">
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
							<NavLink href="/help">
								<Text fontWeight={'bold'}>Help</Text>
							</NavLink>
						</Stack>
					</Box>
				) : null}
			</Box>
			<Link
				tabIndex={1}
				href="#main-content"
				opacity={0}
				width="fit-content"
				margin="10px auto 0 auto"
				fontWeight="bold"
				animation="ease-in-out"
				transitionDuration=".4s"
				_focus={{ ...a11yFocus, opacity: '1' }}
				_hover={{ ...a11yFocus, opacity: '1' }}
			>
				Skip to main content
			</Link>
		</>
	);
}
