<template>
  <div class="incomplete" >
    <div class="incomplete-content" ref="insScroll">
      <ul id="ul" v-if="order">
        <li class="incomplete-li" v-for="(order,index) in order">
          <div class="incomplete-contents">
            <div class="incomplete-store">
              <img class="incomplete-img" :src="order.orderImg"/>
              <div class="incomplete-message">
                <div class="incomplete-shop">
                  <span class="incomplete-name">{{order.orderName}}</span>
                  <span class="incomplete-arrow" @click.stop.prevent="goShop"></span>
                </div>
                <span class="incomplete-time">{{order.orderWhen}}</span>
              </div>
              <span class="incomplete-state">{{order.orderState}}</span>
            </div>
            <div class="incomplete-order">
              <!--@click="detailClick(index)"-->
              <ul v-if="order.orderDetail">
                <li class="incomplete-goods" v-for="(item,index) in order.orderDetail" v-if="index <= 2">
                  <span>{{order.orderDetail[index].orderGoods}}</span>
                  <span class="incomplete-number">x{{order.orderDetail[index].orderCount}}</span>
                </li>
                <li class="incomplete-ellipsis" v-show="order.orderDetail.length >3">
                  <span>...</span>
                </li>
              </ul>
              <div class="incomplete-amount">
                <span class="incomplete-count">共{{order.orderCount}}件商品，实付</span>
                <span class="incomplete-total">¥{{order.orderTotal}}</span>
              </div>
            </div>
            <div class="incomplete-footer">
              <span class="incomplete-status" @click="sendToOrder(index)">待送达</span>
            </div>
          </div>
        </li>
        <div class="incomplete-last">
          <div class="incomplete-last-text"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default{
    props: {
      orderIn: {
        type: Array
      }
    },
    data() {
      return {
        order: {
          type: Array
        }
      };
    },
    mounted() {
      this._initScroll();
    },
    created() {
      this._initScroll();
      this.order = this.orderIn;
    },
    computed: {

    },
    methods: {
      refresh() {
        this._initScroll();
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.inScroll) {
            this.inScroll = new BScroll(this.$refs.insScroll, {
              click: true
            });
          } else {
            this.inScroll.refresh();
          }
        });
      },
      sendToOrder(index) {
          this.$emit('orderInIndex', index);
      },
      sendToStatus() {
        this.$emit('status');
      },
//      detailClick(index) {
//        this.$emit('showDetail', index);
//      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      }
    },
    components: {
//      'v-detail': Detail
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .incomplete
    position absolute
    width 100%
    height 100%
    margin 0
    padding-bottom 50px
    background #f3f3f3
    .incomplete-content
      height 100%
      overflow hidden
      .incomplete-li
        position: relative
        width 100%
        background white
        border-top 10px solid #f3f3f3
        .incomplete-contents
          .incomplete-store
            display flex
            align-items center
            height 50px
            border-bottom:1px solid #f3f3f3
            .incomplete-img
              margin 0 15px
              width 35px
              height 35px
              border-radius: 15%
            .incomplete-message
              padding-top 10px
              height 40px
              .incomplete-shop
                display flex
                align-items center
                font-size 0
                .incomplete-name
                  display inline-block
                  margin 0
                  padding 0
                  font-family "PingFang SC"
                  font-weight bold
                  font-size 16px
                  color #37373b
                .incomplete-arrow
                  margin-left 20px
                  width 6.5px
                  height 13px
                  background-size 6.5px 13px
                  background-repeat no-repeat
                  bg-image('../arrow')
              .incomplete-time
                display block
                margin-top 5px
                font-family "PingFang SC"
                font-size 11px
                color #aeaeaf
            .incomplete-state
              align-self  baseline
              position absolute
              right 15px
              margin-top 10px
              font-family "PingFang SC"
              font-size 14px
              color #fdcf00
          .incomplete-order
            padding 5px 0 37px 65px
            border-bottom:1px solid #f3f3f3
            .incomplete-goods
              margin-top 15px
              font-family "PingFang SC"
              font-size 14px
              color #666666
              .incomplete-number
                position absolute
                right 15px
            .incomplete-ellipsis
              margin-top 15px
              line-height 1px
              font-family "PingFang SC"
              font-size 14px
              color #666666
          .incomplete-amount
            margin-top 15px
            position absolute
            right 15px
            font-size 0
            .incomplete-count
              font-family "PingFang SC"
              font-size 12px
              color #666666
            .incomplete-total
              font-family "PingFang SC"
              font-weight bold
              font-size 14px
              color #37373b
          .incomplete-footer
            height 50px
            text-align center
            .incomplete-status
              position absolute
              right 15px
              margin-top 10px
              padding 7px 28px
              font-family "PingFang SC"
              font-size: 14px
              color #666666
              border-radius: 5%
              border 1px solid #d8d8d8
      .incomplete-last
        display table
        width 100%
        font-size 12px
        margin-top 10px
        margin-bottom 15px
        height 130px
        text-align center
        .incomplete-last-text
          display: table-cell
          vertical-align: middle
</style>
