import styled from 'styled-components';
import { isLocalHost } from './env';

export const DebugHeader = styled.div`
	display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`;

export const Pre = styled.pre`
	font-size: .8rem;
	max-width: 100%;
	overflow: scroll;
	background: rgba(123, 133, 120, 0.07);
	padding: 15px;
	margin-bottom: 200px;
	border-radius: 4px;
`;

export function DevOnLocal({ children }) {
	if (isLocalHost()) {
		return children;
	}

	return null;
}
