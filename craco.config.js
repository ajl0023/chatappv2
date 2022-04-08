const webpack = require("webpack");
module.exports = {
  plugins: [
    {
      plugin: require("craco-plugin-scoped-css"),
    },
  ],
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {} },
        }),
      ],
    },
  },
};
