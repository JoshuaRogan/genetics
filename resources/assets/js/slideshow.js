$(document).ready(function() {
	if($("#main").hasClass("page-slideshow")) {
		
		Reveal.initialize({
				transition: 'slide',
				controls: true,
				progress: true,
				history: true,
				center: true,
				loop:true, 
				overview: true, 
				viewdistance: 3, 
				pagenumber: true

		});
		
	}
}); 