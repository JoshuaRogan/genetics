<?php 
error_reporting(-1);
ini_set('display_errors', 'On');

class variable2{


	function __construct($variable_name, $variable_id, $helper_text, $range_slider = false, $symbol = false){

	}
}











class variable{

	public static function generate_simple_slider($variable_name, $symbol, $variable_id, $helper_text){

		$slider_id = $variable_id . "-slider";

		//Print out the HTML
		echo <<<HTML
			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
						
						<div class="help-block hidden">
							<div class="help-symbol-container">Symbol: <span class="help-symbol">$symbol</span> </div>
							<p>$helper_text</p>
						</div>

					</div>

					<div class="col-sm-6">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-3 value">
						<input type="text" class="form-control" id="$variable_id" name="$variable_id" placeholder="0">
					</div>
				</div>
HTML;
	}

	public static function generate_mutation_slider($variable_name, $symbol, $variable_id, $helper_text){
		
		$slider_id = $variable_id . "-slider";

		echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name:<a href="#"><sup><i class="fa fa-question"></i></sup></a></label>

						<div class="help-block hidden">
							<div class="help-symbol-container">Symbol: <span class="help-symbol">$symbol</span> </div>
							<p>$helper_text</p>
						</div>

					</div>

					<div class="col-sm-4">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-2 value">
						<input type="text" class="form-control" id="$variable_id" name="$variable_id" placeholder="0">
					</div>

					
					<div class="col-sm-3 scientific-notation-container"> 

						<div class="col-xs-6 scientific-notation">x10^</div>
						
						<div class="col-xs-6 form-group text-center scientific-form-group">
						  <select class="form-control mutation-exponent" id="{$variable_id}-exponent" name="{$variable_id}-exponent">
						    <option>-1</option>
						    <option>-2</option>
						    <option>-3</option>
						    <option>-4</option>
						    <option selected="selected">-5</option>
						    <option>-6</option>
						    <option>-7</option>
						    <option>-8</option>
						    <option>-9</option>
						    <option>-10</option>
						  </select>
						</div>
						
						
					</div>
			</div>

HTML;
	}

	//Generates the range slider for generation override 
	public static function generate_range_slider($variable_name, $symbol, $variable_id, $helper_text){
		$variable_id_lower = $variable_id . "-lower"; 
		$variable_id_upper = $variable_id . "-upper"; 
		$slider_id = $variable_id . "-slider";

		echo <<<HTML

		<div class="variable row range-slider">
				<div class="col-sm-3">
					<label>$variable_name: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
					<p class="help-block $hidden">
						Notation: $symbol <br/> 
						$helper_text
					</p>
				</div>

				<div class="col-sm-5">
					<div id="$slider_id" class="slider"></div>
				</div>

				<div class="col-sm-2 value">
					<input type="text" class="form-control" id="$variable_id_lower" name="$variable_id_lower" placeholder="0">
				</div>

				<div class="col-sm-2 value">
					<input type="text" class="form-control" id="$variable_id_upper" name="$variable_id_upper" placeholder="0">
				</div>
			</div>

HTML;
	}


	public static function generate_html($variable_name, $variable_id, $helper_text, $range_slider = false, $symbol = false){
			if(!$symbol) $symbol = "*"; 
			$slider_id = $variable_id . "-slider";

			//Special case for adding percision to the mutation variables by assuming x10^-3
			if($variable_id == 'mutation-rate-mu' || $variable_id == 'mutation-rate-nu'){
			echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name:<a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
						<p class="help-block hidden">$helper_text</p>
					</div>

					<div class="col-sm-6">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-2 value">
						<input type="text" class="form-control" id="$variable_id" name="$variable_id" placeholder="0">
					</div>

					<div class="col-sm-1 scientific-notation-container"> 
						<span class="scientific-notation">x10<sup>-3</sup></span>
					</div> 
				</div>

HTML;
			
			}

			//Base case
			else if(!$range_slider){
				if($variable_id != "population-size") $hidden = "hidden";
				else $hidden = ""; 

			echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name:  $symbol <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
						<p class="help-block $hidden">$helper_text</p>
					</div>

					<div class="col-sm-6">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-3 value">
						<input type="text" class="form-control" id="$variable_id" name="$variable_id" placeholder="0">
					</div>
				</div>

HTML;
			
		}
		else{
			$variable_id_lower = $variable_id . "-lower"; 
			$variable_id_upper = $variable_id . "-upper"; 

			echo <<<HTML

			<div class="variable row range-slider">
					<div class="col-sm-3">
						<label>$variable_name: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
						<p class="help-block hidden">$helper_text</p>
					</div>

					<div class="col-sm-5">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-2 value">
						<input type="text" class="form-control" id="$variable_id_lower" name="$variable_id_lower" placeholder="0">
					</div>

					<div class="col-sm-2 value">
						<input type="text" class="form-control" id="$variable_id_upper" name="$variable_id_upper" placeholder="0">
					</div>
				</div>

HTML;
		}
		}

}




