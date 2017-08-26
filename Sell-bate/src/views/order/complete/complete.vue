<template>
  <div class="complete">
    <div class="complete-content" ref="inScroll">
      <ul v-if="order">
        <li class="complete-li" v-for="(order,index) in order">
          <div class="complete-contents">
            <div class="complete-store">
              <img class="complete-img" :src="order.orderImg"/>
              <div class="complete-message">
                <div class="complete-shop">
                  <span class="complete-name">{{order.orderName}}</span>
                  <span class="complete-arrow" @click.stop.prevent="goShop"></span>
                </div>
                <span class="complete-time">{{order.orderWhen}}</span>
              </div>
              <span class="complete-state">{{order.orderState}}</span>
            </div>
            <div class="complete-order">
              <ul v-if="order.orderDetail">
                <li class="complete-goods" v-for="(item,index) in order.orderDetail" v-if="index <= 2">
                  <span>{{order.orderDetail[index].orderGoods}}</span>
                  <span class="complete-number">x{{order.orderDetail[index].orderCount}}</span>
                </li>
                <li class="complete-ellipsis" v-show="order.orderDetail.length >3">
                  <span>...</span>
                </li>
              </ul>
              <div class="complete-amount" @click="sendToDetail(index)">
                <span class="complete-count">共{{order.orderCount}}件商品，实付</span>
                <span class="complete-total">¥{{order.orderTotal}}</span>
              </div>
            </div>
            <div class="complete-footer">
              <div class="complete-btn">
                <span class="complete-status" @click="sendToStatus">再来一单</span>
                <span class="complete-comment" @click="sendToEvaluate(index)" v-show="order.orderStatus != '订单已取消'">评论</span>
              </div>
            </div>
          </div>
        </li>
        <div class="complete-last">
          <div class="complete-text"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  //  import OrderDetail from '../../components/orderdetail/ordered.vue';
  //  import Status from '../../components/status/status.vue';
  export default{
    props: {
      orderCo: {
        type: Array
      }
    },
    data() {
      return {
        order: {
          type: Array
        }
//        order: [
//          {
//            orderName: '鲜蜂便利店(西兴店)',
//            orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
//            orderCount: '5',
//            orderDetail: [
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              }
//            ],
//            orderPrivilege: '满50减10',
//            orderPreferential: '10',
//            orderFavourable: '10',
//            orderTotal: '50',
//            orderRemarks: '麻烦快送点谢谢',
//            orderTime: '立即配送',
//            orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
//            orderService: '店员提供免费配送服务',
//            orderNumber: '1811 3681 0682 8787 6',
//            orderWhen: '2017-07-17 20：09：25',
//            orderPay: '支付宝支付',
//            orderWay: '送货上门',
//            orderState: '订单已取消',
//            orderStatus: '订单已取消',
//            orderTel: '10086'
//          },
//          {
//            orderName: '鲜蜂便利店(西兴店)',
//            orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
//            orderCount: '5',
//            orderDetail: [
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              }
//            ],
//            orderPrivilege: '满50减10',
//            orderPreferential: '10',
//            orderFavourable: '10',
//            orderTotal: '50',
//            orderRemarks: '麻烦快送点谢谢',
//            orderTime: '立即配送',
//            orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
//            orderService: '店员提供免费配送服务',
//            orderNumber: '1811 3681 0682 8787 6',
//            orderWhen: '2017-07-17 20：09：25',
//            orderPay: '支付宝支付',
//            orderWay: '送货上门',
//            orderState: '订单已完成',
//            orderStatus: '订单已完成',
//            orderTel: '10086'
//          },
//          {
//            orderName: '鲜蜂便利店(西兴店)',
//            orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
//            orderCount: '5',
//            orderDetail: [
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              },
//              {
//                orderGoods: '中国人喝的矿泉水',
//                orderCount: '1',
//                orderPrice: '12'
//              }
//            ],
//            orderPrivilege: '满50减10',
//            orderPreferential: '10',
//            orderFavourable: '10',
//            orderTotal: '50',
//            orderRemarks: '麻烦快送点谢谢',
//            orderTime: '立即配送',
//            orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
//            orderService: '店员提供免费配送服务',
//            orderNumber: '1811 3681 0682 8787 6',
//            orderWhen: '2017-07-17 20：09：25',
//            orderPay: '支付宝支付',
//            orderWay: '送货上门',
//            orderState: '订单已完成',
//            orderStatus: '订单已完成',
//            orderTel: '10086'
//          }
//        ]
      };
    },
    mounted() {
      this.order = this.orderCo;
      this._initScroll();
    },
    created() {
      this.order = this.orderCo;
      this._initScroll();
    },
    methods: {
      sendToStatus() {
//        this.$emit('status');
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.inScroll) {
            this.inScroll = new BScroll(this.$refs.inScroll, {
              click: true
            });
          } else {
            this.inScroll.refresh();
          }
        });
      },
      sendToEvaluate(index) {
        this.$emit('evaluate', index);
      },
      sendToDetail(index) {
        this.$emit('orderIndex', index);
      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      }
    },
    components: {
//      'v-detail': OrderDetail,
//      'v-status': Status
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"

  .complete
    position absolute
    width 100%
    height 100%
    padding-bottom 50px
    .complete-content
      background #f3f3f3
      height 100%
      overflow hidden
      .complete-li
        position: relative
        width 100%
        background white
        border-top 10px solid #f3f3f3
        .complete-contents
          .complete-store
            display flex
            align-items center
            height 50px
            border-bottom:1px solid #f3f3f3
            .complete-img
              margin 0 15px
              width 35px
              height 35px
              border-radius: 15%
            .complete-message
              padding-top 10px
              height 40px
              .complete-shop
                display flex
                align-items center
                font-size 0
                .complete-name
                  display inline-block
                  margin 0
                  padding 0
                  font-family "PingFang SC"
                  font-weight bold
                  font-size 16px
                  color #37373b
                .complete-arrow
                  margin-left 20px
                  width 6.5px
                  height 13px
                  background-size 6.5px 13px
                  background-repeat no-repeat
                  bg-image('../arrow')
              .complete-time
                display block
                margin-top 5px
                font-family "PingFang SC"
                font-size 11px
                color #aeaeaf
            .complete-state
              align-self  baseline
              position absolute
              right 15px
              margin-top 10px
              font-family "PingFang SC"
              font-size 14px
              color #666666
          .complete-order
            padding 5px 0 37px 65px
            border-bottom:1px solid #f3f3f3
            .complete-goods
              margin-top 15px
              font-family "PingFang SC"
              font-size 14px
              color #666666
              .complete-number
                position absolute
                right 15px
            .complete-ellipsis
              margin-top 15px
              line-height 1px
              font-family "PingFang SC"
              font-size 14px
              color #666666
          .complete-amount
            margin-top 15px
            position absolute
            right 15px
            font-size 0
            .complete-count
              font-family "PingFang SC"
              font-size 12px
              color #666666
            .complete-total
              font-family "PingFang SC"
              font-weight bold
              font-size 14px
              color #37373b
          .complete-footer
            height 50px
            text-align center
            font-family "PingFang SC"
            font-size: 14px
            .complete-btn
              position absolute
              right 15px
              margin-top 20px
              .complete-status
                padding 7px 21px
                color #666666
                border-radius: 5%
                border 1px solid #d8d8d8
              .complete-comment
                margin-left 7px
                padding 8px 36px
                color #37373b
                background #fdcf00
                border-radius: 5%
      .complete-last
        display table
        width 100%
        font-size 12px
        margin-top 10px
        margin-bottom 15px
        height 130px
        text-align center
        .complete-text
          display: table-cell
          vertical-align: middle
</style>
