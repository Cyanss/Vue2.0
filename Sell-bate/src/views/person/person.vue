<template>
  <div class="persion">
    <div class="persion-main" v-show="isHide">
      <div class="persion-content">
        <div class="persion-userinfo">
          <div class="persion-user" @click="login" v-show="entry">
            <div class="persion-photo">
              <div class="persion-src"></div>
            </div>
            <div class="persion-text">登陆</div>
          </div>
          <div class="persion-login" v-show="!entry">
            <img class="persion-user-src" :src="`http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg`">
            <div class="persion-user-detail">
              <span class="user-weixin-name">{{weixin.name}}</span>
              <span class="user-weixin-detail">{{weixin.detail}}</span>
            </div>
          </div>
          <div class="background">
            <img :src="person.icon" width="100%" height="100%">
          </div>
        </div>
        <split></split>
        <div class="persion-main-wrapper" @click="couponShow">
          <span class="persion-main-icon" :class="'couponicon'"></span>
          <span class="persion-main-text">优惠卷</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <split></split>
        <div class="persion-main-wrapper" @click="address">
          <span class="persion-main-icon" :class="'addressicon'"></span>
          <span class="persion-main-text">我的收货地址</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="persion-bottom" v-show="!entry" @click="login_out">
          <div class="persion-bottom-btn">
            <div class="persion-bottom-btn-text">退出当前账号</div>
          </div>
        </div>
      </div>
      <div v-show="loginOutShow" class="persion-tanchu" >
        <div class="persion-outbox" style="height:150px;width:300px;">
          <div class="persion-btn-body">您确定要退出登陆？</div>
          <div class="persion-btn-base" @click="sure">确定</div>
          <div class="persion-btn-gray" @click="nosure">取消</div>
        </div>
      </div>
    </div>
    <v-coupon ref="coupon" @scroll="toggleScroll"></v-coupon>
    <v-address ref="address" @scroll="toggleScroll"></v-address>
    <v-login ref="login" @scroll="toggleScroll"></v-login>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../../components/split/split.vue';
  import coupon from './coupon/coupon.vue';
  import address from './address/address.vue';
  import login from './loginScreen.vue';
  export default{
    data() {
      return {
        isHide: true,
        couponsShow: false,
        entry: true,
        loginOutShow: false,
        person: {
          icon: '../../../static/images/bj_person@3x.png'
        },
        weixin: {
            name: '我的女王大人',
          detail: '微信的个人信息'
        }
      };
    },
    components: {
      split,
      'v-coupon': coupon,
      'v-address': address,
      'v-login': login
    },
    methods: {
      couponShow(event) {
          this.$refs.coupon.show('');
          this.toggleScroll();
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      address(event) {
        this.$refs.address.show();
        this.toggleScroll();
      },
      login() {
        this.entry = !this.entry;
      },
      login_out() {
        this.loginOutShow = true;
      },
      sure() {
        this.entry = !this.entry;
        this.loginOutShow = false;
      },
      nosure() {
        this.loginOutShow = false;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .persion
    .persion-main
      position: fixed
      display: block
      left: 0
      top: 0
      bottom: 40px
      width: 100%
      background: #f1f1f1
      .persion-content
        position: relative
        top: 0
        left: 0
        width:100%
        height : 100%
        .persion-userinfo
          position: relative
          width: 100%
          height: 106px
          padding-top 40px
          .persion-user
             width: 50px
             height: 50px
             margin: 0 auto;
             text-align: center
          .persion-photo
            width: 50px
            height: 50px
            border-radius:50%
            border: 1px solid #fff
            .persion-src
              width 100%
              height 100%
              background-size 50px 50px
              bg-image('no_login_icon')
          .persion-text
            margin:12px auto;
            font-size: 16px
            color: #fff
        .background
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: -1
        .persion-login
          position: absolute
          top 0
          width: 100%
          height: 150px
          font-size 0
          vertical-align top
          .persion-user-src
            position: absolute
            display inline-block
            margin: auto auto 35px 15px
            width: 50px
            height: 50px
            border-radius:50%
            bottom 0
            border: 1px solid #fff
          .persion-user-detail
            position: absolute
            padding-left 80px
            display inline-block
            bottom 0
            .user-weixin-name
              font-size 16px
              display: block
              margin-bottom 10px
              color #fff
              font-family "PingFang-SC-Medium"
            .user-weixin-detail
              margin-bottom 40px
              display: block
              font-size 14.5px
              color #fff
              font-family "PingFang-SC-Medium"
        .persion-main-wrapper
          position: relative
          height: 45px
          line-height: 28px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          background: #fff
          font-size 0
          .persion-main-icon
            display inline-block
            vertical-align top
            background-repeat no-repeat
            &.couponicon
              margin 15px 0 15px 15px
              width 20px
              height 17px
              background-size  20px 17px
              bg-image('coupon_icon')
            &.addressicon
              width 15px
              height 20px
              margin 12px 3px 12px 18px
              background-size  15px 20px
              bg-image('address_icon')
          .persion-main-text
            display inline-block
            font-family "PingFang SC"
            vertical-align: top
            margin 9px auto 9px 15px
            font-size: 16px
          .icon-keyboard_arrow_right
            position: absolute
            font-size: 24px
            right: 12px
            top: 9px
            color #9c9c9c
        .persion-bottom
          position: relative
          top 150px
          height 45px
          width 100%
          text-align center
          .persion-bottom-btn
            margin: 0 auto
            width 345px
            height 100%
            background #fff
            border-radius 5px
            display: table
            .persion-bottom-btn-text
              display: table-cell
              vertical-align: middle
              color #fdcf00
              font-size 15px
              font-family "PingFang-SC-Medium"
      .persion-tanchu
        position: fixed
        z-index: 100
        top: 0px
        left: 0px
        width: 100%
        height 100%
        border-radius 5px
        overflow: auto
        display flex
        justify-content center
        align-items center
        background rgba(0,0,0,0.3)
        .persion-outbox
          background #fff
          height: 100%
          width: 100%
          border-radius 5px
          position: fixed
          .persion-btn-body
            display: table
            width 100%
            height 104.5px
            line-height: 104.5px
            text-align center
            border-bottom: solid 1px #f3f3f3
            .btn-body-text
              display: table-cell
              vertical-align: middle
              color #000000
          .persion-btn-base
            /*margin-top: 60px*/
            width: 149px
            float: right
            line-height: 45px
            text-align center
            color #fdcf00
            font-size 15px
          .persion-btn-gray
            /*margin-top: 60px*/
            width: 149px
            float: left
            line-height: 45px
            text-align center
            border-right solid 1px #f3f3f3
</style>
