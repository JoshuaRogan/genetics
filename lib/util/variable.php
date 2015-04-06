<?php 

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