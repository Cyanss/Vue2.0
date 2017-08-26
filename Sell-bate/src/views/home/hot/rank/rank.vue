<template>
  <transition name="discounts">
    <div v-show="showFlag" class="discounts-wrap">
      <transition name="top">
        <div class="discounts-wrap-top"  v-show="topShow">
          <v-header :title="title" :bgId="0" :moreShow="true" :backShow="true" @back="hide"></v-header>
        </div>
      </transition>
      <div class="rank background-images" ref="rankScroll">
        <div class="rank-wrapper">
          <div class="rank-top">
            <div class="top-bg">
              <img :src="rankInfo.rankImage" @load="initImage">
            </div>
          </div>
          <div class="rank-content">
            <ul class="content-wrapper">
              <li v-for="(item, index) in shopInfo">
                <v-preferentialWidget :shopInfo="item" @refresh="refreshScroll"></v-preferentialWidget>
                <div class="splits"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Header from '../../../../components/header/head.vue';
  import BScroll from 'better-scroll';
  import PreferentialWidget from '../../../../components/widget/preferentialWidget.vue';
  export default{
    data() {
      return {
        showFlag: false,
        title: '热门榜单',
        topShow: false,
        backShow: true,
        activityShow: true,
        shopInfo: [
          {
            shopName: '鲜峰便利店(西兴店)',
            shopImage: '../../../../static/images/shop_img_1.png',
            star: 4.5,
            sellCount: 153,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.3,
            distance: 2.4,
            supports: [
              {
                type: 0,
                description: '新用户立即享受5折优惠'
              },
              {
                type: 1,
                description: '农夫山泉特价处理'
              }
            ],
            activityCount: 2,
            shopFoods: [
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图1'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图2'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图3'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_4.png',
                  alt: '图4'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图5'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图6'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图7'
                },
                foodPrice: 2.5
              }
            ]
          },
          {
            shopName: '鲜峰便利店(西兴店)',
            shopImage: '../../../../static/images/shop_img_3.png',
            star: 4.0,
            sellCount: 153,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.3,
            distance: 2.4,
            supports: [
              {
                type: 0,
                description: '新用户立即享受5折优惠'
              },
              {
                type: 1,
                description: '农夫山泉特价处理'
              },
              {
                type: 2,
                description: '满20减5,满40减15,满50减20'
              }
            ],
            activityCount: 3,
            shopFoods: [
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图1'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图2'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图3'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_4.png',
                  alt: '图4'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图5'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图6'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图7'
                },
                foodPrice: 2.5
              }
            ]
          },
          {
            shopName: '鲜峰便利店(西兴店)',
            shopImage: '../../../../static/images/shop_img_3.png',
            star: 4.0,
            sellCount: 153,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.3,
            distance: 2.4,
            supports: [
              {
                type: 0,
                description: '新用户立即享受5折优惠'
              }
            ],
            activityCount: 1,
            shopFoods: [
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图1'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图2'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图3'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_4.png',
                  alt: '图4'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图5'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图6'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图7'
                },
                foodPrice: 2.5
              }
            ]
          },
          {
            shopName: '鲜峰便利店(西兴店)',
            shopImage: '../../../../static/images/shop_img_3.png',
            star: 4.0,
            sellCount: 153,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.3,
            distance: 2.4,
            supports: [
              {
                type: 0,
                description: '新用户立即享受5折优惠'
              },
              {
                type: 1,
                description: '农夫山泉特价处理'
              },
              {
                type: 2,
                description: '满20减5,满40减15,满50减20'
              }
            ],
            activityCount: 3,
            shopFoods: [
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图1'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图2'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图3'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_4.png',
                  alt: '图4'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_1.png',
                  alt: '图5'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_2.png',
                  alt: '图6'
                },
                foodPrice: 2.5
              },
              {
                foodName: '农夫山泉矿泉水',
                image: {
                  url: '../../../../static/images/food_img_3.png',
                  alt: '图7'
                },
                foodPrice: 2.5
              }
            ]
          }
        ],
        rankInfo: {
          rankImage: '../../../../static/images/rank_bg.png'
        }
      };
    },
    created() {
      this.classMap = ['decrease', 'new', 'special'];
      this.upMap = ['up-on', 'up-off'];
    },
    methods: {
      show() {
        this.topShow = true;
        this.showFlag = true;
        this.initScroll();
      },
      initScroll() {
        this.$nextTick(() => {
          if (!this.rankScroll) {
            let tempScrollY = 0;
            let tempoffset = 0;
            let outY = 0;
            this.rankScroll = new BScroll(this.$refs.rankScroll, {
              probeType: 2,
              click: true
            });
            this.rankScroll.on('scrollStart', () => {
              tempScrollY = this.rankScroll.y;
            });
            this.rankScroll.on('scroll', () => {
              tempoffset = this.rankScroll.y - tempScrollY;
              if (this.rankScroll.y > this.rankScroll.maxScrollY && this.rankScroll.y < -44) {
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
                tempScrollY = this.rankScroll.y;
              }
              if (this.rankScroll.y <= this.rankScroll.maxScrollY - 5) {
                outY = this.rankScroll.maxScrollY - this.rankScroll.y;
              } else if (this.rankScroll.y > 0) {
                outY = -this.rankScroll.y;
              }
              if (this.rankScroll.y >= -88) {
                if (!this.topShow) {
                  this.topShow = true;
                }
              }
            });
            this.rankScroll.on('scrollEnd', () => {
              if (outY > 44) {
                this.scrollEndUpDate();
                this.rankScroll.refresh();
                outY = 0;
              } else if (outY < -44) {
//                this.scrollEndRefreshDate();
                this.rankScroll.refresh();
                outY = 0;
              }
            });
          } else {
            this.rankScroll.refresh();
          }
        });
      },
      scrollEndUpDate() {
        console.log('rank', '上拉刷新');
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
      },
      showActivity() {
        this.activityShow = !this.activityShow;
      },
      upButton() {
        if (this.activityShow) {
          return 'up-on';
        } else {
          return 'up-off';
        }
      }
    },
    components: {
      'v-header': Header,
      'v-preferentialWidget': PreferentialWidget
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"
  .discounts-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 30
    background #666668
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.discounts-enter, &.discounts-leave-active
      transform translate3d(100%, 0, 0)
    .discounts-wrap-top
      display block
      position relative
      width 100%
      height 44px
      z-index 40
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
      &.top-enter, &.top-leave-active
        transform translate3d(0, -100%, 0)
    .rank
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index 35
      .rank-top
        height 382px
        top 0
        left 0
        position relative
        overflow hidden
        .top-bg
          display flex
          position absolute
          top 44px
          left 0
          z-index 25
      .rank-content
        background #39015a
        padding-bottom 10px
        z-index 10

</style>
