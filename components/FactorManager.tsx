import { Box, Checkbox, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface FactorManagerProps {
	// This is the title of the factor, as seen on the dropdown collapsible component
	title: string;
	// This is a boolean that is used to determine if the factor should be opened by default
	factorShouldBeOpened: boolean;
	// This is a boolean that is used to determine if the factor is disabled for input or not
	isFactorActive: boolean;
	// This is a function that is used to toggle the active state of the factor
	toggleActive?: () => void;
	// This is the children of the factor manager, which is the content of the collapsible component
	children: React.ReactNode;
}

function FactorManager({ title, isFactorActive, factorShouldBeOpened, children, toggleActive }: FactorManagerProps) {
	const [isOpen, setIsOpen] = React.useState(factorShouldBeOpened);

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
				<Checkbox
					size="lg"
					colorScheme="red"
					defaultChecked={factorShouldBeOpened}
					isDisabled={!isFactorActive}
					onChange={handleCheckboxChange}
				/>
				<Text as="p" ml={8} cursor="pointer" userSelect="none" color={isFactorActive ? 'white' : 'gray.400'}>
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
