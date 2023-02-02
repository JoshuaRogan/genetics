import { ApplicationContext, ApplicationContextProvider } from '../context/application';
import ApplicationGen from '../components/ApplicationGen';
import React from 'react';

function IndividualSimulatorPage() {
	const context = React.useContext(ApplicationContext);

	// This is interacting with an imperative API. Might need to remove the useEffect
	// React.useEffect(() => {
	// 	listenToWorker((event) => {
	// 		console.log(event);
	// 		context.addMoreResults(event); // Needs to be handled as it won't work if it's in the context
	// 	});
	// }, []);

	return (
		<ApplicationContextProvider>
			<ApplicationGen />
		</ApplicationContextProvider>
	);
}

export default IndividualSimulatorPage;
