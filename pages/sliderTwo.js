import IndexPage from '../components/wrapper';
import ReactSlider from 'react-slider';

function HomePage() {
	return (
		<IndexPage>
			<div>react-slider</div>
			<ReactSlider
				className="horizontal-slider"
				thumbClassName="example-thumb"
				trackClassName="example-track"
				renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
			/>
		</IndexPage>
	);
}

export default HomePage;
