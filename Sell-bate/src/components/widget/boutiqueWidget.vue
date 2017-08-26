<template>
  <div class="boutique-widget border-bottom-1px" ref="boutiqueScroll" >
    <ul v-if="boutiqueShop" class="scroll-list" ref="scrollList">
      <li class="list-item" v-for="(item, index) in boutiqueShop" @click="goShop">
        <span class="shop-img">
          <img :src="item.image.url" width="55" height="55" >
        </span>
        <div class="item-text">{{item.shopName}}</div>
        <span class="shop-sgin">精选商家</span>
      </li>
    </ul>
    <span class="out" id="out">
      <span class="out-text">显示更多</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default{
    props: {
      boutiqueShop: {
        type: Array
      }
    },
    data() {
      return {
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      _initScroll() {
        if (this.boutiqueShop) {
          let picWidth = 55;
          let margin = 35;
          let width = 0;
          let outButton = document.getElementById('out');
          this.$nextTick(() => {
            if (!this.boutiqueScroll) {
              let outX = 0;
              this.boutiqueScroll = new BScroll(this.$refs.boutiqueScroll, {
                scrollX: true,
                probeType: 3,
                eventPassthrough: 'vertical'
              });
              this.boutiqueScroll.on('scroll', () => {
                if (parseInt(this.boutiqueScroll.x) <= (this.boutiqueScroll.maxScrollX - 5)) {
                  outX = this.boutiqueScroll.maxScrollX - parseInt(this.boutiqueScroll.x);
                  outButton.style.display = 'block';
                  outButton.style.width = (5 + outX) + 'px';
                } else {
                  outButton.style.display = 'none';
                }
                if (this.boutiqueScroll.x > 0) {
                  outX = -this.boutiqueScroll.x;
                }
              });
              this.boutiqueScroll.on('scrollEnd', () => {
                if (outX > 20) {
                  this.scrollEndUpDate();
                }
              });
            } else {
              this.boutiqueScroll.refresh();
            }
          });
          width = (picWidth + margin) * this.boutiqueShop.length + 3.5;
          this.$refs.scrollList.style.width = width + 'px';
        }
      },
      scrollEndUpDate() {
        console.log('已加载更多数据！');
      },
      goShop() {
        this.$router.push({path: '/shops', query: {shopId: 1}});
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .boutique-widget
    width: 100%
    height 113px
    padding-top 10px
    overflow: hidden
    white-space: nowrap
    position relative
    .scroll-list
      font-size: 0
      .list-item
        display: inline-block
        width: 90px
        height: 103px
        text-align center
        .shop-img
          display block
          margin 0 auto
          width 55px
          height 55px
          border-radius 5px
        .item-text
          display block
          font-size 12px
          width 100%
          padding 10px 0 9px 0
          text-align center
        .shop-sgin
          display block
          margin 0 auto
          width 50px
          height 15px
          line-height 15px
          border 1px solid #fdcf00
          border-radius 3px
          font-size 9px
          color #fdcf00
    .out
      display none
      position absolute
      max-width 35px
      height 123px
      border-radius 50px / 100px
      border-top-right-radius 0
      border-bottom-right-radius 0
      top 0
      right 0
      background #f3f3f3
      .out-text
        padding-top 36px
        padding-left 15px
        vertical-align middle
        font-family "PingFang SC"
        font-size 9px
        color white
        writing-mode tb-rl
</style>
