<template>
  <transition name="search">
    <div class="search" v-if="showFlag">
      <div class="search-top">
        <div class="back-button bg-image" @click="hide"></div>
        <div class="search-top-bar">
          <span class="search-icon bg-image"></span>
          <input type="text" placeholder="输入商家，输入产品" autofocus="autofocus" @input="toggleHint" class="search-input" ref="input">
        </div>
        <div class="search-button" @click="search">搜索</div>
      </div>
      <transition name="hint">
        <div class="search-hint" v-show="hintShow">
          <div class="history-search">
            <div class="search-hint_top">
              <span class="history-title">{{historySearch.title}}</span>
              <span class="close-icon" @click="closeHint"></span>
            </div>
            <div class="history-content">
          <span class="history-tab" v-for="(item, index) in historySearch.content" :class="{'active':historySelectItem===index+1}" @click="historyInputHint(index,$event)">
            <span class="tab-text">{{item}}</span>
          </span>
            </div>
          </div>
          <div class="hot-search">
            <span class="hot-title">{{hotSearch.title}}</span>
            <div class="hot-content">
          <span class="hot-tab" v-for="(item, index) in hotSearch.content" :class="{'active':hotSelectItem===index+1}" @click="hotInputHint(index,$event)">
            <span class="tab-text">{{item}}</span>
          </span>
            </div>
          </div>
        </div>
      </transition>
      <div v-show="resultShow" class="search-content" ref="contentScroll">
        <div class="search-content-wrapper">
          <div class="search-result">
            <ul class="result-wrapper">
              <li v-if="searchInfo.length !== 0" v-show="shopInfo" v-for="(item, index) in shopInfo">
                <v-shopInfoWidget :shopInfo="item" @refresh="refreshScroll"></v-shopInfoWidget>
                <div class="search-splits"></div>
              </li>
            </ul>
            <div v-if="searchInfo.length === 0" class="result-hint">
              <span>搜索结果为空！</span>
            </div>
          </div>
          <div class="search-top-splits"></div>
          <div class="search-recommend">
            <v-sortWidget :selectTypeInfo="selectTypeInfo" :shopInfo="shopInfo" @refreshWrap="refreshScroll"></v-sortWidget>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import ShopInfoWidget from '../../../components/widget/shopInfoWidget.vue';
  import SortWidget from '../../../components/widget/sortWidget.vue';
  import BScroll from 'better-scroll';
  export default{
    data() {
      return {
        showFlag: false,
        hintShow: true,
        historySelectItem: 0,
        hotSelectItem: 0,
        resultShow: false,
        searchInfo: [],
        historySearch: {
          title: '历史搜索',
          content: ['一点点', '一点点', '一点点', '先锋超市', '华联超市']
        },
        hotSearch: {
          title: '热门搜索',
          content: ['一点点', '一点点', '一点点', '先锋超市', '华联超市']
        },
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
      initScroll() {
        this.$nextTick(() => {
          if (!this.contentScroll) {
            this.contentScroll = new BScroll(this.$refs.contentScroll, {
              click: true
            });
          } else {
            this.contentScroll.refresh();
          }
        });
      },
      refreshScroll() {
        this.initScroll();
      },
      historyInputHint(index, event) {
        this.$refs.input.value = event.target.textContent;
        if (this.hotSelectItem !== 0) {
          this.hotSelectItem = 0;
        }
        this.historySelectItem = index + 1;
      },
      hotInputHint(index, event) {
        this.$refs.input.value = event.target.textContent;
        if (this.historySelectItem !== 0) {
          this.historySelectItem = 0;
        }
        this.hotSelectItem = index + 1;
      },
      toggleHint(event) {
        let inputText = event.target.value;
        let inputTextLength = inputText.length;
        if (inputTextLength !== 0) {
          if (this.hintShow) {
            this.hintShow = false;
          }
        } else {
          this.hintShow = true;
          this.resultShow = false;
        }
      },
      search() {
        let text = this.$refs.input.value;
        if (text !== '') {
          console.log('搜索' + text);
          if (!this.resultShow) {
            this.resultShow = true;
            this.initScroll();
          }
          if (this.hintShow) {
            this.hintShow = false;
          }
        } else {
          console.log('请输入搜索内容');
        }
      },
      closeHint() {
        this.hintShow = false;
      },
      show() {
        this.showFlag = true;
        this.hintShow = true;
        this.historySelectItem = 0;
        this.hotSelectItem = 0;
        this.resultShow = 0;
        this.searchInfo = [];
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      }
    },
    components: {
      'v-sortWidget': SortWidget,
      'v-shopInfoWidget': ShopInfoWidget
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .search
    position fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: white
    font-family "PingFang SC"
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.search-enter, &.search-leave-active
      transform translate3d(100%, 0, 0)
    .search-top
      margin 8px 15px
      display flex
      .search-top-bar
        display inline-block
        flex 1 1 28px
        position relative
        .search-icon
          position absolute
          display block
          width 11.5px
          height 11.5px
          top 8px
          left 10px
          background-size 11.5px 11.5px
          background-repeat no-repeat
          bg-image('search')
        .search-input
          font-family "PingFang SC"
          padding-left 32px
          width 228px
          height 28px
          outline none
          background #f3f3f3
          border-radius 5px
          font-size 12px
          @media only screen and (max-width: 320px)
            width 178px
      .back-button
        display inline-block
        padding 4px 10px 4px 0
        width 10px
        height 19px
        background-position left
        background-size 10px 19px
        background-repeat no-repeat
        bg-image('back')
        @media only screen and (max-width: 320px)
          padding-left 10px
      .search-button
        margin-left 18.5px
        color #37373b
        padding 0 8px
        border-radius 5px
        background-color #fdcf00
        height 26px
        flex 0 0 28px
        line-height 26px
        display inline-block
        font-size 14px
        @media only screen and (max-width: 320px)
          height 26px
          margin-left 15px
          line-height 26px
          padding 0 8px
    .search-hint
      margin 15px
      transition all 0.5s ease
      opacity 1
      transform translate3d(0, 0, 0)
      &.hint-enter, &.hint-leave-active
        opacity 0
        transform translate3d(-100%, 100%, 0)
      .history-search
        .search-hint_top
          width 100%
          position relative
          .history-title,.hot-title
            display inline-block
            font-size 14px
          .close-icon
            display inline-block
            position absolute
            width 17px
            height 17px
            padding 5px
            right 0
            bottom 0
            background-position center
            background-size 17px 17px
            background-repeat no-repeat
            bg-image('close')
        .history-content
          margin-top 15px
          .history-tab
            text-align center
            line-height 25px
            display inline-block
            color #424242
            width 85px
            height 25px
            margin-right 10px
            margin-bottom 10px
            background #f3f3f3
            border-radius 5px
            font-size 12px
            &.active
              background #fdcf00
      .hot-search
        margin-top 15px
        .hot-content
          margin-top 15px
          .hot-tab
            text-align center
            line-height 25px
            display inline-block
            color #424242
            width 85px
            height 25px
            margin-right 10px
            margin-bottom 10px
            background #f3f3f3
            border-radius 5px
            font-size 12px
            &.active
              background #fdcf00
    .search-content
      width 100%
      height 623px
      overflow hidden
      .search-top-splits
        width 100%
        background #f3f3f3
        height 10px
      .search-result
        .result-wrapper
          .search-splits
            width 100%
            background #f3f3f3
            height 5px
        .result-hint
          width 100%
          height 30px
          line-height 30px
          font-family "Microsoft YaHei"
          text-align center
          font-size 14px
      .search-recommend
        display block
</style>
