import styled from 'styled-components';

interface SectionProps {
	margin?: string;
	padding?: string;
	backgroundColor?: string;
	fullWidth?: boolean;
}

const Section = styled.section<SectionProps>`
	margin: ${(props) => props.margin || '0'};
	padding: ${(props) => props.padding || '0'};
	background-color: ${(props) => props.backgroundColor || 'transparent'};

	${({ fullWidth }) =>
		fullWidth &&
		`
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		`}
`;

const ThemedSection = styled(Section)`
	background-color: ${(props) => props.theme.colors.sectionBackground};
`;

export { Section, ThemedSection };
