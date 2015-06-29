@set('question_set', 'learn-selection')

@partial('help.macros.question')
        @block('question-title', 'What is selection?')
        @block('question-id', 'what-is-selection') 

        @block('question-content')
            Selection is differing viability and/or fertility of different genotypes.                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is viability?')
        @block('question-id', 'what-is-viability') 

        @block('question-content')
            Viability means that some genotypes do not survive to birth or maturation.                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is fertility?')
        @block('question-id', 'what-is-fertility') 

        @block('question-content')
            Fertility means that some genotypes do not reproduce <em>as much</em>.                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What are the three fitness coefficients?')
        @block('question-id', 'three-fitness-coefficients') 

        @block('question-content')
            The three fitness coefficients are W<sub>AA</sub> (when an AA individual reproduces), W<sub>Aa</sub> (when an Aa individual reproduces), and W<sub>aa</sub> (when an aa individual reproduces). Note We can’t really measure all three of these uniquely, so we usually set one of the w’s equal to 1. You can choose any of the three genotypes as the "reference."                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the selection coefficient?')
        @block('question-id', 'selection-coefficient') 

        @block('question-content')
            The selection coefficient, s, describes the degree of selection against the aa genotype. 
            <strong> Formula </strong>
            <pre class='text-center formula'> s = 1 - (W<sub>aa</sub> / W<sub>AA</sub>) </pre>                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the dominance coefficient?')
        @block('question-id', 'dominance-coefficient') 

        @block('question-content')
            The dominance coefficient, h, describes the degree of dominance. 
            <strong> Formula </strong>
            <pre class='text-center formula'> h x s = 1 - (W<sub>Aa</sub> / W<sub>AA</sub>) </pre>                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'Using selection example: ')
        @block('question-id', 'selection-example') 

        @block('question-content')
            <img src='images/faq/selection/example.png' alt='Using Selection Example'>                
        @endblock
@endpartial


@partial('help.macros.question')
        @block('question-title', 'Clinical vs. Fitness disease types')
        @block('question-id', 'clinical-fitness-disease-types') 

        @block('question-content')
        <div class='table-responsive'>
            <table class='table'>
                <tr>
                    <th> </th>
                    <th>Clinical</th>
                    <th>Selection</th>
                </tr>
                <tr>
                    <td>Huntington’s Disease</td>
                    <td>dominant</td>
                    <td>none</td>
                </tr>
                <tr>
                    <td>Sickle cell (w. malaria)</td>
                    <td>recessive</td>
                    <td>over-dominant</td>
                </tr>
                <tr>
                    <td>Sickle cell (w/o. malaria)</td> 
                    <td>recessive</td>  
                    <td>recessive</td>
                </tr>
                <tr>
                    <td>Hemochromatosis</td>    
                    <td>recessive</td>  
                    <td>none</td>
                </tr>
                <tr>
                    <td>Achondroplasia</td> 
                    <td>dominant</td>   
                    <td>intermediate</td>
                </tr>
                <tr>
                    <td>Cystic Fibrosis</td>    
                    <td>recessive</td>  
                    <td>intermediate </td>
                </tr>
            </table>
        </div>                
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the formula to determine allele frequency with selection?')
        @block('question-id', 'allele-selection-formula') 

        @block('question-content')
            <img src='images/faq/selection/allele-frequency.png' alt='What is the formula to determine allele frequency with selection?'>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is the formula to determine genotype frequencies with selection?')
        @block('question-id', 'genotype-selection-formula') 

        @block('question-content')
            If random mating H-W assumption is held:
            <pre class='formula'>P(AA)<sub>t</sub> =  p<sub>t</sub><sup>2</sup><br/>P(Aa)<sub>t</sub> =  2p<sub>t</sub>q<sub>t</sub><br/>P(aa)<sub>t</sub> =  q<sub>t</sub><sup>2</sup></pre>
        @endblock
@endpartial


@partial('help.macros.question')
        @block('question-title', 'How fast is an allele eliminated?')
        @block('question-id', 'allele-elimination') 

        @block('question-content')
            Change in allele frequencies over time depends on fitness or selection coefficients.
            <ul> 
                <li>Stronger selection = faster elimination of risk allele</li>
                <li>Dominant disease = faster elimination of risk allele</li>
                <li>Recessive disease = slow elimination of risk allele</li>
            </ul>
            <img src='images/faq/selection/how-fast-allele-eliminated.png' alt='How fast is an allele eliminated?'>                 
        @endblock
@endpartial


@partial('help.macros.question')
        @block('question-title', 'What is overdominance?')
        @block('question-id', 'overdominace') 

        @block('question-content')
            Overdominace is when w<sub>AA</sub> &lt; w<sub>Aa</sub> &gt; w<sub>aa</sub>.
            <img src='images/faq/selection/overdominace.png' alt='What is overdominance?'>
        @endblock
@endpartial

@partial('help.macros.question')
        @block('question-title', 'What is underdominance?')
        @block('question-id', 'underdominace') 

        @block('question-content')
            Underdominance is when w<sub>AA</sub> &gt; w<sub>Aa</sub> &lt; w<sub>aa</sub>.
            <img src='images/faq/selection/underdominace.png' alt='What is underdominace?'>
        @endblock
@endpartial







