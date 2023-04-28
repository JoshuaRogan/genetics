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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopGenVar } from '../../redux/reducers/rootSlice';
import { PopGenVariable, StoreState } from '../../types';

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
	popVariable: PopGenVariable;
	isActive?: boolean;
	isInfinite?: boolean;
}

function SliderInput({ popVariable, isActive = true, isInfinite = false }: SliderInputProps) {
	const { max, min, step, defaultValue, sliderName, variable } = popVariable;

	const dispatch = useDispatch();
	const sliderValue: number = useSelector((state: StoreState) => state.root.popGenVars[variable]);
	const [value, setValue] = React.useState(sliderValue || defaultValue || min);

	// If slider value changes in the Redux store, update the local state to keep it in sync.
	useEffect(() => {
		setValue(sliderValue);
	}, [sliderValue]);

	const onSliderChanged = (value) => {
		setValue(value);
	};

	const onSliderEndChanged = (value) => {
		dispatch(setPopGenVar({ varName: variable, value: Number(value) }));
	};

	return (
		<>
			<Slider
				name={sliderName}
				flex="1"
				mb={{ base: 2, md: 8 }}
				aria-label={sliderName}
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				focusThumbOnChange={false}
				value={value}
				onChange={onSliderChanged}
				onChangeEnd={onSliderEndChanged}
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
				aria-label={`${sliderName} number input`}
				maxW="120px"
				mr="2rem"
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={onSliderChanged}
				isDisabled={!isActive || isInfinite}
				sx={{
					'& input': {
						borderColor: useColorModeValue('gray.500', 'whitesmoke'),
					},
				}}
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
