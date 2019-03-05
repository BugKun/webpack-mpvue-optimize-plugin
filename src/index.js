class MpvueOptimizePlugin {
  constructor(options) {
    this.options = options
  }

  validate(options) {
    if(options) {
      if(typeof options.entry !== 'string') {
        return false
      }
      if(!(options.chunkList instanceof Array)) {
        return false
      }
      return true
    }else {
      return false
    }
  }

  apply(compiler) {
    if(!this.validate(this.options)) return;

    compiler.hooks.afterCompile.tap('MpvueOptimizePlugin', (compilation) => {
      const assets = compilation.assets,
        // 筛选JS文件
        JSFiles = Object.keys(assets).filter(item => item.split('.').pop() === 'js')

      let requireSplitFiles = ''
      this.options.chunkList.forEach(item => {
        // 重新引入提取出来的公共库
        requireSplitFiles += `require('${item}');\n`
      })

      JSFiles.forEach(item => {
        const content = (assets[item].children instanceof Array) ? assets[item].children[0] : assets[item]
        // 修正webpack4打包时全局变量不是global的问题
        const nextValue = `var self = global;\n${content._value}`
        content._value = (item.match(this.options.entry)) ? requireSplitFiles + nextValue : nextValue
      })
    })
  }
}

module.exports = MpvueOptimizePlugin