?>

<!-- Graph Completion Modal -->
<div class="modal fade" id="graph-computing-modal" tabindex="-1" role="dialog" aria-labelledby="graph-computing-title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="graph-computing-title">Graph Computing</h4>
      </div>
      <div id="graph-completion-precent" class="modal-body">
        <!-- 0% -->
        <i class="fa fa-spinner fa-spin"></i>
      </div>
      <div class="modal-footer">
<!--         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
 -->      </div>
    </div>
  </div>
</div>
<!-- Graph Completion Modal -->




<div id="graph_wrapper" class="row"> 
	<div class="container"> 
		<h1> Population Genetics Simulation</h1>

		<div id="graph_legend"> 

		</div>


		<div id="graph_container"> 
			<div id="graph-canvas"></div>  
		</div>
	</div>

</div>

<div id="variables" class="container"> 
	
	<form class="row" id="variables-form"> 
		<h2 id="variable-header"> Simulation Parameters <a href="#" id="all-sections">[Open All]</a> <a href="#" id="all-help">[Show Help]</a>
			<span class="pull-right"> 
				<a href="#" id="screenFriendly" data-toggle="tooltip" data-placement="top" title="Switch to screen friendly version (default)"><i class="fa fa-desktop"></i></a>
				<a href="#" id="printerFriendly" data-toggle="tooltip" data-placement="top" title="Switch to high contrast for printing and projecting"><i class="fa fa-sun-o"></i></a> 
				<a href="#" id="getRawData" data-toggle="tooltip" data-placement="top" title="View RAW data points"><i class="fa fa-file-text-o"></i></a>
			</span>
		</h2>
		<!-- Need to change font sizes on smaller displays  -->
		
		<div id="alerts-container"> 

		</div>

		<div id='multiple-legends-container' class='container'> 
			<!--JS FILLED-->
		</div> 

		<div id="buttons" class="row"> 

			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button" id="newGraph"><i class="fa fa-line-chart"></i> Generate Graph</a> 
			</div>

			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button" id="addLine"><i class="fa fa-plus"></i> Add Line</a> 
			</div>
		</div>


		<div id="vars-section">
 			<div id="main-variables" class="variable-section open"> 
				<h3><i class="fa fa-check-square-o"></i> Base Simulation Model <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a> </h3>
				<div class="error"></div>
				<div class="variables-section">
					<?php 
						variable::generate_simple_slider("Generations", "t", "generations", "This is the number of generations to be simulated.");
						variable::generate_simple_slider("Starting Allele Frequency", "p", "starting-allele-frequency", "This is the frequency of the allele of interest, A, at generation 0.");
					?>
				</div>

			</div>

			<div id="optional-variables">

				<div id="population-variable" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Finite Population<a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">
						<?php 
							variable::generate_simple_slider("Population Size", "N", "population-size", "<strong>Setting this overrides infinite population size!</strong> <br/><br/>This is the number of individuals, N, per generation in the simulation. Note, the number of chromosomes is 2N."); 
						?>
					</div>
				</div>

				<div id="selection-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Selection <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">

						<?php 
							variable::generate_simple_slider("Fitness Coefficient(w<sub>AA</sub>)", "w<sub>AA</sub>", "fitness-coefficient-wAA", "This describes the relative fitness of individuals with the AA genotype. Higher values
represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAa and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and
dominance coefficients, but not both");
							variable::generate_simple_slider("Fitness Coefficient(w<sub>Aa</sub>)", "w<sub>Aa</sub>", "fitness-coefficient-wAa", "This describes the relative fitness of individuals with the Aa genotype. Higher values
represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and
dominance coefficients, but not both.");
							variable::generate_simple_slider("Fitness Coefficient(w<sub>aa</sub>)", "w<sub>aa</sub>", "fitness-coefficient-waa", "This describes the relative fitness of individuals with the aa genotype. Higher values
represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and wAa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and
dominance coefficients, but not both.");

							variable::generate_simple_slider("Selection Coefficient", "s", "selection-coefficient", "This represents the degree of selection against the aa genotype group with respect to the
AA genotype group. A value of s = 1 indicates 100% selection against the aa genotype
group. A value of s = 0 indicates no selection against the aa genotype group. Note, selection can be defined in terms of the selection and dominance coefficients, or in terms
of the three fitness coefficients, but not both.");
							variable::generate_simple_slider("Dominance Coefficient", "h", "dominance-coefficient", "This represents the degree of dominance of the unfavored a allele in selection. The product of selection and dominance coefficients (i.e., s × h) represents the degree of selection against the Aa genotype group with respect to the AA genotype group. A value of h = 1 indicates that the Aa genotype group is equally unfavored as the aa genotype
group. A value of h = 0 indicates that the Aa genotype group is equally favored as the AA
genotype group. A value of h = 0.5 represents the additive model, where the selection
against the Aa genotype group is half that of the aa genotype group. Negative values of h (representing over‐dominance or “heterozygote advantage”) are not implemented. Instead use fitness coefficients to describe situations of over‐ or under‐dominance. Note,
selection can be defined in terms of selection and dominance coefficients, or in terms of
the three fitness coefficients, but not both.");

						?>
					</div>
				</div>


				<div id="mutation-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Mutation <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">
						<?php 
							variable::generate_mutation_slider("Forward Mutation", "&mu;", "mutation-rate-mu", "The rate at which allele A mutates to allele a per generation."); 
							variable::generate_mutation_slider("Reverse Mutation", "&nu;", "mutation-rate-nu", "The rate of which allele a mutates to allele A per generation."); 
						?>
					</div>
				</div>				

				<div id="migration-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Migration <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section hidden">
						<?php 
							variable::generate_simple_slider("Migration Rate", "m", "migration-rate", "The rate at which migrant alleles enter the population per generation.");
							variable::generate_simple_slider("Migrant Allele Frequency", "p<sub>M</sub>", "migrant-allele-frequency", "The frequency of the A allele in among all alleles entering the population.");
						?>
					</div>
				</div>


				<div id="inbreeding-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Inbreeding <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section hidden">
						<?php 
							variable::generate_simple_slider("Inbreeding Coefficient", "F", "inbreeding-coefficient", "This is the probability that both alleles in a randomly chosen individual in the population are identical‐by‐descent (IBD). A value of F = 0 indicates there is no inbreeding within the population. A value of 1 indicates that there is complete autozygosity such as found in inbred lines model organisms.");
						?>
					</div>
				</div>


				<div id="assortative-mating" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Assortative Mating <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">
						<?php 
							variable::generate_simple_slider("Positive Assortative Mating Frequency", "&alpha;", "positive-assortative-mating", "This is the excess fraction of positive assortative matings in the population where 1 ‐ α is the fraction of random matings.
A value of α = 1 indicates 100% positive assortative mating, and a value of α = 0 indicates total random mating.");
						?>
					</div>
				</div>

				<div id="population-control" class="variable-section">
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Population Bottleneck <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div> 
					<div class="variables-section hidden">
						<?php 

							// variable::generate_range_slider("Generations to Override", "g", )
							variable::generate_html("Generations to Override", "generation-to-override", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.", true);	
							variable::generate_simple_slider("Population Size", "N<sub>B</sub>", "new-population-size", "helper");

						?>
					</div>
				</div>




			</div> <!-- End Optional Variables -->
		</div> 

		<div id="options" class="row"> 

			<div class="col-lg-6"> 
				<!-- <h3>Graph Options</h3> -->

<!-- 				<label class="checkbox-inline">
					<input type="checkbox" value="true" checked> Allow Multiple Lines
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="true"> Allow Zoom
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="true"> High Contrast
				</label> -->

				

				

			</div>








		</div>


	</form>


<!-- 	<div id="results_panel"> 
		<h3> Debugging Results </h3>
		<pre id="results"> 


		</pre>

	</div> -->

</div>