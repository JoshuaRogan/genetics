<?php 
/**
 *	Class to normalize and verify inputs 
 */

class verify{
	
	public static sanitizeEmail($input){
		return filter_var($input,FILTER_SANITIZE_EMAIL);
	}

	public static validEmailAddress($input){ 
		return filter_var($input, FILTER_VALIDATE_EMAIL)
	}

	public static validPhoneNumber($input){ 

	}

	public static validLength($input, $max_length, $min_length = 0){
		return strlen($input) <= $max_length && strelen($input) >= $min_length;
	}
}



?>