
@set('question_set', 'learn-genetic-drift')
<ul class='list-unstyled question collapsible' data-collapsible="accordion">

@partial('help.macros.question')
        @block('question-title', 'What is drift?')
        @block('question-id', 'what-is-drift') 

        @block('question-content')
            Random changes in allele frequency by chance in finite populations. Particularly important for small populations. Due to the random sampling of gametes.                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'Why does drift happen? ')
        @block('question-id', 'why-does-drift-happen')

        @block('question-content')
            The "law of large numbers" predicts random sampling of alleles will have a small effect in large populations. However, in small populations, random sampling of alleles can greatly affect allele frequencies in the next generation.           

            <img src='images/faq/genetic-drift/drift-happen.png' alt='Why does genetic drift happen?'>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the Wright-Fisher model?')
        @block('question-id', 'wright-fisher-model') 

        @block('question-content')                         
                <img src='images/faq/genetic-drift/wright-fisher.png' alt='What is the Wright-Fisher model?'>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What happens in the long term')
        @block('question-id', 'long-term') 

        @block('question-content')
            Eventually (at time &lt; infinity) one allele is fixed.         
            <ul> 
                <li> It can be either allele </li> 
                <li> With 2N = 8, it happens pretty fast, usually </li> 
                <li> At any given point in time, the probability that A is the allele that will become fixed in the future is the current allele frequency, p<sub>t</sub> </li> 
            </ul>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How does drift operate in real human populations?')
        @block('question-id', 'human-populations') 

        @block('question-content')
            Drift mostly comes into play when the population is genetically isolated.               
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is a population bottleneck?')
        @block('question-id', 'population-bottleneck') 

        @block('question-content')
            A population bottleneck is when a large population is reduced, then re-expands.         
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the Founder Effect?')
        @block('question-id', 'founder-effect') 
        
        @block('question-content')
            It is genetic effects on a population started by a small group of individuals. Ex. If 100 alleles emigrate to the desert, THAT IS the new population!           
        @endblock
@endpartial
</ul>