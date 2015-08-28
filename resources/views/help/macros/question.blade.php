<li class='single-question'>
    <div class='collapsible-header question-question'>
        <i class="fa fa-clone"></i> <h4 class='question-info-search'> @render('question-title')
            <span class='hidden seo'>
                @render('question-title') 
                @render('question-content')
            </span>

        </h4>

    </div>

    <div class="collapsible-body">
        <div class='question-content'>
             @render('question-content')
        </div>
    </div>
</li>


