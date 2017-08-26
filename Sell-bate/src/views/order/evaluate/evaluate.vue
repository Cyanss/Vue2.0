<template>
  <div class="evaluates" v-if="showFlag">
    <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
    <form>
      <div class="contents">
        <div class="appraise">
          <div class="appraise-inn">
            <img class="appraise-img" :src="orderOne.orderImg"/>
            <div class="appraise-news">
              <span class="appraise-name">{{orderOne.orderName}}</span>
              <span class="appraise-thanks">感谢你对飞优特支持，欢迎前来评价</span>
            </div>
          </div>
          <div class="judge">
            <span class="judge-text">商品质量</span>
            <star id="qualityStar" class="judge-star" v-on:child-say="listenToQuality"></star>
          </div>
          <div class="judge-detail">
            <div class="judge-content">
              <span class="judge-txt">口味</span>
              <star id="tasteStar" class="judge-stars" v-on:child-say="listenToTaste"></star>
            </div>
            <div class="judge-content judge-content-top">
              <span class="judge-txt">包装</span>
              <star id="packingStar" class="judge-stars" v-on:child-say="listenPacking"></star>
            </div>
          </div>
          <textarea id="enter" class="enter" maxlength="200" placeholder="亲吃的口味如何，对包装服务满意还满意么？"></textarea>
        </div>
      </div>
      <div class="evaluates-submit" @click="submitClick">
        <span class="evaluates-submit-text">提交</span>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../../components/header/head.vue';
  import star from '../evaluate/star/star.vue';

//  import share from '../share/share.vue';
  export default{
    data() {
      return {
        showFlag: false,
        title: '评价',
        tapShow: false,
        backShow: true,
        up: false,
        down: false,
        valueOne: {
            type: Number
        },
        valueTwo: {
          type: Number
        },
        valueThree: {
          type: Number
        },
        orderOne: {
          type: Object
        },
        order: {
          type: Object
        }
      };
    },
    created() {
      this.orderOne = this.order;
    },
    methods: {
      listenToQuality(value) {
//        console.log('-----主1-------->' + value);
        this.valueOne = value;
      },
      listenToTaste(value) {
//        console.log('-----主2-------->' + value);
        this.valueTwo = value;
      },
      listenPacking(value) {
//        console.log('-----主3-------->' + value);
        this.valueThree = value;
      },
      show(orderOne) {
        this.orderOne = this.order;
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
//      share(event) {
//        this.$refs.share.show();
//        this.toggleScroll();
//      },
//      toggleUp() {
//        if (this.down === true) {
//          this.down = !this.down;
//        }
//        this.up = !this.up;
//      },
//      toggleDown() {
//        if (this.up === true) {
//          this.up = !this.up;
//        }
//        this.down = !this.down;
//      },
      submitClick() {
        let enter = document.getElementById('enter').value;
        if (enter.length === 0) {
            alert('请填写评价内容');
        } else {
          window.location.reload();
          console.log('评价：商品质量：' + this.valueOne + '口味：' + this.valueTwo + '包装：' + this.valueThree + '评价内容：' + enter);
        }
      }
    },
    components: {
      'v-top': Top,
      star
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .evaluates
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background #F1F1F1
    .contents
      display inline-block
      width 100%
      font-family "PingFang SC"
      .appraise
        margin 15px 15px 0 15px
        padding 20px 15px
        height 582px
        background white
        border-radius: 1%
        .appraise-inn
          display flex
          font-size 0
          .appraise-img
            height 35px
            width 35px
            border-radius: 15%
          .appraise-news
            margin-left 15px
            .appraise-name
              display block
              margin-bottom 8px
              line-height 16px
              font-size 16px
              font-weight bold
              color #37373b
            .appraise-thanks
              line-height 12px
              font-size 12px
              color #9c9c9c
        .judge
          display flex
          align-items center
          margin 20px 0
          height 14px
          font-size 14px
          color #37373b
          .judge-text
            margin-right 5px
          .judge-star
            margin-left 15px
        .judge-detail
          padding 18px 16px
          height 49px
          background #F1F1F1
          border-radius: 2%
          .judge-content
            display flex
            height 14px
            align-items center
            font-size 14px
            color #9c9c9c
            .judge-text
              margin-right 30px
            .judge-stars
              margin-left 28px
          .judge-content-top
            margin-top 22px
        .enter
          height 120px
          width 90%
          margin-top 10px
          padding 15px
          border 0
          border-radius: 1%
          background #F1F1F1
          text-align top
          font-size 14px
        .evaluate-order
          margin-bottom 10px
          .evaluates-list
            padding 10px 0
            line-height 12px
            display flex
            flex-direction: row;
            justify-content space-between
            flex-wrap: nowrap;
            .evaluates-name
              width 11rem
              vertical-align: middle;
              font-size 10px
            .evaluates-sense
              width 5.5rem
              display flex
              justify-content space-between
              vertical-align: middle;
              .sense-up
                width 2rem
                padding 2px 1px
                text-align center
                border-radius: 10%
                border 1px solid #7e8c8d
                font-size 6px
                color lightslategray
                &.active
                  background  rgb(240, 20, 20)
              .sense-down
                width 2rem
                padding 2px 1px
                text-align center
                vertical-align: middle;
                border-radius: 10%
                border 1px solid #7e8c8d
                font-size 6px
                color lightslategray
                &.active
                  background black
    .evaluates-submit
      position absolute
      bottom 0
      width 100%
      line-height 49px
      overflow hidden
      vertical-align middle
      background #fdcf00
      text-align center
      font-size 16px
      color #37373b
      .evaluates-submit-text
        font-weight bold
</style>
