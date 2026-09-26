/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 0 0% 89%))",
        input: "hsl(var(--input, 0 0% 89%))",
        ring: "hsl(var(--ring, 5 70% 50%))",
        background: "hsl(var(--background, 183 57% 5%))",
        foreground: "hsl(var(--foreground, 28 42% 91%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 5 69% 49%))",
          foreground: "hsl(var(--primary-foreground, 28 42% 91%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 183 44% 15%))",
          foreground: "hsl(var(--secondary-foreground, 28 42% 91%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 183 44% 12%))",
          foreground: "hsl(var(--muted-foreground, 28 20% 65%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 5 69% 49%))",
          foreground: "hsl(var(--accent-foreground, 28 42% 91%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 183 57% 5%))",
          foreground: "hsl(var(--popover-foreground, 28 42% 91%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 183 57% 7%))",
          foreground: "hsl(var(--card-foreground, 28 42% 91%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
    },
  },
  plugins: [],
};
