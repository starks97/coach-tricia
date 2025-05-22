/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
	test: {
		environment: "node", // or 'jsdom' if you're testing DOM components
		globals: true, // so you can use describe/test/expect without importing
		//setupFiles: ["./test/setup.ts"], // optional setup
	},
})
