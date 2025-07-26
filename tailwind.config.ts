import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
				'roboto': ['Roboto', 'sans-serif'],
			},
			spacing: {
				/* Material Design 3 8dp Grid System */
				'md-1': '8px',   // 1 unit = 8dp
				'md-2': '16px',  // 2 units = 16dp
				'md-3': '24px',  // 3 units = 24dp
				'md-4': '32px',  // 4 units = 32dp
				'md-5': '40px',  // 5 units = 40dp
				'md-6': '48px',  // 6 units = 48dp
				'md-7': '56px',  // 7 units = 56dp
				'md-8': '64px',  // 8 units = 64dp
				'md-10': '80px', // 10 units = 80dp
				'md-12': '96px', // 12 units = 96dp
				'md-16': '128px', // 16 units = 128dp
			},
			colors: {
				/* Material Design 3 Color System */
				'md-primary': {
					DEFAULT: 'hsl(var(--md-sys-color-primary))',
					container: 'hsl(var(--md-sys-color-primary-container))',
					'on-primary': 'hsl(var(--md-sys-color-on-primary))',
					'on-container': 'hsl(var(--md-sys-color-on-primary-container))',
				},
				'md-secondary': {
					DEFAULT: 'hsl(var(--md-sys-color-secondary))',
					container: 'hsl(var(--md-sys-color-secondary-container))',
					'on-secondary': 'hsl(var(--md-sys-color-on-secondary))',
					'on-container': 'hsl(var(--md-sys-color-on-secondary-container))',
				},
				'md-tertiary': {
					DEFAULT: 'hsl(var(--md-sys-color-tertiary))',
					container: 'hsl(var(--md-sys-color-tertiary-container))',
					'on-tertiary': 'hsl(var(--md-sys-color-on-tertiary))',
					'on-container': 'hsl(var(--md-sys-color-on-tertiary-container))',
				},
				'md-error': {
					DEFAULT: 'hsl(var(--md-sys-color-error))',
					container: 'hsl(var(--md-sys-color-error-container))',
					'on-error': 'hsl(var(--md-sys-color-on-error))',
					'on-container': 'hsl(var(--md-sys-color-on-error-container))',
				},
				'md-surface': {
					DEFAULT: 'hsl(var(--md-sys-color-surface))',
					dim: 'hsl(var(--md-sys-color-surface-dim))',
					bright: 'hsl(var(--md-sys-color-surface-bright))',
					'container-lowest': 'hsl(var(--md-sys-color-surface-container-lowest))',
					'container-low': 'hsl(var(--md-sys-color-surface-container-low))',
					container: 'hsl(var(--md-sys-color-surface-container))',
					'container-high': 'hsl(var(--md-sys-color-surface-container-high))',
					'container-highest': 'hsl(var(--md-sys-color-surface-container-highest))',
					variant: 'hsl(var(--md-sys-color-surface-variant))',
					'on-surface': 'hsl(var(--md-sys-color-on-surface))',
					'on-variant': 'hsl(var(--md-sys-color-on-surface-variant))',
				},
				'md-outline': {
					DEFAULT: 'hsl(var(--md-sys-color-outline))',
					variant: 'hsl(var(--md-sys-color-outline-variant))',
				},

				/* Backward compatibility */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				/* Material Design 3 Shape System */
				'none': 'var(--md-sys-shape-corner-none)',
				'xs': 'var(--md-sys-shape-corner-extra-small)',
				'sm': 'var(--md-sys-shape-corner-small)',
				'md': 'var(--md-sys-shape-corner-medium)',
				'lg': 'var(--md-sys-shape-corner-large)',
				'xl': 'var(--md-sys-shape-corner-extra-large)',
				'full': 'var(--md-sys-shape-corner-full)',
				/* Legacy support */
				DEFAULT: 'var(--radius)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
