<?php namespace Genetics\Http\Controllers;

use Genetics\Http\Requests;
use Genetics\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Collection;
use Storage, Image, File;

class SlidesController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		
	}

	/**
	 * Show all of the possible slides avaiable 
	 *
	 * @return Response
	 */
	public function index()
	{
		$img = Image::canvas(800, 600, '#ff0ff0');
		dd($img); 

		return $img->response();
	}

	/**
	 * Show one set of slides 
	 * 
	 * @param type $folder
	 * @return Response
	 */
	public function show($folder)
	{
		$DIRECTORY = "images/slides/";
		$FULL_DIRECTORY =  "images/slides/$folder"; 
		$slides = Collection::make(File::directories($DIRECTORY));
		
		if($slides->contains($FULL_DIRECTORY)){	
			$files = File::files($FULL_DIRECTORY);
			$length = count($files); 

			for($i=1; $i <= $length; $i++){
				$image = $FULL_DIRECTORY . '/' . "Slide" . $i . ".PNG"; 
				if(File::exists($image)){
					$images[] = $image; 
				}
			}

			return view('slides.slideshow', ['images' => $images, 'folder'=>$folder]);
			
		}
		else{
			// return view('slides.noshow');
			return "$folder doesn't exist!"; 
		}

		
	}

	/**
	 * Build all of the slides of a given folder 
	 * 
	 * @param String $folder 
	 * @return Array 
	 */
	public function buildSlides($folder){
		$directories = Collection::make(Storage::directories('slides'));

		if($directories->contains("slides/$folder")){	
			$files = Storage::files("slides/$folder");
			$length = count($files); 
			$images = Array(); 
			
			//Add a watermark to the bottom of the images
			$watermark = Image::make(Storage::get("images/watermark.png"))->resize(80, null, function ($constraint) {
				$constraint->aspectRatio();
			});

			for($i=1; $i <= $length; $i++){
				$location = "slides/$folder/Slide$i.PNG";
				if(Storage::exists($location)){
					$file = Storage::get($location);
					$image = Image::make($file);
					$image->insert($watermark, "bottom-left",20,20);
					$images[] = $image; 
				}
			}

			return $images;
			
		}
		else{
			return "Nah";
		}
	}

}
