/* eslint-disable @typescript-eslint/no-var-requires */
const plugins = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    corePlugins: {
      container: false
    },
    extend: {
      colors: {
        orangeShopee: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugins(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4')
        }
      })
    })
  ]
}
