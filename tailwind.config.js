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
      creamSemi: '#DEDBCD50',
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
        // bobble: {
        //   0: { transform: 'translateY(0px)' },
        //   20: { transform: 'translateY(-10px)' },
        //   40: { transform: 'translateY(0px)' },
        //   60: { transform: 'translateY(10px)' },
        //   80: { transform: 'translateY(0px)' },
        //   100: { transform: 'translateY(0px)' },
        // },
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
    plugin(({ addComponents }) => {
      addComponents({
        '.panel': {
          '@apply rounded-xl shadow-drop flex flex-col items-start p-6 bg-darkBrownOverlay':
            {},
        },
        '.bottom-panel': {
          '@apply rounded-xl shadow-drop flex flex-col items-start p-6 bg-darkBrownOverlay relative gap-3 px-[3.75rem] pb-16 pt-12':
            {},
        },
        '.typography-title': {
          '@apply text-[3rem]': {} /* 48px */,
          lineHeight: '1.15',
        },
        '.typography-bio': {
          '@apply text-[1.75rem]': {} /* 28px */,
        },
        '.typography-social': {
          '@apply text-2xl underline italic': {} /* 24px */,
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
          '@apply text-xl sm:text-2xl italic text-cream': {} /* 24px */,
          lineHeight: '1.15',
        },
        '.typography-name': {
          '@apply text-[1.5rem] sm:text-[2.5rem] uppercase': {} /* 40px */,
          lineHeight: '1.15',
        },
        '.typography-clipboard': {
          '@apply text-2xl':
            {} /* TODO: Supposed to be 32px [2rem], but it was to big */,
          lineHeight: '1.15',
          fontFamily: `'Courier New', Courier, monospace`,
          letterSpacing: '-5%',
        },
      });
    }),
  ],
};
