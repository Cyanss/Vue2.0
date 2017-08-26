<template>
  <div v-if="showFlag" class="pay-pay">
    <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
    <div class="pay-content">
      <div class="pay-time">
        <span class="pay-time-txt">支付剩余时间</span>
        <count-down id="time" class="pay-time-min" :endTime="order.orderWhen" :callback="callback" endText="已经结束了"></count-down>
        <!--<span class="pay-time-min">{{order.orderWhen}}</span>-->
      </div>
      <div class="pay-store">
        <img class="pay-imgs" :src="order.orderImg"/>
        <div class="pay-text">
          <span class="pay-price">¥{{order.orderTotal}}</span>
          <span class="pay-name">{{order.orderName}}- {{order.orderNumber}}</span>
        </div>
      </div>
      <div class="pay-bank">
        <span class="pay-card-img"></span>
        <div class="pay-card">
          <div class="pay-card-content">
            <span class="pay-card-txt" @click="bankcard">银行卡支付</span>
            <div class="pay-card-in">
              <input name="radio" class="pay-card-radio" type="radio"/>
            </div>
          </div>
          <div class="pay-fiche" @click="displaycard">
            <span class="pay-fiche-txt">{{bank}}</span>
            <div class="pay-arrow">
              <span>&ensp;</span>
              <span class="pay-fiche-arrow"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="pay-way">
        <div class="pay-alipay">
          <span class="pay-img alipay"></span>
          <span class="pay-alipy-txt">支付宝支付</span>
          <input name="radio" class="pay-alipy-radio" type="radio"/>
        </div>
        <div class="pay-alipay">
          <span class="pay-img wechat"></span>
          <span class="pay-alipy-txt">微信支付</span>
          <input name="radio" class="pay-alipy-radio" type="radio" checked="checked"/>
        </div>
      </div>
      <div class="pay-confirm" @click="confirmClick">
        <span class="pay-confirm-txt" id="confirm">确认支付¥{{order.orderTotal}}</span>
      </div>
    </div>
    <div v-show="detailShow" class="pay-select">
      <div class="pay-outbox">
        <div class="pay-title">选择银行卡</div>
        <ul>
          <li v-for="(item, index) in cardss.cardd">
            <div class="pay-add">
              <img class="pay-addcard" :src="item.image">
              <span class="pay-addcard-txt" @click="okchange($event)">{{item.name}}</span>
            </div>
          </li>
        </ul>
        <div class="pay-addbottom" @click="begin">
          <span class="pay-addcardphoto pay-addcard"></span>
          <span class="pay-addcardword">添加新卡支付</span>
        </div>
      </div>
    </div>
    <v-addcard ref="addcard" @scroll="toggleScroll" v-on:payfang="showpayfang"></v-addcard>
    <v-cancelled ref="cancelled" @scroll="toggleScroll" :orderOne="orderOne"></v-cancelled>
    <v-detailing ref="detailing" @scroll="toggleScroll" :orderOne="orderOne"></v-detailing>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../../components/header/head.vue';
  import addcard from '../../../components/widget/addcard.vue';
  import Time from './time.vue';
  import Cancelled from '../orderdetail/cancel/cancelled.vue';
//  线下正在进行
  import Detailing from '../orderdetail/under/ordering.vue';
