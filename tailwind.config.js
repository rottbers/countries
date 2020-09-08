// TODO: purge not working
module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {},
  variants: {},
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
