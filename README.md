# webpack4-mpvue-optimize-plugin

>Webpack4 optimize Support for mpvue

## 功能

- 支持并发上传
- 智能分析，增量上传，不重复上传

## 安装

```Bash
npm install --save-dev webpack4-mpvue-optimize-plugin
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
    new MpvueOptimizePlugin({
      entry: 'app.js',
      list: [
        'common/manifest',
        'common/vendor'
      ]
    })
  ]
}
```

**配置项**

|Name|Type|Required|Description|
|:--:|:--:|:-----:|:----------|
|**[`entry`](#)**|`{String}`| true |小程序的入口文件|
|**[`list`](#)**|`{Array<String>}`| true |打包优化的分包名称|

***