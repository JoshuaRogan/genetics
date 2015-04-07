<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'GraphsController@allele');
Route::get('home', 'GraphsController@allele');
Route::get('allele', 'GraphsController@allele');
Route::get('genotype', 'GraphsController@genotype');
Route::get('faq', 'FAQController@index');

Route::controllers([
	// 'auth' => 'Auth\AuthController',
	// 'password' => 'Auth\PasswordController',
]);
