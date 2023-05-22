module.exports = {
  webpack: {
    alias: {
      crypto: require.resolve("crypto-browserify"),
    },
    jest: {
      configure: {
        moduleNameMapper: {
          "^crypto$": require.resolve("crypto-browserify"),
        },
      },
    },
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          rxjs: require.resolve("rxjs"),
        },
      },
    },
  },
};
