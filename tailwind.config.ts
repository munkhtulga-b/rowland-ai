import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      textColor: {},
      borderColor: {},
      fontSize: {},
    },
  },
  plugins: [],
};
export default config;
