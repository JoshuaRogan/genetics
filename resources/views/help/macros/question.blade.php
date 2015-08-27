<li>
    <div class='collapsible-header question-question'>
        @render('question-title') 
    </div>

    <div class="collapsible-body">
        <div id='{{$question_set}}-question-@render("question-id")'>
            <div class='panel-body'>
                @render('question-content')
            </div>
        </div>
    </div>
</li>


