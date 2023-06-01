import postcssNesting from 'postcss-nesting'

export default {
  parser: false,
  map: false,
  autoprefixer: {},
  plugins: {
    'postcss-plugin': {
      postcssNesting
    }
  }
}