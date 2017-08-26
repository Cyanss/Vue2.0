<template>
  <div class="order">
    <div class="order-content">
      <v-top :title="title" :bgId="0"></v-top>
      <div class="content">
        <div class="tab-item">
          <router-link to="/order/incomplete">正在进行</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/order/complete">&ensp;已完成&ensp;</router-link>
        </div>
      </div>
      <router-view :orderIn="order.orderIn" :orderCo="order.orderCo" @ordered="setOrdered" @status="setStatus" @evaluate="setEvaluate" @shop="setShop" @showDetail="setDetail" @orderIndex="setOrderCo" @orderInIndex="setOrderIn"></router-view>
    </div>
    <v-detail ref="detail" @scroll="toggleScroll"  :orderOne="selectOrderCo()"></v-detail>
    <v-ordered ref="ordered" @scroll="toggleScroll" :orderOne="selectOrderCo()"></v-ordered>
    <v-ordering ref="ordering" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-ordering>
    <v-detailed ref="detailed" @scroll="toggleScroll" :orderOne="selectOrderCo()"></v-detailed>
    <v-detailing ref="detailing" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-detailing>
    <v-cancelled ref="cancelled" @scroll="toggleScroll" :orderOne="selectOrderCo()"></v-cancelled>
    <v-cancelling ref="cancelling" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-cancelling>
    <v-refuse ref="refuse" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-refuse>
    <v-payment ref="payment" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-payment>
    <v-pay ref="pay" @scroll="toggleScroll" :orderOne="selectOrderIn()"></v-pay>
    <v-evaluate ref="evaluate" @scroll="toggleScroll" :orderOne="selectOrderCo()"></v-evaluate>
  </div>
</template>

<script type="text/ecmascript-6">
//  import BScroll from 'better-scroll';
  import Top from '../../components/header/head.vue';
  import Detail from './orderdetail/detail.vue';
//  线上支付
  import Payment from './orderdetail/on/payment.vue';
//  线下支付
  import Pay from './orderdetail/under/payment.vue';
//  线上正在进行
  import Ordering from './orderdetail/on/ordering.vue';
//  线上已完成
  import Ordered from './orderdetail/on/ordered.vue';
//  线下正在进行
  import Detailing from './orderdetail/under/ordering.vue';
//  线下完成
  import Detailed from './orderdetail/under/ordered.vue';
//  线上取消中
  import Cancelling from './orderdetail/cancel/cancelling.vue';
//  线上已取消
  import Cancelled from './orderdetail/cancel/cancelled.vue';
