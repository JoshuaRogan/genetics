<?php 
/*		A static tool box class that contains general purpose functions that all 
 * 		pages on the website may need to use. 
 *
 * 		Author: Josh Rogan
 *		Version: 1.0
 *		Date Last Modified: Janurary 2014
 */

class toolbox{ 
	
	/*****************************PUBLIC CLASSES*****************************/

	/*	This will check to see if the specfied value was set  and 
	 *	equals some value in the POST global. If it was it will echo it
	 *	or false if it doesn't exist
	 */
	public static function echo_stickypost($post_name, $value){ 
		if(isset($_POST["$post_name"]) && $_POST["$post_name"] == $value){
			echo $_POST["$post_name"];
		}
		else{
			return false; 
		}
	}

	/*	Same as previous but will return the value instead 
	 *	
	 */
	public static function return_stickypost($post_name, $value){ 
		if(isset($_POST["$post_name"]) && $_POST["$post_name"] == $value){
			return $_POST["$post_name"];
		}
		else{
			return false; 
		}
	}



	/*	Specific solution to append to the end of a log file
	 *	Filename should include extension (.txt)
	 */
	public static function append_log($log_file, $text){
		self::append_file("../logs/$log_file", $text);
	}

	/*	Specific solution to create or rewrite a log file.
	 *	Filename should include extension (.txt)
	 */
	public static function create_log($log_file, $text){
		self::create_log("../logs/$log_file", $text); 
	}

	/*	Specific solution to append to the end of a json file
	 *	File name doesn't need to contain .json
	 */
	public static function append_json($file_name, $json_text){
		//Add .json extension if it isn't there
		if(strpos($file_name, '.json') !== true) $file_name .= ".json";	
		self::append_file("../data/json/$filename", $text);
	}

	/*	Specific solution to create or rewriting to a json file
	 *	File name doesn't need to contain .json 
	 */
	public static function create_json($file_name, $json_text){
		//Add .json extension if it isn't there
		if(strpos($file_name, '.json') !== true) $file_name .= ".json";	
		self::create_file("../data/json/$filename", $text);
	}

	/*	Load json file from the data folder and return it
	 *	
	 */
	public static function load_json($file_name){
		return json_decode(self::get_contents("data/json/$file_name" . ".json"));
	}

	/*	Make plain text links clickable
	 *	
	 */
	public static function makeClickableLinks($string) {
  		return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1" target="_blank">$1</a>', $string);
	}


	/*****************************PRIVATE CLASSES*****************************/

	/*	General solution to append to the end of any file
	 *	
	 */
	private static function append_file($file, $text){ 
		$fp = fopen($file, 'a');
		fwrite($fp, $text); 
		fclose($fp);
	}

	/*	General solution to create a new file. 
	 *
	 */
	private static function create_file($file, $text){
		$fp = fopen($file, 'w');
		fwrite($fp,$text);
		fclose($fp);
	}

	/*	General solution to open a file. 
	 *
	 */
	private static function get_contents($file){
		$file = file_get_contents("../$file");
		return $file; 
	}

}
?>