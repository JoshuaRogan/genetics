@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Allele Graphing')
@section('pageclass', 'page-faq')

@section('styles')
    @parent
@stop

@section('lazyscripts')
    @parent

    <script src='/js/popGen/popGen.htmlutil.js'></script>
    <script src='/js/faq.js'></script>
@stop
<?php 
class question{
    public static $question_num = 0;
    public static $section_num = 0;

    public static function generate_question_html($question, $answer){
        echo "

        <div class='panel panel-default'>
            <div class='panel-heading'>
                <h4 class='panel-title'>
                    <a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordion-" . (self::$section_num - 1) . "' href='#question-" . self::$question_num . "'>$question?</a>
                </h4>
            </div>
            <div id='question-" . self::$question_num . "' class='panel-collapse collapse'>
                <div class='panel-body'>
                    $answer 
                </div>
            </div>
        </div>
    ";
    
    self::$question_num++;
    }



}

?>


@section('content')
<div class="container">
    <h1>Genetic Graphing F.A.Q. <small>Genetics Frequently Asked Questions</small></h1>


    <br />

    <div class="panel-group" id="accordion-<?php echo question::$section_num++?>"> 
        <div class="faqHeader">General Questions</div>

        <?php 
        question::generate_question_html("How can I create a graph", "To generate a graph you can simply set the variables you are interested in and click the \"<strong>Generate Graph</strong>\" button. You can then add more lines by clicking the \"<strong>Add Line</strong>\" button or reset the graph by again clicking the \"<strong>Generate Graph</strong>\" button."); 
        question::generate_question_html("How can I change the variables", "To change any of the variables you can open up the appropriate section by either clicking the <strong>checkbox</strong> to the left of the section name or the <strong>down arrow</strong>. Once the section is opened you can either move the slider or directly inputing the value by clicking the value itself. ");
        question::generate_question_html("How can I activate a variable", "The variables automatically activate upon <strong>moving the slider</strong> or <strong>inputing a value</strong>. If the variable is active it will be shown in color and a check will be next to the section name.");
        question::generate_question_html("How can I deactivate a variable", "If a variable is active (shown in color), you deactivate it by de-selecting the checkbox to the left of the section you would like to deactivate. Once a value is deselected it will be grayed out.  ");
        question::generate_question_html("How can I zoom in the graph", "To zoom in the graph simply click and drag across the area you would like to zoom in.");
        question::generate_question_html("How to move in the the zoomed graph", "Click the directional button on the top right of the graph and click and drag to move along the x axis of the graph.");
        question::generate_question_html("How to reset the graph", "To reset the graph click the circular arrow on the top right of the graph.");
        question::generate_question_html("How can I increase the contrast for printing", "To choose a high contrast version for printing and projecting you can click the <i class='fa fa-sun-o'></i> icon. in the upper right hand corner of the variables section.");
        ?>
        

       
    </div>

     <div class="panel-group" id="accordion-<?php echo question::$section_num++?>">
        <div class="faqHeader">Genetics Questions</div>

        <?php question::generate_question_html("Where can I find more information on the variables", "You can click the small question mark next to each variable to see a short explanation of the variable or click \"[Show Help]\" to open all of the explanations at once."); ?>
       
    </div>

    <div class="panel-group" id="accordion-<?php echo question::$section_num++?>">
        <div class="faqHeader">Technical Questions</div>

        <?php 
            question::generate_question_html("How can I submit a bug or potential new feature", "You can navigate to the <a href='/report-problem'>Report a Problem</a> page to either submit a bug error or suggest new features."); 
            question::generate_question_html("How do I add this to my home screen", "Coming Soon, ");


            question::generate_question_html("How was this application created", "This application was powered by <a href='http://en.wikipedia.org/wiki/JavaScript' target='_blank'>JavaScript</a> and designed with the front end framework <a href='http://getbootstrap.com/'>bootstrap.</a> It was developed by <a href='http://joshuarogan.com' target='_blank'> Josh Rogan </a> and commissioned by Dr. John Shaffer, Professor of Human Genetics at the University of Pittsburgh. ");
           


        ?>
       
    </div>
</div>

@stop