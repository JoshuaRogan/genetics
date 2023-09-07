export function findFixationIndex(result: number[]) {
	for (let i = 0; i < result.length; i++) {
		if (result[i] === 1) {
			return i;
		}
	}

	return -1;
}

export function findEliminationIndex(result: number[]) {
	for (let i = 0; i < result.length; i++) {
		if (result[i] === 0) {
			return i;
		}
	}

	return -1;
}

export function findNumOfFixations(results: number[][]) {
	return results.reduce((prev, current) => {
		if (findFixationIndex(current) > 0) {
			return prev + 1;
		}

		return prev;
	}, 0)
}

export function findNumOfEliminations(results: number[][]) {
	return results.reduce((prev, current) => {
		if (findEliminationIndex(current) > 0) {
			return prev + 1;
		}

		return prev;
	}, 0)
}

export function findAverageFixationIndex(results: number[][]) {
	const fixations = results.map(findFixationIndex).filter(value => value >= 0);
	const totalFixations = fixations.reduce((prev, current) => prev + current, 0);
	return totalFixations / fixations.length;
}

export function findAverageElimIndex(results: number[][]) {
	const fixations = results.map(findEliminationIndex).filter(value => value >= 0);
	const totalFixations = fixations.reduce((prev, current) => prev + current, 0);
	return totalFixations / fixations.length;
}

export function getAverageFinalFreq(results: number[][]) {
	const divider = results.length;
	const finals = results.map(res => res[res.length - 1]);
	return finals.reduce((prev, curr) => prev + curr, 0) / divider;
}

function getStandardDeviation(array: number[]) {
	const n = array.length
	const mean = array.reduce((a, b) => a + b) / n
	return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

export function getStandardDeviationOfResults(results: number[][]) {
	const finals = results.map(res => res[res.length - 1]);
	return getStandardDeviation(finals);
}
