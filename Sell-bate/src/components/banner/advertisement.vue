<template>
  <div class="banner-ad" id="ad">
    <transition-group tag="ul" class='list-ul' name="adGroup" id="list">
      <li class="list-item" v-for="(item,index) in image" :key="index" v-if="index===currentIndex" @mouseenter="stop" @mouseleave="start">
          <img :src="item.url" :alt="item.info" @load="initImage" >
      </li>
    </transition-group>
    <div id="buttons">
      <div class="span-wrapper">
        <span v-for="(item,index) in image" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      image: {
        type: Array
      }
    },
    data() {
      return {
        currentIndex: 0,
        timer: '',
        ad: {
          type: Object
        },
        list: {
          type: Object
        },
        buttons: {
          type: Object
        },
        prev: {
          type: Object
        },
        next: {
          type: Object
        },
        bannerWidth: {
          type: Number,
          default: 0
        },
        bannerHeight: {
          type: Number,
          default: 0
        }
      };
    },
    created() {
      // 在DOM加载完成后，下个tick中开始轮播
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay();
        }, 4000);
      });
    },
    methods: {
      stop() {
        clearInterval(this.timer);
        this.timer = null;
      },
      change(index) {
        this.currentIndex = index;
      },
      start() {
        this.timer = setInterval(() => {
          this.autoPlay();
        }, 4000);
      },
      autoPlay() {
        this.currentIndex++;
        if (this.currentIndex > this.image.length - 1) {
          this.currentIndex = 0;
        }
      },
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        let width = screen.width;
        let height = width * proportion;
        target.width = width;
        target.height = height;
      },
      nextImage() {
        if (this.currentIndex === (this.image.length - 1)) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
      },
      prevImage() {
        if (this.currentIndex === 0) {
          this.currentIndex = (this.image.length - 1);
        } else {
          this.currentIndex--;
        }
      }
    }
  };
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .banner-ad
    position relative
    left 0
    top 0
    height 90px
    padding 15px 0 10px 0
    margin 0 10px
    max-height 90px
    overflow hidden
    @media only screen and (max-width: 320px)
      height 80px
      max-height 80px
    .list-ul
      height 90px
      overflow hidden
      @media only screen and (max-width: 320px)
        height 80px
      .list-item
        width 100%
        height 100%
    #buttons
      position absolute
      height 10px
      z-index 10
      width 100%
      bottom 5px
      text-align center
      .span-wrapper
        margin 0 auto
        vertical-align top
        display inline-block
        span
          cursor pointer
          float left
          width 10px
          height 2px
          background rgba(253,207,0,0.3)
          margin-right 4px
          &.active
            background rgb(253,207,0)
  /*.arrow
    cursor pointer
    display none
    line-height 60px
    text-align center
    font-size 40px
    font-weight bold
    width 40px
    height 60px
    position absolute
    z-index 2
    background-color rgba(0, 0, 0, .3)
    color #fff
    &:hover
      background-color rgba(0, 0, 0, .1)
  #prev
    left 15px
    bottom 90px
  #next
    right 15px
    bottom 90px
    */

</style>
