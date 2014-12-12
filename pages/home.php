<?php 
error_reporting(-1);
ini_set('display_errors', 'On');

class variable{

	public static function generate_html($variable_name, $variable_id, $helper_text, $range_slider = false){

			$slider_id = $variable_id . "-slider";

			//Special case for adding percision to the mutation variables by assuming x10^-3
			if($variable_id == 'mutation-rate-mu' || $variable_id == 'mutation-rate-nu'){
			echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
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
			echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
						<p class="help-block hidden">$helper_text</p>
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
		<h1> Genetic Graphing</h1>
		<p> This is a population genetics simulator that allows students to explore the effects and interactions of several evolutionary forces.</p>
		<div id="graph_legend"> 

		</div>


		<div id="graph_container"> 
			<div id="graph-canvas"></div>  
		</div>
	</div>

</div>

<div id="variables" class="container"> 
	
	<form class="row" id="variables-form"> 
		<h2> Variables Form <a href="#" id="all-sections">[Open All]</a> <a href="#" id="all-help">[Show Help]</a> <a href="#"><i class="fa fa-print"></i></a> <a href="#"><i class="fa fa-floppy-o"></i></a><!-- <span class="pull-right"><a href="#"><i class="fa fa-print"></i></a> <a href="#"><i class="fa fa-floppy-o"></i></a></span> --></h2>
		<!-- Need to change font sizes on smaller displays  -->
		
		<div id="alerts-container"> 

		</div>

		<div id="buttons" class="row"> 

			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button" id="newGraph"><i class="fa fa-line-chart"></i> Generate Graph</a> 
			</div>
<!-- 			<div class="col-sm-3">
				<a class="btn btn-primary btn-lg" role="button"><i class="fa fa-floppy-o"></i> Save Graph</a> 
			</div>
			<div class="col-sm-3">
				<a class="btn btn-primary btn-lg" role="button"><i class="fa fa-print"></i> Print Graph</a> 
			</div> -->
			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button" id="addLine"><i class="fa fa-plus"></i> Add Line</a> 
			</div>
		</div>


		<div>
 			<div id="main-variables" class="variable-section open"> 
				<h3><i class="fa fa-check-square-o"></i> Main Variables <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
				<div class="error"></div>
				<div class="variables-section">
					<?php 
						variable::generate_html("Population Size", "population-size", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
						variable::generate_html("Generations", "generations", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
						variable::generate_html("Starting Allele Frequency", "starting-allele-frequency", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
					?>
				</div>

			</div>

			<div id="optional-variables">

				<div id="selection-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Selection Variables <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">

						<?php 
							variable::generate_html("Fitness Coefficient(wAA)", "fitness-coefficient-wAA", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
							variable::generate_html("Fitness Coefficient(wAa)", "fitness-coefficient-wAa", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
							variable::generate_html("Fitness Coefficient(waa)", "fitness-coefficient-waa", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
							
							variable::generate_html("Selection Coefficient", "selection-coefficient", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
							variable::generate_html("Dominance Coefficient", "dominance-coefficient", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
						?>
					</div>
				</div>


				<div id="mutation-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Mutation Variables <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">
						<?php 
							variable::generate_html("Forward Mutation (mu)", "mutation-rate-mu", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
							variable::generate_html("Reverse Mutation (nu)", "mutation-rate-nu", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
						?>
					</div>
				</div>				

				<div id="migration-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Migration Variables <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section hidden">
						<?php 
							variable::generate_html("Migration Rate", "migration-rate", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
							variable::generate_html("Migrant Allele Frequency", "migrant-allele-frequency", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
						?>
					</div>
				</div>


				<div id="inbreeding-variables" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Inbreeding Variables <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>

					<div class="variables-section hidden">
						<?php 
							variable::generate_html("Inbreeding Coefficient", "inbreeding-coefficient", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");				
						?>
					</div>
				</div>


				<div id="assortative-mating" class="variable-section"> 
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Assortative Mating <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div>
					<div class="variables-section hidden">
						<?php 
							variable::generate_html("Positive Assortative Mating Frequency", "positive-assortative-mating", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");				
						?>
					</div>
				</div>

				<div id="population-control" class="variable-section">
					<h3><a href="#"><i class="variable-activator fa fa-square-o"></i></a> Population Bottleneck <a href="#" class="variable-section-toggle pull-right"><i class='fa fa-chevron-down'></i></a></h3>
					<div class="error"></div> 
					<div class="variables-section hidden">
						<?php 
							variable::generate_html("Generations to Override", "generation-to-override", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.", true);	
							variable::generate_html("New Population Size", "new-population-size", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
						?>
					</div>
				</div>




			</div> <!-- End Optional Variables -->
		</div> 

		<div id="options" class="row"> 

			<div class="col-lg-6"> 
				<h3>Graph Options</h3>

<!-- 				<label class="checkbox-inline">
					<input type="checkbox" value="true" checked> Allow Multiple Lines
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="true"> Allow Zoom
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="true"> High Contrast
				</label> -->

				<label for='infinite_sample_size' class="checkbox-inline">
					<input id="infinite_sample_size" name="infinite_sample_size" type="checkbox" value="true"> Infinite Sample Size 
				</label>

				

			</div>








		</div>


	</form>


	<div id="results_panel"> 
		<h3> Debugging Results </h3>
		<pre id="results"> 


		</pre>

	</div>

</div>