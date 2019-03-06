# webpack4-mpvue-optimize-plugin

>Webpack4 optimize support for mpvue

## 功能

- 修正Webpack4提取公共模块后,全局变量不正确的问题

## 安装

```Bash
npm install webpack4-mpvue-optimize-plugin --save-dev
```


## 使用

**webpack.config.js**

```Javascript
const MpvueOptimizePlugin = require('webpack4-mpvue-optimize-plugin');

module.exports = {
  // ... Webpack 相关置配
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
            test: /node_modules/,
            name: 'common/vendor',
            chunks: 'initial',
            priority: 10,
            enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'common/manifest'
    }
  },
  plugins: [
    new MpvueOptimizePlugin()
  ]
}
```