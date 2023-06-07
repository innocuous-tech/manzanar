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
      overlay: '0px 4px 13px 1px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      cream: '#DEDBCD',
      creamSemi50: 'rgba(222, 219, 205, 0.5)',
      creamSemi35: 'rgba(222, 219, 205, 0.35)',
      player: '#C3AF9F',
      ichiro: '#FD984B',
      darkBrownText: '#462f1d',
      darkBrownOverlay: 'rgba(38, 32, 25, 0.85)',
      // darkBrownOverlay: '#26201985',
      black: '#1b1918',
      menuOverlay: '#1b1918e6',
    },
    extend: {
      keyframes: {
        toFullOpacity: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        toNoOpacity: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        dialogContentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.97)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        dialogContentHide: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.97)' },
        },
      },
      animation: {
        // bobble: 'bobble 2s ease-in-out infinite',
        toFullOpacity: 'toFullOpacity 150ms linear',
        toNoOpacity: 'toNoOpacity 150ms linear',
        dialogContentShow: 'dialogContentShow 150ms linear',
        dialogContentHide: 'dialogContentHide 150ms linear',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities }) => {
      addComponents({
        '.top-panel': {
          '@apply typography-body rounded-xl shadow-drop block bg-darkBrownOverlay lg:m-0 mr-20 max-h-[4.75rem] lg:max-h-[8rem]':
            {},
        },
        '.bottom-panel': {
          '@apply typography-body rounded-xl shadow-drop flex flex-col items-start p-4 lg:p-6 bg-darkBrownOverlay relative gap-3 [&>.ichiro-statement]:mr-[10rem] lg:[&>.ichiro-statement]:mr-[12rem] [&>.ichiro-statement]:h-[105%] [&>.ichiro-statement]:overflow-y-auto max-h-[5.75rem] lg:max-h-[9rem]':
            {},
        },
        '.pinned-bottom-panel': {
          '@apply relative z-10 flex flex-col items-center gap-2 bg-darkBrownOverlay p-2 lg:gap-8 lg:px-16 lg:py-12 typography-body':
            {},
        },
        '.typography-title': {
          '@apply text-3xl lg:text-5xl': {},
          lineHeight: '1.15',
        },
        '.typography-bio': {
          '@apply text-xl lg:text-[1.75rem]': {},
        },
        '.typography-social': {
          '@apply text-xl lg:text-2xl underline italic': {},
        },
        '.typography-body': {
          '@apply text-xl lg:text-4xl': {},
          lineHeight: '1.15',
        },
        '.typography-button': {
          '@apply text-xl lg:text-[2rem]': {},
          lineHeight: '1.15',
        },
        '.typography-tooltip': {
          '@apply text-lg lg:text-2xl italic text-cream': {},
          lineHeight: '1.15',
        },
        '.typography-name': {
          '@apply text-2xl lg:text-[2.5rem] uppercase': {},
          lineHeight: '1.15',
        },
        '.typography-clipboard': {
          '@apply text-lg lg:text-2xl': {},
          lineHeight: '1.15',
          fontFamily: `'Courier New', Courier, monospace`,
          letterSpacing: '-5%',
        },
        '.button': {
          '@apply typography-button border-2 border-solid cursor-pointer outline-none px-6 py-2 lg:px-8 lg:py-3 rounded-xl text-xl lg:text-3xl':
            {},
        },
        '.button-variant-outlined': {
          '@apply border-cream text-cream hover:bg-creamSemi50 focus-visible:text-darkBrownText focus-visible:bg-cream active:text-darkBrownText active:bg-cream disabled:cursor-not-allowed disabled:bg-[transparent] disabled:text-creamSemi50 disabled:border-creamSemi50 disabled:line-through':
            {},
        },
        '.button-variant-filled': {
          '@apply bg-cream border-cream text-darkBrownText hover:bg-creamSemi50 hover:border-creamSemi50 focus-visible:border-ichiro   active:bg-creamSemi35 disabled:cursor-not-allowed disabled:bg-creamSemi35 disabled:text-darkBrownOverlay disabled:line-through bg-clip-padding':
            {},
        },
      });
      addUtilities({
        '.h-view': {},
      });
    }),
  ],
};
