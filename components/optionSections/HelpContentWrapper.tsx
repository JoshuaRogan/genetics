import React from 'react';
import styled from 'styled-components';
import Note, { NoteType } from '../../styles/shared/Note';

// create a styled component which is a small gray circle with a question mark
const HelpContentToggle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	color: #ffffff;
	background-color: ${(props) => props.theme.colors.tooltip};
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 600;
	border-radius: 50%;
	line-height: 1.5rem;
`;

interface HelpContentWrapperProps {
	title?: string;
	message?: string;
	priority?: NoteType;
	children: React.ReactNode;
}

export default function HelpContentWrapper({ children, title, message, priority }: HelpContentWrapperProps) {
	const [showHelp, setShowHelp] = React.useState(false);

	const toggleHelp = () => setShowHelp(!showHelp);

	return (
		<>
			<HelpContentToggle title={''} aria-label={''} onClick={toggleHelp}>
				?
			</HelpContentToggle>
			{children}
			{showHelp && <Note priority={priority || NoteType.INFO} title={title} message={message} />}
		</>
	);
}
