import NextLink from 'next/link';
import Image from 'next/image';
import {Box, Container, Stack, Link, Accordion, AccordionItem, Text} from '@chakra-ui/react';
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
import AccordionCustomItem, {AccordionCustomChildrenItem} from "./AccordionItem";
const faqSupportingInformation = require('../data/faq-supporting-information.json');

function CreditHeader({title}) {
	return <Text fontSize={17} marginTop={5}><strong>{title}</strong></Text>
}


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
								<AccordionCustomChildrenItem title="Credits" hasHeightLimit={true}>
									<CreditHeader title="Producer" />
									Paul Beardsley,Cal Poly Pomona, CA

									<CreditHeader title="Producer" />
									John R Shaffer, University of Pittsburgh <br />
									Josh Rogan <a href={"https://joshuarogan.com"} className={'faq-link'}>https://joshuarogan.com/</a>

									<CreditHeader title="Reviewers" />
									John R Shaffer, University of Pittsburgh

									<CreditHeader title="Writing and Editing" />
									Paul Beardsley,Cal Poly Pomona, CA <br />
									Esther Shyu, HHMI

									<CreditHeader title="Creative/Art Direction and UI/UX Design" />
									Li Yao, HHMI

									<CreditHeader title="Engineer" />
									Josh Rogan <a href={"https://joshuarogan.com"} className={'faq-link'}>https://joshuarogan.com/</a>

									<CreditHeader title="Photographs" />
									Mouse [https://commons.wikimedia.org/wiki/File:Endangered_Pacific_Pocket_Mouse_in_new_home_%2835596303052%29.jpg] public domain <br />
									Sickled Red Blood Cell [http://www.publicdomainfiles.com/show_file.php?id=13515800411330] public domain <br/>
									Mosquito [https://www.cdc.gov/mosquitoes/gallery/aedes/index.html] public domain <br/>
									Lynx [https://commons.wikimedia.org/wiki/File:Female_Iberian_Lynx_(Lynx_pardinus),_La_Lancha,_Parque_natural_de_la_Sierra_de_And%C3%BAjar,_Andaluc%C3%ADa,_Espa%C3%B1a_-_Flickr_-_Frank.Vassen.jpg] CC BY 2.0 Deed

									<CreditHeader title="Code Library" />
									<a className={"faq-link"} href={'https://www.highcharts.com/'}>HighCharts</a>, used under <a  className={"faq-link"} href="https://creativecommons.org/licenses/by-nc/3.0/">CC BY-NC 3.0</a>

									<CreditHeader title="Special Thanks" />
									Kristine Grayson, University of Richmond, VA<br />
									Elizabeth Scordato, Cal Poly Pomona, CA<br/>
									Ángel  Valdés, Cal Poly Pomona, CA

								</AccordionCustomChildrenItem>

								<AccordionCustomChildrenItem title={"Terms of Use"}>
									© 2024 Howard Hughes Medical Institute. The resource is licensed under a <a
									href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="faq-link">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license.</a>
								</AccordionCustomChildrenItem>

								<AccordionCustomChildrenItem title={"Version"}>
									Version 1.0 - Updated on 2024-03-12
								</AccordionCustomChildrenItem>

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
