<template>
  <div>
    <div class="submit" v-show="showFlag" ref="submitScroll">
      <div class=" submit-wrapper">
        <div class="submit-content">
          <v-top :title="title" :moreShow="true" :backShow="true" @back="hide" :bgId="0"></v-top>
          <div class="submit-head" v-show="showAdd">
            <button class="submit-add yellow" @click="addClick">添加送货地址</button>
          </div>
          <div class="submit-head yellow" v-show="showHead">
            <span class="submit-address">{{address.detail}}，{{address.doorplate}}</span>
            <span class="submit-tel">{{address.name}}（{{address.sex}}）{{address.tel}}</span>
            <span class="submit-arrow" @click="showClick"></span>
          </div>
          <div class="submit-mode">
            <span id="on" class="submit-mode-on yellow" @click="onClick">送货上门</span>
            <span id="under" class="submit-mode-under gray" @click="underClick">线下自提</span>
          </div>
          <div class="submit-module">
            <div class="submit-way" v-show="showUnder">
              <span class="submit-img"></span>
              <div class="submit-way-content">
                <span class="submit-way-under black bold">线下自提</span>
                <span class="submit-under-text gray">可线下去实体店拿货 当场交易</span>
              </div>
            </div>
            <div class="submit-way" v-show="showOn">>
              <span class="submit-img"></span>
              <div class="submit-way-content">
                <span class="submit-way-under black bold">尽快送达</span>
                <span class="submit-under-text gray">预计{{data.date}} {{data.time}}</span>
              </div>
              <span class="submit-arrows" @click="clickTime"></span>
            </div>
            <div class="submit-order">
              <fieldset class="submit-header">
                <legend class="submit-name black">{{order.orderName}}</legend>
              </fieldset>
              <div class="submit-substance">
                <ul v-if="order.orderDetail">
                  <li v-for="(item,index) in order.orderDetail">
                    <div class="submit-list">
                      <div class="submit-list-name">
                        <p >{{order.orderDetail[index].orderGoods}}</p>
                      </div>
                      <div class="submit-list-amount">
                        <span class="submit-list-quantity">x{{order.orderDetail[index].orderCount}}</span>
                        <span class="submit-list-price">¥{{order.orderDetail[index].orderPrice}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="submit-discount" v-show="discountShow">
                <span class="submit-discount-text">满减优惠券</span>
                <div class="submit-discount-right">
                  <span class="submit-discount-gray gray">满{{supports.full}}减{{supports.reduce}}</span>
                  <span class="red submit-discount-text">-{{supports.reduce}}¥</span>
                </div>
              </div>
              <div class="submit-discount">
                <span class="submit-discount-text">优惠券</span>
                <div class="submit-discount-right">
                  <span class="submit-discount-text red">-{{order.orderFavourable}}¥</span>
                  <span class="submit-arrow" @click="preferentialClick"></span>
                </div>
              </div>
              <div class="submit-discount">
                <span class="submit-discount-text bold">总计</span>
                <div class="submit-discount-amount">
                  <span class="submit-discount-gray gray">已优惠¥{{totalDiscount}}元</span>
                  <span class="submit-discount-total bold">¥{{totalTotal}}</span>
                </div>
              </div>
            </div>
            <div class="submit-finally">
              <div class="submit-pay black">
                <span class="submit-pay-text">支付方式</span>
                <span class="submit-pay-mode">在线支付</span>
              </div>
              <div class="submit-remark" v-show="ShowRemark">
                <span class="submit-pay-text">订单备注</span>
                <div class="submit-remarks gray" @click="remarkClick">
                  <span class="submit-remark-mode" @input="remarks()">&ensp;{{desccText}}</span>
                  <span class="submit-remark-arrow"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="submit-footer">
            <span class="submit-preferential black">已优惠¥{{totalDiscount}}</span>
            <div class="submit-footer-content">
              <span class="submit-total blcak">合计</span>
              <span class="submit-number red bold">¥{{totalTotal}}</span>
              <button class="submit-btn bold" @click="submitOrderClick">提交订单</button>
            </div>
          </div>
        </div>
      </div>
      <v-remark ref="remark" :descc="desccText" v-on:child-say="listenToMyBoy" @scroll="toggleScroll"></v-remark>
      <v-pay ref="pay" @scroll="toggleScroll"></v-pay>
    </div>
    <v-timeBox ref="timeBox" @getTime="getServiceTime"></v-timeBox>
    <v-coupon ref="coupon" @getCoupon="getCoupon"></v-coupon>
    <v-address ref="address" @getAddress="getAddress"></v-address>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Top from '../../../components/header/head.vue';
  import Pay from '../pay/pay.vue';
  import Remark from '../remark/orderremarks.vue';
  import timebox from '../timebox/timebox.vue';
  import coupon from '../../person/coupon/coupon.vue';
  import address from '../../person/address/address.vue';

  export default{
    data() {
      return {
        discountShow: false,
        desccText: '',
        result: null,
        showFlag: false,
        title: '提交订单',
        tapShow: false,
        backShow: true,
        showOn: true,
        showUnder: false,
        showHead: false,
        showAdd: true,
        ShowRemark: true,
        Distribution: '免费配送',
        order: {
          orderName: '鲜蜂便利店（西兴店）',
          orderImg: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
          orderDetail: [
            {
              orderGoods: '中国人喝的矿泉水',
              orderCount: 1,
              orderPrice: 25
            },
            {
              orderGoods: '中国人喝的矿泉水',
              orderCount: 1,
              orderPrice: 25
            }
          ],
          orderPrivilege: '满50减10',
          orderPreferential: 10,
          orderFavourable: 10,
          orderTotal: 50,
          orderRemarks: '麻烦快送点谢谢',
          orderTime: '立即配送',
          orderAddress: '杭州市 滨江区 长河街道江南大道1090号中南国际商城第8幢第二层',
          orderService: '店员提供免费配送服务',
          orderNumber: '1811 3681 0682 8787 6',
          orderWhen: '2017-07-17 20：09：25',
          orderPay: '支付宝支付'
        },
        supports: {
          full: 50,
          reduce: 10
        },
        data: {
            date: null,
            time: null
        },
        coupon_value: null,
        address: {
          name: null,
          tel: null,
          detail: null,
          doorplate: null,
          sex: null
        }
      };
    },
    computed: {
      totalOriginal() {
        let total = 0;
        this.order.orderDetail.forEach((orderDetail) => {
          total += orderDetail.orderCount * orderDetail.orderPrice;
        });
        return total;
      },
      totalDiscount() {
        if (this.discountShow === false) {
          this.supports.reduce = 0;
        }
        let discount = this.supports.reduce + this.order.orderFavourable;
        return discount;
      },
      totalTotal() {
        let total = 0;
        this.order.orderDetail.forEach((orderDetail) => {
          total += orderDetail.orderCount * orderDetail.orderPrice;
        });
        total = total - this.totalDiscount;
        return total;
      }
    },
    created() {
      if (this.totalOriginal >= this.supports.full) {
        this.discountShow = true;
      } else {
        this.discountShow = false;
      }
    },
    methods: {
      getServiceTime(time) {
        // 获取送达时间
        this.data.time = time.hour.time;
      },
      getCoupon(coupon) {
        this.order.orderFavourable = coupon.value;
        console.log(coupon);
      },
      getAddress(address) {
        this.address = address;
      },
      listenToMyBoy(ev) {
        this.desccText = ev;
      },
      show() {
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
          if (!this.submitScroll) {
            this.submitScroll = new BScroll(this.$refs.submitScroll, {
              click: true
            });
          } else {
            this.submitScroll.refresh();
          }
        });
      },
      onClick() {
        document.getElementById('on').style.color = '#ffd100';
        document.getElementById('under').style.color = '#9c9c9c';
        this.showOn = true;
        this.showUnder = false;
        this.ShowRemark = true;
      },
      underClick() {
        document.getElementById('on').style.color = '#9c9c9c';
        document.getElementById('under').style.color = '#ffd100';
        this.showOn = false;
        this.showUnder = true;
        this.ShowRemark = false;
      },
//      添加地址
      addClick() {
        this.showHead = true;
        this.showAdd = false;
        this.$refs.address.show(true);
      },
//      添加地址
      showClick() {
        this.$refs.address.show(true);
      },
//      选择时间
      clickTime() {
        this.$refs.timeBox.show();
      },
//      跳转到订单备注
      remarkClick() {
        this.descc = this.desccText;
//        console.log('-------55555------->' + this.descc);
        this.$refs.remark.show();
        this.toggleScroll();
      },
//      选择优惠券
      preferentialClick() {
        this.$refs.coupon.show('', true);
      },
      submitOrderClick() {
        let time = new Date();
        this.order.orderWhen = time.getTime() + 900000;
        this.order.orderTotal = this.totalTotal;
//        console.log('提交订单');
        this.$refs.pay.show(this.order);
        this.toggleScroll();
      }
    },
    components: {
      'v-top': Top,
      'v-remark': Remark,
      'v-pay': Pay,
      'v-timeBox': timebox,
      'v-coupon': coupon,
      'v-address': address
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .submit
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .submit-content
      display inline-block
      width 100%
      font-family "PingFang SC"
      .yellow
        color #ffd100
      .black
        color #37373b
      .gray
        color #9c9c9c
      .red
        color #ff2121
      .bold
        font-weight bold
      .submit-head
        height 50px
        background #37373b
        vertical-align middle
        text-align center
        .submit-add
          margin-top 15px
          height 25px
          width 150px
          border 1px solid #fbd93a
          border-radius 5%
          background 0
          font-size 15px
        .submit-address
          font-size 15px
        .submit-tel
          display block
          margin-top 10px
          font-size 11px
        .submit-arrow
          position absolute
          right 15px
          width 6.5px
          height 13px
          background-size 6.5px 13px
          background-repeat no-repeat
          bg-image('arrow_yellow')
          transform:translateY(-190%);
      .submit-mode
        display flex
        height 45px
        background white
        text-align center
        font-size 14px
        align-items center
        .submit-mode-on
          flex 1
        .submit-mode-under
          flex 1
      .submit-module
        margin  20px 15px 0 15px
        .submit-way
          display flex
          padding 18px 0 18px 15px
          height 39px
          background white
          border-radius 2%
          font-size 0
          .submit-img
            margin 9.5px 0
            height 20px
            width 20px
            background-size 20px 20px
            background-repeat no-repeat
            bg-image('select')
          .submit-way-content
            margin-left 15px
            .submit-way-under
              display block
              font-size 15px
            .submit-under-text
              display block
              margin-top 13px
              font-size 12px
          .submit-arrows
            position absolute
            right 30px
            width 6.5px
            height 13px
            background-size 6.5px 13px
            background-repeat no-repeat
            bg-image('arrow_gray')
            transform:translateY(100%);
        .submit-order
          margin-top 10px
          padding 20px 15px 0 15px
          background white
          border-radius: 2%
          .submit-header
            border 0
            border-top:#d8d8d8 solid 1px;
            text-align center
            .submit-name
              padding 0 16px 0 16px
              font-size 16px
          .submit-substance
            margin-top 30px
            border-bottom 1px solid #f3f3f3
            .submit-list
              display flex
              margin-bottom 27px
              line-height 14px
              flex-direction: row;
              justify-content space-between
              flex-wrap: nowrap;
              font-size 14px
              color #37373b
              .submit-list-name
                vertical-align: middle;
              .submit-list-amount
                display flex
                width 4.5rem
                .submit-list-quantity
                  width 5rem
                .submit-list-price
                  width 2rem
          .submit-discount
            display flex
            height 45px
            line-height 45px
            align-items center
            align-content center
            border-bottom 1px solid #f3f3f3
            .submit-discount-text
              font-size 14px
            .submit-discount-right
              display flex
              align-items center
              position: absolute
              right 30px
              font-size 0
              .submit-arrow
                margin-left 10px
                width 6.5px
                height 13px
                background-size 6.5px 13px
                background-repeat no-repeat
                bg-image('arrow_gray')
            .submit-discount-gray
              display flex
              align-items center
              margin-right 10px
              font-size 11px
            .submit-discount-amount
               display flex
               align-items center
               position: absolute
               right 30px
               font-size 0
              .submit-discount-total
                font-size 16px
        .submit-finally
          margin-top 10px
          margin-bottom 20px
          background white
          border-radius 2%
          font-size 14px
          .submit-pay
            display flex
            margin 0 15px
            height 45px
            line-height 45px
            align-items center
            border-bottom 1px solid #f3f3f3
            .submit-pay-mode
              position absolute
              right 30px
          .submit-remark
            display flex
            padding 0 15px
            height 45px
            line-height 45px
            align-items center
            align-content center
            .submit-remarks
              display flex
              align-items center
              position absolute
              right 30px
              .submit-remark-mode
                margin-right 10px
              .submit-remark-arrow
                width 6.5px
                height 13px
                background-size 6.5px 13px
                background-repeat no-repeat
                bg-image('arrow_gray')
      .submit-footer
        display flex
        /*position absolute*/
        /*bottom 0*/
        height 49px
        width 100%
        align-items center
        background white
        .submit-preferential
          margin-left 15px
          font-size 12px
        .submit-footer-content
          position absolute
          right 0
          .submit-total
            font-size 12px
          .submit-number
            margin 0 10px
            font-size 17.5px
          .submit-btn
            height 49px
            width 110px
            text-align center
            border 0
            background #fdcf00
            color white
</style>
