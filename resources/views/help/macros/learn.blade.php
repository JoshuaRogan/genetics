@extends('help.macros.help-section-master')

@section('pre-questions')
	<p> 
		@yield('summary')
	</p>
@overwrite 

@section('post-questions')
	<ul class="list-unstyled slide-urls"> 
		<li> <a href='/slides/{{$folder}}' target='_blank' class='font-thick'><i class="fa fa-youtube-play"></i> View Slideshow Online</a> </li>
		<li> <a href='/downloads/{{$folder}}.pptx' class='font-thick'><i class="fa fa-download"></i> Download Slideshow</a></li>
	</ul>
@overwrite 
