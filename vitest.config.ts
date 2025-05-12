import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		coverage: {
			all: false,
			reporter: ['text', 'html'],
			reportsDirectory: './coverage',
		},
	},
});
