<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		    	<span class="sr-only">Toggle navigation</span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    </button>
		    <a class="navbar-brand emboss" href="/home">Josh Rogan</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav">
        		<li <?php if(substr($page, 0, strlen($page)-4) == "home") echo "class='active'"; ?> ><a href="/experience">Home</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        </div>
	</div>
</nav>