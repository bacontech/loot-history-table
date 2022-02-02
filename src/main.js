import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/store'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
import VuePapaParse from 'vue-papa-parse'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import vuetify from './plugins/vuetify';
import router from '@/router'


Vue.use(VueGoodTablePlugin);

Vue.use(VueProgress, {
  // defaultShape: 'circle',
})
Vue.use(VuePapaParse)


Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
