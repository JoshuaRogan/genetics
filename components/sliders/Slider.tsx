import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const trackH = '0.4em';
const thumbD = '1.5em';
const trackC = '#ccced0';

const track = css`
	box-sizing: border-box;
	border: none;
	height: 4px;
	background: ${(props) => props.theme.primaryColor};
	border-radius: 8px;
`;

const trackFill = css`
	${track};
	height: 6px;
	background-color: transparent;
	background-image: linear-gradient(${(props) => props.theme.primaryColor}, ${(props) => props.theme.primaryColor}),
		linear-gradient(${trackC}, ${trackC});
	background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
	background-position: left center, right center;
	background-repeat: no-repeat;
`;

const fill = css`
	height: ${trackH};
	background: ${(props) => props.theme.primaryColor};
	border-radius: 4px;
`;

const thumb = css`
	box-sizing: border-box;
	border: none;
	width: ${thumbD};
	height: ${thumbD};
	border-radius: 50%;
	background: white;
	box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
`;

const Input = styled.input`
	&,
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	&:focus {
		outline: none;
	}

	&:focus::-webkit-slider-thumb {
		outline: -webkit-focus-ring-color auto 5px;
	}

	&:focus::-moz-range-thumb {
		outline: -webkit-focus-ring-color auto 5px;
	}

	&:focus::-ms-thumb {
		outline: -webkit-focus-ring-color auto 5px;
	}

	--range: calc(var(--max) - var(--min));
	--ratio: calc((var(--val) - var(--min)) / var(--range));
	--sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));

	margin: 0;
	padding: 0;
	height: ${thumbD};
	background: transparent;
	font: 1em/1 arial, sans-serif;
	margin-right: ${(props) => props.theme.spaceBetweenPx};

	&::-webkit-slider-runnable-track {
		${trackFill};
	}

	&::-moz-range-track {
		${track};
	}

	&::-ms-track {
		${track};
	}

	&::-moz-range-progress {
		${fill};
	}

	&::-ms-fill-lower {
		${fill};
	}

	&::-webkit-slider-thumb {
		margin-top: calc(0.5 * (${trackH} - ${thumbD}));
		${thumb};
	}

	&::-moz-range-thumb {
		${thumb};
	}

	&::-ms-thumb {
		margin-top: 0;
		${thumb};
	}

	&::-ms-tooltip {
		display: none;
	}

	&::-moz-focus-outer {
		border: 0;
	}
`;

const Wrapper = styled.div`
	display: flex;
`;

const StyledDirectInput = styled.input`
	border: none;
	font-size: 26px;
	box-shadow: none;
	margin-top: 0;
	padding-top: 0;
	text-align: center;
	height: 100%;
`;

export default function Slider({
	name,
	label,
	start = 50,
	min = 0,
	max = 100,
	step = 1,
	required = false,
	onChange = (name, number) => {},
	formatter = (num) => num,
	isDecimal = false,
}) {
	const [value, setValue] = React.useState(start);

	const onChangeFunc = (e) => {
		setValue(e.target.value);
		onChange(name, e.target.value);
	};

	const commonInputProps = {
		onChange: onChangeFunc,
		min: min,
		max: max,
		value: value,
		step: step,
		'aria-valuemin': min,
		'aria-valuemax': max,
		'aria-valuenow': value,
		'aria-required': required,
		'aria-label': label,
	};

	return (
		<Wrapper>
			<Input
				{...commonInputProps}
				id={`slider-${name}`}
				type="range"
				style={{
					width: '100%',
					'--min': min,
					'--max': max,
					'--val': value,
				}}
			/>
			<StyledDirectInput
				{...commonInputProps}
				id={`direct-input-${name}`}
				type="number"
				value={formatter(value)}
				inputmode={'numeric'}
				alt={'test'}
				inputMode={isDecimal ? 'decimal' : 'numeric'}
			/>
		</Wrapper>
	);
}
