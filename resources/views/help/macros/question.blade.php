<div class='panel panel-primary question' id='question-panel-{{$question_set}}-@render("question-id")'>
    <div class='panel-heading question-question'>
        <h4 class='panel-title'>
            <a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordian-{{$question_set}}' href='#{{$question_set}}-question-@render("question-id")'>
                @render('question-title')
            </a>
        </h4>
    </div>

    <div id='{{$question_set}}-question-@render("question-id")' class='panel-collapse collapse question-content'>
        <div class='panel-body'>
            @render('question-content')

            
       
        </div>
    </div>
</div>


