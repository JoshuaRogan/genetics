import { SlideFade, Container, Stack, Heading, Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import Blob from '../Blob';

export default function FourthSectionSlide() {
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
					my={{
						base: 10,
						md: 15,
					}}
				>
					<Stack
						align={'center'}
						spacing={{ base: 8, md: 5 }}
						py={{ base: 20, md: 28 }}
						direction={{ base: 'column', md: 'row' }}
						overflow={
							{
								// base: 'hidden',
								// lg: 'visible',
							}
						}
					>
						<Flex flex={1} justify={'end'} align={'center'} position={'relative'} w={'full'}>
							<Blob
								w={'150%'}
								h={'150%'}
								position={'absolute'}
								top={'-20%'}
								right={{
									base: '5%',
									md: '-10%',
									lg: '-20%',
								}}
								zIndex={-1}
								transform={{
									base: 'rotate(180deg)',
									md: 'rotate(185deg)',
								}}
								color={useColorModeValue('yellow.100', 'yellow.300')}
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
									alt="3D illustration of a mosquito on a blue fabric"
									fit={'cover'}
									align={'center'}
									w={{ base: '100%', md: '100%' }}
									h={'100%'}
									src="/images/mosquito.jpeg"
								/>
							</Box>
						</Flex>
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
										height: '18%',
										position: 'absolute',
										bottom: 1,
										left: {
											base: '22%',
											sm: '18%',
											md: 0,
										},
										bg: 'yellow.300',
										zIndex: -1,
									}}
								>
									How does the movement
								</Text>
								<br />
								<Text as={'span'} color={'yellow.300'}>
									of mosquitoes
								</Text>
							</Heading>
							<Text
								color="text"
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								That are resistant to insecticides from one population to another affect the evolution of resistance to
								insecticide?
							</Text>
						</Stack>
					</Stack>
				</Container>
			</SlideFade>
		</>
	);
}