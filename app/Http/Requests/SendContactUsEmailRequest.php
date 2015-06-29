<?php namespace Genetics\Http\Requests;

use Genetics\Http\Requests\Request;

class SendContactUsEmailRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name' => 'required|min:2',
			'email' => 'required|min:2|email|confirmed', 
			'message' => 'required|min:10', 
			'subject' => 'required|min:2'
		];
	}

}