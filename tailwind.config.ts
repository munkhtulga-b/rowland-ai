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
      colors: {
        primary: "#4FBA70",
        secondary: "#1D3361",
        grayLight: "#F4F5F6",
        grayMedium: "#D6D7DC",
      },
      textColor: {
        primaryGreen: "#4FBA70",
        primaryGray: "#838795",
        secondaryGray: "#525560",
      },
      placeholderColor: {
        default: "#838795",
      },
      borderColor: {},
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "21px"],
        base: ["16px", "24px"],
        lg: ["18px", "28.8px"],
        xl: ["20px", "31px"],
        "2xl": ["24px", "36px"],
        "3xl": ["28px", "33.6px"],
        "4xl": ["32px", "38.4px"],
        "5xl": ["40px", "48px"],
      },
    },
  },
  plugins: [],
};
export default config;
