<?php 
	$_CONTROLLER = array(); 
	/*******************************Required*******************************/
	$_CONTROLLER["title"]  					= "Genetics | Home"; 
	$_CONTROLLER["header_file"]  			= true;  				//True uses default header
	$_CONTROLLER["footer_file"]				= true; 				//True uses default footer
	/*******************************Required*******************************/
 	
 	$_CONTROLLER["description"]				= "Page Description";

	$_CONTROLLER["stylesheets"] 			= array("stylesheet", "bootstrap");
	$_CONTROLLER["javascript"] 				= array("chartjq_config", "index", "canvas.js/jquery.canvasjs.min", "slider_config", "jquery.nouislider.all.min", "population_genetics");
	

	/************DATA HANDLING FUNCTIONS *************/
	$_PAGE = array(); //This is where all of the data for the page will be 


?>