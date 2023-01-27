# Notes
## 2023-01-23
* Confirming that the Genotype graph should only display the lines for the last run of the simulator?
* Given that the allele type legend includes the settings and that they are the same for the genotype, should the genotype legend have the settings too? Or just the stats? The mockups display it for both
* For the legend, the mockups are showing all the variables regardless of whether they were active. Should we hide them from the legend if they were not active or show the default values?
* Please verify that the genotype calculations are correct. I had to rewrite that portion of the code for performance and consistency as the old code expects to use a new run, which doesn't work under the finite population circumstance.

# Questions for me
* How should we display the exponent for the ''
* How to handle Generations to Override


# Key Components Left
## Components
* Advanced Tab Section
* Show values on the sliders
* Data table export
* Data Image Export
* Collapsable graph sections
* Create 'infinite' button instead of slider
* Create footer
* Introduce multiple legends per run for allele

## Design
* Match slider design
* Create better graph design
* Match design for Navigation


# History
2023-01-27 - Created a prototype for legends and added genotype graph (3 hours)
2023-01-26 - Finalized sliders and got genotype calculations working (5 hours)
2023-01-25 - Added more sliders and improved calculation time (3 hours)
2023-01-24 - Added more sliders and added more simple styles (3 hours)
2023-01-24 - Added input validation (2 hours)
2023-01-22 - Added basic page navigation (placeholders for content based pages) (2 hours)
2022 - Create a PoC with HighCharts and basic input sliders (20 hours)
