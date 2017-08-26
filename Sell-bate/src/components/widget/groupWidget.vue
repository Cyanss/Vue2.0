<template>
  <div class="group-widget">
    <div class="group-widget-content" @click="goShop">
      <div class="group-widget-shop-icon">
        <img width="55" height="55" :src="shopPackage.url">
      </div>
      <div class="group-widget-shop-info">
        <span class="widget-info-shop-name">{{shopPackage.name}}</span>
        <div class="widget-info-shop-content">
          <div class="info-content-line1">
            <span class="star">
              <v-star :size="24" :score="shopPackage.score"></v-star>
              <span class="star-score">{{shopPackage.score}}</span>
            </span>
            <span class="sell-count">月售{{shopPackage.sellCount}}份</span>
            <span class="good-price"><span class="sign">￥</span>{{shopPackage.price}}</span>
          </div>
          <div class="info-content-line2">
            <span class="support-icon" :class="classMap[shopPackage.supports[0].type]"></span>
            <span class="support-content">{{shopPackage.supports[0].description}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="widget-info-shop-bottom" @click="goGood">
      <img :src="shopPackage.icon_url" @load="initImage">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../../components/star/star.vue';
  export default{
    props: {
      shopPackage: {
        type: Object
      }
    },
    created() {
      this.classMap = ['new', 'special', 'decrease'];
    },
    methods: {
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        let width = screen.width - 60;
        let height = width * proportion;
        target.width = width;
        target.height = height;
      },
      goGood() {
        this.$router.push({path: '/shops/goods', query: { shopId: 1, goodId: 0 }});
      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      }
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .group-widget
    margin 0 15px 10px 15px
    border-radius 5px
    padding 15px 15px 10px 15px
    background white
    @media only screen and (max-width: 320px)
      margin 0 10px 10px 14px
    .group-widget-content
      display flex
      height 60px
      .group-widget-shop-icon
        display block
        width 55px
        height 55px
        flex 0 0 55px
      .group-widget-shop-info
        display inline-block
        flex 1
        padding-left 15px
        @media only screen and (max-width: 320px)
          padding-left 10px
        .widget-info-shop-name
          font-family "PingFang SC"
          color #37373b
          font-weight bold
          font-size 16px
        .widget-info-shop-content
          position: relative
          display block
          font-size 11px
          .info-content-line1
            padding-top 8px
            color #707072
            position relative
            display block
            .star
              display inline-block
              .star-score
                padding-left 5px
                padding-right 3px
                font-size 11px
                border-right 1px solid #aeaeaf
            .sell-count
              display inline-block
              font-size 8px
            .good-price
              position absolute
              right 0
              bottom -6px
              color #f07373
              font-family "PingFang SC"
              font-size 30px
              font-weight 700
              @media only screen and (max-width: 320px)
                font-size 24px
              .sign
                font-size 25px
                @media only screen and (max-width: 320px)
                  font-size 20px
          .info-content-line2
            padding-top 8px
            color #aeaeaf
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
              font-size 12px
    .widget-info-shop-bottom
      display block
      border-radius 5px
      height 92px
      margin-top 10px
      @media only screen and (max-width: 320px)
        height 76px

</style>
