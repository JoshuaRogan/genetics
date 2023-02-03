import { ApplicationContext, ApplicationContextProvider } from '../context/application';
import ApplicationGen from '../components/ApplicationGen';
import React from 'react';

function IndividualSimulatorPage() {
	return (
		<ApplicationContextProvider>
			<ApplicationGen />
		</ApplicationContextProvider>
	);
}

export default IndividualSimulatorPage;
