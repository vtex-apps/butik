import { css } from 'docz-plugin-css'

export default {
  title: 'VTEX Butik',
  plugins: [
    css({
      preprocessor: 'postcss',
    }),
  ],
  ignore: ['lib'],
}
