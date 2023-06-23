import React from 'react';
import {
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	HStack,
	useDisclosure,
} from '@chakra-ui/react';
import { a11yFocus } from '../../utils/a11y';

interface HelpContentWrapperProps {
	title?: string;
	message?: string;
	status?: 'success' | 'error' | 'warning' | 'info';
	children: React.ReactNode;
}

export default function HelpContentWrapper({ children, title, message, status = 'info' }: HelpContentWrapperProps) {
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

	const ariaLabel = `Show description for term: ${title}`;

	return (
		<>
			<HStack spacing={4}>
				<Box
					as="button"
					role="button"
					title={ariaLabel}
					aria-label={ariaLabel}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					width={'20px'}
					height={'20px'}
					color={'#ffffff'}
					backgroundColor={'var(--chakra-colors-gray-500)'}
					fontSize={'0.8rem'}
					fontWeight={600}
					borderRadius={'50%'}
					onClick={isOpen ? onClose : onOpen}
					_focus={a11yFocus}
				>
					?
				</Box>
				{children}
			</HStack>
			{isOpen && (
				<Alert variant="top-accent" status={status} my="10px">
					<AlertIcon />
					<Box maxW="90%">
						<AlertTitle>{title}</AlertTitle>
						<AlertDescription maxW="90%">{message}</AlertDescription>
					</Box>
					<CloseButton
						aria-label={`Close ${title} help content`}
						alignSelf="flex-start"
						position="absolute"
						right={'10px'}
						top={1}
						onClick={onClose}
						_focus={a11yFocus}
					/>
				</Alert>
			)}
		</>
	);
}
