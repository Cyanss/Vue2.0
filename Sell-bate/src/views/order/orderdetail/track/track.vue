<template>
  <div class="track" v-show="showFlag">
    <div class="track-content">
      <div class="track-head">
        <span class="track-head-txt">订单跟踪</span>
      </div>
      <div class="tracks-content">
        <ul v-if="orderTrack">
          <li class="track-li" v-for="(item,index) in orderTrack">
            <div class="track-inside">
              <div class="track-status">
                <span :class="{'track-round':(index < orderTrack.length-1)}"></span>
                <span :class="{'track-circle':(index === orderTrack.length-1)}"></span>
                <span class="track-line" v-show="index < orderTrack.length-2"></span>
                <span class="track-line-short" v-show="index === orderTrack.length-2"></span>
              </div>
              <div class="track-middle">
                <span class="track-txt">{{orderTrack[index].orderState}}</span>
                <span class="track-date">{{orderTrack[index].orderTime}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="track-close" @click="closeClick">
        <span class="track-close-txt">关闭</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        showFlag: false,
        orderTrack: {
          type: Array
        }
//        orderTrack: [
//          {
//            orderState: '订单已提交',
//            orderTime: '7月28日 19：30'
//          },
//          {
//            orderState: '支付成功',
//            orderTime: '7月28日 19：30'
//          },
//          {
//            orderState: '商家已接单',
//            orderTime: '7月28日 19：30'
//          },
//          {
//            orderState: '商家等待配送',
//            orderTime: '7月28日 19：30'
//          },
//          {
//            orderState: '订单已完成',
//            orderTime: '7月28日 19：30'
//          }
//        ]
      };
    },
    methods: {
      show(orderTrack) {
        this.orderTrack = orderTrack;
        this.showFlag = true;
      },
      closeClick() {
        this.showFlag = false;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .track
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background rgba(0,0,0,0.3)
    .track-content
      position absolute
      bottom 0
      width 100%
      background white
      font-family "PingFang SC"
      .track-head
        display flex
        align-items center
        justify-content center
        height 45px
        width 100%
        border-bottom 0.5px solid #f3f3f3
        .track-head-txt
          font-size 15px
          font-weight bold
      .tracks-content
        margin  35px 15px 0 30px
        padding-bottom 55px
        max-height 395px
        width 100%
        .track-li
          margin-bottom 35px
          height 100%
          width 100%
          .track-inside
            display flex
            align-items center
            .track-status
              margin 0
              padding 0
              height 5.5px
              width 5.5px
              text-align center
              .track-round
                display block
                height 5.5px
                width 5.5px
                background #cccccc
                border-radius 100%
              .track-circle
                display block
                position absolute
                left 26px
                bottom 90px
                height 13.5px
                width 13.5px
                background-size 13.5px 13.5px
                background-repeat no-repeat
                bg-image('round')
              .track-line
                display block
                margin-left 2.4px
                height 44.5px
                width 1px
                background #cccccc
              .track-line-short
                display block
                margin-left 2.4px
                height 42px
                width 1px
                background #cccccc
            .track-middle
              display flex
              align-items center
              margin-left 25px
              .track-txt
                font-size 15px
                color #333333
              .track-date
                position absolute
                right 45px
                font-size 14px
                color #9c9c9c
      .track-close
        display flex
        align-items center
        justify-content center
        position absolute
        bottom 0
        height 49px
        width 100%
        background #fdcf00
        .track-close-txt
          font-family "PingFang SC"
          font-weight bold
          font-size 16px
          color #37373b
</style>
