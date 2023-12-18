import React from "react";

interface VariableProps {
	children: React.ReactNode;
	isBold?: boolean;
}

export default function Variable({ children, isBold } : VariableProps) {
	if (isBold) {
		return <i><strong>{children}</strong></i>
	}

	return <i>{children}</i>
}

export function A1({...props}) {
	return <Variable {...props}>A<sub>1</sub></Variable>
}
export function A2({...props}) {
	return <Variable {...props}>A<sub>2</sub></Variable>
}

export function A1A1({...props}) {
	return <Variable {...props}>A<sub>1</sub>A<sub>1</sub></Variable>
}

export function A1A2({...props}) {
	return <Variable {...props}>A<sub>1</sub>A<sub>2</sub></Variable>
}
export function A2A2({...props}) {
	return <Variable {...props}>A<sub>2</sub>A<sub>2</sub></Variable>
}

export function P0({...props}) {
	return <Variable {...props}>p<sub>0</sub></Variable>
}
