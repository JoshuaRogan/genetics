@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Welcome')
@section('pageclass', 'page-welcome')

@section('styles')
	@parent
@stop

@section('lazyscripts')
	@parent
	<script src='/js/popGen/popGen.htmlutil.js'></script>
	
@stop

@section('content')
	<div class="welcome row">
		<div class="container">
			<h1>Genetic Simulator Suite</h1>
			<p>The Department of Human Genetics at the University of Pittsburgh's Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.</p>
			<p><a class="btn btn-primary btn-lg" href="http://www.publichealth.pitt.edu/human-genetics" target="_blank" role="button">Learn more</a></p>
		</div>
	</div>

	<div class="container"> 

		

		<div class="graphs text-center row"> 
			<div class="col-sm-6"> 
				<div class="logo"><i class="fa fa-connectdevelop"></i></div>
				<h3> Allele Simulator </h3>
				<p> Fixie typewriter Pinterest, twee bitters blog American Apparel health goth tousled kitsch keytar. Sriracha fixie YOLO, trust fund Helvetica direct trade cred hoodie chambray mumblecore Etsy skateboard listicle umami. </p>
			</div>

			<div class="col-sm-6">
				<div class="logo"><i class="fa fa-connectdevelop"></i></div>
				<h3> Genotype Simulator </h3>
				<p> Portland Wes Anderson freegan paleo synth put a bird on it McSweeney's fashion axe High Life tofu church-key tattooed artisan. Gluten-free before they sold out wayfarers. </p>
			</div>
		</div>
	</div>
@stop