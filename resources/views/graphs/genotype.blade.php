@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Genotype Graphing')
@section('description', 'The Department of Human Genetics at the University of Pittsburgh\'s Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.')
@section('pageclass', 'page-graph graph-genotype')

@section('styles')
	@parent
@stop

@section('lazyscripts')
	@parent

	
@stop

<?php 
/****USE GET VARIABLE TO PREPOPULATE THE FIELDS***/
$bookmarks = array(); 

//Put all of the get variablese in a hidden form to retrieve later with JS
foreach($_GET as $key => $value){
	$bookmarks[$key] = $value; 
}
?>


@section('content')
@include('graphs.macros.graphmodals')


<div id="graph_wrapper" class="row genotype-graph default-layout"> 
	<div class="container"> 
		<h1> Genotype Simulation</h1>
		<div id="graph_container"> 
			<div id="graph-canvas">
				<div class='row'>
					@include('material/preloader') <!-- Would like to change to percentage --> 
				</div>
			</div>    
		</div>
	</div>
</div>

<div id="variables" class="container"> 
	
	<form class="row" id="variables-form"> 
		<h2 id="variable-header"> Simulation Parameters 
		<a href="#" id="all-sections"><span data-hover="Open All">Open All</span></a> 
		<a href="#" id="all-help"><span data-hover="Show Help">Show Help</span></a>

			<span class="pull-right" id='main-togggles'> 
				<a href="#" id="screenFriendly" data-toggle="tooltip" data-placement="top" title="Switch to screen friendly version (default)"><i class="fa fa-desktop"></i></a>
				<a href="#" id="printerFriendly" data-toggle="tooltip" data-placement="top" title="Switch to high contrast for printing and projecting"><i class="fa fa-sun-o"></i></a> 
				<a href="#bookmark-link" id="getLink" data-tooltip="true" data-placement="top" title="Generate a bookmarked link for these variables"><i class="fa fa-link"></i></a>
				<a href="#" id="getRawData" data-toggle="tooltip" data-placement="top" title="View RAW data points"><i class="fa fa-file-text-o"></i></a>
			</span>
		</h2>
		<!-- Need to change font sizes on smaller displays  -->
		
		<div id="alerts-container"> 
			<!--JS FILLED-->
		</div>

		<div id="buttons" class="row"> 

			<div class="col-xs-12">
				<a class="btn btn-primary btn-lg" role="button" id="newGraph"><i class="fa fa-line-chart"></i> Generate Graph</a> 
			</div>

{{-- 			<div class="col-xs-6">
				<a class="btn btn-primary btn-lg" role="button" id="addLine"><i class="fa fa-plus"></i> Add Line</a> 
			</div> --}}
		</div>

		<div id='multiple-legends-container' class='container'> 
			<!--JS FILLED-->
		</div> 

		<div id="graph_stats" class='container hidden'> 
			<!--JS FILLED-->
			<div > 
				<h3> <i class="fa fa-bar-chart"></i> <strong>Batch Graph Stats</strong> </h3>
				<ul class='list-unstyled block-center'>
					<li class="col-xs-12 col-sm-6 col-md-6"><span class='legend-var'>Avg. Gens to 1 =</span><span class='legend-val' id="timeto1"></span> </li>
					<li class="col-xs-12 col-sm-6 col-md-6"><span class='legend-var'>Avg. Gens to 0 =</span><span class='legend-val' id="timeto0"></span> </li>
					<li class="col-xs-12 col-sm-6 col-md-6"><span class='legend-var'>Times Hit 1 =</span><span class='legend-val' id="timeshit1"></span> </li>
					<li class="col-xs-12 col-sm-6 col-md-6"><span class='legend-var'>Times Hit 0 =</span><span class='legend-val' id="timeshit0"></span> </li>
				</ul>
			</div>
		</div>



		<div id="vars-section">
 			<div id="main-variables" class="variable-section open"> 
				<h3><i class="fa fa-check-square-o fa-default"></i> Base Simulation Model <a href="#" class="variable-section-toggle pull-right active default"><i class='fa fa-chevron-down'></i></a> </h3>
				<div class="error"></div>
				<div class="variables-section">


					@include('graphs.macros.simpleslider', ['name' => 'Generations', 'symbol' => 't', 'id' => 'generations', 'helper' => 'This is the number of generations to be simulated.'])
					@include('graphs.macros.simpleslider', ['name' => 'Starting Allele Frequency', 'symbol' => 'p', 'id' => 'starting-allele-frequency', 'helper' => 'This is the frequency of the allele of interest, A, at generation 0.'])
				</div>
			</div>

			<div id="optional-variables">

				<div id="population-variable" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Finite Population<a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section">
						@include('graphs.macros.simpleslider', ['name' => 'Population Size', 'symbol' => 'N', 'id' => 'population-size', 'helper' => 'This is the number of individuals, N, per generation in the simulation. Note, the number of chromosomes is 2N. If this parameter is not enabled, the simulation will model the theoretical infinitely sized population.'])
					</div>
				</div>

