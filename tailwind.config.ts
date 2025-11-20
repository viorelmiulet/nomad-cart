import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "brand-gold": "hsl(var(--brand-gold))",
        "brand-navy": "hsl(var(--brand-navy))",
        "brand-burgundy": "hsl(var(--brand-burgundy))",
        "brand-cream": "hsl(var(--brand-cream))",
        "brand-dark": "hsl(var(--brand-dark))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        "brand-gradient": "var(--brand-gradient)",
        "hero-gradient": "var(--hero-gradient)", 
        "card-gradient": "var(--card-gradient)",
        "accent-gradient": "var(--accent-gradient)",
        "glass-gradient": "var(--glass-gradient)",
        "liquid-gradient": "var(--liquid-gradient)",
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "liquid-flow": {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
          },
          "50%": { 
            transform: "translateY(-20px) rotate(180deg)",
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%"
          }
        },
        "glass-float": {
          "0%, 100%": { 
            transform: "translateY(0px) scale(1)",
            opacity: "0.7"
          },
          "50%": { 
            transform: "translateY(-10px) scale(1.05)",
            opacity: "1"
          }
        },
        "ripple": {
          "0%": {
            transform: "scale(0)",
            opacity: "1"
          },
          "100%": {
            transform: "scale(4)",
            opacity: "0"
          }
        },
        "slideDown": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "liquid-flow": "liquid-flow 8s ease-in-out infinite",
        "glass-float": "glass-float 6s ease-in-out infinite",
        "ripple": "ripple 0.6s linear",
        "slideDown": "slideDown 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
