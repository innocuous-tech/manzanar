const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      drop: '0px 1px 8px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      cream: '#DEDBCD',
      creamSemi: '#DEDBCD50',
      player: '#C3AF9F',
      ichiro: '#FD984B',
      darkBrownText: '#462f1d',
      darkBrownOverlay: '#26201985',
      black: '#1b1918',
      menuOverlay: '#1b1918',
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.panel': {
          '@apply rounded-xl shadow-drop flex flex-col p-6 bg-darkBrownOverlay':
            {},
        },
        '.typography-title': {
          '@apply text-[3rem]': {} /* 48px */,
          lineHeight: '1.15',
        },
        '.typography-body': {
          '@apply text-[2.25rem]': {} /* 36px */,
          lineHeight: '1.15',
        },
        '.typography-button': {
          '@apply text-[2rem]': {} /* 32px */,
          lineHeight: '1.15',
        },
        '.typography-tooltip': {
          '@apply text-[1.5rem] italic': {} /* 24px */,
          lineHeight: '1.15',
        },
        '.typography-name': {
          '@apply text-[2.5rem]': {} /* 40px */,
          lineHeight: '1.15',
        },
        '.typography-clipboard': {
          '@apply text-[2rem]': {} /* 32px */,
          lineHeight: '1.15',
          fontFamily: `'Courier New', Courier, monospace`,
          letterSpacing: '-5%',
        },
      });
    }),
  ],
};
