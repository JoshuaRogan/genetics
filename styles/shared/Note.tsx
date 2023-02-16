import styled from 'styled-components';
import { FiAlertTriangle, FiInfo, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const NoteWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	& > svg {
		margin-right: 1rem;
	}
`;

const BaseNoteStyle = styled.div`
	padding: 1rem 0.5rem;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
	color: #2b6db0;
	background-color: #eaf8ff;
	border-top: 4px solid #3b85ce;
`;

const WarningNoteStyle = styled(BaseNoteStyle)`
	color: #c15621;
	background-color: #fffaf0;
	border-top: 4px solid #ed8936;
`;

const InfoNoteStyle = styled(BaseNoteStyle)`
	color: #2b6db0;
	background-color: #eaf8ff;
	border-top: 4px solid #3b85ce;
`;

const SuccessNoteStyle = styled(BaseNoteStyle)`
	color: #0c5460;
	background-color: #e6fffa;
	border-top: 4px solid #39b2ab;
`;

const ErrorNoteStyle = styled(BaseNoteStyle)`
	color: #c93d3c;
	background-color: #fef4f5;
	border-top: 4px solid #f66565;
`;

const NoteTitle = styled.h3`
	font-size: 1rem;
	margin: 0;
`;

const NoteText = styled.p`
	font-size: 0.8rem;
	margin: 0;
`;

interface NoteProps {
	priority?: NoteType;
	title?: string;
	message: string;
	icon?: string;
}

export enum NoteType {
	INFO = 'info',
	WARNING = 'warning',
	SUCCESS = 'success',
	ERROR = 'error',
	DEFAULT = 'default',
}

const Note = ({ priority, title, message }: NoteProps) => {
	const { Style, Icon } = getWrapperStyles(priority);

	return (
		<Style role="alert">
			<NoteWrapper>
				<IconContext.Provider value={{ size: '24' }}>
					<Icon />
				</IconContext.Provider>
				<div>
					{title && <NoteTitle>{title}</NoteTitle>}
					<NoteText>{message}</NoteText>
				</div>
			</NoteWrapper>
		</Style>
	);
};

const getWrapperStyles = (priority) => {
	switch (priority) {
		case NoteType.WARNING:
			return {
				Style: WarningNoteStyle,
				Icon: FiAlertTriangle,
			};
		case NoteType.INFO:
			return {
				Style: InfoNoteStyle,
				Icon: FiInfo,
			};
		case NoteType.SUCCESS:
			return {
				Style: SuccessNoteStyle,
				Icon: FiCheckCircle,
			};
		case NoteType.ERROR:
			return {
				Style: ErrorNoteStyle,
				Icon: FiAlertCircle,
			};
		default:
			return {
				Style: BaseNoteStyle,
				Icon: FiInfo,
			};
	}
};

export default Note;
