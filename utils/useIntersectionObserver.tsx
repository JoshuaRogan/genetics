import { useState, useEffect, MutableRefObject } from 'react';

interface IntersectionObserverOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
	once?: boolean;
}

export default function useIntersectionObserver(
	ref: MutableRefObject<any>,
	options: IntersectionObserverOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0,
		once: false,
	},
) {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const { root, rootMargin, threshold, once } = options;

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);

				if (once && entry.isIntersecting) {
					observer.unobserve(entry.target);
				}
			},
			{ root, rootMargin, threshold },
		);
		observer.observe(ref.current);

		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);

	return [isIntersecting];
}
