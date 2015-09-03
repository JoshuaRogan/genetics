
@set('question_set', 'learn-mutation')
<ul class='list-unstyled question collapsible' data-collapsible="accordion">

@partial('help.macros.question')
        @block('question-title', 'What is mutation?')
        @block('question-id', 'what-is-mutation') 

        @block('question-content')
			<p>Mutation is the change in the genetic material. Mutation changes allele frequencies because it creates new alleles. Mutation is the ultimate source of all genetic variation.</p>       
		@endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What causes mutation?')
        @block('question-id', 'causes-mutation') 

        @block('question-content')
        	<p>Mutation is caused by inaccurate DNA copying by cellular machinery and external agents (mutagens) alter DNA.</p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What are the types of mutation?')
        @block('question-id', 'mutation-types') 

        @block('question-content')
			<ul class='list-unstyled'> 
				<li>Nucleotide substitutions</li>
				<li> 
					<ul>
						<li> Single nucleotide polymorphisms (SNPs) </li>
					</ul>
				</li> 

				<li>Insertions/ deletions</li>
				<li> 
					<ul>
						<li>Single nucleotide: ‘indels’</li>
						<li>Change in number of repeats </li>
						<li>Microsatellite, minisatellite, VNTRs, STRs</li>
						<li>Copy number variants (CNVs)</li>
					</ul>
				</li>

				<li>Transposable elements</li>
					<li> 
					<ul>
						<li> LTRs, LINES, SINES, (retroviruses), DNA transposons </li>
					</ul>
				</li>

				<li>Chromosomal rearrangements</li>
				<li> 
					<ul>
						<li> Inversions, translocations, etc.  </li>
					</ul>
				</li>
			</ul>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'Mutation: Unique Event')
        @block('question-id', 'mutation-unique-event') 

        @block('question-content')
        	<p>Happened once. </p>
                <strong> Formula </strong>
                <pre class='formula'> q<sub>0</sub> = 1/(2N) </pre> 
                <p><span class='font-red font-thick'>Note: Other evolutionary mechanisms are required to increase allele frequency if the event is to be observable at a population level. </span></p>
                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How are unique event mutations related to epidemiology?')
        @block('question-id', 'unique-event-epidemiology') 

        @block('question-content')
        	<p>Often assume an observed genetic variant is unique (i.e. exists on a specific genetic background, linked and in LD with surrounding variants). We can use linked markers as proxy for the unique (possibly rare) variant.</p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'How are unique event mutations related to population genetics?')
        @block('question-id', 'unique-event-population-genetics') 

        @block('question-content')
        	<p>Introduce new allele. Modeling unique events are beyond the scope of population genetics. Not possible to formulate principals governing unique events.</p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'Mutation: Recurrent Event')
        @block('question-id', 'mutation-recurrent-event') 

        @block('question-content')
        	<p>Recurrent event mutation occur at some rate that is large enough to happen more than once. </p>
                
                <p><strong>Example:</strong><br/> Bacteria and sensitivity vs. resistance to an 'exposure'. Spread 'sensitive' bacteria culture across a plate. Expose the bacteria (to a toxin, antibiotic, etc.). Sensitive bacteria die, resistant bacteria (mutant) start new colonies. Count the colonies to calculate rate of recurrpnt mutation</p>.
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the mutation rate in humans?')
        @block('question-id', 'mutation-rate-in-humans') 

        @block('question-content')
        	<p>Differs by type of mutation: Nucleotide substitution:  ~10<sup>-8</sup> Repeat expansion/contraction:  ~10<sup>-4</sup>. Increase with paternal age (doubles between age 25 and 50). Constant across maternal age.</p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the One-Way mutation model?')
        @block('question-id', 'one-way-mutuation-model') 

        @block('question-content')
        	<p>Mutation is from A → a  at a rate of &mu; per generation.</p>
                
                <strong> Formulas </strong>
                <pre class='formula'>p<sub>t</sub> = p<sub>0</sub> (1- m)<sup>t</sup></pre>
                <pre class='formula'>t = number of generations <br/>p<sub>0</sub> = starting allele frequency <br/>p<sub>t</sub> = allele frequency in generation t <br/>&mu; = mutation rate</pre>
                
                <p>Know any three of these and you can solve for the fourth. </p>
                <p><span class='font-red font-thick'>Note: There is no reverse mutation in the one-way model.</span></p>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the Two-Way mutation model?')
        @block('question-id', 'two-way-mutuation-model') 

        @block('question-content')
        	<p>Mutation is from A → a  at a rate of &mu; per generation = Forward Mutation.</p> 
        	<p>Mutation is from a → A  at a rate of ν per generation = Reverse Mutation. </p> 

        	<div>
                        One Generation:
        	       <pre class="formula">p<sub>1</sub> = p<sub>0</sub> (1-&mu;) + q<sub>0</sub> v </pre>
                </div>

                <div> 
        	       T Generations: 
        	       <img src="images/faq/mutation/t-generations.png" alt="T generations formula"> 
                </div>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'Mutation-selection balance')
        @block('question-id', 'mutation-selection-balance') 

        @block('question-content')
        	IF: 
        		<ul> 
        			<li>the harmful allele, “a”, appears in a population at a forward mutation rate, &mu; , per generation</li>
					<li>there is selection against the harmful allele, “a”</li>
				</ul>
			THEN:
				<ul> 
					<li>The allele frequency, q, of “a” will approach an equilibrium frequency that is a function of &mu;, h, and s</li>
				</ul>

			General Recessive Disease:	 q<sub>eq</sub>   =  (&mu;/s)<sup>0.5</sup>
			General Dominant Disease:	 q<sub>eq</sub>   =  &mu;/hs


 
        @endblock
@endpartial

</ul>