const { DefinePlugin } = require('webpack');

module.exports = {
  devServer: {
    port: 8080
  },
  transpileDependencies: [
    '@vue/cli-service'
  ],

  configureWebpack: {
    plugins: [
      new DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
      })
    ]
  }
};
