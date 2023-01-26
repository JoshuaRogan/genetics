import { ApplicationContextProvider } from 'context/application';
import ApplicationGen from '../components/ApplicationGen';

function IndividualSimulator() {
	return (
		<ApplicationContextProvider>
			<ApplicationGen />
		</ApplicationContextProvider>
	);
}

export default IndividualSimulator;
