@extends('skeleton.base')
@section('title', 'Allele Graphing')
@section('description', 'The Department of Human Genetics at the University of Pittsburgh\'s Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.')

@section('pageclass', 'page-slideshow')

@section('styles')
    @parent
   	<link rel="stylesheet" type="text/css" href="/styles/reveal.css">
@stop

@section('lazyscripts')
    @parent
    <script src='{{asset("/js/genetics.js")}}'></script> 
@stop

<div class="reveal">
	<!-- Any section element inside of this container is displayed as a slide -->
	<div class="slides">
		<?php for($i=1; $i < 20; $i++): ?>
			<section> 
					<img data-src="/images/slides/{{$folder}}/Slide<?php echo $i ?>.PNG"> 
			</section>
		<?php endfor; ?>
	</div>
</div>

