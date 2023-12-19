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
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopGenVar } from '../../redux/reducers/rootSlice';
import { PopGenVariable, StoreState } from '../../types';
import { a11yFocus, a11yThumbFocus } from '../../utils/a11y';

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

	// Changes the local state when the slider is changed,
	// but doesn't update the Redux store until the slider is released.
	const onSliderChanged = (value) => {
		setValue(value);
	};

	// Updates the Redux store only when the slider is released.
	// This is to prevent the Redux store from being updated on every slider change
	const onSliderEndChanged = (value) => {
		dispatch(setPopGenVar({ varName: variable, value: Number(value) }));
	};

	const calculateRightMarkMargin = useCallback(() => {
		const maxStrLength = max.toString().length;
		const margin = maxStrLength * 2 * -1;
		return margin;
	}, [max]);

	return (
		<>
			<NumberInput
				aria-label={`${sliderName} factor value input`}
				maxW="120px"
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={onSliderChanged}
				onBlur={() => onSliderEndChanged(value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onSliderEndChanged(value);
					}
				}}
				isDisabled={!isActive || isInfinite}
				sx={{
					'& input': {
						borderColor: useColorModeValue('black', 'gray.300'),
					},
					'&:hover': {
						'& input:not(:focus)': {
							borderColor: useColorModeValue('purple.500', 'purple.500'),
						},
					},
				}}
				focusBorderColor="purple.500"
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Slider
				name={sliderName}
				flex="1"
				mb={{ base: 2, md: 0 }}
				aria-label={`${sliderName} factor value slider`}
				defaultValue={defaultValue || min}
				min={min}
				max={max}
				step={step}
				focusThumbOnChange={false}
				value={value}
				onChange={onSliderChanged}
				onChangeEnd={onSliderEndChanged}
				isDisabled={!isActive || isInfinite}
				_focus={a11yFocus}
			>
				<SliderMark
					mt={2}
					ml="0"
					fontSize="sm"
					fontWeight={600}
					value={min}
					color={useColorModeValue('black', 'whitesmoke')}
				>
					{min}
				</SliderMark>
				<SliderMark
					mt={2}
					ml={{ base: '-10', md: calculateRightMarkMargin() }}
					fontSize="sm"
					fontWeight={600}
					value={max}
					color={useColorModeValue('black', 'whitesmoke')}
				>
					{max}
				</SliderMark>
				<SliderTrack bg="sliderTrack">
					<SliderFilledTrack bg="sliderFilledTrack" />
				</SliderTrack>
				<SliderThumb boxSize={6} bg="#3585D0" _focus={a11yThumbFocus}>
					{/* <Box color="tomato" /> */}
				</SliderThumb>
			</Slider>
		</>
	);
}

export default SliderInput;
