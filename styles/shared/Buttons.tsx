import styled from 'styled-components';

interface StyledButtonLinkProps {
	textColor?: string;
	backgroundColor?: string;
	hoverColor?: string;
	hoverBgColor?: string;
}

const Button = styled.button<StyledButtonLinkProps>`
	padding: 12px 40px;

	border: none;
	border-radius: 8px;
	width: 260px;
	font-size: 0.8rem;
	font-weight: 600;
	text-align: center;
	transition: all 0.2s ease-in-out;
	cursor: pointer;

	@media ${(props) => props.theme._mq.MOBILE_LARGE} {
		width: 350px;
		font-size: 0.9rem;
	}

	@media ${(props) => props.theme._mq.TABLET} {
		font-size: 1rem;
	}
`;

const PrimaryButton = styled(Button)`
	color: #ffffff;
	background-color: ${(props) => props.theme.colors.background};

	&:hover {
		background-color: ${(props) => props.theme.colors.background}db;
	}
`;

const AccentButton = styled(Button)`
	color: ${(props) => props.theme.colors.text};
	background-color: ${(props) => props.theme.colors.accent};

	&:hover {
		background-color: ${(props) => props.theme.colors.accent}db;
	}
`;

export { PrimaryButton, AccentButton };
