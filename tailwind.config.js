/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f62fe',
        ink: '#161616',
        'ink-muted': '#525252',
        'ink-subtle': '#8c8c8c',
        canvas: '#ffffff',
        'surface-1': '#f4f4f4',
        'surface-2': '#e0e0e0',
        hairline: '#e0e0e0', // using a light gray for hairlines
        'hairline-strong': '#161616',
        'inverse-canvas': '#161616',
        'inverse-ink': '#ffffff',
        'inverse-ink-muted': '#f4f4f4',
        'semantic-success': '#24a148',
        'semantic-warning': '#f1c21b',
        'semantic-error': '#da1e28',
        'semantic-info': '#0f62fe',
        'blue-hover': '#0353e9',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        none: '0px', // Strictly flat UI
      },
      letterSpacing: {
        carbon: '0.16px',
      },
    },
  },
  plugins: [],
}
