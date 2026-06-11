// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://plancha360.com',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	build: {
		// Inline all CSS into the HTML. The deployed /_astro/*.css request was
		// observed intermittently returning HTTP 500 from Cloudflare Pages,
		// which rendered the page completely unstyled. Inlining removes that
		// single point of failure.
		inlineStylesheets: 'always',
	},
	vite: {
		server: {
			allowedHosts: true,
		},
	},
});
