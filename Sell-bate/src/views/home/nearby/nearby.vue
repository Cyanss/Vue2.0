<template>
  <div class="nearby">
    <v-sortWidget  :selectTypeInfo="selectTypeInfo" :shopInfo="shopInfo" @refreshWrap="refreshScroll"></v-sortWidget>
  </div>
</template>
<script type="text/ecmascript-6">
  import SortWidget from '../../../components/widget/sortWidget.vue';
  export default {
    data() {
      return {
        selectTypeInfo: {
          rank: [
            {
              rankType: 0,
              rankName: '综合排序'
            },
            {
              rankType: 1,
              rankName: '好评优先'
            },
            {
              rankType: 2,
              rankName: '配送最快'
            }
          ],
          sales: '销量',
          distance: '距离',
          screenName: '筛选',
          screen: [
            {
              activityType: 0,
              activityName: '优惠活动',
              activityItem: [
                {
                  itemType: 0,
                  itemName: '优惠商家'
                },
                {
                  itemType: 1,
                  itemName: '新用户立减'
                },
                {
                  itemType: 2,
                  itemName: '优惠折扣'
                },
                {
                  itemType: 3,
                  itemName: '进店领卷'
                }
              ]
            },
            {
              activityType: 1,
              activityName: '优惠活动',
              activityItem: [
                {
                  itemType: 0,
                  itemName: '优惠商家'
                },
                {
                  itemType: 1,
                  itemName: '新用户立减'
                },
                {
                  itemType: 2,
                  itemName: '优惠折扣'
                },
                {
                  itemType: 3,
                  itemName: '进店领卷'
                }
              ]
            }
          ]
        },
        shopInfo: [
          {
            shopName: '鲜峰便利店(西兴店)',
            shopImage: '../../../../static/images/shop_img_1.png',
            star: 4.5,
            sellCount: 383,
            deliveryTime: 30,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.7,
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
            sellCount: 257,
            deliveryTime: 20,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.0,
            distance: 1.5,
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
            star: 3.0,
            sellCount: 193,
            deliveryTime: 40,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.6,
            distance: 3.5,
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
            star: 5,
            sellCount: 265,
            deliveryTime: 35,
            minPrice: 0,
            deliveryPrice: 0,
            ratingScore: 4.9,
            distance: 3.5,
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
      nearbyScrollEndUpdate() {
        console.log('nearby');
      },
      refreshScroll() {
        this.$emit('refresh');
      }
    },
    components: {
      'v-sortWidget': SortWidget
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" >
  @import "../../../common/stylus/mixin.styl";
  .nearby
    display block
    position relative
    padding-bottom 49px
</style>
