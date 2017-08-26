<template>
  <div class="shop-widget">
    <div class="shop-widget-top" @click.stop.prevent="goShop">
      <div class="widget-shop-pic">
        <img :src="shopInfo.shopImage" width="65" height="65">
      </div>
      <div class="widget-shop-info">
        <span class="shop-name">{{shopInfo.shopName}}</span>
        <div class="info-content">
          <div class="content-line1">
            <span class="star">
              <v-star :size="24" :score="shopInfo.star"></v-star>
              <span class="star-score">{{shopInfo.star}}</span>
            </span>
            <span class="sell-count">月售{{shopInfo.sellCount}}份</span>
            <span class="delivery-time">{{shopInfo.deliveryTime}}<span class="text">分钟</span></span>
          </div>
          <div class="content-line2">
            <span class="min-price">￥{{shopInfo.minPrice}}元起送</span>/<span class="delivery-price">配送费￥{{shopInfo.deliveryPrice}}</span>/<span class="rating-score">评价{{shopInfo.ratingScore}}分</span>
            <span class="distance">{{shopInfo.distance}}km</span>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-widget-content-activity">
      <span class="support-icon" :class="classMap[shopInfo.supports[0].type]"></span>
      <span class="support-content">{{shopInfo.supports[0].description}}</span>
      <span class="activity" @click.stop.prevent="showActivity" >{{shopInfo.activityCount}}个活动<span class="activity-icon" :class="upButton()"></span></span>
      <ul class="activity-wrap" v-show="activityShows">
        <li class="activity-item" v-for="(item, index) in shopInfo.supports" v-if="index!==0" >
          <span class="activity-icon" :class="classMap[item.type]"></span>
          <span class="activity-desc">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="shop-widget-content-scroll border-bottom-1px" ref="shopWidgetScroll">
      <ul class="shop-widget-scroll-list" ref="shopWidgetScrollList">
        <li class="shop-widget-list-item" v-for="(item, index) in shopInfo.shopFoods" @click.stop.prevent="goGood">
          <span class="shop-good-img">
            <img :src="item.image.url" width="81" height="81" >
          </span>
          <span class="shop-good-name">{{item.foodName}}</span>
          <span class="shop-good-price"><span class="price-sign">￥</span>{{item.foodPrice}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Star from '../../components/star/star.vue';
  export default{
    props: {
      shopInfo: {
        type: Object,
        default: null
      }
    },
    created() {
      this.classMap = ['new', 'special', 'decrease'];
      this.upMap = ['up-on', 'up-off'];
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    data() {
      return {
        activityShows: false
      };
    },
    methods: {
      _initScroll() {
        if (this.shopInfo) {
          let picWidth = 81;
          let margin = 10;
          let width = width = (picWidth + margin) * this.shopInfo.shopFoods.length;
          this.$refs.shopWidgetScrollList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.shopWidgetScroll) {
              this.shopWidgetScroll = new BScroll(this.$refs.shopWidgetScroll, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.shopWidgetScroll.refresh();
            }
          });
        }
      },
      goGood(event) {
        if (!event._constructed) {
          return;
        }
        this.$router.push({path: '/shops/goods', query: { shopId: 1, goodId: 0 }});
      },
      goShop(event) {
        if (!event._constructed) {
          return;
        }
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
      showActivity(event) {
        if (!event._constructed) {
          return;
        }
        this.activityShows = !this.activityShows;
      },
      upButton() {
        if (this.activityShows) {
          return 'up-on';
        } else {
          return 'up-off';
        }
      }
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-widget
    width 100%
    display block
    .shop-widget-top
      height 65px
      padding-top 15px
      padding-left 10px
      padding-right 15px
      display flex
      .widget-shop-pic
        display inline-block
        width 65px
        height 65px
        flex 0
      .widget-shop-info
        display inline-block
        flex 1
        padding-left 15px
        .shop-name
          display inline-block
          padding-top 4px
          font-family "PingFang SC"
          font-size 16px
          color #37373b
          font-weight 700
        .info-content
          font-family "PingFang SC"
          font-size 11px
          .content-line1
            position relative
            color #707072
            padding-top 10px
            display block
            .star
              display inline-block
              .star-score
                padding-left 10px
                font-size 11px
            .sell-count
              font-size 11px
              padding-left 5px
              border-left 1px solid #cfd0cb
            .delivery-time
              right 0
              color #ff5339
              position absolute
              font-size 10px
              .text
                font-size 9px
          .content-line2
            position relative
            color #707072
            padding-top 10px
            .distance
              padding-top 3px
              position absolute
              right 0
              font-size 9px
              color #c9c9c9
    .shop-widget-content-activity
      font-family "PingFang SC"
      font-size 11px
      position relative
      color #aeaeaf
      padding-top 10px
      display block
      padding-left 90px
      .support-icon
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
      .support-content
        display inline-block
        vertical-align top
        padding-bottom 5px
        @media only screen and (max-width: 320px)
          font-size 10px
          width 130px
          text-overflow ellipsis
          overflow hidden
          white-space: nowrap
      .activity
        display inline-block
        position absolute
        right 15px
        font-size 9px
        color #c9c9c9
        .activity-icon
          display inline-block
          width 11px
          height 6px
          background-size 11px 6px
          background-repeat no-repeat
          &.up-on
            bg-image(up_on)
          &.up-off
            bg-image(up_off)
      .activity-wrap
        margin-right 15px
        position relative
        .activity-item
          padding-bottom 5px
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
            font-family "PingFang SC"
            font-size 11px
            color #aeaeaf
    .shop-widget-content-scroll
      height 155px
      width: 100%
      padding-top 10px
      overflow: hidden
      white-space: nowrap
      position relative
      .shop-widget-scroll-list
        font-size: 0
        .shop-widget-list-item
          display: inline-block
          width: 91px
          height: 103px
          text-align center
          .shop-good-img
            display block
            width 81px
            height 81px
            margin 0 auto
            border-radius 5px
            &.last-chlid
              padding-right 10px
          .shop-good-name
            display block
            font-size 12px
            width 100%
            padding 15px 0 10px 0
            text-align center
          .shop-good-price
            display block
            font-size 10px
            color #f03737
            font-family "PingFang SC"
            width 100%
            text-align cent
            font-weight 700
            .price-sign
              display inline-block
              font-size 9px
</style>
