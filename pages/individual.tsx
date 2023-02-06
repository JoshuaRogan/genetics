import React from 'react';
import { ApplicationContextProvider } from '../context/application';

import IndividualGen from '../components/simulators/IndividualGen';

function IndividualSimulatorPage() {
	return (
		<ApplicationContextProvider isBulkSimulatorProp={false}>
			<IndividualGen />
		</ApplicationContextProvider>
	);
}

export default IndividualSimulatorPage;
