const { defineConfig } = require('@vue/cli-service')

module.exports = {
  devServer: {
    port: 8080
  },
  transpileDependencies: [
    '@vue/cli-service'
  ]
};

