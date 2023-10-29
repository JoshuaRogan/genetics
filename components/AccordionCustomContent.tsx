import {
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	UnorderedList,
	ListItem,
	Text,
	Box,
	Image,
} from '@chakra-ui/react';
import { Key } from 'react';
import { FAQ, FAQItem } from '../types';

export default function AccordionCustomContent({ data }) {
	return (
		<>
			{data.map((item: FAQ, index: Key) => {
				return (
					<AccordionItem key={index}>
						<h2>
							<AccordionButton>
								<Text as="span" flex="1" textAlign="left" fontWeight={600}>
									{item.question}
								</Text>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel key={index} pb={4}>
							{typeof item.answer === 'string' ? (
								<Text
									key={index}
									as="p"
									marginTop={3}
									fontSize="sm"
									dangerouslySetInnerHTML={{ __html: item.answer }}
								/>
							) : (
								item.answer.map(renderAnswer)
							)}
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</>
	);
}

function renderAnswer(answerItem: FAQItem, index: Key) {
	switch (answerItem.type) {
		case 'text':
			return (
				<Text
					key={index}
					as="p"
					fontSize="sm"
					marginTop={3}
					dangerouslySetInnerHTML={{ __html: answerItem.value as string }}
				/>
			);

		case 'list':
			return (
				<UnorderedList key={index} paddingLeft={6} marginTop={3}>
					{Array.isArray(answerItem.value) &&
						answerItem.value.map((item: string, index: Key) => (
							<ListItem key={index} fontSize="sm" dangerouslySetInnerHTML={{ __html: item }} />
						))}
				</UnorderedList>
			);

		case 'image':
			return (
				<Image
					key={index}
					src={answerItem.value as string}
					alt={answerItem.alt as string}
					marginY={5}
					borderRadius={5}
					fallback={<Box width={'340px'} height={'150px'} />}
				/>
			);

		case 'gif':
			return (
				<video
					key={index}
					style={{
						width: '600px',
						margin: '20px auto',
						borderRadius: '10px',
					}}
					src={answerItem.value as string}
					autoPlay
					controls
					muted
				/>
			);
	}
}
