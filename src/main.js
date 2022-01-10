import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "typeface-notokufiarabic/index.css"
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import AlertComponent from './components/Shared/Alert.vue'
Vue.component('app-alert', AlertComponent)
const moment = require('moment')
require('moment/locale/ar')
Vue.use(require('vue-moment'), {
  moment
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
