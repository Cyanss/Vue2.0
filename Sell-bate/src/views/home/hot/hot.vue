<template>
  <div class="hot">
    <div class="hot-content" >
      <div class="preferential-wrap" @click="sendToDiscount">
        <v-ad :image="adImage"></v-ad>
      </div>
      <div class="special-wrap">
        <ul class="special-wrap-tab">
          <li v-for="(item, index) in special" class="special-tab" :class="specialBgMap[index]" @click="sendToWrap(index)">
            <span class="special-item" :class="specialTextMap[index]">{{item.title}}</span>
            <span class="item-img">
              <img :src="item.image.url" @load="initImage">
            </span>
          </li>
        </ul>
      </div>
      <div class="splits"></div>
      <div class="boutique-wrap">
        <div class="boutique-top">
          <div class="top-left">精选商家</div>
          <div class="top-right" @click="sendToBoutique">更多<span class="icon-more bg-image" ></span>
          </div>
        </div>
        <div class="boutique-content">
          <v-boutiqueWidget :boutiqueShop="boutiqueShop"></v-boutiqueWidget>
          <div class="splits"></div>
        </div>
      </div>
      <div class="recommend-wrap">
        <div class="recommend-top">
          <div class="top-left">推荐商家</div>
        </div>
        <div class="recommend-content">
          <ul class="content-wrapper">
            <li v-for="(item, index) in shopInfo">
              <v-recommendWidget :shopInfo="item" @refresh="refreshScroll"></v-recommendWidget>
              <div class="splits"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BoutiqueWidget from '../../../components/widget/boutiqueWidget.vue';
  import RecommendWidget from '../../../components/widget/recommendWidget.vue';
  import Ad from '../../../components/banner/advertisement.vue';
  export default{
    created() {
      this.specialTextMap = ['tab-text1', 'tab-text2', 'tab-text3'];
      this.specialBgMap = ['tab-bg1', 'tab-bg2', 'tab-bg3'];
    },
    data() {
      return {
        adImage: [
          {
            url: '../../../static/images/1c.png',
            alt: '图1'
          },
          {
            url: '../../../static/images/2c.png',
            alt: '图2'
          },
          {
            url: '../../../static/images/1c.png',
            alt: '图3'
          },
          {
            url: '../../../static/images/3c.png',
            alt: '图4'
          },
          {
            url: '../../../static/images/4c.png',
            alt: '图5'
          },
          {
            url: '../../../static/images/5c.png',
            alt: '图6'
          }
        ],
        special: [
          {
            title: '最新优惠',
            type: 'discount',
            image:
              {
                url: '../../../../static/images/img_1.png',
                alt: '图1'
              }
          },
          {
            title: '热门榜单',
            type: 'rank',
            image:
              {
                url: '../../../../static/images/img_2.png',
                alt: '图2'
              }
          },
          {
            title: '团购',
            type: 'group',
            image:
              {
                url: '../../../../static/images/img_3.png',
                alt: '图3'
              }
          }
        ],
        boutiqueShop: [
          {
            shopName: 'ALBsun',
            image: {
              url: '../../../../static/images/shop_img_1.png',
              alt: '图1'
            }
          },
          {
            shopName: '生活超市',
            image: {
              url: '../../../../static/images/shop_img_2.png',
              alt: '图2'
            }
          },
          {
            shopName: '爱鲜蜂便利店',
            image: {
              url: '../../../../static/images/shop_img_3.png',
              alt: '图3'
            }
          },
          {
            shopName: 'ALBsun',
            image: {
              url: '../../../../static/images/shop_img_1.png',
              alt: '图4'
            }
          },
          {
            shopName: '生活超市',
            image: {
              url: '../../../../static/images/shop_img_2.png',
              alt: '图5'
            }
          },
          {
            shopName: '爱鲜蜂便利店',
            image: {
              url: '../../../../static/images/shop_img_3.png',
              alt: '图6'
            }
          }
        ],
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
      refreshScroll() {
        this.$emit('refresh');
      },
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        let width = (screen.width - 45) / 3;
        let height = width * proportion;
        target.width = width;
        target.height = height;
      },
      hotScrollEndUpdate() {
        console.log('hot');
      },
      sendToDiscount() {
        this.$emit('discount');
      },
      sendToWrap(index) {
        this.$emit(this.setWrap(index));
      },
      setWrap(index) {
        switch (index) {
          case 0:
            return 'preferential';
          case 1:
            return 'rank';
          case 2:
            return 'group';
        }
      },
      sendToBoutique() {
        this.$emit('boutique');
      }
    },
    components: {
      'v-boutiqueWidget': BoutiqueWidget,
      'v-recommendWidget': RecommendWidget,
      'v-ad': Ad
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .hot
    display block
    padding-bottom 49px
    .hot-content
      background white
      .preferential-wrap
        display block
      .special-wrap
        width 100%
        height 145px
        @media only screen and (max-width: 320px)
          height 120px
        .special-wrap-tab
          display flex
          margin 5px 10px 10px 10px
          .special-tab
            flex 1
            width 110px
            height 130px
            font-family "PingFang SC"
            margin-right 12.5px
            @media only screen and (max-width: 320px)
              width 90px
              height 110px
            &:last-child
              margin-right 0
            .special-item
              text-align center
              display block
              margin-top 15px
              margin-left 25px
              margin-right 25px
              @media only screen and (max-width: 320px)
                margin-top 10px
                margin-left 15px
                margin-right 15px
            .tab-text1
              font-size 15px
              color #455b5b
            .tab-text2
              font-size 15px
              color #a84919
            .tab-text3
              font-size 13px
              color #6a790b
            .item-img
              display block
          .tab-bg1
            background #edf7f7
          .tab-bg2
            background #FDE7EB
          .tab-bg3
            background #f8faeb
      .splits
        width 100%
        height 10px
        background #f3f3f3
      .boutique-wrap
        .boutique-top
          width 100%
          height 45px
          line-height 45px
          text-align center
          position relative
          border-bottom-1px(#f3f3f3)
          .top-left
            position absolute
            font-size 15px
            font-family "PingFang SC"
            color #fdcf00
            left 15px
            font-weight 700
          .top-right
            position absolute
            display block
            font-size 13px
            font-family "PingFang SC"
            color #9c9c9c
            right 10px
            .icon-more
              display inline-block
              width 6px
              height 11px
              margin-left 5px
              background-size 6px 11px
              background-repeat no-repeat
              bg-image('more')
      .recommend-wrap
        .recommend-top
          width 100%
          height 45px
          line-height 45px
          text-align center
          position relative
          border-bottom-1px(#f3f3f3)
          .top-left
            position absolute
            font-size 15px
            font-family "PingFang SC"
            color #37373b
            left 15px
            font-weight 700
        .recommend-content
          display block
          position flex
          .content-wrapper
            flex 1
</style>
