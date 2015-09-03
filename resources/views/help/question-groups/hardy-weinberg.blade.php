{{--
     For anyone who would like to create there own questions follow the template described below. 
     IMPORTANT: 
        -Make sure each question-id is unique, all lower case and contains no special characters or spaces. 
        -Try to keep the questions name relatively short so it doesn't wrap.

        Anything inside the curly braces and double dashes are considered comments and are ignored 
--}}

@set('question_set', 'faq-hardy-weinberg') {{-- UNIQUE ID FOR THE SET OF QUESTIONS [SHOULN'T HAVE TO CHANGE] --}}
<ul class='list-unstyled question collapsible' data-collapsible="accordion">
{{--Basic Layout (Copy and Paste this for each question)--}}
@partial('help.macros.question')
    @block('question-title', 'What is Hardy-Weinberg Equilibrium?')

    @block('question-content')
        <p>The Hardy-Weinberg principal states that if a set of assumptions are met regarding the forces governing the genetics of the population, then the genotype frequencies will occur in the “Hardy-Weinberg proportions” and the allele and genotype frequencies will remain stable across generations.  The Hardy-Weinberg proportions reflect a simple relationship between genotype and allele frequencies.  Specifically, the genotype frequencies are: </p>
        <pre class='text-center'>P(AA) = p<sup>2</sup><br/>P(Aa) = 2pq<br/>P(aa) = q<sup>2</sup></pre>
        <p>where p is the frequency of the A allele and q is the frequency of the a allele. </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What are the Hardy-Weinberg assumptions?')
    @block('question-content')
        <p>The assumptions central to Hardy-Weinberg equilibrium are as follows:</p>
        <ul>
            <li>diploid organism</li>
            <li>sexual reproduction </li>
            <li>non-overlapping generations </li>
            <li>random mating</li>
            <li>infinitely large population size</li>
            <li>equal allele frequencies in the sexes</li>
            <li>no migration, mutation, or selection</li>
        </ul>
        <p>Violations of any of these assumptions can lead to deviations from Hardy-Weinberg equilibrium.  Depending on which assumptions are violated, allele and genotype frequencies may change across generations, or the genotype frequencies may deviate from the Hardy-Weinberg proportions.  </p>
        <p>Note that violations of these assumptions may result in deviations from Hardy-Weinberg equilibrium, but also may not.  Indeed, genotype frequencies may appear to be in Hardy-Weinberg equilibrium even if some assumptions are violated.  Moreover, observing that a population/locus is in Hardy-Weinberg equilibrium does not imply that all assumptions are met.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What happens if Hardy-Weinberg assumptions are violated?')
    @block('question-content')
        <p>Answering this question forms the basis of the genetic simulator.  Many of the parameters set by the user represent forces that shape the genetic composition of the population.  These forces are violations of the Hardy-Weinberg assumptions.  Some have predictable effects on allele and genotype frequencies.  Others represent random processes governed by chance.  Combinations of forces can act simultaneously.</p>
        <p>Overall, violations in Hardy-Weinberg assumptions may lead to interesting changes in the genetic composition of a population. </p>
    @endblock
@endpartial
</ul>