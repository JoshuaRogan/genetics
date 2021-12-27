import IndexPage from '../components/wrapper';
import SliderOne from '../components/SliderOne';


function HomePage() {
  return <IndexPage>
    <div>Custom Slider</div>
    <SliderOne label={'Number of Simulations'} name={'number-of-simulations'} required />
  </IndexPage>
}

export default HomePage
