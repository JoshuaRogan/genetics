import React from "react";
import styled from "styled-components";


function LegendSettings({ settings }) {
	return <div> Settings </div>
}


const LegendStyled = styled.div`
  background: ${(props) => (props.theme.disabledGray)};
  padding: 2px 10px;
`;

function Legend({ settings, results }) {
	return <div>
		<LegendSettings settings={settings} />
	</div>
}


export default function LegendContainer({ alleleResults, genoTypeResults, settings }) {
	const isGenoType = !genoTypeResults;
	const [indexOfActiveLegends, setIndexOfActiveLegends] = React.useState([]);

	const addActiveLegend = (indexToAdd : number) => {
		setIndexOfActiveLegends((currentActive) => {
			return [...currentActive, indexToAdd].sort();
		});
	};

	const removeActiveLegend = (graphNumberToRemove : number) => {
		setIndexOfActiveLegends((currentActive) => {
			currentActive.splice(graphNumberToRemove, 1);
			return currentActive;
		});
	};

	return <LegendStyled>
		<h3>{isGenoType ? 'Genotype Legend' : 'Allele Legend'} </h3>
		<Legend settings={settings[0]} results={alleleResults[0]} />
	</LegendStyled>

}
