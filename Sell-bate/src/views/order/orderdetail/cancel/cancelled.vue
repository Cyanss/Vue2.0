<template>
  <div class="cancelled" v-if="showFlag" ref="cancelledScroll">
    <div>
      <div class="cancelled-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="leftClick" @trackClick="setTrack" :leftId="0" :order="orderOne"></v-module>
        <div class="cancelled-inside">
          <div>
            <span class="cancelled-gray">订单号码</span>
            <span id="cancelled-number" class="cancelled-black">{{orderOne.orderNumber}}</span>
            <span class="cancelled-copy">复制</span>
          </div>
          <div class="cancelled-defray">
            <span class="cancelled-gray">订单时间</span>
            <span class="cancelled-black">{{orderOne.orderWhen}}</span>
          </div>
          <div class="cancelled-defray">
            <span class="cancelled-gray">支付方式</span>
            <span class="cancelled-black">{{orderOne.orderPay}}</span>
          </div>
        </div>
      </div>
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
    <!--<v-share ref="share" @scroll="toggleScroll"></v-share>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Track from '../track/track.vue';
//  import share from '../../share/share.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '一点点便利店(滨江店)',
        tapShow: false,
        backShow: true,
        status: '订单已取消',
        btnOne: '再来一单',
        arrowShow: true,
        remarksShow: true,
        timeShow: true,
        rightShow: false,
        leftShow: true,
        orderOne: {
          type: Object
        }
      };
    },
    created() {
//      this._initScroll();
      let clipboard = new Clipboard('.cancelled-copy', {
        text: function() {
          return document.getElementById('cancelled-number').innerText;
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
          if (!this.cancelledScroll) {
            this.cancelledScroll = new BScroll(this.$refs.cancelledScroll, {
              click: true
            });
          } else {
            this.cancelledScroll.refresh();
          }
        });
      },
      leftClick() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
      setTrack() {
//        this.trackShow = true;
        this.$refs.track.show(this.orderOne.orderTrack);
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-track': Track
//      'v-share': share
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cancelled
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .cancelled-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .cancelled-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .cancelled-gray
          font-size 14px
          color #9c9c9c
        .cancelled-black
          margin-left 5px
          font-size 13px
          color #37373b
        .cancelled-defray
          margin-top 20px
        .cancelled-copy
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
