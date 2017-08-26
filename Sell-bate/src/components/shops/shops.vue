<template>
  <div class="shops" >
    <v-head :bgId="0" :backShow="true" :title="title" :moreShow="true" @back="back"></v-head>
    <v-header :shopInfo="shopInfo" :seller="seller"></v-header>
    <div class="activity-wrap">
      <ul class="activity-list">
        <li class="activity-item" v-for="(item, index) in shopInfo.supports">
          <span class="activity-icon" :class="classMap[item.type]"></span>
          <span class="activity-desc">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="shops-tab border-bottom-1px border-top-1px">
      <div class="shops-tab-item">
        <router-link to="/shops/goods">
          <div class="route-item">食品</div>
        </router-link>
      </div>
      <div class="shops-tab-item">
        <router-link to="/shops/ratings">
          <div class="route-item">评价({{shopInfo.ratingsCount}})</div>
        </router-link>
      </div>
      <div class="shops-tab-item">
        <router-link to="/shops/seller">
          <div class="route-item">商家</div>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header/header.vue';
  import Head from '../header/head.vue';
  const ERR_OK = 0;
  let shopId;
  export default {
    data() {
      return {
        seller: {},
        showFlag: false,
        title: '先锋便利店（西兴店）',
        ratingsLength: 0,
        shopInfo: {
            shopName: '鲜峰便利店(西兴店)',
            title: '公告：欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断',
            shopImage: '../../../static/images/shop_img_3.png',
            star: 4.5,
            sellCount: 153,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.3,
            ratingsCount: 100,
            distance: 2.4,
            supports: [
              {
                type: 0,
                description: '新用户立即享受5折优惠'
              },
              {
                type: 1,
                description: '农夫山泉特价处理'
              },
              {
                type: 2,
                description: '满20减5,满40减15,满50减20'
              }
            ],
            activityCount: 4
          }
      };
    },
    mounted() {
      if (shopId || shopId === 0) {
//        this.$refs.good.show();
      }
    },
    activated() {
      if (shopId || shopId === 0) {
//        this._searchGood();
      }
    },
    created() {
//      if (this.$route.query.shopId || this.$route.query.shopId === 0) {
//        shopId = this.$route.query.shopId;
//      }
      this.classMap = ['new', 'special', 'decrease'];
      this.$http.get('/api/seller?shopId=' + shopId).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    methods: {
      back() {
        this.$router.push({path: '/home/hot'});
      }
    },
    components: {
      'v-header': Header,
      'v-head': Head
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .shops
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60
    background white
    .activity-wrap
      width 100%
      font-family "PingFang SC"
      padding 21px 15px 10px 15px
      border-bottom-1px(#cacacf)
      position relative
      .activity-number
        display inline-block
        position absolute
        right 35px
        top 25px
        font-family "PingFang-SC-Medium"
        font-size 10px
        color #9c9c9c
        .activity-count
          display inline-block
        .up-on
          display inline-block
          padding-left 10px
          width 11px
          height 6px
          background-size 11px 6px
          background-repeat no-repeat
          bg-image(up_on)
      .activity-list
        .activity-item
          padding-bottom 5px
          padding-left 5px
          display block
          .activity-icon
            display inline-block
            vertical-align top
            width 13px
            height 13px
            background-size 13px 13px
            background-repeat no-repeat
            &.new
              bg-image(new_3)
            &.special
              bg-image(special_3)
            &.decrease
              bg-image(decrease_3)
          .activity-desc
            display inline-block
            vertical-align top
            font-family "PingFang-SC-Medium"
            font-size 11px
            color #707072
    .shops-tab
      display flex
      width 100%
      height 45px
      line-height 45px
      .shops-tab-item
        flex 1
        display inline-block
        text-align center
        & > a
          display block
          font-size 15px
          font-family "PingFang SC"
          font-weight 700
          color #9c9c9c
          &.active
            .route-item
              border-bottom-1px(#fdcf00)
              color #fdcf00
        .route-item
          margin 0 auto
          width 70px
</style>
