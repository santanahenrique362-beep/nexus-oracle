/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          dark: '#090A0F',      // Canvas principal (Preto Abissal)
          card: '#11131A',      // Cards/Painéis
          border: '#1E2230',    // Bordas sutis
          emerald: '#00E676',   // Score Alto / Shield OK
          amber: '#FFD600',     // Alerta / Cautela
          crimson: '#FF1744',   // Perigo / Shield Veto
          cyan: '#00B0FF',      // Destaques / AI
          text: '#ECEFF1',      // Texto primário
          muted: '#78909C',     // Muted text
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
