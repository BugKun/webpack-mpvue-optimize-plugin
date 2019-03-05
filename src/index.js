class MpvueOptimizePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const {options} = this
    if(!options && typeof options.entry !== 'string' && !(options.chunkList instanceof Array)) return

    compiler.hooks.afterCompile.tap('MpvueOptimizePlugin', (compilation) => {
      const assets = compilation.assets,
        // 筛选JS文件
        JSFiles = Object.keys(assets).filter(item => item.split('.').pop() === 'js')

      let requireSplitFiles = ''
      if(options.chunkList instanceof Array) {
        this.options.chunkList.forEach(item => {
          // 重新引入提取出来的公共库
          requireSplitFiles += `require('${item}');\n`
        })
      }

      JSFiles.forEach(item => {
        const content = (assets[item].children instanceof Array) ? assets[item].children[0] : assets[item]
        // 修正webpack4打包时全局变量不是global的问题
        const nextValue = `var self = global;\n${content._value}`
        content._value = (typeof options.entry === 'string' && item.match(this.options.entry)) ? requireSplitFiles + nextValue : nextValue
      })
    })
  }
}

module.exports = MpvueOptimizePlugin