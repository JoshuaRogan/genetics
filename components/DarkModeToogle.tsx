import styled from 'styled-components';
import MoonIcon from '../public/images/ic_moon.png';
import SunIcon from '../public/images/ic_sun.png';
import Image from 'next/image';
import { useColorMode } from '@chakra-ui/react';

const FloatingButton = styled.button`
	z-index: 100;
	position: fixed;
	bottom: 45px;
	right: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: none;
	background-color: #333333;

	cursor: pointer;

	img {
		width: 20px;
		height: 20px;
	}
`;

const DarkModeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDarkTheme = colorMode === 'dark';

	const ariaLabel = isDarkTheme ? 'Toggle for light mode' : 'Toggle for dark mode';
	return (
		<FloatingButton title={ariaLabel} aria-label={ariaLabel} onClick={toggleColorMode}>
			<Image src={isDarkTheme ? SunIcon : MoonIcon} alt={ariaLabel} />
		</FloatingButton>
	);
};

export default DarkModeToggle;
