@extends('help.macros.help-section-master')

@section('pre-questions')
	<p> 
		@yield('summary')
	</p>
@overwrite 

@section('post-questions')
	{{-- Add content to show after the question  --}}
@overwrite 
