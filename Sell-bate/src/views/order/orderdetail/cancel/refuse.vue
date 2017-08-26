<template>
  <div class="refuse" v-show="showFlag" ref="refuseScroll">
    <div>
      <div class="refuse-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :btnTwo="btnTwo" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="setCancelled" @rightClick="setOrdered" @trackClick="setTrack" :leftId="0" :rightId="2" :order="orderOne"></v-module>
        <div class="refuse-inside">
          <div>
            <span class="refuse-gray">订单号码</span>
            <span id="refuse-number" class="refuse-black">{{orderOne.orderNumber}}</span>
            <span class="refuse-copy">复制</span>
          </div>
          <div class="refuse-defray">
            <span class="refuse-gray">订单时间</span>
            <span class="refuse-black">{{orderOne.orderWhen}}</span>
          </div>
          <div class="refuse-defray">
            <span class="refuse-gray">支付方式</span>
            <span class="refuse-black">{{orderOne.orderPay}}</span>
          </div>
        </div>
      </div>
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
    <v-cancelled ref="cancelled" @scroll="toggleScroll" :orderOne="orderOne"></v-cancelled>
    <v-ordered ref="ordered" @scroll="toggleScroll" :orderOne="orderOne"></v-ordered>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Cancelled from './cancelled.vue';
  import Ordered from '../on/ordered.vue';
  import Track from '../track/track.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '一点点便利店（滨江店）',
        tapShow: false,
        backShow: true,
        status: '商家已拒绝取消订单',
        btnOne: '取消订单',
        btnTwo: '确认收货',
        arrowShow: true,
        remarksShow: true,
        timeShow: true,
        rightShow: true,
        leftShow: true,
        orderOne: {
          type: Object
        }
      };
    },
    created() {
      let clipboard = new Clipboard('.refuse-copy', {
        text: function() {
          return document.getElementById('refuse-number').innerText;
        }
      });
      clipboard.on('success', function(e) {
        console.log(e);
        alert('复制成功');
      });
      clipboard.on('error', function(e) {
        console.log(e);
        alert('您的浏览器不支持此复制功能，请选中相应内容并使用Ctrl+C进行复制');
      });
    },
    methods: {
      show(orderOne) {
        this.orderOne = orderOne;
        this.showFlag = true;
        this._initScroll();
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.refuseScroll) {
            this.refuseScroll = new BScroll(this.$refs.refuseScroll, {
              click: true
            });
          } else {
            this.refuseScroll.refresh();
          }
        });
      },
      setCancelled() {
        this.$refs.cancelled.show(this.orderOne);
        this.toggleScroll();
      },
      setOrdered() {
        this.$refs.ordered.show(this.orderOne);
        this.toggleScroll();
      },
      setTrack() {
//        this.trackShow = true;
        this.$refs.track.show(this.orderOne.orderTrack);
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-cancelled': Cancelled,
      'v-ordered': Ordered,
      'v-track': Track
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .refuse
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .refuse-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .refuse-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .refuse-gray
          font-size 14px
          color #9c9c9c
        .refuse-black
          margin-left 5px
          font-size 13px
          color #37373b
        .refuse-defray
          margin-top 20px
        .refuse-copy
          padding 0 6.5px
          position: absolute
          right 30px
          background 0
          border-radius: 7%
          border 1px solid #7e8c8d
          line-height:15px;
          font-size 7.5px
          color: #666666

</style>
