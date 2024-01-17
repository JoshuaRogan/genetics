import fs from 'fs/promises';
import path from 'node:path';

function generateSiteMap(pages) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		 ${pages.map(
				(page) =>
					`<url>
						<loc>/${page.href}</loc>
					</url>`,
			)}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
	const rawPages = await fs.readdir(path.join(process.cwd(), 'pages'));
	const pages = rawPages
		.filter((page) => page.endsWith('.tsx') && !page.startsWith('_') && !page.endsWith('.xml.tsx'))
		.map((page) => {
			const name = page.replace('.tsx', '');
			const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

			const absoluteURL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

			return {
				name: capitalizedName,
				href: absoluteURL + `/${page.replace('.tsx', '')}`,
			};
		});

	// We generate the XML sitemap with the posts data
	const sitemap = generateSiteMap(pages);

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

function SiteMap() {
	//
}

export default SiteMap;
