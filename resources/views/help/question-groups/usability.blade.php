@set('question_set', 'faq-simulator-usability')
<ul class='list-unstyled question collapsible' data-collapsible="accordion"  id='question-panel-{{$question_set}}-@render("question-id")'>

@partial('help.macros.question')
        @block('question-title', 'How can I create a graph of my simulation? ')
        @block('question-id', 'simulator-graph') 

        @block('question-content')
            <p>To generate a <strong>new</strong> graph you can simply set the simulation parameters that you are interested in and click the "Generate Graph" button. You can then <strong>add</strong> more simulations to the existing graph by clicking the "Add Line" button. You can  <strong>replace</strong> the existing graph with a new simulation by clicking the "Generate Graph" button."  </p>
            <p><a href='http://i.imgur.com/DDdDLC9.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/create_graph.gif' alt="How can I create a graph of my simulation?">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 

        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I change the simulation parameters? ')
        @block('question-id', 'change-simulation-parameters') 

        @block('question-content')
            <p>To change any of the simulation parameters you can open up the appropriate section by either clicking the checkbox to the left of the section name or the down arrow on the right. Once the section is opened you can either move the slider or click on the parameter value to directly input a new value using your keyboard. </p>
            <p><a href='http://i.imgur.com/KMVO51x.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>     
            <img class='faq-lazy' data-original='/images/faq/input.gif' alt="How can I change the simluation parameters">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I activate a simulation parameter? ')
        @block('question-id', 'activate-simulation-parameter') 

        @block('question-content')
            <p>The parameters automatically activate upon moving the slider or inputting a value. If the variable is active the corresponding slider will be shown in color and a check will be present next to the section name. </p>
             
            <p><a href='http://i.imgur.com/XDkBJh6.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>
            <img class='faq-lazy' data-original='/images/faq/activate.gif' alt="How can I activate a simulation parameter?">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div>      
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I deactivate a simulation parameter? ')
        @block('question-id', 'deactivate-simulation-parameter') 

        @block('question-content')
            <p>If a parameter is active (i.e., slider shown in color), you deactivate it by de-selecting the checkbox to the left of the section you would like to deactivate. Once a value is deselected the slider will be grayed out. </p>
            
            <p><a href='http://i.imgur.com/XDkBJh6.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>
            <img class='faq-lazy' data-original='/images/faq/activate.gif' alt="How can I deactivate a simulation parameter?">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div>       
     
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I zoom in the graph? ')
        @block('question-id', 'zoom-graph') 

        @block('question-content')
            <p>To zoom in the graph simply click and drag across the area you would like to zoom in.  </p>
            <p><a href='http://i.imgur.com/Ln5MnIi.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/zoom_pan.gif' alt="How can I zoom in the graph?">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How to pan left and right in the zoomed graph? ')
        @block('question-id', 'pan-graph') 

        @block('question-content')
            <p>Click the directional button on the top right of the graph and click and drag to pan along the x axis of the graph. </p>
            <p><a href='http://i.imgur.com/Ln5MnIi.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/zoom_pan.gif' alt="How can I pan the graph?">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial



@partial('help.macros.question')
        @block('question-title', 'How can I reset the graph? ')
        @block('question-id', 'reset-graph') 

        @block('question-content')
            <p>To reset the graph click the circular arrow on the top right of the graph.  </p>
            <p><a href='http://i.imgur.com/Ln5MnIi.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/zoom_pan.gif' alt="reset the graph">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I save the graph as an image? ')
        @block('question-id', 'save-graph') 

        @block('question-content')
            <p>To save the graph as an image file (jpg and png) click the triple dot in the upper left corner of the graph. </p>
            <p><a href='http://i.imgur.com/135lVeP.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/save_image.gif' alt="save graph as an image">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I increase the contrast for printing or projecting? ')
        @block('question-id', 'increase-contrast') 

        @block('question-content')
            <p>To choose a high contrast version of the graph for printing and projecting you can click the icon in the upper right hand corner of the variables section. </p>
            <p><a href='http://i.imgur.com/Rywoz9S.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/display.gif' alt="increase contrast for printing and projecting">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I view different legends?')
        @block('question-id', 'legend-views') 

        @block('question-content')
            <p>Legends are automatically created for each simulation. Only the most recent simulation is shown. But, you can open legends of any previous simulation by clicking <strong>[Show Legend]</strong> </p>
            <p><a href='http://i.imgur.com/LjDVaj8.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/legend.gif' alt="view different legends">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial


@partial('help.macros.question')
        @block('question-title', 'Where can I find more information on the simulation parameters? ')
        @block('question-id', 'parameter-help') 

        @block('question-content')
            <p> You can click the small question mark next to each variable in order to see a short explanation of the variable or click <strong>[Show Help]</strong> to open all of the parameter descriptions at once. </p>
            <p> There is also a plethoral of help in the <a href="#help-learn">learn</a> section of the this help area! </p>

            <p><a href='http://i.imgur.com/eqw4Rmb.gif'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>      
            <img class='faq-lazy' data-original='/images/faq/helper.gif' alt="ALTTEXT">
            <div class="progress-bar-mat"><div class="indeterminate"></div></div> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I generate a link (URL) for a simulation? ')
        @block('question-id', 'generate-url') 

        @block('question-content')
            You can generate a link (URL) for a set of simulation parameters by clicking on the <i class="fa fa-link"></i>.  Navigating to this URL will prepopulate the set of simulation parameters that you currently have set. Feel free to modify the link to make the parameters more exact to your liking.      
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I access the data represented in the graph? ')
        @block('question-id', 'get-raw-data') 

        @block('question-content')
            You can access the simulation data by clicking on the <i class='fa fa-file-text-o'></i> icon located in the top right corner of the Simulation Parameters section.  This will take you to a seperate page containg scrollable, tab seperated x,y coordinates from each line that are currently on the graph. You can easily copy and paste this into your favorite data manipulation program to perform additional analysis. 
        @endblock
@endpartial
</ul>