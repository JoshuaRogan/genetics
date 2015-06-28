@set('question_set', 'faq-learn-inbreeding')

@partial('help.macros.question')
    @block('question-title', 'What is inbreeding?')
    @block('question-id', 'inbreeding') 

    @block('question-content')
    	Inbreeding for and individual:  mating with a relative
    	Inbreeding for a population: matings between relatives occur more often than expected by chance

    	Similar to assortative mating and population substructure. Relatives likely to share genotypes/phenotypes = assortative mating. Cultural (distant) inbreeding = population substructure. Inbreeding affects all genes/loci across the genome.
 
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Related Ideas')
    @block('question-id', 'related-ideas') 

    @block('question-content')
    	<div class="table-responsive"> 
    		<table class='table'> 
    			<tr> 
    				<th>  </th>
    				<th> assortative mating </th>
    				<th> population substructure </th>
    				<th> inbreeding </th>
    			</tr>

    			<tr> 
    				<td> occurs with respect to: </td>
    				<td> a specific phenotype or genotype  </td>
    				<td> inclusion in (or exclusion from) a group  </td>
    				<td> Individuals’ relatedness  </td>
    			</tr>

    			<tr> 
    				<td> effects: </td>
    				<td> few genes  </td>
    				<td> many genes  </td>
    				<td> entire genome  </td>
    			</tr>

    		</table>
    	</div>
    	These ideas are not mutually exclusive;  they can all be happening at the same time (and to some degree probably are). They describe different aspects of a system of non-random mating. All defined with respect an arbitrary "population" under consideration. No clear or technical distinctions between them
	@endblock
@endpartial



@partial('help.macros.question')
    @block('question-title', 'What is the inbreeding coefficient?')
    @block('question-id', 'inbreeding-coefficient') 

    @block('question-content')
    	The inbreeding coefficient is the probability that both alleles (at a random locus) in an individual are IBD, i.e. autozygous. 
    	<ul>  
    		<li>F = 0	there is no inbreeding</li>
    		<li>F = 1	there is complete inbreeding</li>
    	</ul>

    	<ul>  
    		<li>F for an individual tells you how inbred that person is</li>
    		<li>Average F for a randomly selected population sample tells you how inbred the population is</li>
    		<li>In humans F will always be between 0 and 1 (non-inclusive)</li>
    		<li>F = 0 or 1 can occur for inbred strains of experimental organisms</li>
    	</ul>


	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What are the effects of inbreeding?')
    @block('question-id', 'inbreeding-effects') 

    @block('question-content')
    	<ul>  
    		<li>No change in allele frequencies</li>
			<li>Increases frequency of homozygotes</li>
			<li>Decreases frequency of heterozygotes </li>
			<li>Affects entire genome</li>
			<li>Genotype frequencies are a function of F</li>
    	</ul>

    	<strong> Formula </strong>
    	<pre class='formula'>P(AA) = p<sup>2</sup> + Fpq<br/>P(Aa) = 2pq – 2Fpq<br/>P(aa) = q<sup>2</sup> + Fpq</pre>




	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Inbreeding and recessive diseases')
    @block('question-id', 'recessive-diseases') 

    @block('question-content')
    	Inbreeding increases homozygosity
    	<ul>  
    		<li>Therefore an inbred individual has increased risk of recessive disease</li>
			<li>An inbred population has increased prevalence of recessive disease</li>
			<li>This increase is not huge, but operates at every locus</li>
    	</ul>

	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How does the inbreeding coefficient change over time?')
    @block('question-id', 'f-over-time') 

    @block('question-content')
    	The inbreeding genotype frequencies (p2 + Fpq, etc.) are NOT an equilibrium. <br/>
    	Example scenarios where F changes:
    	<ul>  
    		<li>If the rate of close inbreeding stays the same in a population (e.g. 1/1000 matings is between first cousins), then F keeps increasing with every generation.</li>
			<li>If the population size is increasing over time, the rate of “distant inbreeding” (e.g. unknowing mating between 10th cousins) will decrease.  </li>
    	</ul>
    	The value of F at any given point in time, depends on a lot of factors, but unlikely to remain constant.  
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How do you calculate F?')
    @block('question-id', 'calculate-F') 

    @block('question-content')
    	For an individual in a pedigree, calculate F by:
    	<ol>
    		<li>Drawing the pedigree as a node graph
  
    			<ul> 
					<li>each person is a point</li>
					<li>lines connect points wherever an allele is inherited</li>
				</ul>

			</li>

			<li>Listing all paths from one parent (of the target person) to the other parent, through a common ancestor
				<ul> 
					<li>do this for all common ancestors</li>
				</ul>
			</li>

			<li>m<sub>i</sub> is the number of individuals in path i 
			
				<ul> 
					<li>include both parents (of the target person) in the count</li>
				</ul>
			</li>

			<li>F<sub>i</sub> is the inbreeding coefficient for the common ancestor in path i</li>
    	</ol>


	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Example of First Cousin Mating')
    @block('question-id', 'first-cousin-mating') 

    @block('question-content')
    	<img src='images/faq/inbreeding/first-cousin-mating.png' alt='Example of First Cousin Mating'>
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'How do you calculate F for a population?')
    @block('question-id', 'calculate-f-population') 

    @block('question-content')
    	<ol> 
	    	<li>Take a random sample of individuals from the population</li>
			<li>Draw pedigrees</li>
			<li>Calculate F for each person</li>
			<li>Average</li>
    	</ol>
	@endblock
@endpartial



@partial('help.macros.question')
    @block('question-title', 'Coefficients, Notation and More')
    @block('question-id', 'coefficients-notation') 

    @block('question-content')
    	<ul> 
	    	<li>Definition / notation 
	    		<ul>
					<li>&Phi;, probability that two random alleles in two different people are IBD  </li>
				</ul>
			</li>

			<li>Meaning
				<ul>
					<li>measure of how closely related the two people are</li>
					<li>&Phi; = 0 means people are unrelated</li>
					<li>&Phi; = 1/2 means people are genetically identical</li>
				</ul>
			</li>

			<li>Coefficient of kinship vs. coefficient of inbreeding
				<ul>
					<li>remember, F is the probability of two alleles IBD in an individual</li>
					<li>F for a person = &Phi; for the person’s parents (hint for solving problems)</li>
					<li>F for a population = &Phi; for a population</li>
				</ul>
			</li>
		</ul>

		Note:  sometime texts are imprecise about F and &Phi;

	@endblock
@endpartial

