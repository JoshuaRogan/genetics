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
import { Fragment, Key } from 'react';
import { FAQ, FAQItem } from '../types';
import { renderMathML } from '../utils/math-ml';

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

		case 'math':
			return (
				<Box
					key={index}
					fontSize="3xl"
					textAlign="center"
					margin="15px auto"
					dangerouslySetInnerHTML={{ __html: renderMathML(answerItem.value as string) }}
				/>
			);

		case 'video':
			return (
				<Fragment key={index}>
					<video
						style={{
							width: '600px',
							margin: '0 auto',
							marginTop: '20px',
							marginBottom: '10px',
							borderRadius: '10px',
						}}
						src={answerItem.value as string}
						autoPlay
						controls
						muted
						aria-describedby={`video-description-${index}`}
					/>
					<Text
						id={`video-description-${index}`}
						textAlign="center"
						fontSize="xs"
						margin="0 auto"
						maxWidth="600px"
						hidden
					>
						{answerItem.alt}
					</Text>
				</Fragment>
			);
	}
}
