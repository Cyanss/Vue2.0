import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Goods from '../components/goods/goods.vue';
import Ratings from '../components/ratings/ratings.vue';
import Seller from '../components/seller/seller.vue';
export default new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Goods },
    { path: '/goods', component: Goods },
    { path: '/ratings', component: Ratings },
    { path: '/seller', component: Seller }
  ]
});
