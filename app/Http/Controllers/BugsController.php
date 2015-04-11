<?php namespace Genetics\Http\Controllers;

use Genetics\Bug;
use Illuminate\Support\Facades\Request;
use Illuminate\Routing\Controller;

class BugsController extends Controller {

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
		return view('bugs.report-form');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function create()
	{
		$bug = Bug::create(['name'=>'Bob Junior', 'email'=>'catdaddy@big.com', 'subject'=>'No Graph', 'description' =>'Graph Never Appears']);
		$bug->save();
	}

	/**
	 * View all of the bug reports 
	 *
	 * @return Response
	 */
	public function view()
	{
		$bugs = Bug::all(); 

		return view('bugs.showAll', ['bugs'=> $bugs]); 
	}

	/**
     * Store a new bug report.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $bug = new Bug; 
        $bug->name = Request::input('name');
        $bug->email = Request::input('email');
        $bug->subject = Request::input('subject');
        $bug->description = Request::input('message');
    	$bug->save(); 

        return view('bugs.message', ['type' => 'store']);
    }

    /**
     * Delete a new bug report.
     *
     * @param  Request  $request
     * @return Response
     */
    public function delete($id)
    {
   
    }

     /**
     * Delete all bugs
     *
     * @param  Request  $request
     * @return Response
     */
    public function deleteAll()
    {
   		foreach(Bug::all() as $bug){
   			$bug->delete();
   		}

   		return view('bugs.message', ['type' => 'deleteAll']);
    }




}
