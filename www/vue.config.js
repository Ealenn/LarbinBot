module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/LarbinBot/'
    : '/',
  lintOnSave: false,
  transpileDependencies: [
    'vuex-module-decorators',
    'vuetify'
  ]
}