//  const ERR_OK = 0;

  export default{
    data() {
      return {
        showFlag: false,
        title: '订单支付',
        tapShow: false,
        backShow: true,
        cards: [],
        bank: '',
        detailShow: false,
        addcardShow: false,
        bankname: {
          type: Object
        },
        bankname1: '',
        cardss: {
          cardd: [
            {
              name: '农业银行',
              image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502940982176&di=e91d8405914f524ece38c7d0e9c5fdca&imgtype=0&src=http%3A%2F%2Fi.ftimg.net%2Fpicture%2F2%2F000057052_piclink.jpg'
            },
            {
              name: '中国银行',
              image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502885408781&di=9d4d5be747a69208245efe8db324040a&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F05%2F88%2F16pic_588440_b.jpg'
            },
            {
              name: '工商银行',
              image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502885315563&di=d7680832e3eefd91df646d99be026baf&imgtype=0&src=http%3A%2F%2Fupload.roadoor.cn%2FN%2F201311%2Fni5260.jpg'
            }
          ]
        },
        order: {
          type: Object
        },
        orderOne: {
          type: Object
        }
//        pay: {
//          payTime: '',
//          payName: '爱鲜蜂便利店',
//          payImg: '../../../../../static/images/shop_img_1.png',
//          payPrice: '32.00',
//          payNumber: '11446515648'
//        }
      };
    },
    mounted() {
    },
    created() {
//      this.$http.get('/api/cards').then((response) => {
//        response = response.body;
//        if (response.errno === ERR_OK) {
//          this.cards = response.data;
//        }
//      });
    },
    methods: {
      show(order) {
        this.order = order;
        let i = this.cardss.cardd.length - 1;
        this.bank = this.cardss.cardd[i].name;
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      showpayfang() {
        this.detailShow = false;
      },
      bankcard() {
        this.bankname = this.cardss.cardd;
//         object.getElementsByTagName(bankname);
//        Object.getOwnPropertyNames(this.bankname).forEach(
//          function (val, idx, array) {
//              this.bankname1 = this.bankname[val];
//          });
        let i = this.cardss.cardd.length;
        console.log(i);
        for (i in this.cardss.cardd) {
          console.log('索引：' + i + '，值：' + this.cardss.cardd[i].name);
        }
        console.log('3333' + this.cardss.cardd[2].name);
      },
      begin() {
        this.$refs.addcard.show();
        this.toggleScroll();
      },
      displaycard() {
        this.detailShow = !this.detailShow;
      },
      okchange(event) {
        this.detailShow = false;
        this.bank = event.target.textContent;
      },
      callback() {
        this.$emit('callback');
      },
      confirmClick() {
        let time = document.getElementById('time').innerText;
        if (time === '已经结束了') {
          console.log('支付时间到');
//          this.order.orderWhen = new Date(this.order.orderWhen);
//          console.log('支付时间到' + this.order.orderWhen);
          this.orderOne = this.order;
          this.$refs.cancelled.show(this.orderOne);
        } else {
          let orderWay = this.order.orderWay;
          this.orderOne = this.order;
          if (orderWay === '送货上门') {
            this.$router.push({path: '/shops', query: {shopId: 1}});
          } else {
            this.$refs.detailing.show(this.orderOne);
          }
          console.log('确认支付');
        }
      }
    },
    components: {
      'v-top': Top,
      'count-down': Time,
      'v-addcard': addcard,
      'v-cancelled': Cancelled,
      'v-detailing': Detailing
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"

  .pay-pay
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #f3f3f3
    .pay-content
      display inline-block
      width 100%
      .pay-time
        padding-top 20px
        height 80px
        background white
        text-align center
        border-bottom 1px solid #f3f3f3
        .pay-time-txt
          font-family "PingFang SC"
          font-size 13px
          color #9c9c9c
        .pay-time-min
          display block
          margin-top 24px
          font-family "PingFang SC"
          font-size 25px
          color #000000
      .pay-store
        display flex
        margin-top 10px
        height 100px
        background white
        .pay-imgs
          margin 25px 15px
          width 50px
          height 50px
          border-radius: 5%
        .pay-text
          margin-top 31px
          .pay-price
            font-family "PingFang SC"
            font-weight bold
            font-size 18px
            color #37373b
          .pay-name
            display block
            margin-top 12px
            font-family "PingFang SC"
            font-size 13px
            color #37373b
      .pay-bank
        margin-top 10px
        height 95.5px
        background white
        display flex
        line-height 50px
        overflow:hidden;
        .pay-card-img
          margin-left 15px
          width 27px
          height 17px
          vertical-align middle
          bg-image('pay_card')
          background-size 27px 17px
          background-repeat no-repeat
          transform:translateY(120%);
        .pay-card
          height 100%
          width 100%
          .pay-card-content
            display flex
            align-items center
            align-content center
            height 50.5px
            border-bottom 1px solid #f3f3f3
            .pay-card-txt
              margin-left 5px
              vertical-align middle
              font-family "PingFang SC"
              font-size 15px
              color #37373b
            .pay-card-in
              display flex
              align-items center
              align-content center
              .pay-card-radio
                position absolute
                right 15px
        .pay-fiche
          display flex
          align-items center
          align-content center
          line-height 45px
          margin-left 5px
          height 45px
          .pay-fiche-txt
            font-family "PingFang SC"
            font-size 14px
            color #9c9c9c
          .pay-arrow
            display flex
            align-items center
            position absolute
            right 17px
            font-size 0
            .pay-fiche-arrow
              width 9px
              height 17px
              background-size 9px 17px
              background-repeat no-repeat
              bg-image('../arrow_gray')
      .pay-way
        margin-top 20px
        background white
        .pay-alipay
          padding-left 15px
          line-height 50px
          display flex
          border-bottom 1px solid #f3f3f3
          .pay-img
            width 23.5px
            height 19px
            border 0
            vertical-align middle
            background-size 23.5px 19px
            background-repeat no-repeat
            transform:translateY(90%);
          .alipay
            bg-image('pay_alipay')
          .wechat
            bg-image('pay_wechat')
          .pay-alipy-txt
            margin-left  10px
            font-family "PingFang SC"
            font-size 15px
            color #37373b
          .pay-alipy-radio
            position absolute
            right 15px
            transform:translateY(150%);
            cursor: pointer;
      .pay-confirm
        display flex
        align-items center
        justify-content center
        position absolute
        bottom 0
        height 49px
        width 100%
        background #fdcf00
        .pay-confirm-txt
          font-family "PingFang SC"
          font-weight bold
          font-size 18px
          color #3737b
    .pay-select
      position: fixed
      z-index: 100px
      top: 0
      width: 100%
      height: 100%
      overflow: auto
      background:rgba(0,0,0,0.6)
      .pay-outbox
        margin-top: 200px
        margin-left: 37px
        /*height: 200px*/
        width: 300px
        background: #ffffff
        color: #000000
        text-align: center
        line-height: 87px
        line-width: 300px
        font-family "PingFang-SC-Medium"
        font-size: 16px
        border-radius 5px
        .pay-title
          height 35px
          border-bottom solid 1px #f3f3f3
          line-height 35px
          text-align center
        .pay-body
          height 52px
          border-bottom solid 1px #f3f3f3
          text-align center
        .pay-bottom
          border-top solid 1px #f3f3f3
          border-bottom solid 1px #f3f3f3
          height 55px
          display flex
        .pay-add
          height: 55px
          line-height 50px
          display flex
          border-bottom solid 1px #f3f3f3
          .pay-addcard
            margin-left 15px
            width 23px
            height 23px
            border 0
            vertical-align middle
            background-size 23px 23px
            background-repeat no-repeat
            transform:translateY(70%);
          .pay-wechat
            bg-image('pay_wechat')
          .pay-addcard-txt
            margin-left  25px
            font-family "PingFang SC"
            font-size 15px
            color #37373b
          .pay-addcard-radio
            position absolute
            right 55px
            transform:translateY(150%);
            cursor: pointer;
        .pay-addbottom
          line-height 50px
          display flex
          .pay-addcardphoto
            margin-left 15px
            width 23px
            height 23px
            border 0
            vertical-align middle
            background-size 23px 23px
            background-repeat no-repeat
            transform:translateY(70%);
          .pay-addcard
            bg-image('add_card')
          .pay-addcardword
            margin-left  25px
            font-family "PingFang SC"
            font-size 15px
            color #37373b
</style>
