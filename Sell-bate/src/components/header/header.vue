<template>
  <div class="header">
    <div class="header-content">
      <div class="header-shop-image">
        <img width="70" height="70" :src="shopInfo.shopImage">
      </div>
      <div class="header-shop-content">
        <span class="content-line1">{{shopInfo.title}}</span>
        <div class="content-line2">
            <span class="star">
              <v-star :size="24" :score="shopInfo.star"></v-star>
              <span class="star-score">{{shopInfo.star}}</span>
            </span>
            <span class="sell-count">月售{{shopInfo.sellCount}}份</span>
        </div>
        <div class="content-line3">
          <span class="delivery-time">{{shopInfo.deliveryTime}}<span class="text">分钟</span></span>
          <span class="distance">{{shopInfo.distance}}km</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="24" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/star';
  export default {
    props: {
      shopInfo: {
        type: Object
      },
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'new', 'special'];
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .header
    width 100%
    height 75px
    color: #fff
    background: #37373b
    .header-content
      height 60px
      display block
      position relative
      padding 15px 15px 0 15px
      font-family "PingFang SC"
      .header-shop-image
        display inline-block
        width 70px
        height 70px
        position absolute
        bottom -10px
        border-radius 5px
        box-shadow 2px 2px 4px rgba(0,0,0,0.26);
      .header-shop-content
        display inline-block
        position relative
        left 95px
        .content-line1
          font-family "PingFang SC"
          display inline-block
          font-size 12px
          color white
          width 250px
          text-overflow ellipsis
          overflow hidden
          white-space: nowrap
          @media only screen and (max-width: 320px)
            width 190px
        .content-line2
          padding 7px 0
          color #707072
          font-size 11px
          .star
            display inline-block
            .star-score
              padding-left 5px
          .sell-count
            font-family "PingFang SC"
            padding-left 5px
            display inline-block
            font-size 10px
            border-left 1px solid white
        .content-line3
          font-family "PingFang SC"
          font-size 11px
          color #fdcf00
          .delivery-time
            display inline-block
            .text
              font-size 11px
          .distance
            display inline-block
            font-size 11px
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px

          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
