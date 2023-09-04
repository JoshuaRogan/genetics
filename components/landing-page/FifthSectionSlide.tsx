import { SlideFade, Container, Stack, Heading, Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

import Blob from '../Blob';

export default function FifthSectionSlide() {
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
					tabIndex={0}
					aria-label="Section 5: Mating Preferences"
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
										bg: 'blue.400',
										zIndex: -1,
									}}
								>
									In Western bluebirds,
								</Text>
								<br />
								<Text as={'span'} color={'blue.400'}>
									females and males that are bright blue tend to mate with one another.
								</Text>
							</Heading>
							<Text
								color="text"
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								Birds that are more dull in color also seem to choose one another. How does this preference for mates
								affect the frequency of alleles in a population? How does it affect the frequency of different
								genotypes?
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
								color={useColorModeValue('blue.100', 'blue.400')}
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
									alt="Western blue bird in a tree with a blue sky background"
									fit={'cover'}
									align={'center'}
									w={{ base: '100%', md: '100%' }}
									h={'100%'}
									src="/images/western-blue-bird.jpeg"
								/>
							</Box>
						</Flex>
					</Stack>
				</Container>
			</SlideFade>
		</>
	);
}
