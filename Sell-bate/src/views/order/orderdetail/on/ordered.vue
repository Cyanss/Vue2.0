<template>
  <div class="ordered" v-show="showFlag" ref="orderedScroll">
    <div class="ordered-wrapper">
      <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
      <div class="ordered-content">
        <v-module :lineId="0" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :btnTwo="btnTwo" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" @leftClick="under" @rightClick="setEvaluate" @trackClick="setTrack" :leftId="1" :rightId="0" :order="orderOne"></v-module>
        <div class="ordered-inside">
          <div>
            <span class="ordered-gray">订单号码</span>
            <span id="ordered-on-number" class="ordered-black">{{orderOne.orderNumber}}</span>
            <span class="ordered-on-copy">复制</span>
          </div>
          <div class="ordered-defray">
            <span class="ordered-gray">订单时间</span>
            <span class="ordered-black">{{orderOne.orderWhen}}</span>
          </div>
          <div class="ordered-defray">
            <span class="ordered-gray">支付方式</span>
            <span class="ordered-black">{{orderOne.orderPay}}</span>
          </div>
        </div>
      </div>
    </div>
    <v-track ref="track" @scroll="toggleScroll"></v-track>
    <v-evaluate ref="evaluate" @scroll="toggleScroll" :orderOne="orderOne"></v-evaluate>
    <v-ordering ref="ordering" @scroll="toggleScroll" :orderOne="orderOne"></v-ordering>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Evaluate from '../../evaluate/evaluate.vue';
  import Ordering from '../under/ordering.vue';
  import Track from '../track/track.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '一点点便利店（滨江店）',
        tapShow: false,
        backShow: true,
        status: '订单已完成',
        btnOne: '再来一单',
        btnTwo: '评价',
        arrowShow: true,
        remarksShow: true,
        timeShow: true,
        rightShow: true,
        leftShow: true,
        orderOne: {
          type: Object
        }
//        order: {
//          orderName: '鲜蜂便利店（西兴店）',
//          orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
//          orderDetail: [
//            {
//              orderGoods: '中国人喝的矿泉水',
//              orderCount: '1',
//              orderPrice: '12'
//            },
//            {
//              orderGoods: '中国人喝的矿泉水',
//              orderCount: '1',
//              orderPrice: '12'
//            },
//            {
//              orderGoods: '中国人喝的矿泉水',
//              orderCount: '1',
//              orderPrice: '12'
//            }
//          ],
//          orderPrivilege: '满50减10',
//          orderPreferential: '10',
//          orderFavourable: '10',
//          orderTotal: '50',
//          orderRemarks: '麻烦快送点谢谢',
//          orderTime: '立即配送',
//          orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
//          orderService: '店员提供免费配送服务',
//          orderNumber: '1811 3681 0682 8787 6',
//          orderWhen: '2017-07-17 20：09：25',
//          orderPay: '支付宝支付'
//        }
      };
    },
    created() {
//      this._initScroll();
      let clipboard = new Clipboard('.ordered-on-copy', {
        text: function() {
          return document.getElementById('ordered-on-number').innerText;
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
    mounted() {
//      this._initScroll();
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
          if (!this.orderedScroll) {
            this.orderedScroll = new BScroll(this.$refs.orderedScroll, {
              click: true
            });
          } else {
            this.orderedScroll.refresh();
          }
        });
      },
      under() {
//        this.$refs.ordering.show(this.orderOne);
//        this.toggleScroll();
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
      setEvaluate() {
        this.$refs.evaluate.show(this.orderOne);
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
      'v-evaluate': Evaluate,
      'v-ordering': Ordering,
      'v-track': Track
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .ordered
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .ordered-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .ordered-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .ordered-gray
          font-size 14px
          color #9c9c9c
        .ordered-black
          margin-left 5px
          font-size 13px
          color #37373b
        .ordered-defray
          margin-top 20px
        .ordered-on-copy
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
