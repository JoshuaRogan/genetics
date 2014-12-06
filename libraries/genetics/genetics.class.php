<?php 

class genetic_graph{



	/**
	 *
	 *	Return: 
	 */
	public static function run_generations($num_generations, $population_size, $probabilities){
		$generations = array(); //Multi dimensional array to hold the arrays for each generation 

		for($i=0; $i<$num_generations; $i++){
			$generations[$i] = random_generation($population_size, $probabilities)

			//Update probabilities based on the new generation
			$probabilities = update_probabilities($generations[$i]);
		}
	}


	/**
	 *	Arguments: Size of the generation, Probabilities is an array of all of the starting probabilities
	 *		of each gene (also the number of genes is the size of the array)
	 *
	 *	Return: An array of length $population_size for one generation using the probabilities 
	 */
	private static function random_generation($population_size, $probabilities){
		//Scale the probabilities 
		$probabilities = convert_scale($probabilities);

		//This array holds the actual generations
		$generation = array(); 

		for($i=0; $i<$population_size; $i++){
			$random_number = rand(0,1); //Generate a random number between 0 - 1

			foreach($probabilities as $index => $probability){
				if($random_number < $probability){
					$generation[$i] = $index;
					break;
				}
			}
		}

		return $generation;
	}


/******************************************************HELPER FUNCTIONS********************************************************/
	/**
	 *	Arguments: An array of a generation
	 *
	 *	Return: An array of length the number of unique probabilities with each value being the new probability 
	 */
	private static function update_probabilities($generation){
		
	}

	/**
	 *	Arguments: An array of probabilities ex: [.50, .20, .30] that add up to 1.0
	 *
	 *	Return: An array with the values on a scaled base to use with the random number generation. 
	 *		returned value example: [.50, .70, 1.0]
	 */
	private static function convert_scale($probabilities){
		$current_prob = 0;
		for($i=0; $i<count($probabilities); $i++){
			$current_prob += $probabilities[$i];
			$probabilities[$i] = $current_prob;
		}

		return $probabilities;
	}


}
/******************************************************HELPER FUNCTIONS********************************************************/
?>