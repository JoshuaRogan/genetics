<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<meta name="author" content="Josh Rogan">
	<meta name="description" content="@yield('description')" >
	
	<title> Genetic Simulator | @yield('title')</title>


	<link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

	<!-- iOS Options -->


	<!-- STYLESHEETS  -->
	@section('styles')
		@if(env('APP_DEBUG')) 
			<link rel="stylesheet" type="text/css" href="{{asset('/styles/style.css')}}">
		@else
			<link rel="stylesheet" type="text/css" href="{{asset('/styles/style.min.css')}}">
		@endif
    @show

	
    @include('analytics.google-analytics')
</head>

<body> 

	<!--HEADER --> 
	@yield('header')
	<!--HEADER --> 




	<!--CONTENT-->
	<div id="main" class="@yield('pageclass') container-fluid"> 
		<!--Flash Messages -->
		@if(Session::has('flash_success'))
			<div class='container flash-messages'>
				<div class="alert alert-success">
					{!!Session::pull('flash_success')!!}
				</div>
			</div>
		@endif

		@if(Session::has('flash_error'))
			<div class='container flash-messages'>
				<div class="alert alert-danger">
					{!!Session::pull('flash_error')!!}
				</div>
			</div>
		@endif
		
		<!--Flash Messages -->

		<!-- FIRST TIME --> 
		<div class="modal" id="first-time-faq">

			<div class="modal-content">
				<h2> Welcome to the Population Generation Simulator </h2>
				<div class="icon"><a href='/help'><i class="fa fa-lightbulb-o"></i></a></div>
				<h3> First time here? <br/><a href="/help#help-learn">FAQ - Learn</a> or <a href="/help#faq-simulator-usability">FAQ - Help</a></h3>
			</div>

			<div class="modal-footer">
		      <a href="#!" class="btn btn-primary modal-action modal-close">Close</a>
		    </div>

		</div>
		<!-- /FIRST TIME --> 
	
		@yield('content')
	</div>
	<!--CONTENT-->

	<!--FOOTER--> 
	@yield('footer')
	<!--FOOTER-->

	<!--LAZY SCRIPTS --> 
	@section('lazyscripts')
		@if(env('APP_DEBUG')) 
			<script src="{{asset('/js/genetics.js')}}"></script>
		@else
			<script src="{{asset('/js/genetics.min.js')}}"></script>
		@endif

		
    @show
	<!--LAZY SCRIPTS --> 

	
    	
    	
	

</body>



</html>