{{-- 				<div id="batch-tool" class="variable-section">
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Batch Runs <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div> 
					<div class="variables-section hidden">
						@include('graphs.macros.simpleslider', ['name' => 'Number of Runs', 'symbol' => 'Runs', 'id' => 'batch-tool-runs', 'helper' => 'This variable determines the amount of lines that will be generated.'])
					</div>
				</div> --}}

				<div id="selection-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Selection <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section">
						@include('graphs.macros.simpleslider', ['name' => 'Fitness Coefficient(w<sub>AA</sub>)', 'symbol' => 'w<sub>AA</sub>', 'id' => 'fitness-coefficient-wAA', 'helper' => 'This describes the relative fitness of individuals with the AA genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAa and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.'])
						@include('graphs.macros.simpleslider', ['name' => 'Fitness Coefficient(w<sub>Aa</sub>)', 'symbol' => 'w<sub>Aa</sub>', 'id' => 'fitness-coefficient-wAa', 'helper' => 'This describes the relative fitness of individuals with the Aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.'])
						@include('graphs.macros.simpleslider', ['name' => 'Fitness Coefficient(w<sub>aa</sub>)', 'symbol' => 'w<sub>aa</sub>', 'id' => 'fitness-coefficient-waa', 'helper' => 'This describes the relative fitness of individuals with the aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and wAa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.'])
						@include('graphs.macros.simpleslider', ['name' => 'Selection Coefficient', 'symbol' => 's', 'id' => 'selection-coefficient', 'helper' => 'This represents the degree of selection against the aa genotype group with respect to the AA genotype group. A value of s = 1 indicates 100% selection against the aa genotype group. A value of s = 0 indicates no selection against the aa genotype group. Note, selection can be defined in terms of the selection and dominance coefficients, or in terms of the three fitness coefficients, but not both.'])
						@include('graphs.macros.simpleslider', ['name' => 'Dominance Coefficient', 'symbol' => 'h', 'id' => 'dominance-coefficient', 'helper' => 'This represents the degree of dominance of the unfavored a allele in selection. The product of selection and dominance coefficients (i.e., s × h) represents the degree of selection against the Aa genotype group with respect to the AA genotype group. A value of h = 1 indicates that the Aa genotype group is equally unfavored as the aa genotype group. A value of h = 0 indicates that the Aa genotype group is equally favored as the AA genotype group. A value of h = 0.5 represents the additive model, where the selection against the Aa genotype group is half that of the aa genotype group. Negative values of h (representing over‐dominance or “heterozygote advantage”) are not implemented. Instead use fitness coefficients to describe situations of over‐ or under‐dominance. Note, selection can be defined in terms of selection and dominance coefficients, or in terms of the three fitness coefficients, but not both.'])	
					</div>
				</div>


				<div id="mutation-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Mutation <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section">
						@include('graphs.macros.mutationslider', ['name' => 'Forward Mutation', 'symbol' => '&mu;', 'id' => 'mutation-rate-mu', 'helper' => 'The rate at which allele A mutates to allele a per generation.'])
						@include('graphs.macros.mutationslider', ['name' => 'Reverse Mutation', 'symbol' => '&nu;', 'id' => 'mutation-rate-nu', 'helper' => 'The rate at which allele a mutates to allele A per generation.'])
					</div>
				</div>				

				<div id="migration-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Migration <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section">
						@include('graphs.macros.simpleslider', ['name' => 'Migration Rate', 'symbol' => 'm', 'id' => 'migration-rate', 'helper' => 'The rate at which migrant alleles enter the population per generation.'])
						@include('graphs.macros.simpleslider', ['name' => 'Migrant Allele Frequency', 'symbol' => 'p<sub>M</sub>', 'id' => 'migrant-allele-frequency', 'helper' => 'The frequency of the A allele among all migrant alleles entering the population.'])
					</div>
				</div>


				<div id="inbreeding-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Inbreeding <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section">
						@include('graphs.macros.simpleslider', ['name' => 'Inbreeding Coefficient', 'symbol' => 'F', 'id' => 'inbreeding-coefficient', 'helper' => 'This is the probability that both alleles in a randomly chosen individual in the population are identical‐by‐descent (IBD). A value of F = 0 indicates there is no inbreeding within the population. A value of 1 indicates that there is complete autozygosity such as found in inbred lines of model organisms.'])
					</div>
				</div>


				<div id="assortative-mating" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Assortative Mating <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section">
						@include('graphs.macros.simpleslider', ['name' => 'Positive Assortative Mating Frequency', 'symbol' => '&alpha;', 'id' => 'positive-assortative-mating', 'helper' => 'This is the excess fraction of positive assortative matings in the population where 1 ‐ α is the fraction of random matings. A value of α = 1 indicates 100% positive assortative mating, and a value of α = 0 indicates total random mating.'])
					</div>
				</div>

				<div id="population-control" class="variable-section">
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Population Bottleneck <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div> 
					<div class="variables-section">
						@include('graphs.macros.rangeslider', ['name' => 'Generations to Override', 'id' => 'generation-to-override', 'helper' => 'These parameters indicate the start and end generations, respectively, of the population bottleneck event.'])
						@include('graphs.macros.simpleslider', ['name' => 'Population Size', 'symbol' => 'N<sub>B</sub>', 'id' => 'new-population-size', 'helper' => 'This is the number of individuals in the population during the bottleneck event. Note that the number of chromosomes simulated is 2NB'])
					</div>
				</div>

				




				
			</div> <!-- End Optional Variables -->
		</div> <!-- End Variables Section -->
	</form>


	<!-- Hidden form to update values with js later on when everything is loaded --> 
	<form action="POST" class="hidden" id="bookmarking-values"> 
		<?php 
			foreach($bookmarks as $varname => $value){
				echo "<input type='hidden' name='bookmarking-$varname' value='$value'>";
			}
		?>
	</form>
</div>
@stop