const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //项目打包之后黑白屏问题
  publicPath: './',
  devServer: {
    //端口号
    port: 8888,
    //主机名
    host: 'localhost',
    //启动项目时是否自动打开浏览器
    open: true,
    //是否开启https
    https: false,
    //配置跨域
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }

  },
  lintOnSave: false
})
