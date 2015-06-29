<?php namespace Genetics\Http\Controllers;

use Genetics\Http\Requests;
use Genetics\Http\Controllers\Controller;
use Genetics\Http\Requests\SendContactUsEmailRequest;

use Illuminate\Http\Request;
use Mail;

class ContactUsController extends Controller {

	/**
	 * Show the contact us form 
	 * 
	 * @return Response 
	 */
	public function index()
	{
		return view('contact.index');
	}

	/**
	 * Send the email to the appropriate accounts
	 * 
	 * @param Response $response 
	 * @return Response
	 */
	public function send(SendContactUsEmailRequest $request)
	{
		if(!env('APP_DEBUG')){
			Mail::send('emails.contact-us', [
					'reciever' => 'Joshua', 
					'name' => $request->input('name'), 
					'subject'=> $request->input('subject'), 
					'message_body'=> $request->input('message'), 
					'email'=> $request->input('email')
				], 
				function($message)
				{
				    $message->to('jjjr1122@gmail.com', 'Contact Us - Population Generation Simulator')
				    	->subject('Population Generation Simulator - Contact Us Email')
				    	->from('do-not-reply@popgensimulator.pitt.edu');
				}
			);

			// Mail::send('emails.contact-us', [
			// 		'reciever' => 'Dr. Shaffer', 
			// 		'name' => $request->input('name'), 
			// 		'subject'=> $request->input('subject'), 
			// 		'message_body'=> $request->input('message'), 
			// 		'email'=> $request->input('email')
			// 	], 
			// 	function($message)
			// 	{
			// 	    $message->to('jrs51@pitt.edu', 'Contact Us - Population Generation Simulator')
			// 	    	->subject('Population Generation Simulator - Contact Us Email')
			// 	    	->from('do-not-reply@popgensimulator.pitt.edu/');
			// 	}
			// );

			\Session::put('flash_success', '<strong><i class="fa fa-check-circle"></i> Success</strong> the email was sent to us and we will get back to you as soon as possible.');
		}
		else{
			\Session::put('flash_error', '<i class="fa fa-cogs"></i> The website is in <strong>debug</strong> mode and emails are not being sent!');

		}
		



		return view('contact.index');
	}

}
