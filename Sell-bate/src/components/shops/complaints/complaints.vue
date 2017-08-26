<template>
  <transition name="complaints">
    <div class="complaints" ref="complaintsScroll" v-if="showFlag">
      <div class="complaints-wrapper">
        <v-header :title="title" :moreShow="true" :backShow="true" @back="hide" :bgId="0" :colorId="1"></v-header>
        <div class="complaints-content">
          <div class="content-main">
            <div class="complaints-shop-info">
                  <span class="complaints-info-image">
                    <img width="50" height="50" :src="shopinfo.shopImage">
                  </span>
              <span class="complaints-info-title">{{shopinfo.shopName}}</span>
            </div>
            <div class="complaints-shop-telephone">
              <span class="teltext">联系方式</span>
              <span class="telnumber">{{shopinfo.telpleoneNum}}</span>
            </div>
            <div class="complaints-argument">
              <span class="complaints-text">违规类型</span>
              <span class="complaints-cause" @click="showIllegal">
          <span class="cause-text">{{violation}}</span>
          <span class="complaints-icon" :class="upButtonIcon()"></span>
        </span>
            </div>
            <div class="complaints-input">
              <textarea class="complaints-text" placeholder="请补充给更多信息以便我们更快地帮您处理(必填)" maxlength="500"
                        ref="input"></textarea>
              <div class="add-image" @click="addImage">
                <span class="image-icon bg-image"></span>
                <span class="image-icon bg-image"></span>
                <span class="image-icon bg-image"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <span class="bottom-button" @click="submit">
            <span class="button-text">提交</span>
          </span>
        </div>
        <div class="illegal" v-show="illegalShow">
          <div class="illegal-content">
            <div class="illegal-ul">
              <li class="illegal-li" v-for="(item, index) in illegalInfo" :class="{'active':selectItem === index+1 }"
                  @click="illegalSelect(index,item)">
                <span class="item-text">{{item}}</span>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import header from '../../../components/header/head.vue';
  import BScroll from 'better-scroll';
  export default{
    props: {
      shopInfo: {
        type: Object
      },
      seller: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        illegalShow: false,
        selectItem: 0,
        title: '举报投诉',
        backShow: true,
        violation: '',
        illegalInfo: ['售卖违禁品', '资质问题', '商户刷单'],
        shopinfo: {
          shopName: '鲜峰便利店(西兴店)',
          title: '公告：欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断欢迎观领指点大会，优惠不断',
          shopImage: '../../../static/images/shop_img_3.png',
          telpleoneNum: '13484010833'
        }
      };
    },
    created() {
      this.violation = this.illegalInfo[0];
    },
    methods: {
      submit() {
        let text = this.$refs.input.value;
        console.log('信息已提交', text);
        this.$emit('illegal', 'success');
        this.hide();
      },
      illegalSelect(index, item) {
        this.selectItem = index + 1;
        this.violation = item;
        this.illegalShow = false;
      },
      addImage() {
        console.log('加载图片');
      },
      showIllegal() {
        this.illegalShow = true;
      },
      show() {
        this.showFlag = true;
        this.initScroll();
      },
      initScroll() {
        this.$nextTick(() => {
          if (!this.complaintsScroll) {
            this.complaintsScroll = new BScroll(this.$refs.complaintsScroll, {
              click: true,
              probeType: 3
            });
          } else {
            this.complaintsScroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      upButtonIcon() {
        if (this.illegalShow) {
          return 'up-on';
        } else {
          return 'up-off';
        }
      }
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .complaints
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    margin-bottom 1px
    z-index 30
    background white
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.complaints-enter, &.complaints-leave-active
      transform translate3d(100%, 0, 0)
    .complaints-content
      display block
      font-family 'PingFang SC'
      font-size 14px
      padding 0 15px
      .content-main
        display block
        width 100%
        .complaints-shop-info
          width 100%
          height 51px
          line-height 50px
          padding 15px 0
          display flex
          border-bottom-1px(#f3f3f3)
          .complaints-info-image
            display inline-block
            width 50px
            height 50px
            flex 0 0 50px
          .complaints-info-title
            display inline-block
            font-size 16px
            padding-left 20px
            flex 1
        .complaints-shop-telephone
          width 100%
          height 45px
          line-height 45px
          color #37373b
          border-bottom-1px(#f3f3f3)
          .telephone-text
            margin-right 15px
        .complaints-argument
          height 45px
          line-height 45px
          color #37373b
          display flex
          position relative
          border-bottom-1px(#f3f3f3)
          .complaints-text
            display inline-block
            margin-right 15px
          .complaints-cause
            flex 1
            display inline-block
            .cause-text
              color #9c9c9c
              display inline-block
            .complaints-icon
              display block
              position absolute
              top 19px
              right 15px
              width 11px
              height 6px
              background-size 11px 6px
              background-repeat no-repeat
              &.up-off
                bg-image('up_off')
              &.up-on
                bg-image('up_on')
        .complaints-input
          position relative
          color #9c9c9c
          .complaints-text
            outline none
            border 0
            width 100%
            line-height 45px
            height 225px
            font-size 12px
          .add-image
            position absolute
            display block
            left 0
            bottom 15px
            .image-icon
              display inline-block
              margin-right 10px
              width 54px
              height 48px
              background-position center
              background-size 54px 48px
              background-repeat no-repeat
              bg-image('add_image')
    .content-bottom
      display block
      padding 85px 15px 0 15px
      font-family "PingFang SC"
      background #f3f3f3
      height 150px
      text-align center
      .bottom-button
        display block
        width 100%
        background #fdcf00
        border-radius 5px
        height 45px
        line-height 45px
        .button-text
          font-weight bold
          color #37373b
          font-size 16px
    .illegal
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      background rgba(0, 0, 0, 0.2)
      z-index 40
      .illegal-content
        display block
        position absolute
        bottom 0
        width 100%
        height 135px
        text-align center
        background white
        .illegal-ul
          font-family "PingFang SC"
          .illegal-li
            height 45px
            line-height 45px
            font-size 16px
            color #000000
            border-bottom 1px solid #f3f3f3
            &.active
              color #fdcf00
</style>
