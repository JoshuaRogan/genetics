import {
	Box,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const labelStyles = {
	mt: '4',
	ml: '-2.5px',
	fontSize: 'sm',
};

interface SliderInputProps {
	name: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	defaultValue?: number;
	onChange: (varName: string, value: number) => void;
	isActive?: boolean;
}

function SliderInput({ name, label, defaultValue, min, max, step = 1, onChange, isActive = true }: SliderInputProps) {
	const [value, setValue] = useState(defaultValue || min);
	const handleChange = (value) => {
		setValue(value);
		onChange(name, value);
	};

	return (
		<>
			<Slider
				name={name}
				flex="1"
				aria-label={label}
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				focusThumbOnChange={false}
				value={value}
				onChange={handleChange}
				isDisabled={!isActive}
			>
				<SliderMark value={min} {...labelStyles}>
					{min}
				</SliderMark>
				<SliderMark value={max} {...labelStyles}>
					{max}
				</SliderMark>
				<SliderTrack bg="sliderTrack">
					<SliderFilledTrack bg="sliderFilledTrack" />
				</SliderTrack>
				<SliderThumb boxSize={6}>{/* <Box color="tomato" as={} /> */}</SliderThumb>
			</Slider>
			<NumberInput
				maxW="100px"
				mr="2rem"
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				value={value}
				onChange={handleChange}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</>
	);
}

export default SliderInput;
