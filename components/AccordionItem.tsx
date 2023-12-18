import React from "react";
import {
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Text,
} from '@chakra-ui/react';

interface AccordianTypes {
	title: string;
	children: React.ReactNode;
	anchor?: string;
}
export default function AccordionCustomItem({ title, children, anchor } : AccordianTypes) {
		return <>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Text as="span" flex="1" textAlign="left" fontWeight={600}>
								{title}
							</Text>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
							<Text
								as="p"
								marginTop={3}
								fontSize="sm"
							>
								{children}
							</Text>
					</AccordionPanel>
				</AccordionItem>
		</>
}

