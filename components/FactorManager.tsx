import { Box, Checkbox, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface FactorManagerProps {
	title: string;
	isActive: boolean;
	toggleActive?: () => void;
	children: React.ReactNode;
}

function FactorManager({ title, isActive, children, toggleActive }: FactorManagerProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleCheckboxChange = (event) => {
		setIsOpen(event.target.checked);

		if (toggleActive !== undefined) {
			toggleActive();
		}
	};

	return (
		<Box
			pb={2}
			borderBottom="1px solid #4f4f4f"
			mb="15px"
			sx={{
				'&:last-child': {
					borderBottom: 'none',
					mb: 0,
				},
			}}
		>
			<HStack as="label" fontWeight={600} fontSize="18px" textTransform="uppercase">
				<Checkbox checked={isActive} onChange={handleCheckboxChange} size="lg" colorScheme="red" />
				<Text as="text" ml={8} cursor="pointer" userSelect="none">
					{title}
				</Text>
			</HStack>
			<Box display={isOpen ? 'block' : 'none'} p={6}>
				{children}
			</Box>
		</Box>
	);
}

export default FactorManager;
