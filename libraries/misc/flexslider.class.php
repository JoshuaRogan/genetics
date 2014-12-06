<?php 

class flexslider{
	/********************************FIELDS********************************/
	public $has_thumbnails;



	/********************************CONSTRUCTOR********************************/
	public function __construct($type = "default", $image_dir = "/images/dir"){

	}



	/********************************METHODS********************************/
	public function render_slider(){
		echo "
		<div id='slider' class='flexslider'>
			  <ul class='slide4.jpg'>
			    <li>
			      <img src='slide4.jpg' />
			    </li>
			    <li>
			      <img src='slide4.jpg'/>
			    </li>
			    <li>
			      <img src='slide4.jpg' />
			    </li>
			    <li>
			      <img src='slide4.jpg' />
				</li>
			<!-- items mirrored twice, total of 12 -->
			</ul>
		</div>";
	}




	/********************************STATIC FUNCTIONS********************************/




}


?>