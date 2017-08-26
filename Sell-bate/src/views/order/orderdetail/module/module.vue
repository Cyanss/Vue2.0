<template>
  <div class="detail-content">
    <div class="one" :class="lineMap[lineId]">
      <div class="one-submit">
        <span class="status">{{status}}</span>
        <span class="one-arrows" v-show="arrowShow" @click="trackClick"></span>
      </div>
      <span class="thanks">感谢你对飞优特支持，欢迎再次光临</span>
      <div class="function">
        <span class="btn-left" v-show="leftShow" @click="leftClick" :class="leftMap[leftId]">{{btnOne}}</span>
        <span class="btn-right" v-show="rightShow" @click="rightClick" :class="rightMap[rightId]">{{btnTwo}}</span>
      </div>
    </div>
    <div class="two">
      <div class="two-head">
        <img class="two-img" :src="order.orderImg"/>
        <span class="two-name">{{order.orderName}}</span>
        <span class="two-arrows" @click="goShop"></span>
      </div>
      <div class="two-content">
        <ul v-if="order.orderDetail">
          <li v-for="(item,index) in order.orderDetail">
            <div class="content-list">
              <div class="list-name">
                <p >{{order.orderDetail[index].orderGoods}}</p>
              </div>
              <div class="list-amount">
                <span class="list-quantity">x{{order.orderDetail[index].orderCount}}</span>
                <span class="list-price">¥{{order.orderDetail[index].orderPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="two-discount">
        <span class="two-text">满减优惠券</span>
        <div class="two-red">
          <span class="two-gray">{{order.orderPrivilege}}</span>
          <span>-{{order.orderPreferential}}¥</span>
        </div>
      </div>
      <div class="two-discount">
        <span class="two-text">优惠券</span>
        <div class="two-red">
          <span>-{{order.orderFavourable}}¥</span>
        </div>
      </div>
      <div class="two-discount">
        <span class="two-text two-bold">总计</span>
        <div class="two-amount">
          <span class="two-gray">已优惠¥20元</span>
          <span class="two-total">¥{{order.orderTotal}}</span>
        </div>
      </div>
      <a :href="'tel:'+(order.orderTel)">
        <div class="two-phone" @click="telClick">
          <span class="two-phone-img"></span>
          <span class="two-phone-txt">联系商家</span>
        </div>
      </a>
    </div>
    <div class="four" v-show="remarksShow">
      <span class="four-txt">买家备注</span>
      <span class="four-remarks" >{{order.orderRemarks}}</span>
    </div>
    <div class="three" v-show="timeShow">
      <div>
        <span class="three-gray">期望时间</span>
        <span class="three-black">{{order.orderTime}}</span>
      </div>
      <div class="three-address">
        <span class="three-gray">配送地址</span>
        <div class="three-news">
          <span class="three-black">{{order.orderAddress}}</span>
        </div>
      </div>
      <div class="three-service">
        <span class="three-gray">配送服务</span>
        <span class="three-black">{{order.orderService}}</span>
      </div>
    </div>
    <!--<div class="three">-->
      <!--<div>-->
        <!--<span class="three-gray">订单号码</span>-->
        <!--<span id="copyNumber" class="three-black">{{order.orderNumber}}</span>-->
        <!--<span id="copyId" class="three-copy">复制</span>-->
      <!--</div>-->
      <!--<div class="three-defray">-->
        <!--<span class="three-gray">订单时间</span>-->
        <!--<span class="three-black">{{order.orderWhen}}</span>-->
      <!--</div>-->
      <!--<div class="three-defray">-->
        <!--<span class="three-gray">支付方式</span>-->
        <!--<span class="three-black">{{order.orderPay}}</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div v-show="trackShow" class="module-track">-->
      <!--<div class="module-box">-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
//  import Clipboard from 'clipboard';

  export default{
    props: {
      order: {
        type: Object
      },
      status: {
        type: String,
        defalut: '订单状态'
      },
      btnOne: {
        type: String,
        defalut: '再来一单'
      },
      btnTwo: {
        type: String,
        defalut: '评价'
      },
      rightShow: {
        type: Boolean,
        defalut: true
      },
      arrowShow: {
        type: Boolean,
        defalut: true
      },
      remarksShow: {
        type: Boolean,
        defalut: true
      },
      timeShow: {
        type: Boolean,
        defalut: true
      },
      leftShow: {
        type: Boolean,
        defalut: true
      },
      lineId: {
        type: Number,
        defalut: 0
      },
      leftId: {
        type: Number,
        defalut: 0
      },
      rightId: {
        type: Number,
        defalut: 0
      }
    },
    data() {
      return {
//        trackShow: false
      };
    },
    created() {
      this.lineMap = ['on', 'under'];
      this.leftMap = ['left-white', 'left-yellow'];
      this.rightMap = ['right-white', 'right-four', 'right-yellow'];
    },
    methods: {
      leftClick() {
        this.$emit('leftClick');
      },
      rightClick() {
        this.$emit('rightClick');
      },
      telClick() {
        alert('联系商家');
      },
      trackClick() {
//        this.trackShow = true;
        this.$emit('trackClick');
      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .detail-content
    margin 15px
    font-family "PingFang SC"
    .one
      padding-top 20px
      height 90px
      width 100%
      text-align center
      vertical-align:middle
      background-repeat no-repeat
      background-size 100% 110px
      &.on
        bg-image('on_line')
      &.under
        bg-image('under_line')
      .one-submit
        display flex
        justify-content:center;
        .status
          font-size 15px
          font-weight bold
          color #37373b
        .one-arrows
          margin-left 5px
          width 6.5px
          height 13px
          background-size 6.5px 13px
          background-repeat no-repeat
          bg-image('../../arrow')
      .thanks
        margin-top 10px
        display block
        font-size 12px
        color #9c9c9c
      .function
        font-size 11px
        color: #37373b
        margin 22px 0
        .btn-left
          padding 8.5px 18px
          border-radius: 5%
          &.left-white
            background white
            border 1px solid #7e8c8d
          &.left-yellow
            background #fdcf00
        .btn-right
          margin-left 93px
          border-radius: 5%
          &.right-white
            padding 8.5px 28px
            background #fdcf00
          &.right-four
            padding 8.5px 18px
            background white
            border 1px solid #7e8c8d
          &.right-yellow
            padding 8.5px 18px
            background #fdcf00
    .two
      margin-top 15px
      background white
      border-radius: 2%
      line-height 25px
      .two-head
        display flex
        padding 0 15px
        line-height:55px;
        overflow:hidden;
        border-bottom 1px solid #f3f3f3
        .two-img
          margin-top 10px
          width 35px
          height 35px
          border-radius 10%
        .two-name
          margin-left 15px
          font-size: 16px
          font-weight bold
          color #37373b
        .two-arrows
          margin-left 20px
          width 6.5px
          height 13px
          background-size 6.5px 13px
          background-repeat no-repeat
          bg-image('../../arrow')
          transform:translateY(160%);
      .two-content
        margin 27px 15px 0 15px
        border-bottom 1px solid #f3f3f3
        .content-list
          display flex
          margin-bottom 27px
          line-height 14px
          flex-direction: row;
          justify-content space-between
          flex-wrap: nowrap;
          font-size 14px
          color #37373b
          .list-name
            vertical-align: middle;
          .list-amount
            display flex
            width 4rem
            .list-quantity
              width 5rem
            .list-price
              width 2rem
      .two-discount
        margin 0 15px
        padding 7px 0
        display flex
        line-height:30px;
        overflow:hidden;
        border-bottom 1px solid #f3f3f3
        .two-text
          font-size 14px
          color #37373b
        .two-bold
          font-weight bold
        .two-red
          position: absolute
          right 30px
          color #ff2121
          font-size 14px
        .two-gray
          color #9c9c9c
          font-size 11px
        .two-amount
          position: absolute
          right 30px
          font-size 0
          .two-total
            margin-left 10px
            color red
            font-size 15px
            font-weight bold
      .two-phone
        display flex
        padding 15.5px 0
        height 14px
        line-height 14px
        text-align center
        border-radius:0 0 5% 5%
        background #fdcf00
        justify-content:center;
      .two-phone-img
        margin-right 10px
        width 14px
        height 14px
        bg-image('../phone')
        background-size 14px 14px
        background-repeat no-repeat
      .two-phone-txt
        font-size 14px
        font-weight bold
        color #37373b
    .three
      margin-top 15px
      padding 30.5px 16px 30px 16px
      background white
      border-radius: 2%
      .three-gray
        font-size 14px
        color #9c9c9c
      .three-black
        margin-left 5px
        font-size 13px
        color #37373b
      .three-address
        display flex
        margin-top 23px
        .three-news
          flex 2
          margin-left 5px
      .three-service
        margin-top 23px
      .three-defray
        margin-top 20px
      .three-copy
        padding 0 6.5px
        position: absolute
        right 30px
        background 0
        border-radius: 7%
        border 1px solid #7e8c8d
        line-height:15px;
        font-size 7.5px
        color: #666666
    .four
      margin-top 15px
      padding 15px 0 15px 15px
      height 50px
      border-radius 2%
      background white
      .four-txt
        font-size 14px
        color #9c9c9c
      .four-remarks
        display block
        margin-top 15px
        margin-left 65px
        font-size 13px
        color #37373b
</style>
