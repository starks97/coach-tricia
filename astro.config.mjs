import { defineConfig, envField } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import alpine from "@astrojs/alpinejs"

import vercel from "@astrojs/vercel";

import solidJs from "@astrojs/solid-js";


// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
    },
  integrations: [alpine(), solidJs()],
  adapter: vercel(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({context: "server", access: "secret" })
    }
  },
})
