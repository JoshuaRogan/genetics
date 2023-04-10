import {
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
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const minLabelStyles = {
	mt: '2',
	ml: '0',
	fontSize: 'sm',
};

const maxLabelStyles = {
	mt: '2',
	ml: { base: '-10', md: '-10' },
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
	isInfinite?: boolean;
}

function SliderInput({
	name,
	label,
	defaultValue,
	min,
	max,
	step = 1,
	onChange,
	isActive = true,
	isInfinite = false,
}: SliderInputProps) {
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
				mb={{ base: 2, md: 8 }}
				aria-label={label}
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				focusThumbOnChange={false}
				value={value}
				onChange={handleChange}
				isDisabled={!isActive || isInfinite}
			>
				<SliderMark value={min} {...minLabelStyles} color={useColorModeValue('black', 'whitesmoke')}>
					{min}
				</SliderMark>
				<SliderMark value={max} {...maxLabelStyles} color={useColorModeValue('black', 'whitesmoke')}>
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
				step={step}
				value={value}
				onChange={handleChange}
				isDisabled={!isActive || isInfinite}
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
