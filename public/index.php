<?php 
error_reporting(-1);
ini_set('display_errors', 'On');

//Autoloading of classes
function __autoload($class_name) {
	
	if(file_exists("../lib/util/$class_name" . ".php")){
		require_once ("../lib/util/$class_name" . ".php");
	}

	//Check more locations here 

	//Check other locations here

}

//Set $page to the page in the url or default to home
if(!isset($_GET['page'])){
	$page = 'home'; 	//Default
}
else{
	if(file_exists( "../app/views/" . $_GET['page'] . ".php")){
		$page = $_GET['page'];
	}
	else {
		new alerts("<p>The page \"" .$_GET['page'] . "\" doesn't exist! <strong>You have been redirected to the home page!</strong></p>", "alert-danger");
		$page = 'home';	 //Default 
	}
}

$_DEBUG[] =  "The Current page: $page \n"; 


//Require the config files 
require_once("../app/config/GLOBAL_CONFIG.php");	//require the global config class
if(file_exists("../app/config/" . $page . "_config.php")){
	require_once("../app/config/" . $page . "_config.php");	//Require this pages config class 
}
else{
	new alerts("<p>The page \"" .$_GET['page'] . "\" doesn't have a config file! Loading the default config. </p>", "alert-danger");
	require_once("../app/config/default_config.php");	//Require this pages config class 
}

//Require the model files if they exist (This is where to perform ajax calls)



//Don't render HTML for this page 
if(!config::$render){


}





?>


<?php if (config::$render): ?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title> <?php echo config::$pageTitle; ?></title>


	<!--METADATA-->
	<meta name="author" content="<?php echo config::$author; ?>">
	<meta name="description" content="<?php echo config::$pageDescription; ?>" >
	<!--METADATA-->

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=<?php echo config::$maxScale;?>, user-scalable=<?php echo config::$userScalable;?>" />
	<link rel="shortcut icon" href="favicon.ico">

	<!-- iOS Options -->
	<meta name="apple-mobile-web-app-capable" content="<?php echo config::$ios_webapp;?>">
	<meta name="apple-mobile-web-app-status-bar-style" content="<?php echo config::$ios_status_bar_col;?>">
	<meta name="apple-mobile-web-app-title" content="<?php echo config::$ios_title;?>">
	
	<?php if(config::$ios_icons):?>

	<!-- iOS 7 iPhone icon(retina) -->
	<link href="images/apple_icons/apple-touch-icon-120x120.png"
	      sizes="120x120"
	      rel="apple-touch-icon">
		  
	<!-- iOS 6 iPhone icon (retina) -->
	<link href="images/apple_icons/apple-touch-icon-114x114.png"
	      sizes="114x114"
	      rel="apple-touch-icon">
		  
	<!-- iOS 6 & 7 iPhone 5 Startup -->
	<link href="images/apple_icons/apple-touch-startup-image-640x1096.png"
	      media="(device-width: 320px) and (device-height: 568px)
	         and (-webkit-device-pixel-ratio: 2)"
	      rel="apple-touch-startup-image">	 

	<?php endif; ?>

	<?php 
	//Load all of the global styles 
	foreach(config::$global_stylesheets as $stylesheet) echo "<link rel='stylesheet' type='text/css' href='$stylesheet'>";

	//Load the rest of the styles 
	foreach(config::$stylesheets as $stylesheet) echo "<link rel='stylesheet' type='text/css' href='$stylesheet'>";
	
	?>
</head>

<body> 




	<!--HEADER --> 
	<?php
	//Require the header file
	if(config::$header !== false){ 
		if(file_exists("../app/views/includes/" . config::$header . ".php")){
			require_once("../app/views/includes/" . config::$header . ".php");
		}
		else{
			//Create an alert
		}
	}

	?>
	<!--HEADER --> 









	<!--CONTENT-->
	<div id="main" class="<?php echo "page-" . $page ?> container-fluid"> 
		<?php
		alerts::render_alerts();

		//Bring in the view 
		require_once("../app/views/" . $page . ".php");

		//Pring errors if DEBUG is true and contains data
		if(config::$debug){
			if(isset($_DEBUG) && count($_DEBUG) > 0){
				echo "<br /><div class='container-fluid'><pre class='pre-scrollable col-md-12'><h3>Debug Console</h3>";
				var_dump($_DEBUG);
				echo "</pre></div>";
			}
		}
		?>
	</div>
	<!--CONTENT-->





	<!--FOOTER--> 
	<?php
	//Require the footer file
	if(config::$footer !== false){ 
		if(file_exists("../app/views/includes/" . config::$footer . ".php")){
			require_once("../app/views/includes/" . config::$footer . ".php");
		}
		else{
			//Create an alert
		}
	}
	?>
	<!--FOOTER-->





	<!--LAZY SCRIPTS --> 
	<?php 
	//Load all of the global javascript 
	foreach(config::$global_javascript as $javascript) echo "<script src='$javascript'></script>";

	//Load the rest of the javascript  
	foreach(config::$javascript as $javascript) echo "<script src='$javascript'></script>";
	
	?>
	<!--LAZY SCRIPTS --> 

</body>



</html>

<?php endif; ?>