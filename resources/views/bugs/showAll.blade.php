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

		@foreach ($bugs as $bug)

		<div class="panel panel-primary">
			<div class="panel-heading">
				<h3 class="panel-title">Bug Report<span class="pull-right"><strong>{{ $bug->created_at }}</strong></h3>
			</div>
			<div class="panel-body">
				
			</div>

			<ul class="list-group">
				<li class="list-group-item"><strong>ID:</strong> {{ $bug->id }}</li>
				<li class="list-group-item"><strong>Name:</strong> {{ $bug->name }}</li>
				<li class="list-group-item"><strong>Staus:</strong> Open </li>
				<li class="list-group-item"><strong>Email:</strong> {{ $bug->email }}</li>
				<li class="list-group-item"><strong>Bug:</strong> {{ $bug->subject }}</li>
				<li class="list-group-item"><strong>Description:</strong> {{ $bug->description }}</li>
			</ul>

		</div>
		@endforeach
		
	</div>
@stop