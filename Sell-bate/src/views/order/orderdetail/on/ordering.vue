<template>
  <div>
    <div class="ordering" v-show="showFlag" ref="orderingScroll">
      <div class="ordering-wrapper">
        <div class="ordering-content">
          <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
          <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :btnTwo="btnTwo" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="setCancel" @rightClick="setSubmit" @trackClick="setTrack" :leftId="0" :rightId="2" :order="orderOne"></v-module>
          <div class="ordering-inside">
            <div>
              <span class="ordering-gray">订单号码</span>
              <span id="ordering-on-number" class="ordering-black">{{orderOne.orderNumber}}</span>
              <span class="ordering-on-copy">复制</span>
            </div>
            <div class="ordering-defray">
              <span class="ordering-gray">订单时间</span>
              <span class="ordering-black">{{orderOne.orderWhen}}</span>
            </div>
            <div class="ordering-defray">
              <span class="ordering-gray">支付方式</span>
              <span class="ordering-black">{{orderOne.orderPay}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--<div v-show="trackShow" class="module-track">-->
      <!--<div class="module-box">-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
    <v-cancel ref="cancel" @scroll="toggleScroll" :orderOne="orderOne"></v-cancel>
    <v-submit ref="submit" @scroll="toggleScroll"></v-submit>
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

  export default{
    data() {
      return {
        trackShow: false,
        showFlag: false,
        title: '一点点便利店（滨江店）',
        tapShow: false,
        backShow: true,
        status: '订单正在进行中',
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
//      this._initScroll();

//      console.log('1' + this);
//      console.log('2' + this.$refs);
//      console.log('3' + this.$refs.detailWrapper);\
      var clipboard = new Clipboard('.ordering-on-copy', {
        text: function() {
          return document.getElementById('ordering-on-number').innerText;
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
          if (!this.orderingScroll) {
            this.orderingScroll = new BScroll(this.$refs.orderingScroll, {
              click: true
            });
          } else {
            this.orderingScroll.refresh();
          }
        });
      },
     setCancel(event) {
        this.$refs.cancel.show(this.orderOne);
        this.toggleScroll();
      },
      setSubmit() {
        this.$refs.submit.show(this.orderOne);
        this.toggleScroll();
      },
      setTrack() {
//        this.trackShow = true;
        this.$refs.track.show(this.orderOne.orderTrack);
        this.toggleScroll();
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-cancel': Cancel,
      'v-submit': Submit,
      'v-track': Track
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .ordering
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .ordering-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .ordering-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .ordering-gray
          font-size 14px
          color #9c9c9c
        .ordering-black
          margin-left 5px
          font-size 13px
          color #37373b
        .ordering-defray
          margin-top 20px
        .ordering-on-copy
          padding 0 6.5px
          position: absolute
          right 30px
          background 0
          border-radius: 7%
          border 1px solid #7e8c8d
          line-height:15px;
          font-size 7.5px
          color: #666666
    .module-track
      position: absolute
      bottom 0
      z-index: 100
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      overflow: auto
      background:rgba(0,0,0,0.3)
      .module-box
        position: fixed
        width: 100%
        height: 350px
        background: #fff
        bottom: 0px
</style>
