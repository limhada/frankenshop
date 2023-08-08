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
        // mycolor1: '#112321',
        // mycolor1: '#617143',
        // mycolor1: '#41644A',
        // mycolor1: '#5B9A8B',
        // mycolor1: '#7EAA92',
        // mycolor1: '#7C9D96',
        // mycolor1: '#A1CCD1',
        // mycolor1: '#8D7B68',
        // mycolor1: '#A4907C',
        mycolor1: '#F4F2DE',
        // mycolor1: '#445069',
      },
    },
  },
  plugins: [],
};
