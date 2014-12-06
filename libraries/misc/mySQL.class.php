<?php 

class mySQL{

	public static $queries = array(); 	//Array of the query strings
	public static $total_time = array(); //Total time all combined queries took to make this page

	public static $connection = null; 		

	public static function query($query){
		$start = microtime(true); 
		self::start_connection(); 
		$result = $connection->query($query);
		self::$queries[] = $result; 

		$time_taken = microtime(true) - $start;	//Time elapsed in seconds
		self::$total_time += $time_taken;
		return $result; 

	}

	private static function start_connection(){ 
		if(self::$connection == null){
			self::$connection = new mysqli(DATABASE_DOMAIN, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME);

			if (self::$connection->connect_errno) {
			    echo "Failed to connect to MySQL: (" . self::$connection->connect_errno . ") " . self::$connection->connect_error;
			}
			// echo $mysqli->host_info . "\n";
		}
	}

	public static function end_connection(){
		self::$connection->close(); 
	}


}




//Consider just making it extend the mysqli class

?>