<template>
  <div class="cancelling" v-if="showFlag" ref="cancellingScroll">
    <div>
      <div class="cancelling-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="setRefuse" @trackClick="setTrack" :leftId="0" :order="orderOne"></v-module>
        <div class="cancelling-inside">
          <div>
            <span class="cancelling-gray">订单号码</span>
            <span id="cancelling-number" name="cancelling-number" class="cancelling-black">{{orderOne.orderNumber}}</span>
            <span class="cancelling-copy">复制</span>
          </div>
          <div class="cancelling-defray">
            <span class="cancelling-gray">订单时间</span>
            <span class="cancelling-black">{{orderOne.orderWhen}}</span>
          </div>
          <div class="cancelling-defray">
            <span class="cancelling-gray">支付方式</span>
            <span class="cancelling-black">{{orderOne.orderPay}}</span>
          </div>
        </div>
      </div>
    </div>
    <v-refuse ref="refuse" @scroll="toggleScroll" :orderOne="orderOne"></v-refuse>
    <div v-show="detailShow" class="tanchu">
      <div class="outbox" @click="nowant">
        <div class="boxtext1" >{{text1}}</div>
        <div class="boxtext2">{{text2}}</div>
      </div>
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Refuse from './refuse.vue';
  import Track from '../track/track.vue';

  export default{
    props: {
      cancell: {
        type: String
      }
    },
    data() {
      return {
        showFlag: false,
        title: '一点点便利店(滨江店)',
        tapShow: false,
        backShow: true,
        status: '正在取消订单',
        btnOne: '撤回取消',
        arrowShow: true,
        remarksShow: true,
        timeShow: true,
        rightShow: false,
        leftShow: true,
        orderOne: {
            type: Object
        },
        detailShow: false,
        text1: '提交成功',
        text2: '等待商家同意'
      };
    },
    created() {
//      this._initScroll();
      let clipboard = new Clipboard('.cancelling-copy', {
        text: function() {
          return document.getElementById('cancelling-number').innerText;
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
        if (this.cancell === 'cancell') {
          this.detailShow = true;
        } else {
          this.detailShow = false;
        }
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
          if (!this.cancellingScroll) {
            this.cancellingScroll = new BScroll(this.$refs.cancellingScroll, {
              click: true
            });
          } else {
            this.cancellingScroll.refresh();
          }
        });
      },
      setRefuse() {
        this.$refs.refuse.show(this.orderOne);
        this.toggleScroll();
      },
      nowant() {
        this.detailShow = false;
      },
      setTrack() {
//        this.trackShow = true;
        this.$refs.track.show(this.orderOne.orderTrack);
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-refuse': Refuse,
      'v-track': Track
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cancelling
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .cancelling-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .cancelling-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .cancelling-gray
          font-size 14px
          color #9c9c9c
        .cancelling-black
          margin-left 5px
          font-size 13px
          color #37373b
        .cancelling-defray
          margin-top 20px
        .cancelling-copy
          padding 0 6.5px
          position: absolute
          right 30px
          background 0
          border-radius: 7%
          border 1px solid #7e8c8d
          line-height:15px;
          font-size 7.5px
          color: #666666
    .tanchu
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background:rgba(0,0,0,0.0)
      line-height 100%
      .outbox
        left: 78px
        top: 35%
        height: 87px
        width: 214px
        background:rgba(0,0,0,0.8)
        color: #ffffff
        text-align: center
        line-height: 87px
        line-width: 214px
        font-family "PingFang-SC-Medium"
        font-size: 16px
        border-radius 5px
        .boxtext1
          height: 43px
          line-height: 63px
          width: 214px
          line-width: 214px
          text-align: center
        .boxtext2
          height: 43px
          line-height: 43px
          width: 214px
          line-width: 214px
          text-align: center
</style>
