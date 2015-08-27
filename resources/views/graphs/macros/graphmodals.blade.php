<!-- Graph Completion Modal -->
<div class="modal fade bottom-sheet" id="graph-computing-modal" tabindex="-1" role="dialog" aria-labelledby="graph-computing-title" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title" id="graph-computing-title">Graph Computing</h4>
			</div>

			<div id="graph-completion-precent" class="modal-body">
				<div class='row'>
					@include('material/preloader') <!-- Would like to change to percentage --> 
				</div>
			</div>

			<div class="modal-footer">

			</div>
		</div>
	</div>
</div>
<!-- Graph Completion Modal -->

<!-- Bookmarking Modal -->
<div class="modal fade bottom-sheet" id="bookmark-link" tabindex="-1" role="dialog" aria-labelledby="bookmark-link-title" aria-hidden="true">

	<div class="modal-content">
		<button type="button" class="close" ><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> 
		<h2 class="modal-titles" id="bookmark-link-title">Generated Bookmark Link</h2>
		<p> Bookmark the link below to prepopulate the variables with the values you currently have set and <strong>are active</strong>. </p>
		<div class="alert alert-info" role="alert"> 
			<p> <i class="fa fa-info-circle fa-lg"></i> A link shortner such as <strong><a href="https://goo.gl/" target="_blank">Google Link Shortner</a></strong> can be helpful! </p>
		</div>
		<pre class="text-center"><a href="" class="bookmark-link" target="_blank">Bookmark Link is being generated!</a></pre>
	</div>

	<div class="modal-footer">
      <a href="#!" class=" btn btn-primary modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>

</div>
<!-- Bookmarking Modal -->