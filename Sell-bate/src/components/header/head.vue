<template>
  <div class="head-white" :class="bgMap[bgId]" :color="colorMap[colorId]">
    <span class="white-head-back" v-show="backShow" @click="back">
      <span class="white-back-icon bg-image"></span>
    </span>
    <span class="white-head-title">{{title}}</span>
    <span class="white-head-more" v-show="moreShow">
      <span class="white-more-icon bg-image"></span>
    </span>
    <span class="white-head-add" v-show="addShow" @click="add">
      <span class="white-add-icon bg-image" :class="bjMap[bjId]"></span>
    </span>
    <span class="white-head-add-text" v-show="addShowtext" @click="add">
      {{addtext}}
    </span>
    <span class="white-head-ok" v-show="okShow" @click="ok">完成</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      bgId: {
        type: Number,
        defalut: 0
      },
      colorId: {
        type: Number,
        defalut: 1
      },
      bjId: {
        type: String,
        defalut: 0
      },
      title: {
        type: String,
        defalut: '飞优特'
      },
      moreShow: {
        type: Boolean,
        defalut: true
      },
      backShow: {
        type: Boolean,
        defalut: false
      },
      addShow: {
        type: Boolean,
        defalut: false
      },
      addtext: {
        type: String,
        defalut: '完成'
      },
      okShow: {
        type: Boolean,
        defalut: false
      },
      addShowtext: {
        type: Boolean,
        defalut: false
      }
    },
    created() {
      this.classMap = ['back', 'more', 'add'];
      this.bjMap = ['effective', 'lapsed'];
      this.bgMap = ['b-black', 'b-white', 'b-inherit'];
      this.colorMap = ['c-black', 'c-white', 'b-inherit'];
    },
    methods: {
      ok() {
        this.$emit('ok');
      },
      back() {
        this.$emit('back');
      },
      add() {
        this.$emit('add');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .head-white
    position relative
    width 100%
    display flex
    height 44px
    line-height 44px
    text-align center
    &.b-black
      background  #37373b
    &.b-white
      background white
    &.b-inherit
      background inherit
    &.c-black
      color black
    &.c-white
      color white
    &.c-inherit
      color inherit
    .white-head-back
      position absolute
      display inline-block
      width 10px
      height 19px
      top 12px
      flex 1
      left 15px
      .white-back-icon
        display block
        width 10px
        height 19px
        background-size cover
        background-repeat: no-repeat
        bg-image('back')
    .white-head-more
      position absolute
      display inline-block
      width 20px
      height 4px
      top 20px
      flex 1
      vertical-align middle
      right 15px
      .white-more-icon
        display: block
        width 20px
        height 4px
        background-size cover
        background-repeat: no-repeat
        bg-image('more')
    .white-head-add
      position absolute
      display inline-block
      top 15px
      flex 1
      vertical-align middle
      right 15px
      .white-add-icon
        display: block
        width 21px
        height 18px
        background-size cover
        background-repeat: no-repeat
        &.effective
          bg-image('effective')
        &.lapsed
          bg-image('lapsed')
    .white-head-add-text
      position absolute
      display inline-block
      flex 1
      font-size 14px
      font-family "PingFang SC"
      color #ffffff
      vertical-align middle
      right 15px
    .white-head-title
      display inline-block
      vertical-align middle
      flex 1
      font-size 16px
      font-family 'PingFang SC'
      color white
      font-weight 700
    .white-head-ok
      font-family 'PingFang SC'
      position absolute
      font-size 14px
      display inline-block
      color white
      top 0
      flex 1
      vertical-align middle
      right 15px
</style>
