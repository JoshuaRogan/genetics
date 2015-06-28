<?php  

/** 
 * Add the legacy code for question generations. Remove this ASAP
 * 
 */
require_once ('../resources/views/help/macros/question_old.php'); 


?> 



<div class="panel-group" id="accordion-<?php echo question::$section_num++?>"> 
    <div><h4>Usability Questions</h4></div>
    <?php 
        question::generate_question_html("How can I create a graph of my simulation", "To generate a graph you can simply set the simulation parameters that you are interested in and click the \"Generate Graph\" button. You can then add more simulations to the existing graph by clicking the \"Add Line\" button.  You can  replace the existing graph with a new simulation by clicking the \"Generate Graph\" button.", '/images/faq/create_graph.gif', "http://i.imgur.com/DDdDLC9.gif"); 
        question::generate_question_html("How can I change the simulation parameters", "To change any of the simulation parameters you can open up the appropriate section by either clicking the checkbox to the left of the section name or the down arrow on the right. Once the section is opened you can either move the slider or click on the parameter value to directly input a new value using your keyboard.", "/images/faq/input.gif", 'http://i.imgur.com/KMVO51x.gif');
        question::generate_question_html("How can I activate a simulation parameter", "The parameters automatically activate upon moving the slider or inputting a value. If the variable is active the corresponding slider will be shown in color and a check will be present next to the section name.", "/images/faq/activate.gif", "http://i.imgur.com/XDkBJh6.gif");
        question::generate_question_html("How can I deactivate a simulation parameter", "If a parameter is active (i.e., slider shown in color), you deactivate it by de-selecting the checkbox to the left of the section you would like to deactivate. Once a value is deselected the slider will be grayed out.", "/images/faq/activate.gif", "http://i.imgur.com/XDkBJh6.gif");
        question::generate_question_html("How can I zoom in the graph", "To zoom in the graph simply click and drag across the area you would like to zoom in.", "/images/faq/zoom_pan.gif", "http://i.imgur.com/Ln5MnIi.gif");
        question::generate_question_html("How to pan left and right in the zoomed graph", "Click the directional button on the top right of the graph and click and drag to pan along the x axis of the graph.", "/images/faq/zoom_pan.gif", "http://i.imgur.com/Ln5MnIi.gif");
        question::generate_question_html("How to reset the graph", "To reset the graph click the circular arrow on the top right of the graph.", "/images/faq/zoom_pan.gif", "http://i.imgur.com/Ln5MnIi.gif");
        question::generate_question_html("How to save the graph", "To save the graph as an image file (jpg and png) click the triple dot in the upper left corner of the graph. ",'/images/faq/save_image.gif', "http://i.imgur.com/135lVeP.gif");
        question::generate_question_html("How can I increase the contrast for printing or projecting", "To choose a high contrast version of the graph for printing and projecting you can click the icon in the upper right hand corner of the variables section.","/images/faq/display.gif",  "http://i.imgur.com/Rywoz9S.gif");
        question::generate_question_html("How can I change the legends", "Legends are automatically created for each simulation. Only the most recent simulation is shown. But, you can open legends of any previous simulation by clicking [Show Legend]", "/images/faq/legend.gif", "http://i.imgur.com/LjDVaj8.gif");
        question::generate_question_html("Where can I find more information on the simulation parameters", "You can click the small question mark next to each variable in order to see a short explanation of the variable or click \"[Show Help]\" to open all of the parameter descriptions at once.  Additional information about the underlying population genetics models is available [in the drop-down menu at the top of the screen].  ", "/images/faq/helper.gif", "http://i.imgur.com/eqw4Rmb.gif");
        question::generate_question_html("How can I generate a link (URL) for a simulation","You can generate a link (URL) for a set of simulation parameters by clicking on the [link icon].  Navigating to this URL will prepopulate the set of simulation parameters." );
        question::generate_question_html("How can I access the data represented in the graph","You can access the simulation data by clicking on the <i class='fa fa-file-text-o'></i> icon.  " );
    ?>
</div>

 <div class="panel-group" id="accordion-<?php echo question::$section_num++?>">
    <div><h4>Genetics Questions</h4></div>
    <?php
        question::generate_question_html("Simple Genetics Question", "Here is the answer to the simple genetics question"); 
        question::generate_question_html("Simple Genetics Question", "Here is the answer to the simple genetics question"); 
        question::generate_question_html("Simple Genetics Question", "Here is the answer to the simple genetics question"); 
        question::generate_question_html("Simple Genetics Question", "Here is the answer to the simple genetics question"); 
    ?>
</div>

<div class="panel-group" id="accordion-<?php echo question::$section_num++?>">
    <div><h4>Technical Questions</h4></div>

    <?php 
        question::generate_question_html("How can I submit a bug or potential new feature", "You can navigate to the <a href='/report-problem'>Report a Problem</a> page to either submit a bug/error or suggest new features."); 
        // question::generate_question_html("How do I add this to my home screen", "Coming Soon, ");
        question::generate_question_html("How was this application created", "This application was powered by JavaScript and designed with the front end framework bootstrap. It was developed by <a href='http://joshuarogan.com' target='_blank'> Josh Rogan </a> and commissioned by Dr. John Shaffer, Assistant Professor of Human Genetics at the University of Pittsburgh.");
       
    ?>
   
</div>

