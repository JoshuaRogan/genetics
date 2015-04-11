@section('header')
	<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		    	<span class="sr-only">Toggle navigation</span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    </button>
		    <a class="navbar-brand emboss" href="/home"><img class="img-responsive" src="/images/logo.png" style="margin-top: -5px; margin-right: 10px;" width="70" alt='logo'></a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav">
        		
        		<li <?php //if(substr($page, 0, strlen($page)-4) == "home") echo "class='active'"; ?> ><a href="/home">Graphs</a></li>
        		<li <?php //if(substr($page, 0, strlen($page)-4) == "faq") echo "class='active'"; ?> ><a href="/faq">FAQ</a></li>
        		<li <?php //if(substr($page, 0, strlen($page)-4) == "faq") echo "class='active'"; ?> ><a href="/report-problem">Bug Report</a></li>
        		<!-- <li <?php //if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Blog</a></li> -->
        		<!-- <li <?php //if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Contact Us</a></li> -->
        	</ul>

         	<ul class="nav navbar-nav navbar-right">
				<li><span class="label label-primary hidden-sm hidden-xs">Beta</span></li>
				{{-- <li><span class="label label-success">Last Update 4/11/15</span></li> --}}
			</ul> 
        </div>
	</div>
</nav>
@stop