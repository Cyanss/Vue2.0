<template>
  <transition name="group">
    <div v-if="showFlag" class="group-wrap">
      <transition name="top">
        <div class="group-wrap-top"  v-show="topShow" >
          <div class="wrap-top-bg" id="groupTop"></div>
          <div class="wrap-top-header">
            <v-header :title="title" :moreShow="true" :bgId="3" :backShow="true" @back="hide"></v-header>
          </div>
        </div>
      </transition>
      <div v-if="showFlag" class="group" ref="groupScroll">
        <div class="group-wrapper">
          <div class="group-top">
            <div class="top-bg">
              <img :src="groupInfo.groupImage" @load="initImage">
            </div>
          </div>
          <div class="group-content">
            <ul class="content-wrapper">
              <li v-for="(item, index) in groupInfo.shopPackage">
                <v-groupWidget :shopPackage="item" @refresh="refreshScroll"></v-groupWidget>
                <div class="splits"></div>
              </li>
            </ul>
            <div class="group-bottom">
              <span class="group-bottom-text">{{groupInfo.discount[0].detail}}</span>
              <span class="group-bottom-text">{{groupInfo.discount[1].detail}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Header from '../../../../components/header/head.vue';
  import GroupWidget from '../../../../components/widget/groupWidget.vue';
  export default{
    data() {
      return {
        showFlag: false,
        title: '团购',
        topShow: false,
        backShow: true,
        groupInfo: {
          groupImage: '../../../../static/images/group_bg.png',
          shopPackage: [
            {
              url: '../../../static/images/shop_img_1.png',
              name: '夏日森林套餐',
              price: 60,
              score: 4.2,
              sellCount: 153,
              icon_url: '../../../static/images/group_item_1.png',
              supports: [
                {
                  type: 0,
                  description: '新用户立即享受5折优惠'
                },
                {
                  type: 1,
                  description: '农夫山泉特价处理'
                }
              ]
            },
            {
              url: '../../../static/images/shop_img_3.png',
              name: '夏日森林套餐',
              price: 60,
              score: 4.2,
              sellCount: 153,
              icon_url: '../../../static/images/group_item_2.png',
              supports: [
                {
                  type: 0,
                  description: '新用户立即享受5折优惠'
                },
                {
                  type: 1,
                  description: '农夫山泉特价处理'
                }
              ]
            },
            {
              url: '../../../static/images/shop_img_1.png',
              name: '夏日森林套餐',
              price: 60,
              score: 4.2,
              sellCount: 153,
              icon_url: '../../../static/images/group_item_1.png',
              supports: [
                {
                  type: 0,
                  description: '新用户立即享受5折优惠'
                },
                {
                  type: 1,
                  description: '农夫山泉特价处理'
                }
              ]
            },
            {
              url: '../../../static/images/shop_img_3.png',
              name: '夏日森林套餐',
              price: 60,
              score: 4.2,
              sellCount: 153,
              icon_url: '../../../static/images/group_item_2.png',
              supports: [
                {
                  type: 0,
                  description: '新用户立即享受5折优惠'
                },
                {
                  type: 1,
                  description: '农夫山泉特价处理'
                }
              ]
            }
          ],
          discount: [
            {
              detail: '本活动限9月10--15日进行，限全场正价商品参加'
            },
            {
              detail: '特价团购商品，不参加满减优惠'
            }
          ]
        }
      };
    },
    methods: {
      show() {
        this.topShow = true;
        this.showFlag = true;
        this.initScroll();
      },
      initScroll() {
        this.$nextTick(() => {
          this.$nextTick(() => {
            if (!this.groupScroll) {
              let tempScrollY = 0;
              let tempoffset = 0;
              let outY = 0;
              let proportion = 0;
              let boutiquesTop = document.getElementById('groupTop');
              this.groupScroll = new BScroll(this.$refs.groupScroll, {
                probeType: 3,
                click: true
              });
              this.groupScroll.on('scrollStart', () => {
                tempScrollY = this.groupScroll.y;
              });
              this.groupScroll.on('scroll', () => {
                tempoffset = this.groupScroll.y - tempScrollY;
                if (this.groupScroll.y > this.groupScroll.maxScrollY && this.groupScroll.y < -44) {
                  if (Math.abs(tempoffset) > 10) {
                    if (tempoffset < 0) {
                      if (this.topShow) {
                        this.topShow = false;
                      }
                    } else {
                      if (!this.topShow) {
                        this.topShow = true;
                      }
                    }
                  }
                  tempScrollY = this.groupScroll.y;
                }
                if (this.groupScroll.y <= this.groupScroll.maxScrollY - 5) {
                  outY = this.groupScroll.maxScrollY - this.groupScroll.y;
                } else if (this.groupScroll.y > 0) {
                  outY = -this.groupScroll.y;
                }
                if (this.groupScroll.y >= -288) {
                  if (!this.topShow) {
                    this.topShow = true;
                  }
                  if (this.groupScroll.y <= -88) {
                    proportion = Math.abs((this.groupScroll.y + 88) / -200);
                  } else if (this.groupScroll.y >= -44) {
                    proportion = Math.abs(this.groupScroll.y / 88);
                  } else {
                    proportion = 0;
                  }
                  boutiquesTop.style.opacity = proportion;
                } else {
                  boutiquesTop.style.opacity = 1;
                }
              });
              this.groupScroll.on('scrollEnd', () => {
                if (outY > 44) {
                  this.scrollEndUpDate();
                  this.groupScroll.refresh();
                  outY = 0;
                } else if (outY < -44) {
//                this.scrollEndRefreshDate();
                  this.groupScroll.refresh();
                  outY = 0;
                }
              });
            } else {
              this.groupScroll.refresh();
            }
          });
        });
      },
      scrollEndUpDate() {
        console.log('group', '上拉刷新');
      },
      refreshScroll() {
        this.initScroll();
      },
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        let width = screen.width;
        let height = width * proportion;
        target.width = width;
        target.height = height;
      },
      hide() {
        this.topShow = false;
        this.showFlag = false;
        this.$emit('scroll');
      }
    },
    components: {
      'v-header': Header,
      'v-groupWidget': GroupWidget
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"
  .group-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 30
    background #666668
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.group-enter, &.group-leave-active
      transform translate3d(100%, 0, 0)
    .group-wrap-top
      display block
      position relative
      width 100%
      height 44px
      z-index 40
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
      &.top-enter, &.top-leave-active
        transform translate3d(0, -100%, 0)
      .wrap-top-bg
        width 100%
        height 44px
        background #2c2c2e
        opacity 0
      .wrap-top-header
        position absolute
        width 100%
        top 0
        left 0
    .group
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index 35
      .group-top
        height 480px
        top 0
        left 0
        position relative
        overflow hidden
        .top-bg
          display flex
          position absolute
          top 0
          left 0
          z-index 25
      .group-content
        background #012677
        padding-bottom 10px
        z-index 10
      .group-bottom
        display block
        padding 44px 10%
        font-family "Microsoft YaHei"
        letter-spacing 1px
        font-size 10px
        line-height 20px
        color white
        text-align center
        .group-bottom-text
          display block
</style>

