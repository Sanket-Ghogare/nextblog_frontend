import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // screens: {
    //   'ss': {'min': '360px', 'max': '390px'},
    //   'xs':{'min': '390px', 'max': '400px'},
    //   'xxs':{'min': '400px', 'max': '420px'},
    //   'sm': '640px',  
    //   'md': '768px',

    //   'lg': '1024px',

    //   'xl': '1280px',

    //   '2xl': '1536px',

    // }
  },
  plugins: [],
};
export default config;
