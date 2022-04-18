module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    screens: {
      '2xl': { max: '1536px' },

      xl: { max: '1280px' },

      lg: { max: '1024px' },

      md: { max: '768px' },

      sm: { max: '640px' },
    },
    extend: {},
  },
  plugins: [require('tailwindcss')],
};
