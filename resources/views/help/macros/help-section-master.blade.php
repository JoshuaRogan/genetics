<div id="{{$id}}"> 
	<h4> {{ $title or '<span class="font-red font-thick">Add a title for this section! </span>'}} </h4>

	{{-- Content to show before the question accordian but after the title--}}
	@yield('pre-questions')
	
	{{-- The bootstrap panel group accordian to hold all of the questions --}}
	<div id="accordian-{{$id}}">
		@yield('questions') {{-- All of the questions formated by  help/macros/question  --}}
	</div>

	{{-- Content to show after the question accordian--}}
	@yield('post-questions')
</div>