import { ApplicationContextProvider } from '../context/application';
import ApplicationGen from '../components/ApplicationGen';




function HomePage() {
	return (
		<ApplicationContextProvider>
			<ApplicationGen />
		</ApplicationContextProvider>
	);
}

export default HomePage;
