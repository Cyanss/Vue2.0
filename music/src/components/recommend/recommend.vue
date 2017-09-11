<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <v-slider>
          <div v-for="(item, index) in recommends">
            <a :herf="item.linkUrl">
              <img :src="item.picUrl" @load="initImage"/>
            </a>
          </div>
        </v-slider>
      </div>
      <div class="recommend-list">
        <span class="list-title">热门歌单推荐</span>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from '../../base/slider/slider.vue';
  import { getRecommend } from '../../api/recommend';
  import { ERROR_OK } from '../../api/conflg';
  export default{
    data() {
      return {
        recommends: []
      };
    },
    created() {
      this.$nextTick(() => {
        this._getRecommend();
      });
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERROR_OK) {
            this.recommends = res.data.slider;
          }
        });
      },
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        target.width = screen.width;
        target.height = proportion * screen.width;
      }
    },
    components: {
      'v-slider': Slider
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position fixed
    width 100%
    top 88px
    bottom: 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .recommend-list
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
        .list-title
          display block
          box-sizing border-box
          align-items center
          padding: 0 20px 20px 20px
</style>
