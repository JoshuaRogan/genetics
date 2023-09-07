import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Container, Stack, Link, Collapse } from '@chakra-ui/react';
import { a11yFocus } from '../utils/a11y';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import Support from '../pages/supporting'


function CollapseEx({ header }) {
	const { isOpen, onToggle } = useDisclosure()
  
	return (
	  <>
		<h3 onClick={onToggle}>Click Me</h3>
		<Collapse in={isOpen} animateOpacity>
		  <Box
			p='40px'
			color='white'
			mt='4'
			bg='teal.500'
			rounded='md'
			shadow='md'
		  >
			{/* <Lorem count={1} /> */}
		  </Box>
		</Collapse>
	  </>
	)
  }


function FaqModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen}>Supporting Information</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Support />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
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
			<iframe src="/supporting" style={{width: '100%', height: '70vh'}}/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
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
				<Button onClick={onOpen} variant="footerLink">Supporting Information</Button>
				{/* <Link href="/faq?tab=supporting-information" as={NextLink} variant="footerLink">
					Supporting information

				</Link> */}

				<Link href="https://biointeractive.org" target={'_blank'} as={NextLink} variant="footerLink">
					<Image src="/images/hhmi-biointeractive.svg" width={120} height={25} alt="Logo from HHMI BioInteractive" />
				</Link>
			</Container>
		</Box>
		</>
	);
}
