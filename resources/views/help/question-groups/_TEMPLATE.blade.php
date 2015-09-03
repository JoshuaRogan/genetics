{{--
     For anyone who would like to create there own questions follow the template described below. 
     IMPORTANT: 
        -Make sure each question-id is unique, all lower case and contains no special characters or spaces. 
        -Try to keep the questions name relatively short so it doesn't wrap.

        Anything inside the curly braces and double dashes are considered comments and are ignored 
--}}

@set('question_set', 'faq-template-questions') {{-- UNIQUE ID FOR THE SET OF QUESTIONS [SHOULN'T HAVE TO CHANGE] --}}
<ul class='list-unstyled question collapsible' data-collapsible="accordion">
{{--Basic Layout (Copy and Paste this for each question)--}}
@partial('help.macros.question')
    @block('question-title', 'QUESTION NAME')

    @block('question-content')
        ANSWER 
        INNER HTML CONTENT OF THE QUESTION!
        CAN BE ANY VALID HTML (SEE BELOW)
    @endblock
@endpartial

{{-- Full HTML Example --}}
@partial('help.macros.question')
        @block('question-title', 'How do I create new questions?') 
        @block('question-id', 'how-do-i-create-questions') 

        @block('question-content')
            The content for a question can go here. You can use any HTML code you like. 
            
            Colored Text: 
                Hello <span class='font-red'>I am red</span> and I am not!
                Hello <span class='font-blue'>I am blue</span> and I am not!
                Notes: 
                   Syntax: <span class='font-COLORNAME'>STUFF YOU WANT THAT COLOR</span>
                   Colors: red, orange, yellow, green, blue, purple, white, blue-green, concrete, off-white.
                   You can add class='font-COLORNAME' to any tag!
            
            Bold Text: 
                Hello<strong>I am bold</strong> and I am not!
                Hello<strong class='font-red'>I am bold AND RED</strong> and I am not!
            Emphasised Text: 
                Hello <em>I am italized</em> and I am not!
                Hello <em class='font-blue'>I am italized AND BLUE</em> and I am not!
            
            Links:
                If you would like to go google.com <a href='http://google.com'>Click here</a>!
                If you would like to go google.com in a new tab<a href='http://google.com' target="_blank">Click here</a>!
                Please check out our <a href="/graphs/allele">Allele Simulator</a>!
                Please check out our <a href="/graphs/allele" class='font-red'>Allele Simulator</a>!

            
            Line Break: 
                First line</br> Second line
                or use paragraphs (auto line breaks between them)
                <p> Paragraph one </p>
                <p> Paragraph <span class='font-orange'>two</span></p>

            
            To add an image: 
                <img src='/image/location/file.png' alt='short description'> (You will have to send me the image)
            
            Bulleted List: 
            	<ul> 
            		<li> List Item One </li>
            		<li> List Item Two </li>
            		<li> List Item Three </li>
            		<li> 
            			<ul> 
            				<li> <strong>Nested</strong> Bullet 1 </li>
            				<li> Nested Bullet 2 </li>
            				<li> Nested Bullet 3 </li>
            			</ul>
            		</li>
            	</ul>

            Numbered list:
            	<ol> 
            		<li> Item <span class='font-green'>Numbered One</span> </li>
            		<li> Item Numbered Two </li>
            		<li> Item Numbered Three </li>
            		<li> 
            			<ol> 
            				<li> Nested Numbered List 1 </li>
            				<li> Nested Numbered List 2 </li>
            			</ol>
            		</li>
            		<li> 
            			<ul> 
            				<li> Nested Bulleted List One </li>
            				<li> Nested Bulleted List One </li>
            				<li> Nested Bulleted List One </li>
            			</ul>
            		</li>
                </ol>

            This is just some simple html elements. You are free to use anything you'd like. 
            Here is a good guide to learn more: http://www.danfergusdesign.com/classfiles/generalReference/html5reference.php

       @endblock
@endpartial

</ul>