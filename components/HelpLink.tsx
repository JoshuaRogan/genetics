import Link from "next/link";
import React from "react";
import {TAB_ADDITIONAL, TAB_BASIC} from "../pages/model-background";

interface LinkProps {
	linkText: string;
	name: string;
	isLower?: boolean;
}

interface SingleLinkProps {
	linkText?: string;

	isLower?: boolean;
}

export default function HelpLink({tab, anchor,children}) {
	return <Link href={`/model-background?tab=${tab}#${anchor}`} style={{textDecoration: 'underline'}}> {children}</Link>
}

export function BasicSettingLink({name, linkText, isLower, ...props} : LinkProps) {
	if (isLower) {
		linkText = linkText.toLowerCase();
	}
	return <HelpLink tab={TAB_BASIC} anchor={`accordion-button-${name}`}{...props}> {linkText}</HelpLink>
}

export function AdvancedSettingLink({name, linkText, isLower, ...props} : LinkProps) {
	if (isLower) {
		linkText = linkText.toLowerCase();
	}
	return <HelpLink tab={TAB_ADDITIONAL} anchor={`accordion-button-${name}`} {...props}>{linkText}</HelpLink>
}

export function AlleleLink({...props}) {
	return <BasicSettingLink linkText="Allele" name={'Allele'} {...props}/>
}

export function AlleleFrequencyLink({linkText, ...props} : SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Allele Frequency"} name="allele-frequency" {...props}/>
}

export function GenotypeLink({linkText , ...props}: SingleLinkProps) {

	return <BasicSettingLink linkText={linkText ?? 'Genotype'} name="Genotype" {...props}/>
}

export function GenerationsLink({linkText , ...props}: SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Generations"} name="generations" {...props} />
}

export function PopulationSizeLink({linkText , ...props}: SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Population Size"} name="population-size" {...props}/>
}

export function PopulationBottleNeckLink({linkText , ...props}: SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Population bottleneck"} name="population-bottleneck" {...props}/>
}

export function SelectionLink({linkText , ...props} : SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Selection"} name="selection" {...props} />
}

export function MutationLink({linkText , ...props} : SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Mutation"} name="mutation" {...props}/>
}

export function MigrationLink({linkText , ...props} : SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Migration"} name="migration" {...props}/>
}

export function InbreedingLink({linkText , ...props}: SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Inbreeding"} name="inbreeding" {...props}/>
}

export function AssortMatingLink({linkText , ...props} : SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Assortative mating"} name="assortative-mating" {...props}/>
}

export function InifinitePopulationLink({linkText , ...props} : SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Infinitely large population"} name="infinite-population" {...props}/>
}



// // Hardy-Weinberg-equilibrium
export function HardyWeinEquilLink({linkText , ...props}: SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Hardy-Weinberg equilibrium"} name="Hardy-Weinberg-equilibrium" {...props} />
}

export function HardyWeinAssumLink({linkText , ...props}: SingleLinkProps) {
	return <BasicSettingLink linkText={linkText ?? "Hardy-Weinberg assumption"} name="Hardy-Weinberg-assumptions" {...props} />
}
export function GeneticDriftLink({linkText , ...props}: SingleLinkProps) {
	return <AdvancedSettingLink linkText={linkText ?? "Genetic drift"} name="genetic-drift" {...props} />
}
