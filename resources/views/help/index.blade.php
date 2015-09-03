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
@stop

@section('content')
<div class="container">
	<div class="row"> 
		<div class="col-sm-3 faq-nav"> 
			{{-- XS Only stacked navigation bar  --}}
			<nav class="visible-xs" id="mobile-sidebar"> 
				<h2> Help Navigation </h2>
				<ul class="nav nav-pills nav-stacked">
					<li role='presentation'><a href="#help-learn">Learn</a></li>
					<li role='presentation'><a href="#help-faq">Simulator F.A.Q.</a></li>
				</ul>
			</nav>
			{{-- /XS Only stacked navigation bar  --}}

			{{-- SM > Only scrollspy navigation --}}
			<nav class="bs-docs-sidebar hidden-xs">
				<ul id="sidebar" class="nav nav-stacked fixed">
					<li>
						<a href="#help-learn">Learn</a>
						<ul class="nav nav-stacked">
							<li><a href="#faq-base-model">Base Model</a></li>
							<li><a href="#faq-hardy-weinberg">Hardy-Weinberg Equilibrium</a></li>
							<li><a href="#faq-forces">Forces</a></li>
						</ul>
					</li>

					<li>
						<a href="#help-faq">Simulator F.A.Q.</a>
						<ul class="nav nav-stacked">
							<li><a href="#faq-simulator-usability">Simulator Usability</a></li>
							<li><a href="#faq-simulator-technical">Technical Questions</a></li>
						</ul>
					</li>
				</ul>
			</nav>
			{{-- /SM > Only scrollspy navigation --}}

		</div>

		<div class="col-sm-9" id='faq-section'> 
			<h2> Population Generation Simulator Help</h2>

			<div class="filter-parent">
				<label for="hideseek-search"><i class="fa fa-search"></i></label>
				<div>
					<input placeholder="Search Help Documents" id="hideseek-search" class="form-control input-lg"  type="text">
				</div>
				<span id="num-results" class="font-blue">0</span>
				
			</div>
			
			<section id="search-results">
				<h3 class="no-anchor hidden"> Search Results for <span class='search-term font-blue'></span></h3>
				
				<ul class="list-unstyled question collapsible no-anchor" data-collapsible="accordion" id="accordian-search-results">

				</ul>

				<div class="alert-container"></div>
			</section>


			<section id="help-learn"> 
				<h3> Learn </h3>
				@include('help.sections.learn')
			</section>


			<section id="help-faq"> 
				<h3>Simulator F.A.Q.</h3>
				@include('help.sections.faq')
			</section>

			
		</div>

		<div class='col-xs-12 visible-xs'>
			<nav> 
				<h2> Help Navigation </h2>
				<ul class="nav nav-pills nav-stacked">
					<li role='presentation' class='active'><a href="#population-generation-simulator-help">Back to Top</a></li>
					<li role='presentation' class='active'><a href="#help-learn">Learn</a></li>
					<li role='presentation' class='active'><a href="#help-faq">Simulator F.A.Q.</a></li>
				</ul>
			</nav>
		</div>
	</div>
</div>
@stop