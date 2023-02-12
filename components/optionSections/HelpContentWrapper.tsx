import { Box, CloseButton, HStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

// create a styled component which is a small gray circle with a question mark
const HelpContentToggle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	color: #ffffff;
	background-color: ${(props) => props.theme.colors.tooltip};
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 600;
	border-radius: 50%;
	line-height: 1.5rem;
`;

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
				<HelpContentToggle title={ariaLabel} aria-label={ariaLabel} onClick={isOpen ? onClose : onOpen}>
					?
				</HelpContentToggle>
				{children}
			</HStack>
			{isOpen && (
				<Alert variant="top-accent" status={status} my="10px">
					<AlertIcon />
					<Box>
						<AlertTitle>{title}</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
					</Box>
					<CloseButton alignSelf="flex-start" position="absolute" right={'10px'} top={0} onClick={onClose} />
				</Alert>
			)}
		</>
	);
}
