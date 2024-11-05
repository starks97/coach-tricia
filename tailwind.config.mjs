/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        blackstone: ["Blackstone"],
        prata: ["Prata"],
        tajawal: ["Tajawal"],
      },
      gridTemplateColumns: {
        "60/40": "55% 35%",
        "40/60": "35% 55%",
      },
      lineHeight: {
        regular: "1.5",
      },
    },
    colors: {
      header: "#fcfdf8",
      footer: "#6c7c6a",
      body: "#f3f3e8",
      menu_item: "#bdabab",
      hero_h3: "#525252",
      hero_color: "#e1a2ad",
      hero_bg: "#f2f2f2",
      hero_color2: "#bda198",
      hero_bg2: "#fbefec",
      btn_bg: "#ce7c76",
      btn_color: "#ffff",
    },
  },
  plugins: [],
};
