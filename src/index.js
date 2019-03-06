function MpvueOptimizePlugin() {}

MpvueOptimizePlugin.prototype.apply = function(compiler) {
  compiler.hooks.afterCompile.tap('MpvueOptimizePlugin', (compilation) => {
    const assets = compilation.assets,
      // 筛选JS文件
      JSFiles = Object.keys(assets).filter(item => item.split('.').pop() === 'js')

    JSFiles.forEach(item => {
      const content = (assets[item].children instanceof Array) ? assets[item].children[0] : assets[item]
      // 修正webpack4打包时全局变量不是global的问题
      content._value = `var self = global || {};\n${content._value}`
    })
  })
}

module.exports = MpvueOptimizePlugin