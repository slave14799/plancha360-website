import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import cloudflare from '@astrojs/cloudflare';

const noopSessionDriverId = 'virtual:plancha-noop-session-driver';
const noopSessionDriver = {
	name: 'plancha-noop-session-driver',
	resolveId(id) {
		return id === noopSessionDriverId ? id : null;
	},
	load(id) {
		if (id !== noopSessionDriverId) return null;

		return `
export default function noopSessionDriver() {
	return {
		name: 'plancha-noop-session-driver',
		getItem: async () => null,
		setItem: async () => {},
		removeItem: async () => {},
		getKeys: async () => [],
		clear: async () => {},
	};
}
`;
	},
};

export default defineConfig({
	site: 'https://plancha360.com',
	output: 'server',
	adapter: cloudflare({
		prerenderEnvironment: 'node',
	}),
	session: {
		driver: {
			entrypoint: noopSessionDriverId,
		},
	},
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
		plugins: [noopSessionDriver],
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
