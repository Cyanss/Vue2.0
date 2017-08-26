<template>
  <!--试验品-->
  <div class="detail" v-show="showFlag" ref="detailScroll">
    <div class="detail-wrapper">
      <div class="detail-content">
        <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
        <div class="detail-inside">
          <div class="detail-one" id="head" :class="{under:(orderOne.orderWay == '线下自提')}" @my-event="cssClick">
            <div class="detail-one-submit">
              <span id="detailStatus" class="detail-status">{{orderOne.orderStatus}}</span>
              <span class="detail-one-arrows" v-show="orderOne.orderWay == '送货上门'"></span>
            </div>
            <span class="detail-thanks">感谢你对飞优特支持，欢迎再次光临</span>
            <div class="detail-function">
              <span class="detail-btn-left" @click="leftClick" v-show="showLeft" id="leftBtn" :class="leftMap[leftId]">取消订单</span>
              <span class="detail-btn-right" @click="rightClick" v-show="showRight" id="rightBtn" :class="rightMap[rightId]">确认收货</span>
            </div>
          </div>
          <div class="detail-two">
            <div class="detail-two-head">
              <img class="detail-two-img" :src="orderOne.orderImg"/>
              <span class="detail-two-name">{{orderOne.orderName}}</span>
              <span class="detail-two-arrows" @click="goShop"></span>
            </div>
            <div class="detail-two-content">
              <ul v-if="orderOne.orderDetail">
                <li v-for="(item,index) in orderOne.orderDetail">
                  <div class="detail-content-list">
                    <div class="detail-list-name">
                      <p >{{orderOne.orderDetail[index].orderGoods}}</p>
                    </div>
                    <div class="detail-list-amount">
                      <span class="detail-list-quantity">x{{orderOne.orderDetail[index].orderCount}}</span>
                      <span class="detail-list-price">¥{{orderOne.orderDetail[index].orderPrice}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="detail-two-discount">
              <span class="detail-two-text">满减优惠券</span>
              <div class="detail-two-red">
                <span class="detail-two-gray">{{orderOne.orderPrivilege}}</span>
                <span>-{{orderOne.orderPreferential}}¥</span>
              </div>
            </div>
            <div class="detail-two-discount">
              <span class="detail-two-text">优惠券</span>
              <div class="detail-two-red">
                <span>-{{orderOne.orderFavourable}}¥</span>
              </div>
            </div>
            <div class="detail-two-discount">
              <span class="detail-two-text two-bold">总计</span>
              <div class="detail-two-amount">
                <span class="detail-two-gray">已优惠¥20元</span>
                <span class="detail-two-total">¥{{orderOne.orderTotal}}</span>
              </div>
            </div>
            <!--<a :href="'tel:'+(orderOne.orderTel)">-->
              <div class="detail-two-phone" @click="telClick">
                <span class="detail-two-phone-img"></span>
                <span class="detail-two-phone-txt">联系商家</span>
                <span v-show="false" ref="orderTel">{{orderOne.orderTel}}</span>
              </div>
            <!--</a>-->
          </div>
          <div class="detail-four" v-show="orderOne.orderWay == '送货上门'">
            <span class="detail-four-txt">买家备注</span>
            <span class="detail-four-remarks" >{{orderOne.orderRemarks}}</span>
          </div>
          <div class="detail-three" v-show="orderOne.orderWay == '送货上门'">
            <div>
              <span class="detail-three-gray">期望时间</span>
              <span class="detail-three-black">{{orderOne.orderTime}}</span>
            </div>
            <div class="detail-three-address">
              <span class="detail-three-gray">配送地址</span>
              <div class="detail-three-news">
                <span class="detail-three-black">{{orderOne.orderAddress}}</span>
              </div>
            </div>
            <div class="detail-three-service">
              <span class="detail-three-gray">配送服务</span>
              <span class="detail-three-black">{{orderOne.orderService}}</span>
            </div>
          </div>
          <div class="detail-three">
            <div>
              <span class="detail-three-gray">订单号码</span>
              <span id="detailNumber" class="detail-three-black">{{orderOne.orderNumber}}</span>
              <span class="detail-three-copy">复制</span>
            </div>
            <div class="detail-three-defray">
              <span class="detail-three-gray">订单时间</span>
              <span class="detail-three-black">{{orderOne.orderWhen}}</span>
            </div>
            <div class="detail-three-defray">
              <span class="detail-three-gray">支付方式</span>
              <span class="detail-three-black">{{orderOne.orderPay}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-evaluate ref="evaluate" @scroll="toggleScroll"></v-evaluate>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Clipboard from 'clipboard';
  import Top from '../../../components/header/head.vue';
  import Evaluate from '../evaluate/evaluate.vue';

  export default{
    data() {
      return {
        showFlag: false,
        tapShow: false,
        backShow: true,
        title: '订单',
        showLeft: true,
        showRight: true,
        orderOne: {type: Object},
        leftId: {
          type: Number,
          defalut: 0
        },
        rightId: {
          type: Number,
          defalut: 0
        }
      };
    },
    created() {
      this.leftMap = ['left-white', 'left-yellow'];
      this.rightMap = ['right-white', 'right-four', 'right-yellow'];
    },
    mounted() {
//      let status = document.getElementById('detailStatus').innerText;
//      let left = document.getElementById('leftBtn');
//      let right = document.getElementById('rightBtn');
//      if (status === '订单正在进行中') {
//        left.innerText = '取消订单';
//        right.innerText = '确认收货';
//        this.leftId = 0;
//        this.rightId = 2;
//        this.showRight = true;
//      } else if (status === '订单已完成') {
//        left.innerText = '再来一单';
//        right.innerText = '评价';
//        this.leftId = 1;
//        this.rightId = 0;
//        this.showRight = true;
//      } else if (status === '订单已取消') {
//        left.innerText = '再来一单';
//        this.leftId = 0;
//        this.showRight = false;
//      } else if (status === '正在取消订单') {
//        left.innerText = '撤回消息';
//        this.leftId = 0;
//        this.showRight = false;
//      } else if (status === '商家已拒绝取消订单') {
//        left.innerText = '取消订单';
//        right.innerText = '确认收货';
//        this.leftId = 0;
//        this.rightId = 2;
//        this.showRight = true;
//      } else if (status === '正在提货') {
//        left.innerText = '确认提货';
//        this.leftId = 1;
//        this.showRight = false;
//      }
//
      let clipboard = new Clipboard('.detail-three-copy', {
        text: function() {
          return document.getElementById('detailNumber').innerText;
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
          if (!this.detailScroll) {
            this.detailScroll = new BScroll(this.$refs.detailScroll, {
              click: true
            });
          } else {
            this.detailScroll.refresh();
          }
        });
      },
      //      联系商家
      telClick() {
        let tel = this.$refs.orderTel.innerText;
        alert('联系商家' + tel);
        window.location.href = 'tel:' + tel;
      },
//      左边点击
      leftClick() {
        let status = document.getElementById('detailStatus').innerText;
        if (status === '订单正在进行中' || status === '商家已拒绝取消订单') {
//            取消订单
        } else if (status === '订单已完成' || status === '订单已取消') {
//            再来一单
          this.$router.push({path: '/shops', query: {shopId: 1}});
        } else if (status === '正在取消订单') {
//            撤回取消
        } else if (status === '正在提货') {
//            确认提货
        }
      },
//      右边点击
      rightClick() {
        let status = document.getElementById('detailStatus').innerText;
        if (status === '订单正在进行中' || status === '商家已拒绝取消订单') {
//          确认收货
        } else if (status === '订单已完成') {
//            评价
          this.$refs.evaluate.show(this.orderOne);
          this.toggleScroll();
        }
      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      },
      cssClick() {
        let status = document.getElementById('detailStatus').innerText;
        let left = document.getElementById('leftBtn');
        let right = document.getElementById('rightBtn');
        if (status === '订单正在进行中') {
          left.innerText = '取消订单';
          right.innerText = '确认收货';
          this.leftId = 0;
          this.rightId = 2;
          this.showRight = true;
        } else if (status === '订单已完成') {
          left.innerText = '再来一单';
          right.innerText = '评价';
          this.leftId = 1;
          this.rightId = 0;
          this.showRight = true;
        } else if (status === '订单已取消') {
          left.innerText = '再来一单';
          this.leftId = 0;
          this.showRight = false;
        } else if (status === '正在取消订单') {
          left.innerText = '撤回消息';
          this.leftId = 0;
          this.showRight = false;
        } else if (status === '商家已拒绝取消订单') {
          left.innerText = '取消订单';
          right.innerText = '确认收货';
          this.leftId = 0;
          this.rightId = 2;
          this.showRight = true;
        } else if (status === '正在提货') {
          left.innerText = '确认提货';
          this.leftId = 1;
          this.showRight = false;
        }
      }
    },
    components: {
      'v-top': Top,
      'v-evaluate': Evaluate
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"

  .detail
    left 0
    top 0
    width 100%
    height 100%
    background #F1F1F1
    .detail-content
      display inline-block
      margin 0
      width 100%
      height 100%
      font-family "PingFang SC"
      background #F1F1F1
      .detail-inside
        margin 15px
        .detail-one
          padding-top 20px
          height 90px
          width 100%
          text-align center
          vertical-align:middle
          background-repeat no-repeat
          background-size 100% 110px
          bg-image('on_line')
          &.under
            bg-image('under_line')
          .detail-one-submit
            display flex
            justify-content:center;
            .detail-status
              font-size 15px
              font-weight bold
              color #37373b
            .detail-one-arrows
              margin-left 5px
              width 6.5px
              height 13px
              background-size 6.5px 13px
              background-repeat no-repeat
              bg-image('../arrow')
          .detail-thanks
            margin-top 10px
            display block
            font-size 12px
            color #9c9c9c
          .detail-function
            font-size 11px
            color: #37373b
            margin 22px 46px
            .detail-btn-left
              padding 8.5px 18px
              border-radius: 5%
              &.left-white
                background white
                border 1px solid #7e8c8d
              &.left-yellow
                background #fdcf00
            .detail-btn-right
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
        .detail-two
          margin-top 15px
          background white
          border-radius: 2%
          line-height 25px
          .detail-two-head
            display flex
            padding 0 15px
            align-items center
            overflow:hidden;
            border-bottom 1px solid #f3f3f3
            .detail-two-img
              margin 10px 0
              width 35px
              height 35px
              border-radius 10%
            .detail-two-name
              margin-left 15px
              font-size: 16px
              font-weight bold
              color #37373b
            .detail-two-arrows
              margin-left 20px
              width 6.5px
              height 13px
              background-size 6.5px 13px
              background-repeat no-repeat
              bg-image('../arrow')
          .detail-two-content
            margin 27px 15px 0 15px
            border-bottom 1px solid #f3f3f3
            .detail-content-list
              display flex
              margin-bottom 27px
              line-height 14px
              flex-direction: row;
              justify-content space-between
              flex-wrap: nowrap;
              font-size 14px
              color #37373b
              .detail-list-name
                vertical-align: middle;
              .detail-list-amount
                display flex
                width 4.5rem
                .detail-list-quantity
                  width 5rem
                .detail-list-price
                  width 2rem
          .detail-two-discount
            margin 0 15px
            padding 7px 0
            display flex
            line-height:30px;
            overflow:hidden;
            border-bottom 1px solid #f3f3f3
            .detail-two-text
              font-size 14px
              color #37373b
            .detail-two-bold
              font-weight bold
            .detail-two-red
              color #ff2121
              font-size 14px
              position: absolute
              right 30px
            .detail-two-gray
              color #9c9c9c
              font-size 11px
            .detail-two-amount
              position: absolute
              right 30px
              .detail-two-total
                color red
                font-size 15px
                font-weight bold
          .detail-two-phone
            display flex
            padding 15.5px 0
            height 14px
            line-height 14px
            text-align center
            border-radius:0 0 5% 5%
            background #fdcf00
            justify-content:center;
          .detail-two-phone-img
            margin-right 10px
            width 14px
            height 14px
            bg-image('phone')
            background-size 14px 14px
            background-repeat no-repeat
          .detail-two-phone-txt
            font-size 14px
            font-weight bold
            color #37373b
        .detail-three
          margin-top 15px
          padding 30.5px 16px 30px 16px
          background white
          border-radius: 2%
          .detail-three-gray
            font-size 14px
            color #9c9c9c
          .detail-three-black
            margin-left 5px
            font-size 13px
            color #37373b
          .detail-three-address
            display flex
            margin-top 23px
            .detail-three-news
              flex 2
              margin-left 5px
          .detail-three-service
            margin-top 23px
          .detail-three-defray
            margin-top 20px
          .detail-three-copy
            padding 2px 0
            position: absolute
            right 30px
            height 9px
            width 45px
            border-radius: 7%
            border 1px solid #7e8c8d
            text-align center
            font-size 7.5px
            color: #666666
            background 0
        .detail-four
          margin-top 15px
          padding 15px 0 15px 15px
          height 50px
          border-radius 2%
          background white
          .detail-four-txt
            font-size 14px
            color #9c9c9c
          .detail-four-remarks
            display block
            margin-top 15px
            margin-left 65px
            font-size 13px
            color #37373b
</style>
