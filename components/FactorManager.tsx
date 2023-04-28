import React from 'react';
import { Box, Checkbox, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../types';
import { setActiveSectionStatus } from '../redux/reducers/rootSlice';

interface FactorManagerProps {
	// This is the title of the factor, as seen on the dropdown collapsible component
	title: string;
	// This is a boolean that is used to determine if the factor is disabled for input or not
	isFactorActive: boolean;
	// This is the children of the factor manager, which is the content of the collapsible component
	children: React.ReactNode;
}

function FactorManager({ title, isFactorActive, children }: FactorManagerProps) {
	const dispatch = useDispatch();
	const factorActiveState = useSelector((state: StoreState) => state.root.activeSections[title]);

	const titleColor = useColorModeValue('gray.800', 'gray.300');
	const titleColorDisabled = useColorModeValue('blackAlpha.600', 'gray.600');

	const handleCheckboxChange = (event) => {
		dispatch(setActiveSectionStatus({ name: title, status: event.target.checked }));
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
					variant="redBox"
					defaultChecked={factorActiveState}
					isDisabled={!isFactorActive}
					onChange={handleCheckboxChange}
				/>
				<Text as="p" ml={8} cursor="pointer" userSelect="none" color={isFactorActive ? titleColor : titleColorDisabled}>
					{title}
				</Text>
			</HStack>
			<Box display={factorActiveState ? 'block' : 'none'} p={6}>
				{children}
			</Box>
		</Box>
	);
}

export default FactorManager;
