<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="author" content="Josh Rogan">
	<meta name="description" content="@yield('description')" >
	
	<title> Genetic Simulator | @yield('title')</title>


	<link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

	<!-- iOS Options -->

	
	
	

	
	<!-- STYLESHEETS  -->
	@section('styles')
		<link rel="stylesheet" type="text/css" href="{{asset('/styles/style.min.css')}}">
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    @show

	

</head>

<body> 

	<!--HEADER --> 
	@yield('header')
	<!--HEADER --> 

	<!--CONTENT-->
	<div id="main" class="@yield('pageclass') container-fluid"> 
		@yield('content')
	</div>
	<!--CONTENT-->

	<!--FOOTER--> 
	@yield('footer')
	<!--FOOTER-->

	<!--LAZY SCRIPTS --> 
	@section('lazyscripts')
		<script src="{{asset('/js/genetics.js')}}"></script>
    @show
	<!--LAZY SCRIPTS --> 

	
    	
    	
	

</body>



</html>