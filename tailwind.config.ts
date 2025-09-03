import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "0.5": "#F4F8FD",
          DEFAULT: "#257CDB",
          "10": "#EAF2FC",
          "20": "#D3E5F8",
          "30": "#BED8F5",
          "40": "#A8CBF1",
          "50": "#91BDEC",
          "60": "#7CB0E9",
          "70": "#67A4E6",
          "80": "#5196E2",
          "90": "#4F96E3",
        },
        secondary: {
          "0.5": "#F4F5F7",
          DEFAULT: "#223369",
          "10": "#F6F6F6",
          "20": "#D3D6E1",
          "30": "#BDC2D2",
          "40": "#A7ADC3",
          "50": "#9098B3",
          "60": "#7A85A5",
          "70": "#657196",
          "80": "#4E5C87",
          "90": "#394878",
        },
        black: {
          DEFAULT: "#000000",
          "0.5": "#F2F2F2",
          "10": "#E6E6E6",
          "20": "#CCCCCC",
          "30": "#B3B3B3",
          "40": "#999999",
          "50": "#7F7F7F",
          "60": "#666666",
          "70": "#4D4D4D",
          "80": "#333333",
          "90": "#1A1A1A",
          "100": "#1D1D1F",
          heading: "#3A3A3A",
        },
        disabled: {
          // DEFAULT: "#D1D1D1",
          DEFAULT: "#B3B3B3",
        },
        indicator: {
          green: {
            "90": "#008B0E",
            DEFAULT: "#00CC14",
          },
          yellow: {
            DEFAULT: "#FFD600",
          },
          orange: {
            DEFAULT: "#FF8A00",
          },
          red: {
            DEFAULT: "#F10000",
          },
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        "5": "5px",
        "10": "10px",
        "20": "20px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        pagination: "0px -4px 11px 0px #0000000D",
        card: "0px 4px 4px 0px #0000001A",
        row: "0px 4px 4px 0px #00000014",
        switchUnchecked:
          "-5px 0px 4px 0px #00000040 inset, 4px 0px 4px 0px #FFFFFF0F inset",
        switchChecked:
          "4px 0px 4px 0px #00000040 inset, -4px 0px 4px 0px #FFFFFF0F inset",
      },
      backgroundImage: {
        "offer-gradient":
          "linear-gradient(90deg, rgb(255, 218, 220) 0%, rgb(255, 255, 255) 100%, rgb(255, 255, 255) 100.01%)",
        "status-green": "radial-gradient(#0bac18 60%, #0bac18 40%)",
        "status-red": "radial-gradient(#ff2b27 60%, #ac0b0b 40%)",
      },
      screens: {
        xs: "420px",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
