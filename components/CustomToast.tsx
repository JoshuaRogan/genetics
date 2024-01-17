import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import { a11yToastFocus } from '../utils/a11y';

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
		focus: a11yToastFocus,
	},
	error: {
		color: 'white',
		background: 'red.600',
		focus: a11yToastFocus,
	},
	info: {
		color: 'white',
		background: 'blue.600',
		focus: a11yToastFocus,
	},
	warning: {
		color: '#000000',
		background: '#FFD561',
		focus: {
			...a11yToastFocus,
			outlineColor: 'purple.600',
			_dark: {
				outlineColor: 'purple.600',
			},
		},
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
				_focus={currentVariant.focus}
				aria-label="Close Modal"
			>
				Close
			</IconButton>
			<Box color={currentVariant.color} px={6} py={4} bg={currentVariant.background} borderRadius={8}>
				<Heading size="sm" width="fit-content">
					{title}
				</Heading>
				<p>{description}</p>
			</Box>
		</Box>
	);
}
