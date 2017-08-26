import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/home.vue';
import Order from '../views/order/order.vue';
import Person from '../views/person/person.vue';
import Hot from '../views/home/hot/hot.vue';
import Nearby from '../views/home/nearby/nearby.vue';
import Incomplete from '../views/order/incomplete/incomplete.vue';
import Complete from '../views/order/complete/complete.vue';
import Shop from '../components/shops/shops.vue';
import Goods from '../components/shops/goods/goods.vue';
import Ratings from '../components/shops/ratings/ratings.vue';
import Seller from '../components/shops/seller/seller.vue';
import Food from '../components/shops/good/good.vue';
import Coupon from '../views/person/coupon/coupon.vue';
import Address from '../views/person/address/address.vue';
import AddSites from '../views/person/address/addSites.vue';
import AddressSelect from '../views/person/address/addressSelect.vue';
Vue.use(Router);
export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {path: '/', redirect: '/home/hot'},
    {
      path: '/home',
      component: Home,
      children: [
        {path: '', redirect: '/home/hot'},
        {path: 'hot', name: 'hot', component: Hot},
        {path: 'nearby', name: 'nearby', component: Nearby}
      ]
    },
    {
      path: '/order',
      component: Order,
      children: [
        {path: '', redirect: '/order/incomplete'},
        {path: 'incomplete', component: Incomplete},
        {path: 'complete', component: Complete}
      ]
    },
    {
      path: '/person',
      component: Person,
      children: [
        { path: '', redirect: '' },
        { path: 'coupon', component: Coupon },
        { path: 'address', component: Address },
        { path: 'addsites', component: AddSites },
        { path: 'addressSelect', component: AddressSelect }
      ]
    },
    {
      path: '/shops',
      component: Shop,
      children: [
        { path: '', redirect: '/shops/goods' },
        { path: 'goods', component: Goods },
        { path: 'ratings', component: Ratings },
        { path: 'seller', component: Seller },
        { path: 'food', component: Food }
      ]
    }
  ]
});
