<template>
  <div class="ordered-under" v-show="showFlag" ref="orderedScroll">
    <div class="ordered-under-wrapper">
      <div class="ordered-under-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <v-module :lineId="1" :status="status" :arrowShow="arrowShow" :btnOne="btnOne" :btnTwo="btnTwo" :remarksShow="remarksShow" :timeShow="timeShow" :rightShow="rightShow" :leftShow="leftShow" :leftId="1" :rightId="0" @leftClick="leftClick" @rightClick="rightClick" :order="orderOne"></v-module>
          <div class="ordered-under-inside">
            <div>
              <span class="ordered-under-gray">订单号码</span>
              <span id="ordered-under-number" class="ordered-under-black">{{orderOne.orderNumber}}</span>
              <span class="ordered-under-copy">复制</span>
            </div>
            <div class="ordered-under-defray">
              <span class="ordered-under-gray">订单时间</span>
              <span class="ordered-under-black">{{orderOne.orderWhen}}</span>
            </div>
            <div class="ordered-under-defray">
              <span class="ordered-under-gray">支付方式</span>
              <span class="ordered-under-black">{{orderOne.orderPay}}</span>
            </div>
          </div>
      </div>
    </div>
    <v-evaluate ref="evaluate" @scroll="toggleScroll" :orderOne="orderOne"></v-evaluate>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../../components/header/head.vue';
  import Module from '../module/module.vue';
  import Evaluate from '../../evaluate/evaluate.vue';

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
        arrowShow: false,
        remarksShow: false,
        timeShow: false,
        rightShow: true,
        leftShow: true,
        orderOne: {
          type: Object
        }
      };
    },
    created() {
//      this._initScroll();
      let clipboard = new Clipboard('.ordered-under-copy', {
        text: function() {
          return document.getElementById('ordered-under-number').innerText;
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
          if (!this.orderedScroll) {
            this.orderedScroll = new BScroll(this.$refs.orderedScroll, {
              click: true
            });
          } else {
            this.orderedScroll.refresh();
          }
        });
      },
//      再来一单
      leftClick() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
//      评价
      rightClick() {
        this.$refs.evaluate.show(this.orderOne);
        this.toggleScroll();
      }
    },
    components: {
      'v-top': Top,
      'v-module': Module,
      'v-evaluate': Evaluate
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .ordered-under
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .ordered-under-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .ordered-under-inside
        margin 15px
        padding 30.5px 16px 30px 16px
        background white
        border-radius: 2%
        .ordered-under-gray
          font-size 14px
          color #9c9c9c
        .ordered-under-black
          margin-left 5px
          font-size 13px
          color #37373b
        .ordered-under-defray
          margin-top 20px
        .ordered-under-copy
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
