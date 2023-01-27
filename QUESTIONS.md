## 2023-01-23
* Confirming that the Genotype graph should only display the lines for the last run of the simulator?
* Given that the allele type legend includes the settings and that they are the same for the genotype, should the genotype legend have the settings too? Or just the stats? The mockups display it for both
* For the legend, the mockups are showing all the variables regardless of whether they were active. Should we hide them from the legend if they were not active or show the default values?
* Please verify that the genotype calculations are correct. I had to rewrite that portion of the code for performance and consistency as the old code expects to use a new run, which doesn't work under the finite population circumstance.

### Questions for me
* How should we display the exponent for the ''
* How to handle Generations to Override
