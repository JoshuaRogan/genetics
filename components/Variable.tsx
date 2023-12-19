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

export function N({...props}) {
	return <Variable {...props}>N</Variable>
}

export function NSubE({...props}) {
	return <Variable {...props}>N<sub>e</sub></Variable>
}

export function NSubm({...props}) {
	return <Variable {...props}>N<sub>m</sub></Variable>
}

export function NSubf({...props}) {
	return <Variable {...props}>N<sub>f</sub></Variable>
}

// export function p({...props}) {
// 	return <Variable {...props}>p</Variable>
// }
//
// export function q({...props}) {
// 	return <Variable {...props}>q</Variable>
// }
//
// export function VariableM({...props}) {
// 	return <Variable {...props}>m</Variable>
// }
//
// export function VariableMu({...props}) {
// 	return <Variable {...props}>μ</Variable>
// }


export function WA1A1({...props}) {
	return <Variable {...props}>W<sub>A1A1</sub></Variable>
}

export function WA1A2({...props}) {
	return <Variable {...props}>W<sub>A1A2</sub></Variable>
}
export function WA2A2({...props}) {
	return <Variable {...props}>W<sub>A2A2</sub></Variable>
}
