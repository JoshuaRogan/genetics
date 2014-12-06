<?php
if(isset($_POST['population-size'])){
	require_once("../models/population_genetics.php");
	ini_set('max_execution_time', 300); //300 seconds = 5 minutes
	ini_set('memory_limit ', '300M'); 


	// var_dump($_POST); 

	$population_size = intval(str_replace(',','',$_POST['population-size']));
	$num_generations = intval(str_replace(',','',$_POST['generations']));
	$starting_frequency = $_POST['starting-allele-frequency'];

	$generations = new generations($num_generations, $population_size, $starting_frequency);


	if($_POST['mutation-variables'] == "true"){
		
		$forward_mutation_rate = floatval($_POST['mutation-rate-mu']);	//0.0000 - 1.0000
		$reverse_mutation_rate = floatval($_POST['mutation-rate-nu']);	//0.0000 - 1.0000

		//If they are both zero ignore them 
		if(!($forward_mutation_rate == 0 && $reverse_mutation_rate == 0)){
			$generations->mutation($forward_mutation_rate, $reverse_mutation_rate);	//Set the mutation rates 
		}
	}

	$generations->build_random_samples();














	// $generations->build_random_samples();
	// $generations->debug_print_generation();

	










}






?>