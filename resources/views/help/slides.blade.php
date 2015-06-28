{{-- Genetic Drift Section --}}
@section('questions')
	@include('help.units.genetic-drift')
@overwrite 
@section('summary')
	This unit explains the qualitative effects of genetic drift on a population including: founder effects, bottleneck effects, and rare disease alleles. Use Binomial distribution to calculate probabilities of having i alleles in the next generation. Calculate effective population size, probability of allele going to fixation at some point in the future, and approximate number of generations until allele fixation.
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-genetic-drift', 'title'=> 'Unit 2.1 Genetic Drift', 'folder'=> '2_1_drift'])
{{-- /Genetic Drift Section --}}


{{-- Selection Section --}}
@section('questions')
	@include('help.units.selection')
@overwrite 
@section('summary')
	This unit explains how to calculate and interpret fitness and selection coefficients. Explain the qualitative (long-term) effects of different types of selection (dominant, recessive, over-dominant, under-dominant) and of the combination of selection and mutation.Calculate change in allele frequency.Calculate over- and under-dominant equilibria. Interpret and make predictions about simulation plots.
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-selection', 'title'=> 'Unit 2.2 Selection', 'folder'=> '2_2_selection'])
{{-- /Selection Section --}}


{{-- Mutation Section --}}
@section('questions')
	@include('help.units.mutation')
@overwrite 
@section('summary')
	This unit explains how to use the one-way mutation model to calculate t, p<sub>0</sub>, p<sub>t</sub>, and &mu;. Use the two-way mutation model to calculate p<sub>∞</sub> and p<sub>t</sub>. Calculate mutation-selection equilibria. Qualitatively decipher and make predictions about simulation plots.
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-mutation', 'title'=> 'Unit 2.3 Mutation', 'folder'=> '2_3_mutation'])
{{-- /Mutation Section --}}

{{-- Migration Section --}}
@section('questions')
	@include('help.units.migration')
@overwrite 
@section('summary')
	This unit helps you be able to identify whether scenarios constitute genetic migration. Recognize the qualitative effects of migration. Solve and interpret problems under various migration models.
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-migration', 'title'=> 'Unit 2.4 Migration', 'folder'=> '2_4_migration'])
{{-- /Migration Section --}}

{{-- Assortative Mating Section --}}
@section('questions')
	@include('help.units.assort-mating')
@overwrite 
@section('summary')
	This unit helps you to define positive and negative assortative mating, provide examples of each, and describe the qualitative effects on genotype and allele frequencies. Calculate the effect of assortative mating on genotype and allele frequencies given mating-type probabilities. Make inferences from mating-type frequency tables (i.e. type of mating scheme, e.g., random, assortative mating, etc.).
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-assortative-mating', 'title'=> 'Unit 2.5 Assortative Mating', 'folder'=> '2_5_assortative_mating'])
{{-- /Assortative Mating Section --}}

{{-- Inbreeding Section --}}
@section('questions')
	@include('help.units.inbreeding')
@overwrite 
@section('summary')
	This unit helps you to compare and contrast population substructure, assortative mating, and inbreeding as examples of non-random mating. Describe the qualitative effects of inbreeding on a person and on a population. Define and interpret inbreeding coefficient, F. Calculate genotype frequencies in situations of inbreeding. Given a pedigree, calculate F for an individual and Φ for a pair of relatives.
@overwrite
@include('help.macros.faq-section', ['id'=> 'faq-learn-inbreeding', 'title'=> 'Unit 2.6 Inbreeding', 'folder'=> '2_6_inbreeding'])
{{-- /Inbreeding Section --}}

{{-- Show all of the slides here  --}}
<div class='hidden' id="slide-all-slides"> 
	<h4> All Slides </h4>
	<p> Below are all of the slides avaiable for download! </p>
</div>
{{-- /Show all of the slides here  --}}
