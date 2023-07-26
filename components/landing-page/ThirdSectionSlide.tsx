import { SlideFade, Container, Stack, Heading, Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import Blob from '../Blob';

export default function ThirdSectionSlide() {
	const ref = useRef(null);
	const [isIntersecting] = useIntersectionObserver(ref, {
		rootMargin: '0px',
		once: true,
	});

	return (
		<>
			<SlideFade ref={ref} in={isIntersecting} offsetY="20px" delay={0.5}>
				<Container
					maxW={'7xl'}
					px={{
						base: 0,
					}}
				>
					<Stack
						align={'center'}
						spacing={{ base: 8, md: 5 }}
						py={{ base: 20, md: 28 }}
						px={{
							base: 5,
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
								fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
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
										bg: 'green.400',
										zIndex: -1,
									}}
								>
									How,
								</Text>
								<br />
								<Text as={'span'} color={'green.400'}>
									does population size
								</Text>
							</Heading>
							<Text
								color="text"
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								Like the small populations of the endangered Iberian lynxes, affect the frequency of alleles in a
								population over time?
							</Text>
						</Stack>
						<Flex flex={1} justify={'end'} align={'center'} position={'relative'} w={'full'}>
							<Blob
								w={'150%'}
								h={'150%'}
								position={'absolute'}
								top={'-20%'}
								left={0}
								zIndex={-1}
								color={useColorModeValue('green.100', 'green.400')}
							/>
							<Box
								position={'relative'}
								height={'300px'}
								rounded={'2xl'}
								boxShadow={'2xl'}
								width={'auto'}
								overflow={'hidden'}
							>
								<Image
									alt="Iberian Lynx in the wild"
									fit={'cover'}
									align={'center'}
									w={{ base: '100%', md: '100%' }}
									h={'100%'}
									src="/images/iberian-lynx.jpeg"
								/>
							</Box>
						</Flex>
					</Stack>
				</Container>
			</SlideFade>
		</>
	);
}