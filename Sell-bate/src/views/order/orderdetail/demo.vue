<template>
  <div class="demo" v-show="showFlag">
    <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
    <div class="demo-content">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import BScroll from 'better-scroll';
  import Top from '../../components/header/head.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '提交订单',
        tapShow: false,
        backShow: true,
        order: {
          orderName: '鲜蜂便利店（西兴店）',
          orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
          orderDetail: [
            {
              orderGoods: '中国人喝的矿泉水',
              orderCount: '1',
              orderPrice: '12'
            },
            {
              orderGoods: '中国人喝的矿泉水',
              orderCount: '1',
              orderPrice: '12'
            },
            {
              orderGoods: '中国人喝的矿泉水',
              orderCount: '1',
              orderPrice: '12'
            }
          ],
          orderPrivilege: '满50减10',
          orderPreferential: '10',
          orderFavourable: '10',
          orderTotal: '50',
          orderRemarks: '麻烦快送点谢谢',
          orderTime: '立即配送',
          orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
          orderService: '店员提供免费配送服务',
          orderNumber: '1811 3681 0682 8787 6',
          orderWhen: '2017-07-17 20：09：25',
          orderPay: '支付宝支付'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      }
    },
    components: {
      'v-top': Top
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .demo
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .demo-content
      display inline-block
      width 100%

</style>
