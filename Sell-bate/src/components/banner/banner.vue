<template>
  <div class="banner-container" id="container">
    <ul class="banner-list">
      <li v-for="(item,index) in image" :key="index" v-show="index===currentIndex" @mouseenter="stop"
          @mouseleave="start">
        <a :href="item.href">
          <img :src="item.url" :alt="item.info" @load="initImage" >
        </a>
      </li>
    </ul>
    <div id="buttons">
      <span v-for="(item,index) in image" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
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
        container: {
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
        },
        loading: {
          url: '../../../static/focus/image/loading.gif',
          alt: '请稍候...'
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

  .banner-container
    position relative
    left 0
    top 0
    height 190px
    max-height 190px
    overflow hidden
    @media only screen and (max-width: 320px)
      height 170px
      max-height 170px
    &:hover
      .arrow
        display block
    .banner-list
      position absolute
      top 0
      z-index 1
      height 190px
      max-height 190px
      @media only screen and (max-width: 320px)
        height 170px
        max-height 170px
      img
        float left
      #item
        flex 0
    #buttons
      position absolute
      height 10px
      z-index 10
      bottom 5px
      right 15px
      span
        cursor pointer
        float left
        width 5px
        height 5px
        border-radius 50%
        background rgba(253,207,0,0.3)
        margin-right 5px
        &.active
          width 13px
          border-radius 2px
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
