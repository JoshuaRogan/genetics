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

//Allele Frequency Graphs 
Route::get('allele', function(){return Redirect::to('graphs/allele');});
Route::get('graphs/allele', 'GraphsController@allele');

//Genotype Graphs 
Route::get('genotype', function(){return Redirect::to('graphs/genotype');});
Route::get('graphs/genotype', 'GraphsController@genotype');

//Helper Pages 
Route::get('help', 'FAQController@index');

Route::get('faq', 'FAQController@index');

Route::get('faq/technical', 'FAQController@technical');
Route::get('faq/genetics', 'FAQController@genetics');

Route::get('slides/{slug}', 'SlidesController@show');
Route::get('slides/', 'SlidesController@index');
Route::get('welcome', 'WelcomeController@index');

Route::get('test', 'HomeController@tester');

//Bug Reporting 
Route::get('report-problem', 'BugsController@index'); 
Route::get('report-problem/view', 'BugsController@view'); 
Route::get('report-problem/store', function(){return Redirect::to('report-problem');}); 
Route::post('report-problem/store', 'BugsController@store');
Route::get('report-problem/deleteAll', 'BugsController@deleteAll'); 
Route::get('report-problem/delete/{id}', 'BugsController@delete'); 
Route::get('report-problem/complete/{id}', 'BugsController@complete'); 
Route::get('report-problem/open/{id}', 'BugsController@open'); 









Route::controllers([
	// 'auth' => 'Auth\AuthController',
	// 'password' => 'Auth\PasswordController',
]);
