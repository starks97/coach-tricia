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
        bonVivant: ["BonVivant"],
        figtree: ["Figtree"],
      },
      gridTemplateColumns: {
        "60/40": "55% 35%",
        "40/60": "35% 55%",
      },
      lineHeight: {
        regular: "1.5",
        12: "3rem",
        15: "35px",
        14: "30px",
      },
      fontSize: {
        custom_size: "0.9rem",
        custom_title: [
          "2.3rem",
          {
            lineHeight: "45px",
            letterSpacing: "0.07em",
          },
        ],
        custom_coaching: [
          "2.5rem",
          {
            lineHeight: "45px",
            letterSpacing: "0.07em",
          },
        ],
        custom_subtitle: [
          "2rem",
          {
            lineHeight: "40px",
            letterSpacing: "0.03em",
          },
        ],
        custom_subtitle2: [
          "2.5rem",
          {
            lineHeight: "50px",
            letterSpacing: "0.05em",
          },
        ],
        hero_title: ["4.5rem"],
        hero_title_mobile: ["4.9rem"],
        regular: ["1.025rem"],
        bigger: ["1.5rem"],
        about_subtitle: ["2rem"],
      },
      letterSpacing: {
        custom_spacing: "0.2em",
      },
      fontWeight: {
        100: "100",
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
      header: "#efe5e3",
      header2: "#e7cdcc",
      custom_gray: "#525252",
      menu_items: "#ffff",
      subtitle: "#757575",
      description_bg: "#fcf0ef",
    },

    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
