{{--
     For anyone who would like to create there own questions follow the template described below. 
     IMPORTANT: 
        -Make sure each question-id is unique, all lower case and contains no special characters or spaces. 
        -Try to keep the questions name relatively short so it doesn't wrap.

        Anything inside the curly braces and double dashes are considered comments and are ignored 
--}}

@set('question_set', 'faq-misc') {{-- UNIQUE ID FOR THE SET OF QUESTIONS [SHOULN'T HAVE TO CHANGE] --}}
<ul class='list-unstyled question collapsible' data-collapsible="accordion">
{{--Basic Layout (Copy and Paste this for each question)--}}
@partial('help.macros.question')
    @block('question-title', 'Can the parameters of the simulation change across generations?')

    @block('question-content')
        <p>Generally, no.  Once set, the parameters set by the user remain fixed for the duration of the simulation.  However, some complex scenarios can be simulated in pieces, where the result (ending allele frequency) of a simulation be input as the starting point for a second phase under a new set of parameters.  Multiple simulations can be strung together in this fashion to create multi-phase scenario.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How can I cite the simulator? ')

    @block('question-content')
        <cite>John R. Shaffer, Joshua Rogan.  Online human population genetics simulator: a tool for genetics/genomics education and research.  (2015) American Society of Human Genetics 65th Annual Meeting.  Oct. 9, 2015.  Baltimore, MD. Abstract #1701F.</cite>
    @endblock
@endpartial


</ul>