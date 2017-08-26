<template>
    <div v-show="showFlag" class="loginScreen">
      <div class="loginScreen-logo">
        <div class="logo"></div>
      </div>
      <div class="loginScreen-weixin">
        <div class="weixin"></div>
      </div>
      <div class="loginScreen-detail">
        <div class="detail">{{detail}}</div>
      </div>
      <div class="loginScreen-company">
        <div class="company">{{company}}</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
         login_bj: '',
        showFlag: false,
        detail: '第三方登陆',
        company: '杭州物宜网络科技有限公司'
      };
    },
    methods: {
      show() {
        this.showFlag = !this.showFlag;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .loginScreen
    position: absolute
    width 100%
    height 100%
    background #fdcf00
    .loginScreen-logo
      position: absolute
      top 11%
      width 60px
      height 208px
      left 42%
      display table
      text-align center
      .logo
        display: table-cell
        vertical-align: middle
        width 60px
        height 208px
        background-size 60px 208px
        background-repeat no-repeat
        bg-image('logo')
    .loginScreen-weixin
      position: absolute
      bottom 18%
      width 66px
      height 51px
      left 41%
      display table
      text-align center
      .weixin
        display: table-cell
        vertical-align: middle
        width 66px
        height 51px
        background-size 66px 51px
        background-repeat no-repeat
        bg-image('weixin')
    .loginScreen-detail
      position: absolute
      width 100%
      bottom 12.2%
      display table
      text-align center
      .detail
        display: table-cell
        vertical-align: middle
        font-weight bold
        font-family 'PingFang SC'
        font-size 14px
        color #8037373b
    .loginScreen-company
      position: absolute
      width 100%
      bottom 1.5%
      display table
      text-align center
      .company
        display: table-cell
        vertical-align: middle
        font-size 12px
        font-family 'PingFang-SC-Medium'
        color #8037373b
</style>

