<?php 
/**
 *	This is where you store the metadata for each page. 
 *	Included before the objectd and view. 
 *	You can store constants in the GLOBAL_CONFIG file that can be accessed 
 *	the config class too. 
 *
 *	All static variables can be accessed by config::$variable name
 */

class config extends global_config{
	public static $pageTitle 			= "Genetics | Home"; 
	public static $pageDescription 		= "The Department of Human Genetics at the University of Pittsburgh's Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations."; 

	public static $stylesheets 			= array("/styles/stylesheet.css", "/styles/bootstrap.css"); //Include stylesheets 
	public static $javascript 			= array(); //Include javascript files

	public static $header				= false; //False if no header file otherwise the file name in the /app/views/includes/foo.php 
	public static $footer 				= false;	//Same as header 

}
?>