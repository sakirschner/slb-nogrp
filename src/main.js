import Vue from 'vue';
import App from '../src/views/App';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router/router';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
