import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import VeeValidate from 'vee-validate'
import HighlightJs from 'highlight.js'
import 'highlight.js/styles/github.css'

Vue.use(VeeValidate)
Vue.use(HighlightJs.vuePlugin);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
