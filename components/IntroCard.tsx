import { Stack, Flex, useColorModeValue, Box, Text, Image } from '@chakra-ui/react';
import Blob from './Blob';
interface CardProps {
	imageProps: {
		src: string;
		alt: string;
	};
	blobProps: {
		color: {
			light: string;
			dark: string;
		};
		variation: 'normal' | 'reverse';
	};
	title: string;
	description: string;
}

const IntroCard = ({ title, description, blobProps, imageProps }: CardProps) => {
	return (
		<Box maxW={{ base: 'full', md: '275px' }} w={'full'} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
			<Stack align={'start'} spacing={2}>
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
						opacity={0.7}
						color={useColorModeValue(blobProps.color.light, blobProps.color.dark)}
					/>
					<Box
						position={'relative'}
						height={{
							base: '200px',
							md: '150px',
						}}
						rounded={'2xl'}
						boxShadow={'2xl'}
						width="225px"
						overflow={'hidden'}
					>
						<Image
							src={imageProps.src}
							alt={imageProps.alt}
							align={'center'}
							width={{ base: '100%', md: '100%' }}
							height={'100%'}
							fit={'cover'}
						/>
					</Box>
				</Flex>
				<Box mt={2}>
					<Text mt={3} fontSize={'sm'} textAlign="center">
						{title}
						{description}
					</Text>
				</Box>
			</Stack>
		</Box>
	);
};

export default IntroCard;
