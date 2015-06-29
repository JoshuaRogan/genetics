{{-- Usability Section --}}
@section('questions')
	@include('help.question-groups.usability')
@overwrite 
@section('summary')
	Summary for usability. 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-simulator-usability', 'title'=> 'Simulator Usability'])

{{-- /Usability Section --}}

{{--Technical Section --}}
@section('questions')
	@include('help.question-groups.technical')
@overwrite 
@section('summary')
	Summary for technical questions. 
@overwrite
@include('help.macros.faq-simulator', ['id'=> 'faq-simulator-technical', 'title'=> 'Technical Questions'])
{{-- /Technical Section --}}