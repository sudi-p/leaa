module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-export-default-from'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['lodash'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@leaa-common/*': ['../leaa-common/src/*'],
          '@leaa-api/*': ['./src/*'],
        },
      },
    ],
  ],
  ignore: ['node_modules', 'logs', '_build', '_deploy', '_tsc', '.dist', '.deploy', '.docker', '.next'],
};
