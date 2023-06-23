/* eslint-disable jsx-a11y/aria-proptypes */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderMark,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSlider,
	useColorModeValue,
	Box,
	Stack,
} from '@chakra-ui/react';
import { setPopGenVar } from '../../redux/reducers/rootSlice';
import { PopGenVariable, StoreState, VALID_VARIABLES } from '../../types';
import { getPopGenVariableByName } from '../../data/popGenVariables';

const maxLabelStyles = {
	mt: '5',
	ml: { base: '-10', md: '-5' },
	fontSize: 'sm',
};

interface SliderInputProps {
	startVariable: PopGenVariable;
	endVariable: PopGenVariable;
	isActive?: boolean;
	isInfinite?: boolean;
}

function RangeSliderInput({ startVariable, endVariable, isActive = true }: SliderInputProps) {
	const { sliderName: startSliderName, variable: startVariableName } = startVariable;
	const { sliderName: endSliderName, variable: endVariableName } = endVariable;

	const dispatch = useDispatch();
	// const [values, setValues] = React.useState([0, 50]);
	const [values, setValues] = React.useState([
		useSelector((state: StoreState) => state.root.popGenVars[startVariableName]),
		useSelector((state: StoreState) => state.root.popGenVars[endVariableName]),
	]);
	const popVariable = useCallback(() => getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS), []);

	const min = 0;
	const max: number = useSelector((state: StoreState) => state.root.popGenVars[popVariable().variable]);
	const step = 1;

	useEffect(() => {
		// If the max value changes, update the slider values to reflect the new value
		const minValue = values[0] > max ? max : values[0];
		const maxValue = values[1] > max ? max : values[1];

		setValues([minValue, maxValue]);
		dispatch(setPopGenVar({ varName: startVariableName, value: minValue }));
		dispatch(setPopGenVar({ varName: endVariableName, value: maxValue }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [max]);

	const calculateRightMarkMargin = useCallback(() => {
		const maxStrLength = max.toString().length;
		const margin = maxStrLength * 2 * -1;
		return margin;
	}, [max]);

	// Changes the local state when the slider is changed,
	// but doesn't update the Redux store until the slider is released.
	const onSliderChanged = (values: number[]) => {
		setValues(values);
	};

	// Updates the Redux store only when the slider is released.
	// This is to prevent the Redux store from being updated on every slider change
	const onSliderEndChanged = (value: number[]) => {
		const minValue = value[0] || 0;
		const maxValue = value[1] || 0;

		dispatch(setPopGenVar({ varName: startVariableName, value: minValue }));
		dispatch(setPopGenVar({ varName: endVariableName, value: maxValue }));
	};

	// This is to prevent the Redux store from being updated on every number input change
	// which slows the UI significantly.
	const onSliderNumberInputChanged = (varName: string, values: number[]) => {
		const value = varName === startVariableName ? values[0] : values[1];
		const payload = setPopGenVar({ varName: varName, value: value });
		dispatch(payload);
	};

	return (
		<Box display="flex" flexDirection={{ base: 'column', md: 'row' }} width="100%" alignItems="center">
			<Stack
				display="flex"
				flexDirection={{ base: 'column', md: 'row' }}
				alignItems="center"
				spacing={{ base: '1rem', md: '0' }}
				mr="1.5rem"
			>
				<NumberInput
					aria-label={`Generations to Override Start`}
					maxW="120px"
					mr={{ base: 0, md: '1rem' }}
					defaultValue={min}
					min={min}
					max={values[1]}
					step={step}
					value={values[0]}
					onChange={(_, value) => onSliderChanged([value, values[1]])}
					onBlur={() => onSliderNumberInputChanged(startVariableName, values)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onSliderNumberInputChanged(startVariableName, values);
						}
					}}
					isDisabled={!isActive}
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

				<NumberInput
					aria-label={`Generations to Override End`}
					maxW="120px"
					defaultValue={max}
					min={min}
					max={max}
					step={step}
					value={values[1]}
					onChange={(_, value) => onSliderChanged([values[0], value])}
					onBlur={() => onSliderNumberInputChanged(endVariableName, values)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onSliderNumberInputChanged(startVariableName, values);
						}
					}}
					isDisabled={!isActive}
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
			</Stack>
			<Slider flex="1">
				<RangeSlider
					name={startSliderName}
					aria-label={['Generations to Override Start', 'Generations to Override End']}
					width="100%"
					defaultValue={[0, 150]}
					min={min}
					max={max}
					step={step}
					value={values}
					onChange={onSliderChanged}
					onChangeEnd={onSliderEndChanged}
					isDisabled={!isActive}
				>
					<SliderMark value={min} mt={2} ml="0" fontSize="sm" color={useColorModeValue('black', 'whitesmoke')}>
						{min}
					</SliderMark>
					<SliderMark
						mt={2}
						ml={{ base: '-10', md: calculateRightMarkMargin() }}
						fontSize="sm"
						value={100}
						color={useColorModeValue('black', 'whitesmoke')}
					>
						{max}
					</SliderMark>
					<RangeSliderTrack bg="sliderTrack">
						<RangeSliderFilledTrack bg="sliderFilledTrack" />
					</RangeSliderTrack>
					<RangeSliderThumb index={0} boxSize={6} />
					<RangeSliderThumb index={1} boxSize={6} />
				</RangeSlider>
			</Slider>
		</Box>
	);
}

export default RangeSliderInput;
