<?php 
error_reporting(-1);
ini_set('display_errors', 'On');

class variable{

	public static function generate_html($variable_name, $variable_id, $helper_text){

			$slider_id = $variable_id . "-slider";



			echo <<<HTML

			<div class="variable row">
					<div class="col-sm-3">
						<label>$variable_name: <a href="#"><sup>?</sup></a></label>
						<p class="help-block hidden">$helper_text</p>
					</div>

					<div class="col-sm-6">
						<div id="$slider_id" class="slider"></div>
					</div>

					<div class="col-sm-3 ">
						<input type="text" class="form-control" id="$variable_id" name="$variable_id" placeholder="0">
					</div>
				</div>

HTML;
			
		}

}


?>
<div id="graph_wrapper" class="row"> 
	<div class="container"> 
		<h1> Genetic Graphing</h1>
		<p> Pug readymade master cleanse trust fund, hoodie banh mi single-origin coffee tote bag pickled fingerstache try-hard XOXO letterpress American Apparel scenester.</p>


		<div id="graph_container"> 
			<?php if(isset($_GET['chart']) && $_GET['chart'] == 'chartjs'):?> 
			<canvas id="graph-chartjs"></canvas> 
			<?php endif; ?>

			<?php if(isset($_GET['chart']) && $_GET['chart'] == 'canvas'):?> 
			<div id="graph-canvas"></div> 
			<?php endif; ?>

			<?php if(isset($_GET['chart']) && $_GET['chart'] == 'basic'):?> 
			<canvas id="graph-basic"></canvas> 
			<?php endif; ?>

			<?php if(!isset($_GET['chart'])):?> 
			<div id="graph-canvas"></div>  
			<?php endif; ?>
		</div>
	</div>

</div>

<div id="variables" class="container"> 
	
	<form class="row" id="variables-form"> 
		<h2> Variables Form <a href="#" id="all-help">[Show Help]</a> <a href="#"><i class="fa fa-print"></i></a> <a href="#"><i class="fa fa-floppy-o"></i></a><!-- <span class="pull-right"><a href="#"><i class="fa fa-print"></i></a> <a href="#"><i class="fa fa-floppy-o"></i></a></span> --></h2>
		<!-- Need to change font sizes on smaller displays  -->

		<div id="buttons" class="row"> 
			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button" id="submit"><i class="fa fa-line-chart"></i> Generate Graph</a> 
			</div>
<!-- 			<div class="col-sm-3">
				<a class="btn btn-primary btn-lg" role="button"><i class="fa fa-floppy-o"></i> Save Graph</a> 
			</div>
			<div class="col-sm-3">
				<a class="btn btn-primary btn-lg" role="button"><i class="fa fa-print"></i> Print Graph</a> 
			</div> -->
			<div class="col-sm-6">
				<a class="btn btn-primary btn-lg" role="button"><i class="fa fa-refresh"></i> Add Line</a> 
			</div>
		</div>


		<div> 
			<div id="main-variables" class="variable-section"> 
			<h3> Main Variables</h3>
				<?php 
					variable::generate_html("Population Size", "population-size", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
					variable::generate_html("Generations", "generations", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
					variable::generate_html("Starting Allele Frequency", "starting-allele-frequency", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
				?>

			</div>

			<div id="optional-variables" >
				<div id="selection-variables" class="variable-section"> 
					<h3> Selection Variables</h3>
				<?php 
					variable::generate_html("Fitness Coefficient (wAA)", "fitness-coefficient-wAA", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
					variable::generate_html("Fitness Coefficient (wAa)", "fitness-coefficient-wAa", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
					variable::generate_html("Fitness Coefficient (waa)", "fitness-coefficient-waa", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
					
					variable::generate_html("Selection Coefficient", "selection-coefficient", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
					variable::generate_html("Dominance Coefficient", "dominance-coefficient", "Godard distillery VHS put a bird on it keffiyeh. Meditation selvage fashion axe, fingerstache lo-fi Bushwick next level PBR flannel retro cliche.");
				

				?>
				</div>

				<div id="mutation-variables" class="variable-section"> 
					<h3> Mutation Variables</h3>
				<?php 
					variable::generate_html("Forward Mutation (mu)", "mutation-rate-mu", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
					variable::generate_html("Reverse Mutation (nu)", "mutation-rate-nu", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");

				?>
				</div>				

				<div id="migration-variables" class="variable-section"> 
					<h3> Migration Variables</h3>
				<?php 
					variable::generate_html("Migration Rate", "migration-rate", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
					variable::generate_html("Migrant Allele Frequency", "migrant-allele-frequency", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");
				
				?>
				</div>


				<div id="inbreeding-variables" class="variable-section"> 
					<h3> Inbreeding Variables</h3>
				<?php 
					variable::generate_html("Inbreeding Coefficient", "inbreeding-coefficient", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");				
				?>
				</div>


				<div id="assortative-mating" class="variable-section"> 
					<h3> Assortative Mating</h3>
				<?php 
					variable::generate_html("Positive Assortative Mating Frequency", "positive-assortative-mating", "Church-key art party umami, meggings squid bitters gastropub synth meh freegan narwhal you probably haven't heard of them single-origin coffee yr.");				
				?>
				</div>




			</div> <!-- End Optional Variables -->
		</div> 

		<div id="options" class="row"> 

			<div class="col-lg-6"> 
				<h3>Graph Options</h3>

				<label class="checkbox-inline">
					<input type="checkbox" value="allow-multiple-lines" checked> Allow Multiple Lines
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="allow-zoom"> Allow Zoom
				</label>

				<label class="checkbox-inline">
					<input type="checkbox" value="high-contrast"> High Contrast
				</label>

				

			</div>

			<div class="col-lg-6">
				<h3> Computation Type </h3>

				<div class="radio-inline">
					<label>
						<input type="radio" name="computation-type" value="server" checked>
						Compute with Server 
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" name="computation-type" value="client">
						Compute with Client
					</label>
				</div>


			</div>






		</div>

		




	</form>


	<div id="results_panel"> 
		<h3> Debugging Results </h3>
		<pre id="results"> 


		</pre>

	</div>

</div>