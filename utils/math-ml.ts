// https://demo.wiris.com/mathtype/en/developers.php

export function renderMathML(formula: string): string {
	switch (formula) {
		case 'genotype':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>1</mn></msub><mo>)</mo><mo>+</mo><mi>P</mi><mo>(</mo><mpadded lspace="-1px"><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>2</mn></msub></mpadded><mo>)</mo><mo>+</mo><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>2</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><mn>1</mn></math>`;

		case 'hardy-1':
			return '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>1</mn></msub><mo>)</mo><mo>=</mo><msup><mi>p</mi><mn>2</mn></msup></math>'

		case 'hardy-2':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><mn>2</mn><mi>p</mi><mi>q</mi></math>`;

		case 'hardy-3':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>2</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><msup><mi>q</mi><mn>2</mn></msup></math>`

		case 'population-size':
			return `
				<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>N</mi><mi>e</mi></msub><mo>=</mo><mfrac><mrow><mo>(</mo><mn>4</mn><msub><mi>N</mi><mi>m</mi></msub><mo>&#xD7;</mo><msub><mi>N</mi><mi>f</mi></msub><mo>)</mo></mrow><mrow><mo>(</mo><msub><mi>N</mi><mi>m</mi></msub><mo>+</mo><msub><mi>N</mi><mi>f</mi></msub><mo>)</mo></mrow></mfrac></math>
			`
		case 'selection-formula':
			return `
			<math xmlns="http://www.w3.org/1998/Math/MathML">
			<mrow>
				<msub>
					<mi>p</mi>
					<mn>1</mn>
				</msub>
			</mrow>
			<mo>=</mo>
			<mfrac>
				<mrow>
					<mrow>
						<mo>(</mo>
						<msup>
							<msubsup><mi>p</mi><mn>0</mn><mn>2</mn></msubsup>
						</msup>
						<mo>)</mo>
						<mo>(</mo>
							<msub><mi>W</mi><mrow><mi>A</mi><mn>1</mn><mi>A</mi><mn>1</mn></mrow></msub>
						<mo>)</mo>
					</mrow>
					<mo>+</mo>
					<mrow>
						<mo>(</mo>
						<msub>
							<mi>p</mi>
							<mn>0</mn>
						</msub>
						<msub>
							<mi>q</mi>
							<mn>0</mn>
						</msub>
						<mo>)</mo>
						<mo>(</mo>
						<msub><mi>W</mi><mrow><mi>A</mi><mn>1</mn><mi>A</mi><mn>2</mn></mrow></msub>
						<mo>)</mo>
					</mrow>
				</mrow>
				<mrow>
					<mrow>
						<mrow>
							<mo>(</mo>
							<msubsup><mi>p</mi><mn>0</mn><mn>2</mn></msubsup>
							<mo>)</mo>
						</mrow>
						<mrow>
							<mo>(</mo>
							<msub><mi>W</mi><mrow><mi>A</mi><mn>1</mn><mi>A</mi><mn>1</mn></mrow></msub>
							<mo>)</mo>
						</mrow>
					</mrow>
					<mo>+</mo>
					<mrow>
						<mo>(</mo>
						<mn>2</mn>
						<msub>
							<mi>p</mi>
							<msup>
								<mi>0</mi>
							</msup>
						</msub>
						<msub>
							<mi>q</mi>
							<msup>
								<mi>0</mi>
							</msup>
						</msub>
						<mo>)</mo>
						<mo>(</mo>
						<msub><mi>W</mi><mrow><mi>A</mi><mn>1</mn><mi>A</mi><mn>2</mn></mrow></msub>
						<mo>)</mo>
					</mrow>
					<mo>+</mo>
					<mrow>
						<mo>(</mo>
						<msubsup><mi>q</mi><mn>0</mn><mn>2</mn></msubsup>
						<mo>)</mo>
						<mo>(</mo>
						<msub><mi>W</mi><mrow><mi>A</mi><mn>2</mn><mi>A</mi><mn>2</mn></mrow></msub>
						<mo>)</mo>
					</mrow>
				</mrow>
			</mfrac>
		</math>
			`;

		case 'selection-formula-2':
			return `
			<math xmlns="http://www.w3.org/1998/Math/MathML">
			<mrow>
				<mi>s</mi>
				<mo>=</mo>
				<mi>1</mi>
				<mo>-</mo>
				<mo>(</mo>
				<msub>
					<mi>W</mi>
					<msub>
						<mn>A</mn>
						<mn>2</mn>
					</msub>
					<msub>
						<mn>A</mn>
						<mn>2</mn>
					</msub>
				</msub>
				<mo>/</mo>
				<msub>
					<mi>W</mi>
					<msub>
						<mn>A</mn>
						<mn>1</mn>
					</msub>
					<msub>
						<mn>A</mn>
						<mn>1</mn>
					</msub>
				</msub>
				<mo>)</mo>
			</mrow>
		</math>`;

		case 'selection-formula-3':
			return `
			<math xmlns="http://www.w3.org/1998/Math/MathML">
					<mrow>
						<mi>h</mi>
						<mo>&#x22C5;</mo>
						<mi>s</mi>
						<mo>=</mo>
						<mi>1</mi>
						<mo>-</mo>
						<mo>(</mo>
						<msub>
							<mi>W</mi>
							<msub>
								<mn>A</mn>
								<mn>1</mn>
							</msub>
							<msub>
								<mn>A</mn>
								<mn>2</mn>
							</msub>
						</msub>
						<mo>/</mo>
						<msub>
							<mi>W</mi>
							<msub>
								<mn>A</mn>
								<mn>1</mn>
							</msub>
							<msub>
								<mn>A</mn>
								<mn>1</mn>
							</msub>
						</msub>
						<mo>)</mo>
					</mrow>
				</math>`;

		case 'mutation-rate':
			return `
				<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>p</mi><mn>1</mn></msub><mo>=</mo><msub><mi>p</mi><mn>0</mn></msub><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3BC;</mi><mo>)</mo><mo>+</mo><mi>v</mi><mo>(</mo><mn>1</mn><mo>-</mo><msub><mi>p</mi><mn>0</mn></msub><mo>)</mo></math>
					`;

		case 'migration-rate':
			return `
				<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>p</mi><mn>1</mn></msub><mo>=</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>m</mi><mo>)</mo><msub><mi>p</mi><mn>0</mn></msub><mo>+</mo><mi>m</mi><mo>(</mo><msub><mi>P</mi><mi>M</mi></msub><mo>)</mo></math>`;

		case 'inbreeding-1':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>1</mn></msub><mo>)</mo><mo>=</mo><msup><mi>p</mi><mn>2</mn></msup><mo>(</mo><mn>1</mn><mo>-</mo><mi>F</mi><mo>)</mo><mo>&#x2009;</mo><mo>+</mo><mo>&#x2009;</mo><mi>F</mi><mi>p</mi></math>`;

		case 'inbreeding-2':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><mn>2</mn><mi>p</mi><mi>q</mi><mo>(</mo><mn>1</mn><mo>-</mo><mi>F</mi><mo>)</mo></math>`;

		case 'inbreeding-3':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>2</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><msup><mi>q</mi><mn>2</mn></msup><mo>(</mo><mn>1</mn><mo>-</mo><mi>F</mi><mo>)</mo><mo>&#x2009;</mo><mo>+</mo><mo>&#x2009;</mo><mi>F</mi><mi>q</mi></math>`;

		case 'assort-1':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>1</mn></msub><mo>)</mo><mo>=</mo><mfrac><mrow><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><mstyle displaystyle="true"><mfrac><mrow><mi>p</mi><mi>q</mi></mrow><mn>2</mn></mfrac></mstyle><mo>)</mo><mo>]</mo></mrow><mi>D</mi></mfrac></math>`;

		case 'assort-2':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>1</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><mfrac><mrow><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><mn>2</mn><mi>p</mi><mi>q</mi><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><mi>p</mi><mi>q</mi><mo>)</mo><mo>]</mo></mrow><mi>D</mi></mfrac></math>`;

		case 'assort-3':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>P</mi><mo>(</mo><msub><mi>A</mi><mn>2</mn></msub><msub><mi>A</mi><mn>2</mn></msub><mo>)</mo><mo>=</mo><mfrac><mrow><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><msup><mi>q</mi><mn>2</mn></msup><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><msup><mi>q</mi><mn>2</mn></msup><mo>+</mo><mstyle displaystyle="true"><mfrac><mrow><mi>p</mi><mi>q</mi></mrow><mn>2</mn></mfrac></mstyle><mo>)</mo><mo>]</mo></mrow><mi>D</mi></mfrac></math>`;

		case 'assort-4':
			return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>D</mi><mo>=</mo><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><mfrac><mrow><mi>p</mi><mi>q</mi></mrow><mn>2</mn></mfrac><mo>)</mo><mo>]</mo><mo>+</mo><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><mn>2</mn><mi>p</mi><mi>q</mi><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><mi>p</mi><mi>q</mi><mo>)</mo><mo>]</mo><mo>+</mo><mo>[</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3B1;</mi><mo>)</mo><msup><mi>q</mi><mn>2</mn></msup><mo>+</mo><mi>&#x3B1;</mi><mo>(</mo><msup><mi>q</mi><mn>2</mn></msup><mo>+</mo><mfrac><mrow><mi>p</mi><mi>q</mi></mrow><mn>2</mn></mfrac><mo>)</mo><mo>]</mo></math>`;
		default:
			return '';
	}
}
