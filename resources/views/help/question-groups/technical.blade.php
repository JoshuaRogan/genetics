@set('question_set', 'faq-simulator-technical')
<ul class='list-unstyled question collapsible' data-collapsible="accordion"  id='question-panel-{{$question_set}}-@render("question-id")'>

@partial('help.macros.question')
        @block('question-title', 'How can I submit a bug or potential new feature? ')
        @block('question-id', 'bug-report') 

        @block('question-content')
            <p>You can navigate to the <a href='/report-problem'>Report a Problem</a> page to either submit a bug/error or suggest new features.</p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How was this application created? ')
        @block('question-id', 'how-was-this-application-created') 

        @block('question-content')
            <p>This application was created by <a href='http://joshuarogan.com' target='_blank'> Josh Rogan </a> and commissioned by <a href='http://www.publichealth.pitt.edu/home/directory/john-r-shaffer' target="_blank">Dr. John Shaffer</a>, Assistant Professor of <a href='http://www.publichealth.pitt.edu/human-genetics' target="_blank">Human Genetics</a> at the <a href='http://www.pitt.edu/' target="_blank">University of Pittsburgh</a>.</p> 
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How was this application developed?')
        @block('question-id', 'how-was-this-application-developed') 

        @block('question-content')
            <p>The graphing application is powered by JavaScript with heavy usage of <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Web_Workers_API" target="_blank">Web Workers</a> for performance. The graphing library for both the simulators is <a href="http://canvasjs.com/" target="_blank">CanvasJS</a> as it out performed all other responsive graphing libraries. The frontend design is built with the responsive frontend framework <a href="http://trends.builtwith.com/docinfo/Twitter-Bootstrap" target="_blank">Twitter Bootstrap</a>. The backend utilizes the PHP framework <a href="http://trends.builtwith.com/framework/Laravel" target="_blank">Laravel</a> heavily utilizing the Blade templating engine.</p>

            <strong>Everything Else: </strong> 
            <ul class="list-unstyled list-inline"> 
                <li><a href="http://trends.builtwith.com/Web-Server/Apache" target="_blank">Apache</a></li>
                <li><a href="http://trends.builtwith.com/javascript/jQuery" target="_blank">JQuery</a></li>
                <li><a href="http://refreshless.com/nouislider/" target="_blank">noUISlider</a></li>
                <li><a href="http://trends.builtwith.com/widgets/Font-Awesome" target="_blank">FontAwesome</a></li>
                <li><a href="http://trends.builtwith.com/javascript/LESS" target="_blank">LESS</a></li>
                <li><a href="http://trends.builtwith.com/cdn/CloudFlare" target="_blank">CloudFlare</a></li>
                <li><a href="http://trends.builtwith.com/analytics/Google-Analytics" target="_blank">Google Analytics</a></li>
                <li><a href="http://trends.builtwith.com/widgets/Imgur" target="_blank">Imgur</a></li>
                <li><a href="http://trends.builtwith.com/Server/mod_pagespeed" target="_blank">PageSpeed</a></li>
                <li><a href="http://gruntjs.com/" target="_blank">Grunt</a></li>
                <li><a href="https://nodejs.org/" target="_blank">NodeJS</a></li>
            </ul>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How can I support this project? ')
        @block('question-id', 'support-project') 

        @block('question-content')
            <p>To support this project you can submit <a href="/report-problem" target="_blank">bugs</a>, submit issues to the <a href="https://github.com/JoshuaRogan/genetics" target="_blank">github repository</a>, or contact us!</p>
        @endblock
@endpartial
</ul>