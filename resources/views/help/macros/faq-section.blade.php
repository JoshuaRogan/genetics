<div id="{{$id}}"> 
	<h4> {{ $title or '<span class="font-red font-thick">Add a title for this section! </span>'}} </h4>

	<p> 
		@yield('summary')
	</p>

	<div class="panel-group" id="accordian-{{$id}}">
		@yield('questions')
	</div>

	<ul class="list-unstyled slide-urls"> 
		<li> <a href='/slides/{{$folder}}' class='font-thick'><i class="fa fa-youtube-play"></i> View Slideshow Online</a> </li>
		<li> <a href='/downloads/{{$folder}}.pptx' class='font-thick'><i class="fa fa-download"></i> Download Slideshow</a></li>
	</ul>

</div>