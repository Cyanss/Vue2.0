<template>
  <transition name="norms">
    <div class="norms-wrap" v-show="normsShow" @click="hide">
      <div class="norms-content-main">
        <div class="norms-main-top">
          <div class="main-top-wrap">
            <span class="top-title">{{good.name}}</span>
            <div class="top-select">
              <span class="select-number">选择{{mealsTotalCount}}份</span>
            </div>
          </div>
          <div class="sell-count">已售{{good.sellCount}}份</div>
        </div>
        <div class="norms-main-wrap">
          <div class="norms-main-content">
            <div class="norms-content-left">
              <span class="content-left-text">规格</span>
            </div>
            <div class="norms-content-right">
              <ul class="norms-list">
                <li class="norms-item" v-for="(meal, index) in good.meals" :class="{'active':mealSelect===index}"
                    @click.stop.prevent="selectMeals(index)">
                  <span class="item-norms-title">{{meal.mealName}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="norms-main-bottom">
          <div class="norms-bottom-left">
            <div class="price">
              <span class="price-sign">￥</span><span class="price-number">{{mealSelectPrice}}</span>
            </div>
          </div>
          <div class="norms-bottom-right">
            <div class="bottom-right-button">
              <transition name="add">
                <div class="add-cart-button" v-show="mealsTotalCount===0" @click.stop.prevent="addSelectMeals">
                  <span class="button-text">加入购物车</span>
                </div>
              </transition>
              <div class="cart-wrapper" v-show="mealsTotalCount > 0">
                <div class="cart-content">
                  <transition name="move">
                    <div class="cart-decrease"
                         v-show="mealsCounts[mealSelect] > 0" @click.stop.prevent="decreaseCart">
                      <span class="inner icon-remove_circle_outline"></span>
                    </div>
                  </transition>
                  <div class="cart-count" v-show="mealsCounts[mealSelect] > 0">
                    {{mealsCounts[mealSelect]}}
                  </div>
                  <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      good: {
        type: Object
      }
    },
    data() {
      return {
        normsShow: false,
        mealSelect: 0,
        mealSelectPrice: 0,
        mealsCounts: [],
        mealsTotalCount: 0,
        mealsTotalPrice: 0
      };
    },
    methods: {
      upDate() {
        this.getTotalCount();
        this.setMealPrice();
      },
      reSetDate() {
        this.$nextTick(() => {
          if (!this.good.normsTotalCount > 0) {
            this.mealSelect = 0;
            this.mealSelectPrice = 0;
            this.mealsCounts = [];
            this.mealsTotalCount = 0;
            this.mealsTotalPrice = 0;
            for (let i = 0; i < this.good.meals.length; i++) {
              this.mealsCounts.push(0);
            }
          } else {
            this.mealsCounts = this.good.normsMealsTotalCounts;
            this.mealsTotalCount = this.good.normsTotalCount;
            this.mealsTotalPrice = this.good.normsTotalPrice;
          }
          this.setMealPrice();
        });
      },
      show() {
        this.normsShow = true;
        this.reSetDate();
      },
      setMealPrice() {
        if (this.mealsCounts[this.mealSelect] !== 0) {
          this.mealSelectPrice = this.mealsCounts[this.mealSelect] * this.good.meals[this.mealSelect].mealPrice;
        } else {
          this.mealSelectPrice = this.good.meals[this.mealSelect].mealPrice;
        }
      },
      hide() {
        this.normsShow = false;
      },
      addCart(event) {
        this.mealsCounts[this.mealSelect]++;
        this.refreshData();
        this.$emit('add', event.target);
      },
      decreaseCart() {
        this.mealsCounts[this.mealSelect]--;
        this.refreshData();
      },
      getTotalCount() {
        let count = 0;
        let price = 0;
        for (let i = 0; i < this.good.meals.length; i++) {
          count += this.mealsCounts[i];
          price += this.mealsCounts[i] * this.good.meals[i].mealPrice;
        }
        this.mealsTotalCount = count;
        this.mealsTotalPrice = price;
      },
      addSelectMeals(event) {
        if (!this.good.norms) {
          Vue.set(this.good, 'norms', true);
          Vue.set(this.good, 'normsTotalCount', 0);
          Vue.set(this.good, 'normsTotalPrice', 0);
          Vue.set(this.good, 'normsMealsTotalCounts', this.mealsCounts);
        }
        this.mealsCounts[this.mealSelect] = 1;
        this.refreshData();
        this.$emit('add', event.target);
      },
      refreshData() {
        this.getTotalCount();
        this.setMealPrice();
        this.good.normsTotalCount = this.mealsTotalCount;
        this.good.normsTotalPrice = this.mealsTotalPrice;
        this.good.normsMealsTotalCounts = this.mealsCounts;
      },
      selectMeals(index) {
        this.mealSelect = index;
        this.setMealPrice();
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .norms-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    padding-top 50%
    background rgba(0, 0, 0, 0.4)
    opacity 1
    transition all 0.2s ease
    transform translate3d(0, 0, 0)
    &.norms-enter, &.norms-leave-active
      opacity 0
      transform translate3d(-100%, -100%, -50)
    .norms-content-main
      background white
      border-radius 5px
      width 270px
      margin 0 auto
      padding 0 10px
      font-family "PingFang SC"
      font-size 0
      .norms-main-top
        display block
        width 100%
        padding 20px 5px 0 5px
        .main-top-wrap
          .top-title
            display inline-block
            font-size 18px
            color #37373b
            font-weight 700
          .top-select
            display inline-block
            vertical-align top
            width 50px
            height 18px
            line-height 18px
            margin-left 10px
            border-radius 9px
            background #fdcf00
            .select-number
              text-align center
              letter-spacing 1px
              display block
              color #37373b
              font-size 8px
        .sell-count
          display block
          margin-top 10px
          font-size 10px
          color #c9c9c9
      .norms-main-wrap
        margin-top 25px
        font-size 12px
        border-bottom-1px(#f3f3f3)
        .norms-main-content
          padding 0 5px
          .norms-content-left
            display inline-block
            vertical-align top
            font-size 12px
            color #37373b
          .norms-content-right
            display inline-block
            .norms-list
              display block
              width 230px
              padding-bottom 20px
              .norms-item
                display inline-block
                margin-left 10px
                margin-bottom 10px
                width 98px
                height 23px
                line-height 25px
                text-align center
                font-size 13px
                color #37373b
                border-radius 12px
                border 1px solid #9c9c9c
                &.active
                  background #fdcf00
                  border 1px solid #fdcf00
      .norms-main-bottom
        display flex
        padding 0 10px
        height 50px
        line-height 50px
        font-size 12px
        .norms-bottom-left
          flex 1
          display inline-block
          .price
            color #ff5339
            .price-sign
              font-size 18px
            .price-number
              font-size 25px
              font-weight 700
        .norms-bottom-right
          display inline-block
          .bottom-right-button
            margin 9px 0
            position relative
            .add-cart-button
              width 85px
              height 32px
              line-height 32px
              text-align center
              border-radius 5px
              background #fdcf00
              font-size 12px
              color #37373b
              transition: all 0.1s ease
              opacity 1
              &.add-enter, &.add-leave-active
                opacity 0
            .cart-wrapper
              position absolute
              width 85px
              height 32px
              right 0
              top 0
              line-height 32px
              font-size 0
              .cart-content
                display block
                .cart-decrease
                  display: inline-block
                  padding: 6px
                  height 24px
                  opacity: 1
                  transform: translate3d(0, 0, 0)
                  .inner
                    display: inline-block
                    line-height: 24px
                    font-size: 24px
                    color: #9b9b9d
                    transition: all 0.4s linear
                    transform: rotate(0)
                  &.move-enter-active, &.move-leave-active
                    transition: all 0.4s linear
                  &.move-enter, &.move-leave-active
                    opacity: 0
                    transform: translate3d(24px, 0, 0)
                    .inner
                      transform: rotate(180deg)
                .cart-count
                  display inline-block
                  vertical-align top
                  width 12px
                  padding-top 6px
                  line-height 24px
                  text-align center
                  font-size 10px
                  color rgb(147, 153, 159)
                .cart-add
                  display inline-block
                  padding 6px
                  float right
                  font-size 24px
                  line-height 24px
                  color #ffd100
</style>
