module.exports = {
  purge: ['./index.html', './src/**/*.{vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    padding: {
      sm: '5px',
      md: '10px',
      lg: '15px',
    },
    margin: {
      sm: '5px',
      md: '10px',
      lg: '15px',
    },
    width: {
      '90px': '90px',
      '100px': '100px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
