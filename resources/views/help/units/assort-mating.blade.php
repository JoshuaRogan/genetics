@set('question_set', 'faq-learn-assortative-mating')

@partial('help.macros.question')
    @block('question-title', 'What is Assortative mating?')
    @block('question-id', 'assortative-mating') 

    @block('question-content')
    	Assortative mating is where a choice of mate is dependent on a particular phenotype or genotype.
    	<br/><strong>Examples:</strong>
    	<ul class='list-unstyled'> 
    		<li>People more often mate with those of similar height / skin tone</li>
    		<li>Deaf people more often mate with deaf people</li>
    	</ul>
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'What are the types of Assortative Mating?')
    @block('question-id', 'types-of-assortative-mating') 

    @block('question-content')
    	<strong>Positive assortative mating:</strong>  mating between people with like phenotypes/genotypes <br/>
    	<strong>Negative assortative mating:</strong>  mating between people with unlike phenotypes/genotypes
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Key Qualitative Concepts of Assortative Mating?')
    @block('question-id', 'key-concepts') 

    @block('question-content')
    	<div class="table-responsive"> 
    		<table class='table'> 
    			<tr> 
    				<td> Type of Assortative Mating </td>
    				<td> Effect on freq. homozygotes </td>
    				<td> Effect on freq. heterozygotes </td>
    			</tr>

    			<tr> 
    				<td> positive </td>
    				<td> increases </td>
    				<td> decreases </td>
    			</tr>

    			<tr> 
    				<td> negative </td>
    				<td> decreases </td>
    				<td> increases </td>
    			</tr>
    		</table>
    	</div>

    	Amount of increase or decrease depends on the specific scheme. Assortative mating does NOT change allele frequencies but it DOES affect the rate at which natural selection changes allele frequencies. 
 
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Assortative mating in human populations')
    @block('question-id', 'human-populations') 

    @block('question-content')
    	Humans tend to have positive assortative mating on characteristics they observe in their mates: height, weight, disability, and ethnicity. 
    	Negative assortative mating may be rare in humans: HLA and scent and recessive mutation testing
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Mating type frequency table')
    @block('question-id', 'mating-type-frequency-table') 

    @block('question-content')
    	    	<div class="table-responsive"> 
    		<table class='table'> 
    			<tr> 
    				<th> Mating-type </th>
    				<th> Frequency </th>
    				<th> P(child is AA) </th>
    				<th> P(child is Aa) </th>
    				<th> P(child is aa) </th>
    			</tr>

    			<tr> 
    				<td> AA x AA </td>
    				<td> U </td>
    				<td> 1 </td>
    				<td> 0 </td>
    				<td> 0 </td>
    			</tr>

    			<tr> 
    				<td> AA x Aa  </td>
    				<td> V </td>
    				<td> 0.5 </td>
    				<td> 0.5 </td>
    				<td> 0 </td>
    			</tr>

    			<tr> 
    				<td> AA x aa  </td>
    				<td> W </td>
    				<td> 0 </td>
    				<td> 1 </td>
    				<td> 0 </td>
    			</tr>

    			<tr> 
    				<td> Aa x Aa  </td>
    				<td> X </td>
    				<td> 0.25 </td>
    				<td> 0.5 </td>
    				<td> 0.25 </td>
    			</tr>

    			<tr> 
    				<td> Aa x aa  </td>
    				<td> Y </td>
    				<td> 0 </td>
    				<td> 0.5 </td>
    				<td> 0.5 </td>
    			</tr>

    			<tr> 
    				<td> aa x aa  </td>
    				<td> Z </td>
    				<td> 0 </td>
    				<td> 0 </td>
    				<td> 1 </td>
    			</tr>
    		</table>
    	</div>

    	Assortative mating leads to changes in genotype frequencies. Therefore, except under specific circumstances, mating frequencies (U-Z) will also change after every generation.

	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Mating type freq. under different mating systems')
    @block('question-id', 'different-systems') 

    @block('question-content')
    	    	    	<div class="table-responsive"> 
    		<table class='table'> 
    			<tr> 
    				<th> Mating-type </th>
    				<th> HWE (Random) </th>
    				<th> Complete Positive </th>
    				<th> Complete Negative </th>
    				<th> General </th>
    			</tr>

    			<tr> 
    				<td> AA x AA </td>
    				<td> D<sup>2</sup> </td>
    				<td> D </td>
    				<td> 0 </td>
    				<td> U </td>

    			</tr>

    			<tr> 
    				<td> AA x Aa  </td>
    				<td> 2DH </td>
    				<td> 0 </td>
    				<td> (DH)/(DH+DR+HR) </td>
    				<td> V </td>
 
    			</tr>

    			<tr> 
    				<td> AA x aa  </td>
    				<td> 2DR </td>
    				<td> 0 </td>
    				<td> (DR)/(DH+DR+HR) </td>
    				<td> W </td>
  
    			</tr>

    			<tr> 
    				<td> Aa x Aa  </td>
    				<td> H<sup>2</sup> </td>
    				<td> H </td>
    				<td> 0 </td>
    				<td> X </td>

    			</tr>

    			<tr> 
    				<td> Aa x aa  </td>
    				<td> 2HR </td>
    				<td> 0 </td>
    				<td> (HR)/(DH+DR+HR) </td>
    				<td> Y </td>

    			</tr>

    			<tr> 
    				<td> aa x aa  </td>
    				<td> R<sup>2</sup> </td>
    				<td> R </td>
    				<td> 0 </td>
    				<td> Z </td>
    			</tr>
    		</table>
    	</div>

    	<pre class='formula'>P(AA) = D<br/>P(Aa) = H<br/>P(aa) = R</pre>
    	Mating type frequencies always sum to 1. Many different (potentially complex) mating schemes are possible
	@endblock
@endpartial

@partial('help.macros.question')
    @block('question-title', 'Genotype frequencies after one generation of assortative mating')
    @block('question-id', 'genotype-freq-one-gen') 

    @block('question-content')
    	<img src='images/faq/assortative-mating/genotype-freq.png' alt='Genotype frequencies after one generation of assortative mating'>
	@endblock
@endpartial
