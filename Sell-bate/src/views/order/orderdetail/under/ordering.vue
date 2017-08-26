<template>
  <div class="ordering" v-show="showFlag" ref="orderingScroll">
    <div>
      <div class="ordering-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <v-module :lineId="1" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="setOrdered" :leftId="1" :order="orderOne"></v-module>
        <div class="ordering-inside">
          <div>
            <span class="ordering-gray">订单号码</span>
            <span id="ordering-under-number" class="ordering-black">{{orderOne.orderNumber}}</span>
            <span class="ordering-under-copy">复制</span>
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
    <v-ordered ref="ordered" @scroll="toggleScroll"></v-ordered>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Ordered from '../under/ordered.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '一点点便利店（滨江店）',
        tapShow: false,
        backShow: true,
        status: '正在提货',
        btnOne: '确认收货',
        arrowShow: false,
        remarksShow: false,
        timeShow: false,
        rightShow: false,
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
//      console.log('3' + this.$refs.detailWrapper);
      let clipboard = new Clipboard('.ordering-under-copy', {
        text: function() {
          return document.getElementById('ordering-under-number').innerText;
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
      setOrdered() {
        this.$refs.ordered.show(this.orderOne);
        this.toggleScroll();
      }
//      copyit() {
//        var url = document.getElementById('number');
//        url.select();
//        document.execCommand('copy');
//        alert('复制成功！');
//      }
//      _initScroll() {
//        this.$nextTick(() => {
//          if (!this.detailScroll) {
//            this.detailScroll = new BScroll(this.$refs.detailWrapper, {
//              click: true
//            });
//          } else {
//            this.detailScroll.refresh();
//          }
//        });
//        this.detailScroll = new BScroll(this.$refs.detailWrapper, {
//          click: true
//        });
//      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-ordered': Ordered
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
        .ordering-under-copy
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
