<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrap">
            <div class="logo-bg" :class="{'highlight':totalCount>0}"></div>
            <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
              <div class="logo">
                <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
              </div>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">
            <span v-if="totalPrice!==0" class="price-text">{{payprice}}{{totalPrice}}</span>
            <span class="free">{{payfree}}</span>
          </div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空购物车</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul class="good-ul">
              <li class="good-li" v-for="good in selectFoods" v-show="!good.meals.length > 0">
                <span class="name">
                  <span class="good-name">{{good.name}}</span>
                  <span class="meal-name">{{good.name}}</span>
                </span>
                <div class="price">
                  <span>￥{{good.price*good.count}}</span>
                </div>
                <div class="cart-wrapper">
                  <v-cartcontrol @add="addFood" :good="good"></v-cartcontrol>
                </div>
              </li>
              <li class="good" v-for="(good,goodIndex) in selectFoods" v-show="good.meals.length > 0">
                <ul class="good-norms-ul">
                  <li class="good-norms-li" v-for="(meal, index) in good.meals"
                      v-show="good.normsMealsTotalCounts[index]>0">
                    <div class="name">
                      <span class="good-name">{{good.name}}</span>
                      <span class="meal-name">{{meal.mealName}}</span>
                    </div>
                    <div class="price">
                      <span>￥{{meal.mealPrice*good.normsMealsTotalCounts[index]}}</span>
                    </div>
                    <div class="cart-wrapper">
                      <transition name="move">
                        <div class="cart-decrease"
                             v-show="good.normsMealsTotalCounts[index]>0"
                             @click.stop.prevent="decreaseCart(good,index,$event)">
                          <span class="inner icon-remove_circle_outline"></span>
                        </div>
                      </transition>
                      <div class="cart-count" v-show="good.normsMealsTotalCounts[index]>0">
                        {{good.normsMealsTotalCounts[index]}}
                      </div>
                      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart(good,index,$event)"></div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import CartControl from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
