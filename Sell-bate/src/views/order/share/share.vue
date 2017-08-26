<template>
  <div class="share" v-if="showFlag">
    <v-top :title="title" :tapShow="tapShow" :backShow="backShow" @back="hide" :bgId="0"></v-top>
    <div class="contents">
      <div class="sharing">
        <img class="share-img" src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"/>
        <span class="share-name">一点点便利店</span>
        <star class="share-star" :size="36" :score="5"></star>
        <span class="share-name">即便挑剔如我，依然对它五星好评</span>
      </div>
    </div>
    <div class="share-submit">
      <span class="friend">微信好友</span>
      <span class="circle">朋友圈</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../../components/header/head.vue';
  import star from '../../../components/star/star';

  export default{
    data() {
      return {
        showFlag: false,
        title: '分享评分',
        tapShow: false,
        backShow: true
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      }
    },
    components: {
      'v-top': Top,
      star
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .share
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
      .sharing
        margin 20px
        padding 20px
        vertical-align:middle
        text-align center
        background white
        border-radius: 3%
        .share-img
          height 72px
          width 72px
          border-radius: 50%
        .share-name
          display block
          margin 20px 0
          font-size 15px
    .share-submit
      position: absolute
      display flex
      width 100%
      bottom 0
      line-height:50px;
      overflow:hidden;
      vertical-align: middle;
      background white
      text-align center
      color #000000
      font-size 18px
      .friend
        flex 1
      .circle
        flex 1
</style>
