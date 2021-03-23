module.exports={
  configureWebpack:{
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/networks',
        'views':'@/views'
      }
    }
  },
  lintOnSave: false
}
