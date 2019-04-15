const isProduction = String(process.env.NODE_ENV) === 'production';
const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = () => {
  return {
    presets: [
      require('@babel/preset-react'),
      [require('@babel/preset-env'), {modules: isTest ? 'commonjs' : false}],
    ],
    plugins: [
      [
        require('@wordpress/babel-plugin-import-jsx-pragma'),
        {
          scopeVariable: 'jsx',
          source: '@emotion/core',
          isDefault: false,
        },
      ],
      [
        require('@babel/plugin-transform-react-jsx'),
        {
          pragma: 'jsx',
        },
      ],
      [
        require('babel-plugin-emotion'),
        {
          sourceMap: !isProduction,
          autoLabel: !isProduction,
          labelFormat: '[dirname]-[filename]--[local]',
        },
      ],
      require('@babel/plugin-proposal-class-properties'),
      isTest ? require('babel-plugin-dynamic-import-node') : null,
    ].filter(x => x),
  };
};
