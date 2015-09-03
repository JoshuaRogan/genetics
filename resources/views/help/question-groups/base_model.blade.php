{{--
     For anyone who would like to create there own questions follow the template described below. 
     IMPORTANT: 
        -Make sure each question-id is unique, all lower case and contains no special characters or spaces. 
        -Try to keep the questions name relatively short so it doesn't wrap.

        Anything inside the curly braces and double dashes are considered comments and are ignored 
--}}

@set('question_set', 'faq-base-model')
<ul class='list-unstyled question collapsible' data-collapsible="accordion">

{{--Basic Layout (Copy and Paste this for each question)--}}
@partial('help.macros.question')
    @block('question-title', 'What is an allele?  What is an allele frequency?')
    @block('question-id', 'what-is-an-allele')

    @block('question-content')
        <p>An allele is a particular variant at a genetic locus.  This simulator uses a two-allele system where "A" is the allele being modeled, and "a" is the other allele.</p>
        <p>The allele frequency is the rate at which a given allele occurs in a population.  For this simulator, the frequency of the A allele is denoted p and can be calculated as the number of A alleles divided by the total number of alleles in the population.  Likewise, the frequency of the a allele can be calculated as the number of a alleles divided by the total number of alleles in the population, and is equal to 1-p.  The frequencies of the two alleles, A and a, sum to 1.</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is a genotype?')
    @block('question-id', 'what-is-genotype')

    @block('question-content')
        <p>For diploid organisms including humans, individuals carry two copies of their genome, one inherited from each parent.  The set of two alleles at a genetic locus carried together in an individual is called a genotype.  In this simulator, the designations "AA", "Aa", and "aa" are used to refer to the three genotype groups.  The frequencies of the three genotype groups sum to 1.</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is a generation and how is it modeled in this simulator?')
    @block('question-id', 'generation-modeled-simulator')

    @block('question-content')
        <p>A generation refers to the descent from parents to offspring.  In this simulator, mating occurs only within a given generation, not across generations.  This process leads to a series of discreet generations where the alleles of the next generation are derived solely from the immediate previous generation.</p>
        <p>The simulator achieves this system via “memory-less” sampling of alleles from the previous generation.  In other words, the alleles of a new generation are sampled from the previous generation without regard to which alleles have already been sampled and without regard to allelic composition of more ancestral generations.  </p>
        <p>Note, the subscript 0 and 1 are used to denote generation numbers of parents and offspring, respectively, in this FAQ and other simulator documentation.</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Can more than two alleles be modeled at a time?')
    @block('question-id', 'more-than-two')

    @block('question-content')
        <p>No.  This simulator is designed for a two-allele system.  However, in practice, multi-allele systems can be modeled by defining the A allele as the allele of interest, and defining the a allele as the collection of all non-A alleles combined.</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is the population size?')
    @block('question-id', 'what-is-population-size')

    @block('question-content')
       <p>The population size used in the simulator is normally the number of individuals in the population, i.e., the census population size.  The number of alleles is twice the population size.  </p>
       <p>Note, for sexually reproducing organisms with unequal sex ratios, the effective population size should be input, rather than the census population size.  The effective population size is calculated as follows:</p>
       <h1>--------------ADD IMAGE HERE</h1>
       <p>where N<sub>e</sub> is the effective population size, and N<sub>m</sub> and N<sub>f</sub> are the number of males and females, respectively.  </p>
    @endblock
@endpartial

</ul>