//  线上拒绝
  import Refuse from './orderdetail/cancel/refuse.vue';
  import Evaluate from './evaluate/evaluate.vue';
  import Shop from '../../components/shops/shops.vue';

  export default{
    data() {
      return {
        title: '订单',
        selectItem: 0,
        orderTwo: {
          type: Object
        },
        order: {
          orderIn: [
            {
              orderName: '鲜蜂便利店(西兴店)',
              orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
              orderCount: '5',
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
              orderPay: '支付宝支付',
              orderWay: '送货上门',
              orderState: '商家已接单',
              orderStatus: '订单正在进行中',
              orderTel: '10086',
              orderTrack: [
                {
                  trackType: 0,
                  orderState: '订单已提交',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 1,
                  orderState: '支付成功',
                  orderTime: '7月28日 19：30'
                }
              ]
            },
            {
              orderName: '鲜蜂便利店(西兴店)',
              orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
              orderCount: '5',
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
              orderPay: '支付宝支付',
              orderWay: '送货上门',
              orderState: '商家已接单',
              orderStatus: '正在取消订单',
              orderTel: '10086',
              orderTrack: [
                {
                  trackType: 0,
                  orderState: '订单已提交',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 1,
                  orderState: '支付成功',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 2,
                  orderState: '商家已接单',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 3,
                  orderState: '正在取消订单',
                  orderTime: '7月28日 19：30'
                }
              ]
            },
            {
              orderName: '鲜蜂便利店(西兴店)',
              orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
              orderCount: '5',
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
              orderPay: '支付宝支付',
              orderWay: '送货上门',
              orderState: '订单等待支付中',
              orderStatus: '订单等待支付中',
              orderTel: '10086',
              orderTrack: [
                {
                  trackType: 0,
                  orderState: '订单已提交',
                  orderTime: '7月28日 19：30'
                }
              ]
            }
          ],
          orderCo: [
            {
              orderName: '鲜蜂便利店(西兴店)',
              orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
              orderCount: '5',
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
              orderPay: '支付宝支付',
              orderWay: '送货',
              orderState: '订单已取消',
              orderStatus: '订单已取消',
              orderTel: '10086',
              orderTrack: [
                {
                  trackType: 0,
                  orderState: '订单已提交',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 1,
                  orderState: '支付成功',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 2,
                  orderState: '订单正在进行中',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 3,
                  orderState: '订单已取消',
                  orderTime: '7月28日 19：30'
                }
              ]
            },
            {
              orderName: '鲜蜂便利店(西兴店)',
              orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
              orderCount: '5',
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
              orderPay: '支付宝支付',
              orderWay: '送货',
              orderState: '订单已完成',
              orderStatus: '订单已完成',
              orderTel: '10086',
              orderTrack: [
                {
                  trackType: 0,
                  orderState: '订单已提交',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 1,
                  orderState: '支付成功',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 2,
                  orderState: '商家已接单',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 3,
                  orderState: '商家正在配送',
                  orderTime: '7月28日 19：30'
                },
                {
                  trackType: 4,
                  orderState: '订单已完成',
                  orderTime: '7月28日 19：30'
                }
              ]
            }
          ]
        },
        index: 0
      };
    },
    created() {
      this._initScroll();
//      this.setScreenItem(this.index);
    },
    methods: {
      refreshScroll() {
        this._initScroll();
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      _initScroll() {
        this.$nextTick(() => {
//          if (!this.orderScroll) {
//            this.orderScroll = new BScroll(this.$refs.orderScroll, {
//              click: true
//            });
//          } else {
//            this.orderScroll.refresh();
//          }
        });
      },
      selectOrderIn() {
        return this.order.orderIn[this.selectItem];
      },
      selectOrderCo() {
        return this.order.orderCo[this.selectItem];
      },
      setDetail(index) {
        this.selectItem = index;
        this.$refs.detail.show(this.order[index]);
        this.toggleScroll();
      },
      setOrderIn(index) {
        this.selectItem = index;
        let status = this.order.orderIn[index].orderStatus;
        let orderWay = this.order.orderIn[index].orderWay;
        if (status === '订单等待支付中') {
          if (orderWay === '送货上门') {
            this.$refs.payment.show(this.order.orderIn[index]);
          } else {
            this.$refs.pay.show(this.order.orderIn[index]);
          }
          this.$refs.payment.show(this.order.orderIn[index]);
        } else if (status === '订单正在进行中') {
          console.log('11111111');
          this.$refs.ordering.show(this.order.orderIn[index]);
        } else if (status === '正在取消订单') {
          this.$refs.cancelling.show(this.order.orderIn[index]);
        } else if (status === '商家已拒绝取消订单') {
          this.$refs.refuse.show(this.order.orderIn[index]);
        } else if (status === '订单已取消') {
          this.$refs.cancelled.show(this.order.orderIn[index]);
        } else if (status === '正在提货') {
          this.$refs.detailing.show(this.order.orderIn[index]);
        } else if (status === '订单已完成') {
            if (orderWay === '送货上门') {
              this.$refs.ordered.show(this.order.orderIn[index]);
            } else {
              this.$refs.detailed.show(this.order.orderIn[index]);
            }
        }
        this.toggleScroll();
      },
      setOrderCo(index) {
        this.selectItem = index;
//        console.log('---------->' + this.order[index].orderStatus);
        let status = this.order.orderCo[index].orderStatus;
        let orderWay = this.order.orderCo[index].orderWay;
        if (status === '订单等待支付中') {
          if (orderWay === '送货上门') {
            this.$refs.payment.show(this.order.orderCo[index]);
          } else {
            this.$refs.pay.show(this.order.orderCo[index]);
          }
          this.$refs.payment.show(this.order.orderCo[index]);
        } else if (status === '订单正在进行中') {
          this.$refs.ordering.show(this.order.orderCo[index]);
        } else if (status === '正在取消订单') {
          this.$refs.cancelling.show(this.order.orderCo[index]);
        } else if (status === '商家已拒绝取消订单') {
          this.$refs.refuse.show(this.order.orderCo[index]);
        } else if (status === '订单已取消') {
          this.$refs.cancelled.show(this.order.orderCo[index]);
        } else if (status === '正在提货') {
          this.$refs.detailing.show(this.order.orderCo[index]);
        } else if (status === '订单已完成') {
          if (orderWay === '送货上门') {
            this.$refs.ordered.show(this.order.orderCo[index]);
          } else {
            this.$refs.detailed.show(this.order.orderCo[index]);
          }
        }
        this.toggleScroll();
      },
      setOrdered(index) {
        this.selectItem = index;
        this.order = this.orderCo;
        console.log('---------->' + this.order[index].orderStatus);
        let status = this.order[index].orderStatus;
        let orderWay = this.order[index].orderWay;
        if (status === '订单已取消') {
          this.$refs.refuse.show(this.order[index]);
        } else if (status === '订单已完成') {
          if (orderWay === '送货上门') {
            this.$refs.ordered.show(this.order[index]);
          } else {
            this.$refs.detailed.show(this.order[index]);
          }
        }
        this.toggleScroll();
      },
      setStatus(event) {
        this.$refs.status.show();
        this.toggleScroll();
      },
      setEvaluate(index) {
        this.$refs.evaluate.show(this.order.orderCo[index]);
        this.toggleScroll();
      },
      setShop() {
        this.$emit('goshop');
      }
    },
    components: {
      'v-top': Top,
      'v-detail': Detail,
      'v-ordered': Ordered,
      'v-ordering': Ordering,
      'v-detailed': Detailed,
      'v-detailing': Detailing,
      'v-cancelled': Cancelled,
      'v-cancelling': Cancelling,
      'v-refuse': Refuse,
      'v-payment': Payment,
      'v-pay': Pay,
      'v-evaluate': Evaluate,
      'v-shop': Shop
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    position:fixed;
    width 100%
    height 100%
    background #f3f3f3
    .content
      bottom 0
      left 0
      display flex
      width 100%
      height 40px
      line-height 40px
      background #37373b
      .tab-item
        flex 1
        text-align center
        font-family "PingFang SC"
        font-size: 15x
        & > a
          color #9c9c9c
          &.active
            padding-bottom 9px
            font-weight bold
            color #fdcf00
            border-bottom 3px solid #fdcf00
        .complete
          padding 0 8.5px

</style>
