import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Container, Stack, Link, Accordion } from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import AccordionCustomContent from './AccordionCustomContent';
const faqSupportingInformation = require('../data/faq-supporting-information.json');

export default function Footer() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxW={'80vw'} maxHeight={'full'}>
					<ModalHeader>Supporting Information</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box as="section" p={7} mx={{ sm: 'auto' }}>
							<Accordion variant="faq">
								<AccordionCustomContent data={faqSupportingInformation} />
							</Accordion>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

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
					<Button onClick={onOpen} variant="footerButton">
						Supporting Information
					</Button>
					<Link href="/sitemap" as={NextLink} marginInlineEnd="auto" variant="footerLink">
						Site Map
					</Link>
					<Link href="https://biointeractive.org" target={'_blank'} as={NextLink} variant="footerLink">
						<Image
							src="/images/hhmi-biointeractive.svg"
							width={120}
							height={25}
							alt="HHMI BioInteractive home, opens in new tab"
						/>
					</Link>
				</Container>
			</Box>
		</>
	);
}
