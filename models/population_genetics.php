<?php 

	class generations{
		//Required variables
		public $num_generations; 			//The total number of generations to perform 
		public $current_generation_num; 	//The current generation we are on 

		public $population_size; 			//The size of all of the populations
		public $starting_freq; 				//The initial frequency of the first population
		public $current_freq; 				//The frequency current in the population

		public $generations = array(); 		//An array of populations 
		public $frequencies = array(); 		//An array of the frequencies after the random sampling

		//Optional variables 
		public $mutation;					//Boolean if mutation has been set
		public $fr_mutation_rate; 			//A->a
		public $rev_mutation_rate; 			//a->A

		public $json_output;				//The JSON value that will be sent back



		
		/**
		 *
		 *
		 */
		public function __construct($num_generations, $population_size, $starting_freq){ 
			$starting_freq = floatval($starting_freq); 
			$this->num_generations = $num_generations;
			$this->current_generation_num = 0; 
			$this->population_size = $population_size;
			$this->starting_freq = $starting_freq;
			$this->current_freq = $starting_freq; //Intially they are the same 
			$this->frequencies[] = $this->current_freq; 
			$this->json_output->html = "";	//HTML that will be used for debugging purposes


		}

		//Mutation is going to be used 
		public function mutation($fr_mutation_rate, $rev_mutation_rate){ 
			$this->mutation = true; 
			$this->fr_mutation_rate = $fr_mutation_rate;
			$this->rev_mutation_rate = $rev_mutation_rate;
		}

		/**
		 *	Build random samples for each one using the previous starting freq
		 *
		 */
		public function build_random_samples(){ 
			$this->json_output->html .= "<strong>Generations Data </strong>\n";
			$this->json_output->html .= "Total Number of generations: <strong> $this->num_generations </strong> \n"; 
			$this->json_output->html .= "Population Size: <strong> $this->population_size </strong> \n"; 
			$this->json_output->html .= "Starting Frequency: <strong> $this->starting_freq </strong> \n"; 
			if($this->mutation === true) {
				$this->json_output->html .= "Forward Mutation Rate: <strong>$this->fr_mutation_rate</strong>\n";
				$this->json_output->html .= "Reverse Mutation Rate: <strong>$this->rev_mutation_rate</strong>\n";
			}

			//Create all of the generations  
			for($i=0; $i < $this->num_generations; $i++){
				$this->json_output->html .= "\n------------------------------------------------------POPULATION DATA------------------------------------------------------\n";

				$this->current_generation_num = $i; 

				//If we are considering mutation modification update it now 
				if($this->mutation === true) {
					
					$this->json_output->html .= "Frequency Before Mutation: $this->current_freq \n";
					$this->mutation_modification();
					$this->json_output->html .= "Frequency After Mutation: $this->current_freq \n";
				}

				
				$population = new population($this->population_size, $this->current_freq, $i, 0, 1);
				$this->json_output->html .= $population->build_random_sample(true);
				$this->current_freq = $population->current_freq;
				$this->frequencies[] = $this->current_freq;
				$this->json_output->html .= $population->debug_print_population();


				unset($population); 
				$this->json_output->html .= "------------------------------------------------------POPULATION DATA------------------------------------------------------\n\n";
			}

			$this->json_output->html .= "Current/Final Frequency: <strong> $this->current_freq </strong> \n";

			$this->json_output->graph_data = $this->frequencies;
			echo json_encode($this->json_output);

		}


		/********************PRIVATE FUNCTIONS********************/



		/**
		 *	Modify the allele frequency based on the mutation rates 
		 *
		 */
		private function mutation_modification(){
			$partial_1 = ($this->rev_mutation_rate/($this->fr_mutation_rate + $this->rev_mutation_rate));	//Partial part of the equation to make it readable

			$this->current_freq = $partial_1 + ($this->starting_freq - $partial_1) * 
				pow((1 - $this->fr_mutation_rate - $this->rev_mutation_rate),$this->current_generation_num+1);
		}


	}
	/**
	 *
	 *
	 */
	class population{
		const PRECISION = 10000000;				//How precise our decimals are
		public $value, $value_implicit;			//The values we are using to represent our alleles

		public $population_size; 				//The size of this popuatlion after being built
		public $current_size; 					//The current size of this population 
		public $starting_freq; 					//The starting frequency of the value we are tracking 
		public $current_freq; 					//The frequency of the value we are tracking now 
		public $generation; 					//The generation number of this population

		public function __construct($population_size, $starting_freq, $generation = -1, $value = "A ", $value_implicit = "a "){
			$this->population_size = $population_size; 
			$this->starting_freq = $starting_freq; 
			$this->current_freq = $starting_freq; 
			$this->value = $value;
			$this->value_implicit = $value_implicit;
			$this->current_size = 0; 
			$this->generation = $generation; 


		}

		/**
		 *
		 *
		 */
		public function build_random_sample($print_values = false){ 
			$counter = 0;
			$string = "";
			for($i=0; $i<$this->population_size; $i++){
				$rand_percent = (rand(1, self::PRECISION) / self::PRECISION);
				

				if($rand_percent <= $this->starting_freq){ 
					$counter++;
					if($print_values) $string .= $this->value;
				}	
				else{

					if($print_values) $string .= $this->value_implicit;
				}	

				$this->current_size++;
			}

			$this->current_freq = $counter / $this->current_size;	//Recompute the frequency 

			return $string; 
		}

		public function debug_print_population(){ 
			$string = "";
			if($this->generation != -1) $string .= "\nGeneration Number: <strong> $this->generation </strong> \n";
			$string .=  "The size of this population is: <strong>" . $this->current_size . "</strong> \n";
			$string .=  "The starting frequency for this population was: <strong>" . $this->starting_freq . "</strong> \n";
			$string .=  "The frequency for this population is currently: <strong>" . $this->current_freq . "</strong> \n";

			return $string; 
		}



	}


?>