//        showFlag: false,
//        tempFoods: this.selectFoods,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
          this.selectFoods.forEach((good) => {
            if (typeof (good.norms) === 'undefined') {
              total += good.price * good.count;
            } else if (good.norms) {
              total += good.normsTotalPrice;
            }
          });
        return total;
      },
      totalCount() {
        let count = 0;
          this.selectFoods.forEach((good) => {
            if (typeof (good.norms) === 'undefined') {
              count += good.count;
            } else if (good.norms) {
              count += good.normsTotalCount;
            }
          });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else {
          return `去结算`;
        }
      },
      payprice() {
        if (this.totalPrice === 0) {
          return '还未选购商品';
        } else {
          return `￥`;
        }
      },
      payfree() {
        if (this.totalPrice === 0) {
          return `还未选购商品`;
        } else {
          return '配送费免费';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      addCart(good, index, event) {
        if (!event._constructed) {
          return;
        }
        let mealCount = good.normsMealsTotalCounts[index];
        good.normsMealsTotalCounts.splice(index, 1, mealCount);
        mealCount++;
        good.normsMealsTotalCounts.splice(index, 1, mealCount);
        this.getTotalCount(good);
        this.addFood(event.target);
        this.$emit('upDate');
      },
      getTotalCount(good) {
        let count = 0;
        let price = 0;
        for (let i = 0; i < good.meals.length; i++) {
          count += good.normsMealsTotalCounts[i];
          price += good.normsMealsTotalCounts[i] * good.meals[i].mealPrice;
        }
        good.normsTotalCount = count;
        good.normsTotalPrice = price;
      },
      decreaseCart(good, index) {
        if (!event._constructed) {
          return;
        }
        let mealCount = good.normsMealsTotalCounts[index];
        good.normsMealsTotalCounts.splice(index, 1, mealCount);
        mealCount--;
        good.normsMealsTotalCounts.splice(index, 1, mealCount);
        this.getTotalCount(good);
        this.$emit('upDate');
      },
      addFood(target) {
        this.drop(target);
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((good) => {
          if (good.norms) {
            for (let i = 0; i < good.normsMealsTotalCounts.length; i++) {
              good.normsMealsTotalCounts.splice(i, 1, 0);
            }
            good.normsTotalCount = 0;
            good.normsTotalPrice = 0;
            this.$emit('upDate');
          } else {
            good.count = 0;
          }
        });
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    components: {
      'v-cartcontrol': CartControl
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 60
    width 100%
    height 49px
    font-family "PingFang SC"
    .content
      display flex
      background #4b4b4e
      color rgba(255, 255, 255, 0.8)
      font-size 0
      .content-left
        flex 1
        .logo-wrap
          position relative
          display inline-block
          vertical-align top
          width 80px
          background inherit
          .num
            position absolute
            top -20px
            right 8px
            width 20px
            height 20px
            line-height 20px
            text-align center
            border-radius 50%
            font-family "PingFang"
            font-size 9px
            font-weight 400
            color white
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          .logo-bg
            display block
            position absolute
            bottom 6px
            left 15px
            width 55px
            height 55px
            border-radius 50%
            box-sizing border-box
            background #4b4b4e
            &.highlight
              background #fdcf00
          .logo-wrapper
            display inline-block
            position relative
            left 20px
            bottom 10px
            margin-right 15px
            width 45px
            height 45px
            box-sizing border-box
            vertical-align top
            border-radius 50%
            background #37373b
            &.highlight
              background #fdcf00
            .logo
              width 100%
              height 100%
              border-radius 50%
              text-align center
              .icon-shopping_cart
                line-height 44px
                font-size 32px
                &.highlight
                  color #37373B
        .price
          display inline-block
          position relative
          margin-top 10px
          line-height 20px
          padding-right 12px
          box-sizing border-box
          color #ffffff
          &.highlight
            color #ffffff
          .price-text
            display block
            font-size 25px
            letter-spacing 5px
            font-weight 700
            color white
          .free
            display block
            line-height 20px
            font-size 9px
            color rgba(255, 255, 255, 0.8)
            letter-spacing: 2px
      .content-right
        .pay
          flex 0 0 110px
          width 110px
          height 49px
          line-height 49px
          text-align center
          font-size 16px
          font-weight 700
          background #4b4b4e
          &.not-enough
            background #5f5f62
          &.enough
            background #ffd100
            color #37373d
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.19, 0.81, 0.39)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background #ffd100
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition all 0.5s
      &.fold-enter, &.fold-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        position relative
        height 45px
        width 100%
        line-height 45px
        background #fff
        border-bottom-1px(#f3f3f3)
        .title
          display block
          text-align center
          font-family "PingFang SC"
          margin 0 auto
          width 80px
          font-weight 700
          font-size 15px
          color #373736
        .empty
          position absolute
          top 0
          right 15px
          font-family "PingFang SC"
          float right
          font-size 12px
          color #9c9c9c
      .list-content
        max-height 217px
        overflow hidden
        background white
        .good-ul
          position relative
          box-sizing border-box
          border-bottom 1px #f3f3f3
          .good-li
            display flex
            height 60px
            margin 0 15px
            border-bottom-1px(#f3f3f3)
            .name
              flex 1
              display inline-block
              font-family "PingFang SC"
              font-size 16px
              font-weight 700
              .good-name
                display block
                padding-top 15px
                font-size 16px
                color #37373b
              .meal-name
                padding-top 5px
                display block
                font-size 12px
                color #9c9c9c
            .price
              display inline-block
              line-height 60px
              margin-right 90px
              font-weight 700
              color rgb(240, 20, 20)
            .cart-wrapper
              position absolute
              right 0
              top 13px
        .good
          position relative
          box-sizing border-box
          border-bottom 1px #f3f3f3
          .good-norms-ul
            .good-norms-li
              display flex
              height 60px
              margin 0 15px
              border-bottom-1px(#f3f3f3)
              .name
                flex 1
                display inline-block
                font-family "PingFang SC"
                font-size 16px
                font-weight 700
                .good-name
                  display block
                  padding-top 15px
                  font-size 16px
                  color #37373b
                .meal-name
                  padding-top 5px
                  display block
                  font-size 12px
                  color #9c9c9c
              .price
                display inline-block
                line-height 60px
                padding-right 90px
                font-weight 700
                color rgb(240, 20, 20)
              .cart-wrapper
                position absolute
                right 0
                top 13px
                font-size 0
                .cart-decrease
                  display: inline-block
                  padding: 6px
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
                  font-size 24px
                  line-height 24px
                  color #ffd100

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    opacity 1
    backdrop-filter blur(10px)
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
