import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
	open?: boolean;
	header: string | React.ReactNode;
}

const StyledWrapper = styled.div`
	transition: 0.3s;
	border: 1px solid #000000;
`;

const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 2px 20px 2px 20px;
	background-color: ${(props) => props.theme.disabledGray};
`;

const StyledTitle = styled.div`
	display: block;
	font-size: 1em;
	margin-block-start: 0.83em;
	margin-block-end: 0.83em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	font-weight: bold;
`;

const StyledIconButton = styled.button`
	cursor: pointer;
	background-color: Transparent;
	background-repeat: no-repeat;
	border: none;
	overflow: hidden;
	outline: none;
`;

const StyledContent = styled.div`
	overflow: hidden;
	transition: height 0.2s ease-in-out;
	border-bottom: 1px solid #dee2e6;
	background-color: white;
`;

const StyledContentContainer = styled.div`
	padding: 20px 20px 20px 20px;
`;

const Collapsible: React.FC<Props> = ({ open, children, header }) => {
	const [isOpen, setIsOpen] = useState(open);
	const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
	const ref = useRef<HTMLDivElement>(null);

	const handleFilterOpening = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!height || !isOpen || !ref.current) return undefined;
		// @ts-ignore
		const resizeObserver = new ResizeObserver((el) => {
			setHeight(el[0].contentRect.height);
		});
		resizeObserver.observe(ref.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [height, isOpen]);

	useEffect(() => {
		if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
		else setHeight(0);
	}, [isOpen]);

	return (
		<>
			<StyledWrapper>
				<div>
					<StyledHeader>
						<StyledTitle>{header}</StyledTitle>
						<StyledIconButton type="button" onClick={handleFilterOpening}>
							<i
								className={`fas-edonec fa-chevron-down-edonec ${
									isOpen ? 'rotate-center-edonec down' : 'rotate-center-edonec up'
								}`}
							/>
						</StyledIconButton>
					</StyledHeader>
				</div>
				<StyledContent style={{ height }}>
					<div ref={ref}>
						<StyledContentContainer>{children}</StyledContentContainer>
					</div>
				</StyledContent>
			</StyledWrapper>
		</>
	);
};

export default Collapsible;
