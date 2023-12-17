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
	useColorModeValue,
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

	const onContentClose = () => {
		if (document.activeElement) {
			let e = Array.from(document.querySelectorAll('button')) as HTMLElement[];
			let index = e.indexOf(document.activeElement as HTMLElement) - 1;
			index = index < 0 ? e.length - 1 : index;
			e[index].focus();
			onClose();
		}
	};

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
					minWidth={'20px'}
					minHeight={'20px'}
					color={useColorModeValue('white', 'white')}
					backgroundColor={useColorModeValue('#5B657B', '#5B657B')}
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
						<AlertTitle as="h4" marginTop={6} dangerouslySetInnerHTML={{__html: title}}>

						</AlertTitle>
						<AlertDescription maxW="90%" dangerouslySetInnerHTML={{ __html: message }} />
					</Box>
					<CloseButton
						aria-label={`Close ${title} help content`}
						alignSelf="flex-start"
						position="absolute"
						right={'10px'}
						top={1}
						onClick={onContentClose}
						_focus={a11yFocus}
					/>
				</Alert>
			)}
		</>
	);
}
