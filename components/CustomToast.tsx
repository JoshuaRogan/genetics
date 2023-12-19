import { CloseIcon } from '@chakra-ui/icons';
import { Box, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';

interface CustomToastProps {
	id: string;
	title: string;
	description: string;
	status: 'success' | 'error' | 'warning' | 'info';
}

const TOAST_STYLE_VARIANTS = {
	success: {
		color: 'white',
		background: '#2E8556',
	},
	error: {
		color: 'white',
		background: 'red.600',
	},
	info: {
		color: 'white',
		background: 'blue.600',
	},
	warning: {
		color: '#000000',
		background: '#FFD561',
	},
};

export function CustomToast({ id, title, description, status = 'info' }: CustomToastProps) {
	const toast = useToast();

	const currentVariant = TOAST_STYLE_VARIANTS[status];

	const closeToast = () => {
		toast.close(id);
	};

	return (
		<Box pos="relative">
			<IconButton
				icon={<CloseIcon />}
				size="xs"
				color={currentVariant.color}
				backgroundColor="transparent"
				pos="absolute"
				top={2}
				right={2}
				onClick={() => closeToast()}
				aria-label="Close Modal"
			>
				Close
			</IconButton>
			<Box color={currentVariant.color} px={6} py={4} bg={currentVariant.background} borderRadius={8}>
				<b>{title}</b>
				<p>{description}</p>
			</Box>
		</Box>
	);
}
