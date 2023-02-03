import styled from 'styled-components';

interface StyledButtonLinkProps {
	textColor?: string;
	backgroundColor?: string;
	hoverColor?: string;
	hoverBgColor?: string;
}

const StyledButtonLink = styled.button<StyledButtonLinkProps>`
	padding: 12px 40px;
	color: ${(props) => props.textColor ?? props.theme.colors.primary};
	background-color: ${(props) => props.backgroundColor ?? '#bdbdbd'};
	border: none;
	border-radius: 8px;
	width: 260px;
	font-size: 0.8rem;
	font-weight: 600;
	text-align: center;
	text-decoration: none;
	transition: all 0.2s ease-in-out;
	cursor: pointer;

	@media ${(props) => props.theme._mq.MOBILE_LARGE} {
		width: 350px;
		font-size: 0.9rem;
	}

	@media ${(props) => props.theme._mq.TABLET} {
		font-size: 1rem;
	}

	&:hover {
		color: ${(props) => props.hoverColor ?? '#ffffff'};
		background-color: ${(props) => props.hoverBgColor ?? '#333333'};
	}
`;

export default StyledButtonLink;
