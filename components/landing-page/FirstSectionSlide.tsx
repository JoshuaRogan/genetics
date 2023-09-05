import { SlideFade, Container, Stack, Heading, Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import Blob from '../Blob';

export default function FirstSectionSlide() {
	const ref = useRef(null);
	const [isIntersecting] = useIntersectionObserver(ref, {
		rootMargin: '0px',
		once: true,
	});
	return (
		<>
			<SlideFade ref={ref} in={isIntersecting} offsetY="20px">
				<Container
					maxW={'7xl'}
					px={{
						base: 0,
					}}
					tabIndex={0}
					aria-label="Section 1: Introduction"
				>
					<Stack
						align={'center'}
						spacing={{ base: 8, md: 5 }}
						py={{ base: 10, md: 20 }}
						px={{
							base: 5,
							md: 16,
							lg: 28,
						}}
						direction={{ base: 'column', md: 'row' }}
						overflow={{
							base: 'hidden',
							xl: 'visible',
						}}
					>
						<Stack flex={1} spacing={{ base: 5, md: 10 }}>
							<Heading
								lineHeight={1.1}
								fontWeight={600}
								fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								<Text
									as={'span'}
									position={'relative'}
									_after={{
										content: "''",
										width: 'full',
										height: '30%',
										position: 'absolute',
										bottom: 1,
										left: 0,
										bg: 'purple.400',
										zIndex: -1,
									}}
								>
									Could,
								</Text>
								<br />
								<Text as={'span'} color={'purple.400'}>
									the high frequency of an allele
								</Text>
							</Heading>
							<Text
								color="text"
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								For dark fur color in rock pocket mice on dark soils be due to natural selection favoring individuals
								with the allele?
							</Text>
						</Stack>
						<Flex
							flex={1}
							justify={{
								base: 'center',
								md: 'end',
							}}
							align="center"
							position="relative"
							width="full"
						>
							<Blob
								w={'150%'}
								h={'150%'}
								position={'absolute'}
								top={'-20%'}
								left={0}
								zIndex={-1}
								color={useColorModeValue('purple.100', 'purple.400')}
							/>
							<Box
								position={'relative'}
								height={{
									base: '200px',
									md: '250px',
								}}
								rounded={'2xl'}
								boxShadow={'2xl'}
								width={'auto'}
								overflow={'hidden'}
							>
								<Image
									alt="Rock Pocket Mouse (Chaetodipus intermedius), photo by J. N. Stuart, from https://www.flickr.com/photos/stuartwildlife/5726805085"
									fit={'cover'}
									align={'center'}
									w={{ base: '100%', md: '100%' }}
									h={'100%'}
									src="/images/rock-pocket-mouse.jpeg"
								/>
							</Box>
						</Flex>
					</Stack>
				</Container>
			</SlideFade>
		</>
	);
}
