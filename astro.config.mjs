import { defineConfig, envField } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import alpine from "@astrojs/alpinejs"

import vercel from "@astrojs/vercel"

import solidJs from "@astrojs/solid-js"

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.coachtriciarago.com/',
  vite: {
    plugins: [tailwindcss()],
      optimizeDeps: {
      include: ['solid-js', 'solid-js/web', 'solid-js/store'],
    },
  },
  integrations: [alpine(), solidJs(), sitemap({
    customPages: [
      'https://www.coachtriciarago.com/',
      'https://www.coachtriciarago.com/about',
      'https://www.coachtriciarago.com/coaching',
      'https://www.coachtriciarago.com/contact',
    ],
    serialize(item) {
            if (item.url === 'https://www.coachtriciarago.com/') {
                return { ...item, priority: 1.0, changefreq: 'daily' }
            }
            if (item.url === 'https://www.coachtriciarago.com/coaching') {
                return { ...item, priority: 0.9, changefreq: 'weekly' }
            }
            return { ...item, priority: 0.7, changefreq: 'weekly' }
        }
  })],
  adapter: vercel(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      MONGO_DB_URI: envField.string({ context: "server", access: "secret" }),
      MAIN_EMAIL: envField.string({ context: "server", access: "public" }),
      CALENDLY_LINK: envField.string({ context: "server", access: "public" }),
    },
  },
  output: "server",
})
