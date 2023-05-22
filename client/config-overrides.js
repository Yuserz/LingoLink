const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add the resolve fallback configuration
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify')
  };

  // Add the crypto-browserify fallback plugin
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      stream: require.resolve('stream-browserify')
    })
  );

  return config;
};
