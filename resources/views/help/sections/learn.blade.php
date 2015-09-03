{{-- Base Section --}}
@section('questions')
	@include('help.question-groups.base_model')
@overwrite 
@section('summary')
	 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-base-model', 'title'=> 'Base Model'])
{{-- /Base Section --}}

{{-- Hardy Weinberg Section --}}
@section('questions')
	@include('help.question-groups.hardy-weinberg')
@overwrite 
@section('summary')
	 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-hardy-weinberg', 'title'=> 'Hardy-Weinberg Equilibrium'])
{{-- /Hardy Weinberg Section --}}

{{-- Forces Section --}}
@section('questions')
	@include('help.question-groups.forces')
@overwrite 
@section('summary')
	 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-forces', 'title'=> 'Forces shaping the genetic composition of a population'])
{{-- /Forces Section --}}

{{-- Misc Section --}}
@section('questions')
	@include('help.question-groups.micellany')
@overwrite 
@section('summary')
	 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-miscellany ', 'title'=> 'Miscellany '])
{{-- /Misc Section --}}