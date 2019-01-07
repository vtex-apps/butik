module.exports = api => {
  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = [
    'transform-es2015-modules-commonjs',
    'dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-class-properties',
  ]

  api.cache(false)

  return { presets, plugins }
}
