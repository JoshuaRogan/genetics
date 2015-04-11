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

//Graphs (Home will evenutally be a welcome page)
Route::get('/', function(){return Redirect::to('graphs/allele');});
Route::get('home', function(){return Redirect::to('graphs/allele');});
Route::get('allele', function(){return Redirect::to('graphs/allele');});
Route::get('graphs/allele', 'GraphsController@allele');
Route::get('graphs/genotype', 'GraphsController@genotype');


Route::get('genotype', 'GraphsController@genotype');
Route::get('faq', 'FAQController@index');
Route::get('welcome', 'WelcomeController@index');

//Bug Reporting 
Route::get('report-problem', 'BugsController@index'); 
Route::get('report-problem/view', 'BugsController@view'); 
Route::get('report-problem/store', function(){return Redirect::to('report-problem');}); 
Route::post('report-problem/store', 'BugsController@store'); 
Route::get('report-problem/deleteAll', 'BugsController@deleteAll'); 







Route::controllers([
	// 'auth' => 'Auth\AuthController',
	// 'password' => 'Auth\PasswordController',
]);
