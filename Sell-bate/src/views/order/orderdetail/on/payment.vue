<template>
  <div>
    <div class="payment-on" v-show="showFlag" ref="paymentScroll">
      <div class="payment-on-wrapper">
        <div class="payment-on-content">
          <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
          <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :btnTwo="btnTwo" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="setCancel" @rightClick="setSubmit" :leftId="0" :rightId="2" :order="orderOne"></v-module>
          <div class="payment-on-inside">
            <div>
              <span class="payment-on-gray">订单号码</span>
              <span id="payment-on-number" class="payment-on-black">{{orderOne.orderNumber}}</span>
              <span class="payment-on-copy">复制</span>
            </div>
            <div class="payment-on-defray">
              <span class="payment-on-gray">订单时间</span>
              <span class="payment-on-black">{{orderOne.orderWhen}}</span>
            </div>
            <div class="payment-on-defray">
              <span class="payment-on-gray">支付方式</span>
              <span class="payment-on-black">{{orderOne.orderPay}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
    <v-cancel ref="cancel" @scroll="toggleScroll" :orderOne="orderOne"></v-cancel>
    <v-submit ref="submit" @scroll="toggleScroll"></v-submit>
    <v-pay ref="pay" @scroll="toggleScroll"></v-pay>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Cancel from '../cancel/cancel.vue';
  import Submit from '../../submit/submit.vue';
  import Track from '../track/track.vue';
  import Pay from '../../pay/pay.vue';

  export default{
    data() {
      return {
        trackShow: false,
        showFlag: false,
        title: '一点点便利店（滨江店）',
        tapShow: false,
        backShow: true,
        status: '订单等待支付中',
        btnOne: '取消订单',
        btnTwo: '确认支付',
        arrowShow: false,
        remarksShow: true,
        timeShow: true,
        rightShow: true,
        leftShow: true,
        orderOne: {
          type: Object
        },
        order: {
          type: Object
        }
      };
    },
    created() {
//      this._initScroll();

//      console.log('1' + this);
//      console.log('2' + this.$refs);
//      console.log('3' + this.$refs.detailWrapper);\
      let clipboard = new Clipboard('.payment-on-copy', {
        text: function() {
          return document.getElementById('payment-on-number').innerText;
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
          if (!this.paymentScroll) {
            this.paymentScroll = new BScroll(this.$refs.paymentScroll, {
              click: true
            });
          } else {
            this.paymentScroll.refresh();
          }
        });
      },
      setCancel() {
        this.$refs.cancel.show(this.orderOne);
        this.toggleScroll();
      },
      setSubmit() {
        let time = new Date();
        this.orderOne.orderWhen = time.getTime() + 900000;
        this.order = this.orderOne;
        this.$refs.pay.show(this.order);
        this.toggleScroll();
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-cancel': Cancel,
      'v-submit': Submit,
      'v-track': Track,
      'v-pay': Pay
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .payment-on
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .payment-on-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .payment-on-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .payment-on-gray
          font-size 14px
          color #9c9c9c
        .payment-on-black
          margin-left 5px
          font-size 13px
          color #37373b
        .payment-on-defray
          margin-top 20px
        .payment-on-copy
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
