<template>
  <transition name="boutiques">
    <div v-if="showFlag" class="boutiques-wrap">
      <transition name="top">
        <div class="boutiques-wrap-top"  v-show="topShow" >
          <div class="wrap-top-bg" id="boutiquesTop"></div>
          <div class="wrap-top-header">
            <v-header :bgId="2" :colorId="2" :title="title" :moreShow="true" :backShow="true" @back="hide"></v-header>
          </div>
        </div>
      </transition>
      <div class="boutiques" ref="boutiquesScroll">
        <div class="boutiques-wrapper">
          <div class="boutiques-top">
            <div class="top-bg">
              <img :src="boutiquesInfo.boutiquesImage" @load="initImage">
            </div>
          </div>
          <div class="boutiques-content">
            <ul class="content-wrapper">
              <li v-for="(item, index) in shopInfo">
                <v-recommendScroll :shopInfo="item" @refresh="refreshScroll"></v-recommendScroll>
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
  import Head from '../../../../components/header/head.vue';
  import BScroll from 'better-scroll';
  import RecommendScroll from '../../../../components/widget/recommendWidget.vue';
  export default{
    data() {
      return {
        showFlag: false,
        topShow: false,
        title: '精选商家',
        boutiquesInfo: {
          boutiquesImage: '../../../../../static/images/boutiques_top_bg.png'
        },
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
        ]
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
          if (!this.boutiquesScroll) {
            let tempScrollY = 0;
            let tempoffset = 0;
            let outY = 0;
            let proportion = 0;
            let boutiquesTop = document.getElementById('boutiquesTop');
            this.boutiquesScroll = new BScroll(this.$refs.boutiquesScroll, {
              probeType: 3,
              click: true
            });
            this.boutiquesScroll.on('scrollStart', () => {
              tempScrollY = this.boutiquesScroll.y;
            });
            this.boutiquesScroll.on('scroll', () => {
              tempoffset = this.boutiquesScroll.y - tempScrollY;
              if (this.boutiquesScroll.y > this.boutiquesScroll.maxScrollY && this.boutiquesScroll.y < -44) {
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
                tempScrollY = this.boutiquesScroll.y;
              }
              if (this.boutiquesScroll.y <= this.boutiquesScroll.maxScrollY - 5) {
                outY = this.boutiquesScroll.maxScrollY - this.boutiquesScroll.y;
              } else if (this.boutiquesScroll.y > 0) {
                outY = -this.boutiquesScroll.y;
              }
              if (this.boutiquesScroll.y >= -288) {
                if (!this.topShow) {
                  this.topShow = true;
                }
                if (this.boutiquesScroll.y <= -88) {
                  proportion = Math.abs((this.boutiquesScroll.y + 88) / -200);
                } else if (this.boutiquesScroll.y >= -44) {
                  proportion = Math.abs(this.boutiquesScroll.y / 88);
                } else {
                  proportion = 0;
                }
                boutiquesTop.style.opacity = proportion;
              } else {
                boutiquesTop.style.opacity = 1;
              }
            });
            this.boutiquesScroll.on('scrollEnd', () => {
              if (outY > 44) {
                this.scrollEndUpDate();
                this.boutiquesScroll.refresh();
                outY = 0;
              } else if (outY < -44) {
//                this.scrollEndRefreshDate();
                this.boutiquesScroll.refresh();
                outY = 0;
              }
            });
          } else {
            this.boutiquesScroll.refresh();
          }
        });
      },
      scrollEndUpDate() {
        console.log('boutiques', '上拉刷新');
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
      'v-header': Head,
      'v-recommendScroll': RecommendScroll
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"
  .boutiques-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 30
    background #666668
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.boutiques-enter, &.boutiques-leave-active
      transform translate3d(100%, 0, 0)
    .boutiques-wrap-top
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
    .boutiques
      position fixed
      left 0
      top 0
      bottom 1px
      z-index 35
      width 100%
      .boutiques-top
        height 170px
        top 0
        left 0
        position relative
        overflow hidden
        .top-bg
          display flex
          position absolute
          bottom 0
          left 0
          z-index 25
      .boutiques-content
        background white
      .splits
        width 100%
        height 10px
        background #f3f3f3
</style>
