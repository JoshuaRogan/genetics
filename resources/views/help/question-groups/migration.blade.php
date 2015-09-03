
@set('question_set', 'learn-migration')
<ul class='list-unstyled question collapsible' data-collapsible="accordion">

@partial('help.macros.question')
    @block('question-title', 'What is migration?')
    @block('question-id', 'migration') 

    @block('question-content')
    	Migration is the movement of alleles among <strong>subpopulations</strong>.
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Viewpoints for population structure')
    @block('question-id', 'population-viewpoints') 

    @block('question-content')
        <ul> 
        	<li>A meta-population may be divided into subpopulations (geographical regions or ethnic groups). </li>
            <li>People more often mate within their subpopulation, but there is some mixing. </li>
            <li>From the point of view of the <strong>meta-population</strong>, the population structure is an example of non-random mating. </li>
            <li>From the point of view of the <strong>subpopulation</strong>, the population structure is an example of migration</li>
        </ul>
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is genetic migration?')
    @block('question-id', 'genetic-migration') 

    @block('question-content')
    	For the purpose of studying population genetics, migration does NOT necessarily involve people migrating from one geographical place to another. Migration from the genetic standpoint is only interested in movement of alleles among subpopulations. 

    	<br/><strong>Examples: </strong>
    	<ul> 
    		<li>Sailors land on island, mate with natives, and then sail on </li>
			<li>European settlers mate with native Americans </li>
			<li>Mixing of people of African ancestry and European ancestry in North America  </li>
    	</ul>

    	<strong>Counter Example: </strong>
    	<ul> 
    		<li>Entire island population moves from a volcanically active island to an uninhabited nearby island (i.e. NO genetic migration) </li>
    	</ul>

	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What are the effects of migration?')
    @block('question-id', 'migration-effects') 

    @block('question-content')
    	<strong>Qualitative: </strong>
    	<ul>
	    	<li>Migration among populations is "homogenizing"
	    		<ul> 
					<li>Allele frequencies of each population move toward the average</li>
					<li>Do not confuse homogenous with homozygous </li>
				</ul>
			</li>
			<li>Affects the entire genome simultaneously</li>
			<li>Speed of homogenization dependent on rate(s) of migration among populations</li>

    	</ul>

    	<strong>Quantitative: </strong>
    	<ul>
    		<li> Difficult to accurately model; we will do math under some very simple models of migration. </li>
    	</ul>

	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is the general migration model?')
    @block('question-id', 'general-migration-model') 

    @block('question-content')
    	<img src="images/faq/migration/general-migration-model.png" alt="General migration model">
    	<img src="images/faq/migration/general-migration-model-2.png" alt="General migration model 2">
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What is the island model of migration?')
    @block('question-id', 'island-migration-model') 

    @block('question-content')
    	<img src='images/faq/migration/island-model.png' alt='What is the island model of migration?'> 

	    <ul> 
			<li>Many populations; migration rates among all. Population of interest is an "island". Collectively call all of the other populations together a "continent" </li>
			<li>P(A) for each population, p</li>
			<li>p = average p over all populations (p of meta-population). Does not change over time (think of whole-world allele freq.</li>
			<li>m = migration rate. P(next-gen. allele in island comes from the continent). 1 – m = P(next-gen. allele is from the island).</li>
		</ul>
	@endblock
@endpartial


@partial('help.macros.question')
    @block('question-title', 'One-way Racism as General Model')
    @block('question-id', 'one-way-racism') 

    @block('question-content')
    	<img src='images/faq/migration/one-way-racism.png' alt='One-way Racism as General Model'>
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Two-way Racism as General Model')
    @block('question-id', 'two-way-racism') 

    @block('question-content')
    	<img src='images/faq/migration/two-way-racism.png' alt='Two-way Racism as General Model'>
	@endblock
@endpartial
</ul>