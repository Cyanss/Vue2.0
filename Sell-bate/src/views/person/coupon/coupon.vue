<template>
  <div v-show="showFlag" class="coupons">
    <v-top :bjId="bjId" :bgId="0" @add="addstate" :backShow="true" :title="title" :moreShow="false" :addShow="true" @back="hide"></v-top>
    <div class="coupons-content" ref="couponsWrapper">
      <ul v-show="couponView" class="coupon-content">
        <li v-show="couponView"  v-for="(coupons,index) in couponView" class="coupon-content-li" @click="couponItem(index,$event)">
          <div class="coupon-item">
            <div class="coupon-item-leftedge" :class="textChange"></div>
            <div class="coupon-item-left">
              <h2 class="coupon-name" :class="textChange">{{coupons.name}}</h2>
              <span class="coupon-deadline" :class="textChange">有效期至:{{coupons.deadline | formatDate}}</span>
              <span class="coupon-mark" :class="textChange">{{coupons.detail}}</span>
            </div>
            <div class="coupon-item-center">
              <div class="coupons-top"></div>
              <div class="coupons-icon"  v-show="coupon_state"></div>
              <div class="coupons-bottom"></div>
            </div>
            <div class="coupon-item-right" :class="textChange">
              <div class="coupons-text">
                <span  class="coupon-sign" >￥</span>
                <span class="coupon-value" >{{coupons.value}}</span>
              </div>
              <span class="coupon-uses" @click="immediate(index,$event)">立即使用</span>
            </div>
          </div>
        </li>
        <div class="aaa">
          <div class="aaa-text"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from '../../../common/js/date';
  import Top from '../../../components/header/head.vue';
  export default{
    data() {
      return {
        click_on: false,
        showFlag: false,
        title: '优惠卷',
        tapShow: false,
        backShow: true,
        coupon_state: false,
        name: '',
        coupon: [
          {
              name: '一点点便利店',
              deadline: '2017.08.22',
              value: 15,
              detail: '该优惠券是针对商家所用的'
          },
          {
            name: '一点点便利店',
            deadline: '2017.09.22',
            value: 5,
            detail: '该优惠券是针对商家所用的'
          },
          {
            name: '好日子便利店',
            deadline: '2017.10.22',
            value: 25,
            detail: '该优惠券是针对商家所用的'

          },
          {
            name: '一点点便利店',
            deadline: '2017.11.22',
            value: 10,
            detail: '该优惠券是针对商家所用的'
          },
          {
            name: '一点点便利店',
            deadline: '2017.07.22',
            value: 5,
            detail: '该优惠券是针对商家所用的'
          },
          {
            name: '好日子便利店',
            deadline: '2017.07.22',
            value: 25,
            detail: '该优惠券是针对商家所用的'
          },
          {
            name: '一点点便利店',
            deadline: '2017.07.22',
            value: 10,
            detail: '该优惠券是针对商家所用的'
          }
        ],
        couponView: []
      };
    },
    mounted() {
      this._initScroll();
    },
    computed: {
      bjId() {
        let id = '1';
        if (this.coupon_state) {
          id = '0';
        }
        return id;
      },
      textChange() {
        if (this.coupon_state) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      show(name, clickon) {
        if (clickon === undefined) {
          this.click_on = false;
        } else {
          this.click_on = true;
        }
        this.name = name;
        this.showFlag = true;
        this.coupon_state = false;
        this.initView();
        this._initScroll();
      },
      couponItem(index, event) {
        if (!this.coupon_state && this.click_on) {
          console.log('界面跳转');
          this.$emit('getCoupon', this.couponView[index]);
          this.hide();
        }
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      addstate() {
         this.coupon_state = !this.coupon_state;
         this.initView();
         this._initScroll();
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.couponsScroll) {
            this.couponsScroll = new BScroll(this.$refs.couponsWrapper, {
              click: true
            });
          } else {
            this.couponsScroll.refresh();
          }
        });
      },
      initView() {
        this.couponView.splice(0, this.couponView.length);
        this.coupon.forEach((item) => {
          let data = this.dateCompare(this.getNowFormatDate(), item.deadline);
          if (this.coupon_state) {
              if (data === -1) {
                this.couponView.push(item);
              }
            // 过期
          } else {
            if (data === 1) {
                if (this.name !== '') {
                    // 根据商铺名字查询
                  if (this.name === item.name) {
                    this.couponView.push(item);
                  } else {
                      return;
                  }
                } else {
                  this.couponView.push(item);
                }
            }// 没有过期
          }
        });
      },
      /**
       *日期解析，字符串转日期
       *  @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
       * @returns {Date}
       */
      dateParse(dateString) {
        var SEPARATOR_BAR = '-';
        var SEPARATOR_SLASH = '/';
        var SEPARATOR_DOT = '.';
        var dateArray;
        if (dateString.indexOf(SEPARATOR_BAR) > -1) {
          dateArray = dateString.split(SEPARATOR_BAR);
        } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
          dateArray = dateString.split(SEPARATOR_SLASH);
        } else {
          dateArray = dateString.split(SEPARATOR_DOT);
        }
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
      },
      /**
       *  * 日期比较大小
       * compareDateString大于dateString，返回1；
       * 等于返回0；
       * compareDateString小于dateString，返回-1
       * @param dateString 日期
       * @param compareDateString 比较的日期
       * @param dateString
       * @param compareDateString
       * @returns {number}
       */
      dateCompare(dateString, compareDateString) {
//        if (isEmpty(dateString)) {
//          alert('dateString不能为空');
//          return;
//        }
//        if (isEmpty(compareDateString)) {
//          alert('compareDateString不能为空');
//          return;
//        }
        var dateTime = this.dateParse(dateString).getTime();
        var compareDateTime = this.dateParse(compareDateString).getTime();
        if (compareDateTime > dateTime || compareDateTime === dateTime) {
          return 1;
        } else {
          return -1;
        }
      },
      /**
       * 格式“yyyy-MM-dd”
       * @returns {string}
       */
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = '-';
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      immediate(index, event) {
        this.$router.push({path: '/shops/goods', query: {shopId: 1}});
        this.hide();
      }
      },
    created() {
        this._initScroll();
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd ');
      },
      formatValue(value) {
          return '￥' + value;
      }
    },
    components: {
      'v-top': Top
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .coupons
    position: absolute
    width:100%
    bottom 0
    top 0
    background:  #f1f1f1
    .coupons-top
      background #37373b
    .coupons-content
      position: absolute
      top 44px
      bottom: 0
      left: 0
      width: 100%
      overflow: hidden
      background:  #f1f1f1
      .coupon-content
        top 10px
        bottom 5px
        position: relative
        width 100%
        .coupon-content-li
          margin: 10px 15px 10px 15px
          .coupon-item
            display: flex
            position: relative
            background: #ffffff
            border-radius: 10px
            justify-content:center;
            align-items:center;
            font-size: 0
            .coupon-item-leftedge
              position: absolute
              left 0
              border-radius: 10px 0 0 10px
              height 100%
              width 5px
              &.not-enough
                background #999999
              &.enough
                background: #ff5656
            .coupon-item-left
              flex: 1
              font-size: 12px
              height 100%
              margin: auto 0 auto 30px
              .coupon-name
                font-family "PingFang-SC-Heavy"
                font-weight bold
                font-size: 17px
                margin-top 24px
                margin-bottom 10px
                &.not-enough
                  color #999999
                &.enough
                  color: #333333
              .coupon-deadline
                display: block
                font-size: 12px
                font-family "PingFang-SC-Mediun"
                margin-bottom 10px
                &.not-enough
                  color #999999
                &.enough
                  color: #666666
              .coupon-mark
                display: block
                font-size: 12px
                font-family "PingFang-SC-Mediun"
                margin-bottom 18px
                &.not-enough
                  color #999999
                &.enough
                  color: #666666
            .coupon-item-center
              position: absolute
              right 80px
              top -8px
              bottom -8px
              width 100px
              height 116px
              .coupons-top
                position absolute
                top 0px
                margin-left 60px
                width: 16px
                height 16px
                border-radius:50%
                background #f1f1f1
              .coupons-icon
                position absolute
                margin: 26px auto 20px  40px
                width 55px
                height: 55px
                background-size 55px 55px
                bg-image('lapsed_icon')
              .coupons-bottom
                position absolute
                bottom 0px
                margin-left 60px
                width: 16px
                height 16px
                border-radius:50%
                background #f1f1f1
            .coupon-item-right
              position: absolute
              right 0
              height 100%
              font-size: 0
              &.not-enough
                color #999999
              &.enough
                color: #ff5656
              .coupons-text
                display block
                margin: 29px 30px 13px auto
                .coupon-sign
                  font-family "PingFang-SC-Mediun"
                  font-size: 14px
                .coupon-value
                  font-family "PingFang-SC-Mediun"
                  font-weight bold
                  font-size: 33px
              .coupon-uses
                display block
                font-family "PingFang-SC-Mediun"
                margin: 13px 32px auto auto
                font-size: 12px

        .aaa
          display table
          width 100%
          font-size 12px
          margin-top 10px
          margin-bottom 10px
          height 20px
          text-align center
          .aaa-text
            display: table-cell
            vertical-align: middle
</style>
