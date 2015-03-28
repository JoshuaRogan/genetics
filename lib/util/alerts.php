<?php 
/*		Convience class for alerts. Consider abstracting  
 *
 * 		Author: Josh Rogan
 *		Version: 1.0
 *		Date Last Modified: March 2014
 */
class alerts{
	public $message; 
	public $alert_type; 
	public static $alerts = array(); 

	public function __construct($message, $alert_type){
		$this->message = $message; 
		$this->alert_type = $alert_type; 
		self::$alerts[] = $this; 
	}

	public function render(){
		echo "<div class='alert $this->alert_type'> $this->message </div>";
	}

	//Render an array of alerts
	public static function render_alerts(){ 	
		foreach(self::$alerts as $alert){
			$alert->render(); 
		}

		//Clear the alerts array
		self::$alerts = array(); 
	}

}

?>