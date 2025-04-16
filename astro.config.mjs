import { defineConfig, envField } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import alpine from "@astrojs/alpinejs"

import vercel from "@astrojs/vercel";

import solidJs from "@astrojs/solid-js";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
    },
  integrations: [alpine(), solidJs()],
  adapter: node({
    mode: "standalone"
  }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({context: "server", access: "secret" })
    }
  },
})
