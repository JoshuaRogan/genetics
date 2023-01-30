import styled from 'styled-components';

const StyledFooter = styled.footer`
	position: sticky;
	top: 100vh;
	background-color: red;
	height: 50px;
	margin-top: -50px;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<p>Footer</p>
		</StyledFooter>
	);
};

export default Footer;
