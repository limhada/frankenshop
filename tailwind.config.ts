/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        myColor1: '#41644A',
        myColor2: '#F4F2DE',
        // myColor2: '#E8E3B8',
        // myColor2: '#A4907C',
        // myColor1: '#445069',
        // myColor1: '#5B9A8B',
        // myColor1: '#112321',
        // myColor1: '#617143',
        // myColor1: '#7EAA92',
        // myColor1: '#7C9D96',
        // myColor1: '#A1CCD1',
        // myColor1: '#8D7B68',
      },
    },
  },
  plugins: [],
};
