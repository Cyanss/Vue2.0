<template>
  <div class="cancel" v-if="showFlag">
    <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
    <div class="cancel-content">
      <div class="cancel-overall">
        <textarea class="cancel-reason" id="reason" maxlength="200" placeholder="请填写取消订单理由"></textarea>
        <div class="cancel-argument" @click="usereason">
          <span class="cancel-text">退款理由</span>
          <span class="cancel-cause" id="cause">{{reason}}</span>
          <span class="cancel-arrow"></span>
        </div>
        <div v-show="detailShow" class="cancel-box">
          <div class="outbox">
            <div class="no-want" @click="noClick">{{noWant}}</div>
            <div class="click-wrong" @click="wrongClick">{{clickWrong}}</div>
            <div class="no-goods" @click="goodsClick">{{noGoods}}</div>
          </div>
        </div>
        <div class="cancel-btn">
          <button class="cancel-submit" @click="submit">提交</button>
        </div>
      </div>
    </div>
    <v-cancelling ref="cancelling" @scroll="toggleScroll" :orderOne="orderOne" :cancell="desccText"></v-cancelling>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../../../components/header/head.vue';
  import Cancelling from './cancelling.vue';

  export default{
    data() {
      return {
        showFlag: false,
        title: '取消订单',
        tapShow: false,
        backShow: true,
        detailShow: false,
        reason: '',
        noWant: '不想要了',
        clickWrong: '买错，点错',
        noGoods: '商家没货',
        orderOne: {
          type: Object
        },
        desccText: 'cancell',
        reasonmoney: ''
      };
    },
    methods: {
      show(orderOne) {
        this.orderOne = orderOne;
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
      submit() {
        let reason = document.getElementById('reason').value;
        let cause = document.getElementById('cause').innerText;
        if (reason.length === 0 && cause.length === 0) {
            alert('请填写完成后再进行提交');
        } else if (reason.length === 0) {
          alert('请选择取消理由');
        } else if (cause.length === 0) {
            alert('请填写退款理由');
        } else {
          console.log('取消理由：' + reason + '退款理由:' + cause);
          this.$refs.cancelling.show(this.orderOne);
          this.toggleScroll();
        }
      },
      usereason() {
        this.detailShow = true;
      },
      noClick() {
        this.reason = this.noWant;
        this.detailShow = false;
      },
      wrongClick() {
        this.reason = this.clickWrong;
        this.detailShow = false;
      },
      goodsClick() {
        this.reason = this.noGoods;
        this.detailShow = false;
      }
    },
    components: {
      'v-top': Top,
      'v-cancelling': Cancelling
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .cancel
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #f1f1f1
    .cancel-box
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background:rgba(0,0,0,0.3)
      .outbox
        position: fixed
        width: 100%
        height: 138px
        background: #fff
        bottom: 0
        .no-want
          height: 45px
          border-bottom solid 1px #f3f3f3
          line-height: 45px
          text-align: center
          font-family "PingFang-SC-Medium"
          font-size: 16px
        .click-wrong
          height: 45px
          border-bottom solid 1px #f3f3f3
          line-height: 45px
          text-align: center
          font-family "PingFang-SC-Medium"
          font-size: 16px
        .no-goods
          height: 45px
          border-bottom solid 1px #f3f3f3
          line-height: 45px
          text-align: center
          font-family "PingFang-SC-Medium"
          font-size: 16px
    .cancel-content
      display inline-block
      width 100%
      .cancel-overall
        padding 0
        margin 0
        font-family "PingFang SC"
        .cancel-reason
          margin-bottom 25px
          padding 20px 0 0 15px
          height 205px
          width 100%
          border 0
          background white
        .cancel-argument
          display table-cell
          vertical-align middle
          height 45px
          width 1920px
          background white
          font-size 14px
          .cancel-text
            margin-left 15px
            color #37373b
          .cancel-cause
            margin-left 15px
            color #9c9c9c
          .cancel-arrow
            position absolute
            right 15px
            width 9px
            height 177px
            background-size 9px 17px
            background-repeat no-repeat
            bg-image('../../arrow_gray')
        .cancel-btn
          margin 100px 15px 0 15px
        .cancel-submit
          height 45px
          width 100%
          border 0px
          background #fdcf00
          border-radius 2%
          font-size 16px
          font-weight bold
          color #37373b
</style>
