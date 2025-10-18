import { defineConfig, envField } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import alpine from "@astrojs/alpinejs"

import vercel from "@astrojs/vercel"

import solidJs from "@astrojs/solid-js"
import clerk from "@clerk/astro"

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		
	},
	integrations: [alpine(), solidJs(), clerk()],
	adapter: vercel(),
	env: {
		schema: {
			RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
			MONGO_DB_URI: envField.string({ context: "server", access: "secret" }),
			MONGO_NAME_OF_DATABASE: envField.string({ context: "server", access: "secret" }),
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({ context: "server", access: "secret" }),
			CLERK_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
			PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({ context: "server", access: "secret" }),
			PUBLIC_CLOUDINARY_API_KEY: envField.string({ context: "server", access: "secret" }),
			CLOUDINARY_API_SECRET: envField.string({ context: "server", access: "secret" }),
		},
	},
	output: "server",
})
