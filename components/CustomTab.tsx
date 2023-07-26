import { Box, Button, Flex, Stack, TabProps, Text, useColorModeValue, useTab } from '@chakra-ui/react';
import React, { ReactSVGElement } from 'react';

interface CustomTabProps extends TabProps {
	heading: string;
	TabIcon: any;
}

const CustomTab = React.forwardRef<HTMLButtonElement, CustomTabProps>((props: CustomTabProps, ref) => {
	const tabProps = useTab({ ...props, ref });
	const isSelected = !!tabProps['aria-selected'];

	const unSelectedBorderColor = useColorModeValue('gray.300', 'gray.600');
	const selectedBorderColor = useColorModeValue('purple.500', 'purple.400');

	const unSelectedBackgroundColor = useColorModeValue('white', 'gray.800');
	const selectedBackgroundColor = useColorModeValue('white', 'gray.800');

	return (
		<Button
			width={'full'}
			height="auto"
			paddingY={4}
			backgroundColor={isSelected ? selectedBackgroundColor : unSelectedBackgroundColor}
			borderWidth="2px"
			borderRadius="lg"
			borderColor={isSelected ? selectedBorderColor : unSelectedBorderColor}
			boxShadow={isSelected ? 'xl' : 'xs'}
			transition={'all'}
			transitionDuration={'500ms'}
			_hover={{
				backgroundColor: useColorModeValue('gray.100', 'gray.700'),
			}}
			{...tabProps}
			title={props.heading}
			aria-label={props.heading}
		>
			<Stack align={'start'} spacing={2}>
				<Flex width="100%" h={12} align={'center'} justify={'center'} color={isSelected ? 'purple.500' : 'gray.400'}>
					{props.TabIcon}
				</Flex>
				<Box mt={1}>
					<Text
						as="p"
						fontSize={{
							base: 'xs',
							md: 'sm',
						}}
					>
						{props.heading}
					</Text>
				</Box>
			</Stack>
		</Button>
	);
});

CustomTab.displayName = 'CustomTab';

export default CustomTab;
