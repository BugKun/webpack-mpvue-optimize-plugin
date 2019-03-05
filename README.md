# webpack4-mpvue-optimize-plugin

>Webpack4 optimize support for mpvue

## 功能

- 修正Webpack4提取公共模块后,全局变量不正确的问题
- 修正Webpack4提取公共模块后,不能在入口文件引用公共模块的问题

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
    new MpvueOptimizePlugin({
      entry: 'app.js',
      chunkList: [
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
|**[`chunkList`](#)**|`{Array<String>}`| true |打包优化的分包名称|

***