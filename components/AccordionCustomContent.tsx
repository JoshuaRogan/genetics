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

export default function AccordionCustomContent({ data }) {
	return (
		<>
			{data.map((item: { question: {}; answer: any[] }, index: Key) => {
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
									fontSize="sm"
									marginTop={3}
									dangerouslySetInnerHTML={{ __html: item.answer }}
								/>
							) : (
								item.answer.map((answer, index) => {
									return (
										<Fragment key={index}>
											{answer.type === 'text' && (
												<Text
													as="p"
													fontSize="sm"
													marginTop={3}
													dangerouslySetInnerHTML={{ __html: answer.value as string }}
												/>
											)}
											{answer.type === 'list' && (
												<UnorderedList paddingLeft={6} marginTop={3}>
													{Array.isArray(answer.value) &&
														answer.value.map((item: any, index: Key) => (
															<ListItem key={index} fontSize="sm" dangerouslySetInnerHTML={{ __html: item }} />
														))}
												</UnorderedList>
											)}
											{answer.type === 'image' && (
												<Image
													src={answer.value as string}
													alt={answer.alt as string}
													marginY={5}
													borderRadius={5}
													fallback={<Box width={'340px'} height={'150px'} />}
												/>
											)}
											{answer.type === 'gif' && (
												<video
													style={{
														width: '600px',
														margin: '20px auto',
														borderRadius: '10px',
													}}
													src={answer.value as string}
													autoPlay
													controls
													muted
												/>
											)}
										</Fragment>
									);
								})
							)}
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</>
	);
}
