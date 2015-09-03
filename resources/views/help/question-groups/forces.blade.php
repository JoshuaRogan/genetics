{{--
     For anyone who would like to create there own questions follow the template described below. 
     IMPORTANT: 
        -Make sure each question-id is unique, all lower case and contains no special characters or spaces. 
        -Try to keep the questions name relatively short so it doesn't wrap.

        Anything inside the curly braces and double dashes are considered comments and are ignored 
--}}

@set('question_set', 'faq-forces-shaping') {{-- UNIQUE ID FOR THE SET OF QUESTIONS [SHOULN'T HAVE TO CHANGE] --}}
<ul class='list-unstyled question collapsible' data-collapsible="accordion">
{{--Basic Layout (Copy and Paste this for each question)--}}
@partial('help.macros.question')
    @block('question-title', 'What is genetic drift?')

    @block('question-content')
        <p>Genetic drift refers to the random changes in allele frequency that occur in finite populations due to the chance sampling of gametes. Drift is particularly important for small populations.  </p>
        <p>In the absence of other evolutionary forces, drift will eventually bring about the fixation of one allele.  It could be any allele, and the probability of a given allele eventually becoming fixed in the future is its current allele frequency.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is genetic drift modeled in this simulator?')

    @block('question-content')
        <p>Genetic drift is modeled by the random selection of alleles from a current generation chosen to be transmitted to the next generation.  This is achieved by random sampling with replacement.  Drift is activated as long as a finite population size is specified.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is a population bottleneck?')

    @block('question-content')
       <p>A population bottleneck occurs when the size of a population decreases for some number of generations, followed by an expansion.  The effects of genetic drift on the genetic composition of the population may be more pronounced during a population bottleneck.</p> 
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is a population bottleneck modeled in this simulator?')

    @block('question-content')
        <p>A population bottleneck is modeled by changing the size of the simulated population for a specified number of generations.  Note, while “bottleneck” generally refers to a temporary decrease in population size, the simulator allows any one-time change in size (i.e., decrease or increase) that lasts for any number of generations.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is an "infinitely large" population?')

    @block('question-content')
        <p>An infinitely large population is simply a theoretical population comprising an infinite number of individuals.  This allows chance events (such as the random sampling of alleles) to converge in probability toward the expect value.  In other word, this assumption take chance out of the scenario. </p> 
        <p>In infinitely-large populations, there is no random sampling of alleles.  Instead, allele frequencies of the next generation are derived precisely from the previous generation. </p> 
        <p>Because infinitely-large populations do not experience the effects of genetic drift, modeling their behavior may be of interest, especially if the user is interested in the effects of other evolutionary forces </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is an infinitely-large population modeled in this simulator?')

    @block('question-content')
        <p>Because there is no random sampling of alleles in infinitely-large populations, allele frequencies of the next generation can be derived precisely from those of the previous generation.</p>  
        <p>The default setting of the simulator is to model the theoretical infinitely-large population.  Simply leave the Finite Population parameter unchecked (and Population Size parameter unspecified) to simulate an infinitely-large population.</p>
        <p>Note, due to the “Law of Large Numbers”, a large finite population closely approximate the behavior of an infinitely-large population.  Because the computational burden of simulating an infinitely-large population is considerably less than that of simulating a large finite population, users may desire to simulate infinitely-large populations rather than large finite populations.</p>  
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Can population growth be modeled?')

    @block('question-content')
        <p>No. Population growth models are currently not implemented. </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is selection?')

    @block('question-content')
        <p>Selection refers to the differing rates at which alleles are transmitted across generations, due to differences in viability or fertility among the genotype groups</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is selection modeled in this simulator?')

    @block('question-content')
        <p>Two systems are available for defining selection models, but only one of these systems can be active at a time.  </p>

        <p>The first system requires user-specified relative fitness coefficients:  WAA, WAa, and Waa, which represent the relative probabilities that an individual with a particular genotype reproduces.  Typically one or more of the three fitness coefficients is set equal to 1 to serve as a reference, and the others are expressed as a fraction relative to the reference.  After one generation of random mating, the allele frequency is modeled as:</p>

         <img src="http://placehold.it/300x300">

        <p>Note, it is not required that the fitness of a reference allele be set equal to 1.  The three fitness coefficients need only to be proportional to each other. </p>

        <p>The second system for modeling selection uses two user-specified coefficients, the selection coefficient, s, and dominance coefficient, h.  The selection coefficient represents the degree of selection against the aa genotype group with respect to the AA genotype group.  The dominance coefficient represents the degree to which selection also impacts the heterozygote.  Selection and dominance coefficients can be expressed in terms of relative fitness coefficients as follows:</p>

        <img src="http://placehold.it/300x300">

        and

        <img src="http://placehold.it/300x300">

        <p>When selection and dominance coefficients are input by the user, the simulator will calculate the corresponding fitness coefficients, WAa and Waa, and set WAA equal to 1 as the reference.  The above formula is then used to calculate the effect on allele frequency.  </p>

        <p>Both systems can be used to specify models of directional selection (also called positive selection), which in this context means that one allele is clearly favored and the other allele is clearly disfavored.  </p>

        <p>Models of over-dominance (also called heterozygote advantage), a form of balancing selection, can be specified using fitness coefficients.  However, over-dominance cannot be specified in this simulator using selection and dominance coefficients. Other forms of balancing selection, such as frequency-dependent selection, are not implemented at this time.</p>

        <p>Models of under-dominance (also called heterozygote disadvantage), a form of disruptive selection, can be specified using fitness coefficients.  However, under-dominance cannot be specified using selection and dominance coefficients.  </p>


    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Can X-linked/sex-linked selection be modeled?')

    @block('question-content')
        <p>No.  Currently selection occurring at a locus on an autosomal chromosome is implemented.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is mutation?')

    @block('question-content')
        <p>Mutation is defined as a spontaneous change in genetic material.  In some cases, mutation is a unique event.  In other contexts, mutation can be conceptualized as a recurrent event, which occurs at some rate per generation.  In the context of this simulator, mutation means that a given allele spontaneously changes into the other allele.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is mutation modeled in this simulator?')

    @block('question-content')
        <p>Mutation is modeled as a function of the forward (μ, A → a) and reverse (ν, a → A) mutation rates according the following formula: </p>
        <img src="http://placehold.it/300x300">
    @endblock
@endpartial


@partial('help.macros.question')
    @block('question-title', 'What is genetic migration?')

    @block('question-content')
        <p>Genetic migration refers to the movement of outside alleles into the population of interest.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is genetic migration modeled in this simulator?')

    @block('question-content')
        <p> Migration is modeled as a function of the migration rate, m, and the migrant allele frequency, pM, according to the following formula:  </p>
        <p>The migration rate corresponds to the proportion of alleles in the next generation that come from outside the population of interest.  The migrant allele frequency is the allele frequency of the A allele in the set of alleles entering the population.  </p>
        <p>Note, this migration model may result in changes in allele frequency in the population of interest across generations.  However, this model assumes there is no change in allele frequency in the migrant alleles. Therefore this model is applicable for many simplistic migration scenarios such as the “source-sink”, “continent-to-island”, “one island”, and “Wright’s island” models. </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Can migration be modeled between two or more populations of interest?')

    @block('question-content')
        <p>No. The simulator assumes one population of interest (which may evolve across generations), and one static source of migrant alleles.  Models where sources of migrant alleles are themselves changing in genetic composition are not currently implemented. </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is inbreeding?  What is the inbreeding coefficient?  ')

    @block('question-content')
        <p>Inbreeding refers to the mating between two related individuals.   Inbreeding in a population in excess of that expected due to chance alone can be described by the inbreeding coefficient, F.  </p>
        <p>Note, the inbreeding coefficient, F, is one of a family of “genetics F statistics”, also called fixation statistics, that measure various aspects of heterozygosity in individuals and strata within populations and between populations.  In the context of this simulator, the inbreeding coefficient F is equivalent to Wright’s FIS and is equivalent to the average kinship coefficient between pairs of individuals in the previous generation.   </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is inbreeding modeled in the simulator?  ')

    @block('question-content')
        <p>Inbreeding alone does not alter allele frequencies, and therefore it alone will not impact an allele frequency simulation.  Inbreeding will alter the genotype proportions (and therefore impact the genotype frequency simulator).  Other evolutionary forces such as selection operate on genotype groups, and therefore inbreeding may influence the actions of selection on a population.  </p>
        <p>Inbreeding is specified by the inbreeding coefficient, F, where genotype frequencies occur as follows:</p>
        <pre class='text-center'>P(AA) = p<sup>2</sup> – Fpq <br/>P(Aa) = 2pq + 2Fpq <br/>P(aa) = q<sup>2</sup> – Fpq</pre>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is assortative mating?')

    @block('question-content')
        <p>Assortative mating is the tendency of individuals to choose mates with similar (or dissimilar) genotypes.  This bias influences the genotype frequencies of the next generation.  </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How is assortative mating modeled in the simulator?')

    @block('question-content')
        <p>Assortative mating alone does not alter allele frequencies, and therefore it alone will not impact an allele frequency simulation.  Assortative mating will alter genotype proportions (and therefore will impact the genotype frequency simulator).  Other evolutionary forces such as selection operate on genotype groups, and therefore assortative mating may influence the action of selection on a population.  </p>
        <p>Positive assortative mating is specified by the positive assortative mating fraction, α.  The genotype frequencies in the next generation are:</p>
        <pre class='text-center'>P(AA) = [(1 – α)p<sup>2</sup> + α(p<sup>2</sup> + pq/2)] / D <br/>P(Aa) = [(1 – α)2pq + α(pq)] / D <br/>P(aa) = [(1 – α)q<sup>2</sup> + α(q<sup>2</sup> + pq/2)] / D</pre>

        <p>where D = [(1 – α)p<sup>2</sup> + α(p<sup>2</sup> + pq/2)] + [(1 – α)2pq + α(pq)] + [(1 – α)q<sup>2</sup> + α(q<sup>2</sup> + pq/2)]</p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Is negative assortative mating / disassortative mating modeled in the simulator?')

    @block('question-content')
        <p>No, currently only simple-to-define scenarios of positive assortative mating are implemented. </p>
    @endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Can the simulator model multiple evolutionary forces simultaneously?')

    @block('question-content')
        <p>Yes.  One of the major strengths of simulation is that multiple forces can easily be applied simultaneously. </p>
    @endblock
@endpartial

</ul>