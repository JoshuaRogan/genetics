@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Allele Graphing')
@section('description', 'The Department of Human Genetics at the University of Pittsburgh\'s Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.')
@section('pageclass', 'page-home')

@section('styles')
	@parent
@stop

@section('lazyscripts')
	@parent
@stop

@section('content')
	<div class="container">&nbsp;</div>
	<div class="container">
	<div class="jumbotron">

		@if ($type == 'not-found')
			<h1><i class="fa fa-exclamation-triangle fa-2x" style="color: #e74c3c"></i>  Item '{{$id}}' wasn't not found!</h1> 
			<h2>Please verify the id</h2>
			<p>All of the data is soft deleted so if you need to restore you can!</p> 
		@endif

		@if ($type == 'store') 
			<h1><i class="fa fa-check fa-2x" style="color: #2ecc71"></i>  Successfull Report!</h1>
			<h2>Thanks!!</h2>
			<p>Thank you for submitting feedback. Your feedback is integral in making our applications better.</p>
		@endif

		@if ($type == 'deleteAll') 
			<h1><i class="fa fa-trash fa-2x" style="color: #e74c3c"></i>  Deleted all records!</h1> 
			<h2>Thank's for the maintence!</h2>
			<p>All of the data is soft deleted so if you need to restore you can!</p> 		
		@endif

		@if ($type == 'deleted')
			<h1><i class="fa fa-trash fa-2x" style="color: #e74c3c"></i>  Deleted id '{{$id}}'!</h1> 
			<h2>Thank's for the maintence!</h2>
			<p>All of the data is soft deleted so if you need to restore you can!</p> 
		@endif

		@if ($type == 'status-change')
			<h1><i class="fa fa-check fa-2x" style="color: #2ecc71"></i>  Updated id '{{$id}}'!</h1> 
			<h2>Thank's for the maintence!</h2>
			<p>All of the data is soft deleted so if you need to restore you can!</p> 

		@endif



			<p>
				<a class="btn btn-primary btn-lg" href="/report-problem" role="button">Submit a Report</a>
				<a class="btn btn-primary btn-lg" href="/graphs/allele" role="button">Allele Graph</a>
			</p>

	</div>
	</div>
@stop