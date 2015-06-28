@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Allele Graphing')
@section('description', 'The Department of Human Genetics at the University of Pittsburgh\'s Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.')

@section('pageclass', 'page-faq')

@section('styles')
    @parent
@stop

@section('lazyscripts')
    @parent

    <script src='/js/popGen/popGen.htmlutil.js'></script>
    <script src='/js/faq.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/anchor-js/1.1.1/anchor.min.js'></script>
@stop

@section('content')
<div class="container">
	<div class="row"> 
		<div class="col-sm-3 faq-nav"> 
			{{-- <h2> Help Navigation </h2> --}}

			{{-- XS Only stacked navigation bar  --}}
			<nav class="visible-xs"> 
				<h2> Help Navigation </h2>
				<ul class="nav nav-pills nav-stacked">
					<li role="presentation" class="active"><a href="#help-faq">FAQ</a></li>
					<li role="presentation" class="active"><a href="#help-learn">Learn</a></li>
				</ul>
			</nav>
			{{-- /XS Only stacked navigation bar  --}}

			{{-- SM > Only scrollspy navigation --}}
			<nav class="bs-docs-sidebar hidden-xs">
				<ul id="sidebar" class="nav nav-stacked fixed">
					<li>
						<a href="#help-faq">FAQ</a>
						<ul class="nav nav-stacked">
							<li><a href="#accordion-0">Usability Questions</a></li>
							<li><a href="#accordion-1">Genetics Questions</a></li>
							<li><a href="#accordion-2">Technical Questions</a></li>
						</ul>
					</li>

					<li>
						<a href="#help-learn">Learn</a>
						<ul class="nav nav-stacked">
							<li><a href="#faq-learn-genetic-drift">Unit 2.1 Drift</a></li>
							<li><a href="#faq-learn-selection">Unit 2.2 Selection</a></li>
							<li><a href="#faq-learn-mutation">Unit 2.3 Mutation</a></li>
							<li><a href="#faq-learn-migration">Unit 2.4 Migration</a></li>
							<li><a href="#faq-learn-assortative-mating">Unit 2.5 Assortative Mating</a></li>
							<li><a href="#faq-learn-inbreeding">Unit 2.6 Inbreeding</a></li>
							<li><a href="#slide-all-slides">All Slides</a></li>
						</ul>
					</li>

					{{-- <li>
						<a href="#GroupB">Slides</a>
						<ul class="nav nav-stacked">
							<li><a href="#GroupBSub1">Sub-Group 1</a></li>
							<li><a href="#GroupBSub2">Sub-Group 2</a></li>
						</ul>
					</li>

					<li>
						<a href="#GroupC">Group C</a>
						<ul class="nav nav-stacked">
							<li><a href="#GroupCSub1">Sub-Group 1</a></li>
							<li><a href="#GroupCSub2">Sub-Group 2</a></li>
						</ul>
					</li> --}}
				</ul>
			</nav>
			{{-- /SM > Only scrollspy navigation --}}

		</div>

		<div class="col-sm-9"> 
			<h2> Population Generation Simulator Help</h2>

			<section id="help-faq"> 
				<h3>Simulator F.A.Q.</h3>
				@include('/help/faq')
			</section>

			<section id="help-learn"> 
				<h3> Learn </h3>
				@include('/help/slides')
			</section>

			

	    {{--     <section id="GroupA" class="group">
	            <h3>Group A</h3>
	            <div id="GroupASub1" class="subgroup">
	                <h4>Group A Sub 1</h4>
	            </div>
	            <div id="GroupASub2" class="subgroup">
	                <h4>Group A Sub 2</h4>
	            </div>
	        </section>
	        <section id="GroupB" class="group">
	            <h3>Group B</h3>
	            <div id="GroupBSub1" class="subgroup">
	                <h4>Group B Sub 1</h4>
	            </div>
	            <div id="GroupBSub2" class="subgroup">
	                <h4>Group B Sub 2</h4>
	            </div>
	        </section>
	        <section id="GroupC" class="group">
	            <h3>Group C</h3>
	            <div id="GroupCSub1" class="subgroup">
	                <h4>Group C Sub 1</h4>
	            </div>
	            <div id="GroupCSub2" class="subgroup">
	                <h4>Group C Sub 2</h4>
	            </div>
	        </section>    --}} 
	   
		</div>
	</div>
</div>
@stop