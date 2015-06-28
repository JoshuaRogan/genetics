<?php namespace Genetics\Http\Controllers;
use Markdown;

class FAQController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		// return view('help.units.drift-questions');
		return view('help.index');
	}

	/**
	 * Parse and get all of the questions 
	 * @return Array of HTML questions 
	 */
	public function get_questions(){
		return Array(); 
	}



}
