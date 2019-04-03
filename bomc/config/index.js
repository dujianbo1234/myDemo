'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://192.168.137.221:8080', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/pps': {
        target: "http://192.168.127.247:8092",
        changeOrigin: true,
        pathRewrite: {
          '^/pps': '/pps'
        }
      },
      '/uua': {
        target: 'http://192.168.127.247:12000', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/uua': '/uua'
        }
      },
      '/oms': {
        target: 'http://192.168.127.247:12000', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true
      },
      '/cps': {
        target: 'http://192.168.191.2:8081', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/'
        // }
      },
      '/ops': {
        target: 'http://192.168.191.2:8082', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/'
        // }
      }
      //			cssSourceMap: false

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9528, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist' + (process.argv[2] && (process.argv[2] != 'index') ? '/' + process.argv[2] : '')),
    // assetsSubDirectory: (process.argv[2] && (process.argv[2] != 'index') ?process.argv[2]+'/':'') +'static',
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: '/CTBOMC/' + (process.argv[2] && (process.argv[2] != 'index') ? process.argv[2] + '/' : ''),

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}