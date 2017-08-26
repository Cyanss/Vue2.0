<template>
  <div class="swiper-containers" id="containers">
    <transition-group tag="ul" class='slide-ul' name="swiper" id="list">
      <li v-for="(item,index) in image" :key="index" v-show="index===currentIndex" @mouseenter="stop"
          @mouseleave="start">
        <a :href="item.href">
          <img :src="item.url" :alt="item.info" @load="initImage" >
        </a>
      </li>
    </transition-group>
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
        containers: {
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
        swiperWidth: {
          type: Number,
          default: 0
        },
        swiperHeight: {
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
      _initContainer() {
        let width = this.swiperWidth;
        let height = this.swiperHeight;
        this.containers = document.getElementById('containers');
        this.list = document.getElementById('list');
        this.buttons = document.getElementById('buttons').getElementsByTagName('span');
        this.prev = document.getElementById('prev');
        this.containers.style.width = width + 'px';
        this.containers.style.height = height + 'px';
        this.containers.style.overflow = 'hidden';
        this.list.style.height = this.swiperHeight + 'px';
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

  .swiper-containers
    position relative
    left 0
    top 0
    overflow hidden
    &:hover
      .arrow
        display block
    .swiper-list
      position absolute
      top 0
      z-index 1
      img
        float left
      #item
        flex 0
    #buttons
      position absolute
      height 10px
      width 160px
      z-index 2
      bottom 20px
      left 100px
      span
        cursor pointer
        float left
        border 1px solid #fff
        width 20px
        height 20px
        border-radius 50%
        background #333
        margin-right 10px
        font-size 10px
        &.active
          background orangered

</style>
