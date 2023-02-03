import React from 'react';

import { ApplicationContextProvider } from '../context/application';

import ReplicatedGen from '../components/simulators/ReplicatedGen';

function ReplicatedSimulatorPage() {
	return (
		<ApplicationContextProvider isBulkSimulatorProp={false}>
			<ReplicatedGen />
		</ApplicationContextProvider>
	);
}

export default ReplicatedSimulatorPage;
