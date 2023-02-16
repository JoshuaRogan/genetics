import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

interface CollapsibleProps {
	open?: boolean;
	header: string | React.ReactNode;
	iconDirection?: 'left' | 'right';
	children: React.ReactNode;
	variant?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
	children,
	header,
	variant,
	iconDirection = 'right',
}: CollapsibleProps) => {
	return (
		<Accordion allowToggle variant={variant}>
			<AccordionItem>
				<h2>
					<AccordionButton flexDirection={iconDirection === 'right' ? 'row' : 'row-reverse'}>
						<Box
							as="span"
							flex="1"
							textAlign="left"
							display="block"
							mx={2}
							fontStyle="normal"
							fontWeight="700"
							fontSize="18px"
						>
							{header}
						</Box>
						<AccordionIcon mr={2} />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>{children}</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default Collapsible;
