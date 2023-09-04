import { SlideFade, Container, Stack, Heading, Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import Blob from '../Blob';

export default function SecondSectionSlide() {
	const ref = useRef(null);
	const [isIntersecting] = useIntersectionObserver(ref, {
		rootMargin: '0px',
		once: true,
	});

	return (
		<>
			<SlideFade ref={ref} in={isIntersecting} offsetY="20px" delay={0.5}>
				<Container maxW={'7xl'} px="0">
					<Stack
						align={'center'}
						spacing={{ base: 8, md: 5 }}
						py={{ base: 12, md: 24 }}
						px={{
							base: 5,
							md: 16,
							lg: 28,
						}}
						direction={{ base: 'column-reverse', md: 'row' }}
					>
						<Flex
							flex={1}
							justify={{
								md: 'center',
								lg: 'start',
							}}
							align="center"
							position="relative"
							width="full"
						>
							<Blob
								w={'150%'}
								h={'150%'}
								position={'absolute'}
								top={{
									base: '-10%',
									md: '-20%',
								}}
								right={{
									base: '5%',
									md: '-10%',
								}}
								zIndex={-1}
								transform={{
									base: 'rotate(180deg)',
									md: 'rotate(185deg)',
								}}
								color={useColorModeValue('red.100', 'red.300')}
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
									alt="3D illustration of Sickle Cells"
									fit={'cover'}
									align={'center'}
									w={{ base: '100%', md: '100%' }}
									h={'100%'}
									src="/images/sickled-cells.jpeg"
								/>
							</Box>
						</Flex>
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
									display="block"
									position={'relative'}
									_after={{
										content: "''",
										width: {
											sm: '70%',
											lg: '90%',
										},
										height: {
											base: '25%',
											md: '18%',
										},
										position: 'absolute',
										top: {
											base: 5,
											md: 6,
										},
										bottom: {
											base: 0,
										},
										left: {
											base: '22%',
											sm: '14%',
											md: 0,
										},
										bg: 'red.300',
										zIndex: -1,
									}}
								>
									Is the high frequency of the allele
								</Text>
								<Text as={'span'} color={'red.300'}>
									associated with
								</Text>
							</Heading>
							<Text
								color="text"
								textAlign={{
									base: 'center',
									md: 'left',
								}}
							>
								Sickle cell disease in some human populations due to the fact that people who have one copy of the
								sickle cell allele are protected from malaria?
							</Text>
						</Stack>
					</Stack>
				</Container>
			</SlideFade>
		</>
	);
}
