module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.csv$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}
//
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/loot-history-table/'
//     : '/'
// }
