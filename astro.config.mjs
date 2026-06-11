import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
	site: 'https://plancha360.com',
	output: 'static',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	build: {
		inlineStylesheets: 'always',
	},
	vite: {
		server: {
			allowedHosts: true,
		},
	},
	integrations: [
		react(),
		sanity({
			projectId: 'aa47lzwl',
			dataset: 'production',
			useCdn: false,
			apiVersion: '2025-01-01',
			studioBasePath: '/studio',
		}),
	],
});
