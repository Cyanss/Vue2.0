import Vue from 'vue';
import App from './App';
import router from './router';
import Fastclick from 'fastclick';

Vue.config.productionTip = false;
import '@/common/stylus/index.styl';

Fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
