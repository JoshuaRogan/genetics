<?php 
require_once("../libraries/twitteroauth/twitteroauth/twitteroauth.php");

/**
 *
 *
 */
class twitter{
	
	private static $connection = null; 

	/**
	*	Rewrite me :|
	*/
	public static function getTimeline($username, $limit = 0, $include_rts = 1){
		self::setConnection(); 

		$time_lines = array(); 
		$lowest_id;
		$last_id;
		$loop = 0;
		$hasmore = true; 
		$num_tweets = 0; 
		$num_to_get = $limit; 
			
		while($loop < 16 && $hasmore && (($num_tweets < $limit) || ($limit == 0))){
		
			if($loop == 0){//First call 
				$time_line = self::$connection->get(
					'statuses/user_timeline',
					array(
						'screen_name'     	=> $username,
						'include_rts'     	=> $include_rts,		//Make this an option to change 
						'count'    			=> $num_to_get % 201
					)
				);
				//Then get the lowest id from the user_timelines
				$lowest_id = $time_line[0]->id_str;	//First id 
				
				//Determine if there are any lower id's
				foreach($time_line as $tweet){
					if($tweet->id_str < $lowest_id) $lowest_id = $tweet->id_str; 
				}

				$lowest_id =self::subtract_one($lowest_id);		//Subtracting one so twitter won't give redundant tweets 
				$last_id = $lowest_id; 

				$time_lines[] = $time_line; 
			
			}
			else{	//Subsequent calls 
				$time_line = self::$connection->get(
					'statuses/user_timeline',
					array(
						'screen_name' 	=> $username,
						'include_rts'   => $include_rts,		
						'count'     	=> $num_to_get % 201,	//Max amount it will give 
						'max_id'		=> $lowest_id			
					)
				);

				//Get the lowest id from the new timeline
				foreach($time_line as $tweet){
					if($tweet->id_str < $lowest_id) $lowest_id = $tweet->id_str; 
				}

				$lowest_id = self::subtract_one($lowest_id);		//Subtracting one so twitter won't give redundant tweets 
				$time_lines[] = $time_line;

				if($last_id == $lowest_id){$hasmore = false;}
				else {$last_id = $lowest_id;}

				
			}

			$num_tweets += 200;
			$num_to_get -= 200;
			$loop++;
		}

		return $time_lines;
	}

	/**
	 *	This function creates an aggregate list of tweets by multiple users, 
	 *	randomly sorted. 
	 *	
	 *	$names should be an array of strings listing the timelines you want 
	 *	$num_tweets is the maximum number of tweets you would want returned 
	 */
	public static function getAggregateTimeLine($names, $num_tweets){
		self::setConnection(); 
		
	}


	/*********************Private Classes********************/
	private static function setConnection(){ 
		if(self::$connection === null){
			self::$connection =  new TwitterOAuth(
			'pKoDWRUw7DP8v1d3Wcsxqw',									// Consumer Key
			'UR6YWd95ZPS6DJZY43rlu1gakmK8G5sEwuGCnoHCU',   				// Consumer secret
			'423924710-749lSE5gnVrZUgCO4ZznlQtC3eda5M6xrN5itvvr',	    // Access token
			'nIfq5jWYkvGUR1uNOQ0Gfa3SanXv0HcPV1QcsypJzg'   			 	// Access token secret
			);
		}
	}

	/*	Function used to subtract 1 from a 64 bit integer string. Specifically used for twitter ids. 
	 *	Needs to be strings because this was made on a 32 bit system. The subtracting is used 
	 * 	so twitter won't give back redundant tweets on multiple calls. 
	 */
	private static function subtract_one($id_str){ 
		$len = strlen($id_str) - 1;

		$check = true;

		for ($i = $len; $i >= 0; $i--) {
			if ($check) {
				$x = intval($id_str{$i});
				if ($x == 0) {
					$id_str{$i} = strval(9);
				}
				else {
					$id_str{$i} = strval($x - 1);
					$check = false;
				}
			}
			if (!$check) {break;}
		}
		return $id_str;
	}
}

/**
 *
 *
 */
class tweets{
	public $tweet, $source; 
	public static $tweets = array(); 

	public function __construct($tweet, $source){
		$this->tweet = $tweet; 
		$this->source = $source; 

		self::$tweets[] = $this; 
	}

	//Pring a block quote of this tweet
	public function render_blockquote(){ 
		echo "
			<blockquote class='tweet'>
				<p> $this->tweet </p> 
				<footer> <cite source='$this->source'> $this->source </cite> </footer>
			</blockquote> 
		";
	}

	public static function render_blockquotes($maintain = false){
		foreach(self::$tweets as $tweet){
			$tweet->render_blockquote(); 
		}

		if(!$maintain) self::$tweets = array(); //Empty the array 
	}
}
?>