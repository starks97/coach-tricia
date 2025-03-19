import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import alpine from "@astrojs/alpinejs"

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
	},
  integrations: [alpine()],
  adapter: vercel(),
})
