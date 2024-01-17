import { Box, Button, Heading, Link, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import NextLink from 'next/link';
import MainWrapper from '../components/MainWrapper';
import fs from 'fs/promises';
import path from 'node:path';

export async function getServerSideProps({ res }) {
	// get all pages from /pages directory
	const rawPages = await fs.readdir(path.join(process.cwd(), 'pages'));
	const pages = rawPages
		.filter((page) => page.endsWith('.tsx') && !page.startsWith('_') && !page.endsWith('.xml.tsx'))
		.map((page) => {
			const name = page.replace('.tsx', '');
			const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

			return {
				name: capitalizedName,
				href: `/${page.replace('.tsx', '')}`,
			};
		});

	return {
		props: {
			pages,
		},
	};
}

function SiteMap({ pages }) {
	return (
		<MainWrapper>
			<Box
				as="section"
				padding={{
					sm: '5',
					base: '7',
				}}
				maxWidth={{ md: '90%', lg: '80%' }}
				mx={{ sm: 'auto' }}
			>
				<Stack
					maxWidth={{
						base: '100%',
						md: '90%',
						lg: '80%',
					}}
					spacing={5}
					marginX="auto"
					alignContent="center"
				>
					<Heading color="text" textAlign="center">
						Site Map
					</Heading>
					<Text color="text" textAlign="center">
						Here you can find a list of all the pages on this website. Click on a page to go to it.
					</Text>
					<UnorderedList marginTop={10}>
						{pages.map(
							(
								page: {
									name: string;
									href: string;
								},
								index: number,
							) => (
								<ListItem key={index} width="fit-content">
									<Link as={NextLink} href={page.href}>
										{page.name}
									</Link>
								</ListItem>
							),
						)}
					</UnorderedList>
					<Button
						as={NextLink}
						href="/sitemap.xml"
						target="_blank"
						variant="primary"
						bgGradient="linear(to-r, purple.500, purple.700)"
						_hover={{
							bgGradient: 'linear(to-r, purple.600, purple.800)',
							shadow: 'xl',
						}}
						alignSelf="center"
						animation="all ease-in 5.2s"
						borderRadius="25px"
						shadow="md"
					>
						View XML Format
					</Button>
				</Stack>
			</Box>
		</MainWrapper>
	);
}

export default SiteMap;
