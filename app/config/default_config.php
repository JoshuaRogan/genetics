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
	public static $pageTitle 			= "DEFAULT TITLE PAGE"; 
	public static $pageDescription 		= "DEFAULT DESCRIPTION PAGE"; 

	public static $stylesheets 			= array(); //Include stylesheets 
	public static $javascript 			= array(); //Include javascript files

	public static $header				= false; //False if no header file otherwise the file name in the /app/views/includes/foo.php 
	public static $footer 				= false;	//Same as header 

}
?>