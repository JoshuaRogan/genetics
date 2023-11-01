import { useState } from 'react';
import { Tooltip, useColorModeValue } from '@chakra-ui/react';

interface AriaTooltipProps {
	label: string;
}

const AriaTooltip: React.FC<AriaTooltipProps> = ({ label, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Tooltip
			label={label}
			aria-label="Definition of word"
			color={useColorModeValue('black', 'white')}
			backgroundColor={useColorModeValue('purple.200', 'purple.500')}
			padding={2}
			isOpen={isOpen}
			pointerEvents="all"
			onMouseLeave={() => setIsOpen(false)}
			hasArrow
		>
			<span
				tabIndex={0}
				onMouseEnter={() => setIsOpen(true)}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				{children}
			</span>
		</Tooltip>
	);
};

export default AriaTooltip;
