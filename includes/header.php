<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		    	<span class="sr-only">Toggle navigation</span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    	<span class="icon-bar"></span>
		    </button>
		    <a class="navbar-brand emboss" href="/home">Genetics Logo</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav">
        		<li <?php if(substr($page, 0, strlen($page)-4) == "home") echo "class='active'"; ?> ><a href="/experience">Graphs</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        		<li <?php if(substr($page, 0, strlen($page)-4) == "blank") echo "class='active'"; ?> ><a href="#">Link</a></li>
        	</ul>

        	<ul class="nav navbar-nav navbar-right">
				<li><a href="#">Link</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li class="divider"></li>
						<li><a href="#">Separated link</a></li>
					</ul>
				</li>
				</ul>
        </div>
	</div>
</nav>