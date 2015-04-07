<?php namespace Genetics\Http\Controllers;

class GraphsController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->middleware('guest');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('welcome');
	}

	/**
	 * 
	 *
	 * @return Response
	 */
	public function allele()
	{
		return view('graphs/allele');
	}

	/**
	 * 
	 *
	 * @return Response
	 */
	public function genotype()
	{
		return view('graphs/genotype');
	}

}
