<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item , index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text border-bottom-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="goods-wrapper" ref="goodsWrapper">
        <div>
          <div class="discount-top">
            <div class="discount-top-bg">
              <img :src="goodsInfo.goodsTopImage" @load="initImage">
            </div>
            <div class="discount-wrapper">
              <span class="discount-price"><span class="sign">￥</span>36</span>
              <div class="discount-desc">
                <span class="discount-desc-title">商家折扣卷</span>
                <span class="discount-desc-value">满60减36</span>
              </div>
              <div class="discount-action">去领取</div>
            </div>
          </div>
          <ul>
            <li v-for="(item,index) in goods" class="food-list" ref="goodList" @click="selectMenu(index,$event)">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="(food,index) in item.foods" @click="selectFood(food,$event)"
                    class="good-item border-bottom-1px">
                  <div class="icon">
                    <img :src="food.icon" @load="initImages">
                  </div>
                  <div class="content">
                    <span class="name">{{food.name}}</span>
                    <span class="desc">{{food.description}}</span>
                    <span class="extra">月售{{food.sellCount}}份</span>
                    <div class="content-bottom">
                      <div class="price-wrapper">
                        <span class="price-sign">￥</span>
                        <span class="price-number" v-if="!food.meals.length > 0">{{food.price}}</span>
                        <span class="price-number" v-if="food.meals.length > 0">{{food.meals[0].mealPrice}}</span>
                        <span class="price-end">起</span>
                      </div>
                      <div class="cartcontrol-wrapper" v-if="!food.meals.length > 0">
                        <v-cartcontrol @add="addFood" :good="food"></v-cartcontrol>
                      </div>
                      <div class="norms-wrapper" v-if="food.meals.length > 0"
                           @click.stop.prevent="normsDialogShow(food)">
                        <span class="norms-button">可选规格</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <v-shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice" @upDate="normsDialogUpDate"></v-shopcart>
    </div>
    <v-normsDialog ref="normsDialog" :good="selectGood" @add="addFood"></v-normsDialog>
    <v-good :good="selectedFood" ref="good" @wrap="setRatings" @add="addFood" @goodShow="setGoodShow"></v-good>
    <v-ratingDetail @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                    :onlyContent="onlyContent" :ratings="ratings" ref="ratingsDetail"></v-ratingDetail>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import ShopCart from '../shopcart/shopcart.vue';
  import CartControl from '../cartcontrol/cartcontrol.vue';
  //  import { urlParse } from '../../../common/js/util.js';
  import Good from '../good/good.vue';
  import RatingDetail from '../ratingdetail/ratingdetail.vue';
  import NormsDialog from '../normsdialog/normsdialog.vue';
  const ERR_OK = 0;
  const ALL = 2;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectGood: {},
        selectedFood: {},
        ratings: [],
        goodShow: false,
        selectType: ALL,
        onlyContent: true,
        showFlag: false,
        title: '先锋便利店（西兴店）',
        backShow: true,
        goodsInfo: {
          goodsTopImage: '../../../static/images/goods_top_bg.png'
        },
        shopInfo: {
          shopName: '鲜峰便利店(西兴店)',
          title: '公告：欢迎观领指点大会，优惠不断...',
          shopImage: '../../../static/images/shop_img_3.png',
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
            },
            {
              type: 2,
              description: '满20减5,满40减15,满50减20'
            }
          ],
          activityCount: 4
        },
        routePath: '',
        foods: {
          type: Array
        }
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (typeof (food.norms) === 'undefined') {
              if (food.count) {
                foods.push(food);
              }
            } else {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    activated() {
      if (this.routePath !== this.$route.fullPath) {
        if (this.$route.query.goodId || this.$route.query.goodId === 0) {
          this.shopId = this.$route.query.goodId;
          this.goodId = this.$route.query.goodId;
          this._searchShop();
        }
      }
      if (typeof (this.$route.query.goodId) === 'undefined') {
        this.$refs.good.hide();
      } else if (this.$route.query.goodId || this.$route.query.goodId === 0) {
        if (this.$route.query.goodId !== this.goodId) {
          this.shopId = this.$route.query.goodId;
          this.goodId = this.$route.query.goodId;
          this._searchShop();
        }
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this._searchShop();
    },
    methods: {
      setGoodShow() {
        this.goodShow = false;
      },
      normsDialogUpDate() {
        if (this.goodShow) {
          this.$refs.good.goodUpDate();
        } else {
          this.$refs.normsDialog.upDate();
        }
      },
      normsDialogShow(good) {
        this.selectGood = good;
        this.$refs.normsDialog.show();
      },
      initImage(event) {
        let target = event.target;
        let proportion = target.height / target.width;
        let width = screen.width - 100;
        let height = width * proportion;
        target.width = width;
        target.height = height;
      },
      initImages(event) {
        let target = event.target;
        let width = screen.width;
        if (width <= 320) {
          target.width = 57;
          target.height = 57;
        } else {
          target.width = 74;
          target.height = 74;
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let goodList = this.$refs.goodList;
        let el = goodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      setRatings() {
        this.$refs.ratingsDetail.show();
      },
      selectRating(type) {
        this.selectType = type;
        console.log('selectRating');
      },
      toggleContent() {
        console.log('toggleContent');
      },
      addNormsGood(target) {
        this._drop(target);
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.goodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let goodList = this.$refs.goodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < goodList.length; i++) {
          let item = goodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _searchShop() {
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
              this.routePath = this.$route.fullPath;
              if (this.$route.query.goodId || this.$route.query.goodId === 0) {
                this.goodId = this.$route.query.goodId;
                this.shopId = this.$route.query.shopId;
                let good = this.goods[this.shopId].foods[this.goodId];
                this.setGood(good);
              }
            });
          }
        });
      },
      setGood(good) {
        this.selectedFood = good;
        this.goodShow = true;
        this.$refs.good.show();
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.goodShow = true;
        this.$refs.good.show();
      }
    },
    components: {
      'v-shopcart': ShopCart,
      'v-cartcontrol': CartControl,
      'v-normsDialog': NormsDialog,
      'v-good': Good,
      'v-ratingDetail': RatingDetail
    }
  };
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    width 100%
    top 259px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        flex 1
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none();
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-bottom-1px(rgba(7, 17, 27, 0.2))
    .goods-wrapper
      flex 1
      .discount-top
        display block
        position relative
        margin 10px 10px 15px 10px
        .discount-top-bg
          position absolute
          top 0
          left 0
          z-index -10
        .discount-wrapper
          font-family "PingFang SC"
          font-size 11px
          padding-bottom 20px
          @media only screen and (max-width: 320px)
            padding-bottom 10px
          .discount-price
            display inline-block
            margin-top 18px
            vertical-align top
            font-family "PingFang SC"
            padding-left 18px
            font-weight 700
            font-size 29px
            color #ff5339
            @media only screen and (max-width: 320px)
              padding-left 10px
              margin-top 15px
              font-size 24px
            .sign
              font-family "PingFang SC"
              font-size 15px
              color #ff5339
              @media only screen and (max-width: 320px)
                font-size 13px
          .discount-desc
            margin-top 18px
            display inline-block
            vertical-align top
            padding-left 18px
            @media only screen and (max-width: 320px)
              padding-left 10px
              margin-top 12px
            .discount-desc-title
              display block
              font-family "PingFang SC"
              font-size 15px
              font-weight 700
              color #37373b
              @media only screen and (max-width: 320px)
                font-size 13px
            .discount-desc-value
              margin-top 8px
              display block
              font-size 12px
              font-family "PingFang SC"
              color #9c9c9c
              @media only screen and (max-width: 320px)
                font-size 10px
          .discount-action
            display inline-block
            margin-top 25px
            vertical-align top
            padding-left 40px
            font-family "PingFang SC"
            font-size 15px
            font-weight 700
            color #ff5339
            @media only screen and (max-width: 320px)
              font-size 13px
              padding-left 25px
              margin-top 20px
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .good-item
        display flex
        margin 15px
        border-bottom-1px(#f3f3f3)
        &:last-child
          border-none()
          margin-bottom 5px
        .icon
          width 74px
          height 74px
          flex 0 0 74px
          margin-right 10px
          padding-bottom 16px
          @media only screen and (max-width: 320px)
            width 57px
            height 57px
            flex 0 0 57px
        .content
          font-family "PingFang SC"
          flex 1
          .name
            padding-left 2px
            display block
            margin-bottom 6px
            font-size 15px
            color #37373b
            @media only screen and (max-width: 320px)
              margin-bottom 3px
              font-size 12px
          .desc
            display block
            padding-left 2px
            height 10px
            font-size 10px
            color #9c9c9c
            margin-bottom 7px
            width 180px
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            @media only screen and (max-width: 320px)
              margin-bottom 3px
              width 140px
          .extra
            margin-bottom 8px
            color #666666
            display block
            font-size 10px
            @media only screen and (max-width: 320px)
              margin-bottom 4px
          .content-bottom
            display flex
            color #ff5339
            font-size 0
            position relative
            .price-wrapper
              flex 1
              display inline-block
              .price-sign
                font-size 11px
              .price-number
                font-size 15px
                font-weight 700
              .price-end
                font-size 11px
            .cartcontrol-wrapper
              display inline-block
              vertical-align bottom
            .norms-wrapper
              display inline-block
              vertical-align bottom
              .norms-button
                display block
                width 60px
                height 22px
                line-height 22px
                background #fdcf00
                border-radius 11px
                text-align center
                font-family "PingFang SC"
                color #37373b
                font-size 10px
                @media only screen and (max-width: 320px)
                  width 60px
                  height 18px
                  line-height 18px
                  border-radius 9px
                  font-size 9px

</style>
