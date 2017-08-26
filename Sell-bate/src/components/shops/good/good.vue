<template>
  <transition name="move">
    <div v-show="showFlag" class="good" ref="good">
      <div class="good-content">
        <div class="image-header">
          <img :src="good.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{good.name}}</h1>
          <div class="detail">
            <span class="sell-count">{{good.sellCount}}/库存</span>
          </div>
          <div class="price" v-if="!mealsLength > 0">
            <span class="now">￥{{good.price}}</span>
            <span class="old" v-show="good.oldPrice">￥{{good.oldPrice}}</span>
          </div>
          <div class="price" v-if="mealsLength > 0">
            <span class="meal-price" v-for="(meal, index) in good.meals">￥{{meal.mealPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper" v-if="!mealsLength > 0">
            <v-cartControl @add="addFood" :good="good"></v-cartControl>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="(!good.count || good.count===0) && !mealsLength > 0">加入购物车</div>
          </transition>
          <div class="buy" v-if="mealsLength > 0" @click.stop.prevent="normsDialogShow">
            <span class="norms-button">可选规格</span>
          </div>
        </div>
        <v-split v-show="good.info"></v-split>
        <div class="info" v-show="good.info">
          <h1 class="title" v-show="good.info">商品信息</h1>
          <p class="text">{{good.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <div class="boutique-top">
          <div class="top-left">评价（500）</div>
          <div class="top-right" @click="sendToWrap"><span class="icon-more bg-image"></span></div>
          </div>
          <div class="rating-wrapper">
            <ul v-show="good.ratings &&good.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in good.ratings"
                  class="rating-item border-bottom-1px">
                <div class="user">
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                  <span class="name">{{rating.username}}</span>
                </div>
                <p class="text">
                  {{rating.text}}
                </p>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </li>
            </ul>
            <div class="no-rating" v-show="!good.ratings || !good.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
      <v-normsDialog ref="normsDialog" :good="selectGood" @add="addFood"></v-normsDialog>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import { formatDate } from '../../../common/js/date';
  import CartControl from '../cartcontrol/cartcontrol.vue';
  import Split from '../../split/split.vue';
  import RatingSelect from '../ratingselect/ratingselect.vue';
  import NormsDialog from '../normsdialog/normsdialog.vue';

  //    const POSITIVE = 0;
  //    const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      good: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        mealsLength: 0,
        selectGood: {},
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.good, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
          this.mealsLength = this.good.meals.length;
        });
      },
      goodUpDate() {
        this.$refs.normsDialog.upDate();
      },
      normsDialogShow() {
        this.selectGood = this.good;
        this.$refs.normsDialog.show();
      },
      hide() {
        this.showFlag = false;
        this.$emit('goodShow');
      },
      addFood(target) {
        this.$emit('add', target);
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.good, 'count', 1);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      sendToWrap() {
        this.$emit('wrap');
      }
    },
    components: {
      'v-cartControl': CartControl,
      'v-split': Split,
      'v-ratingSelect': RatingSelect,
      'v-normsDialog': NormsDialog
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .good
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      font-family "PingFang SC"
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 16px
        font-weight 700
        color #000000
      .detail
        margin-bottom 5px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .meal-price
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 2px
        font-size 10px
        color #37373d
        background #ffd100
        opacity 1
        transition all 0.2s
        &.fade-enter, &.fade-leave
          opacity 0
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
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
          font-family "PingFang-SC"
          color #37373b
          left 15px
          font-weight 700
        .top-right
          position absolute
          display block
          font-size 13px
          font-family "PingFang-SC"
          color #9c9c9c
          right 10px
          .icon-more
            display inline-block
            width 20px
            height 11px
            margin-left 10px
            background-size 6px 11px
            background-repeat no-repeat
            bg-image('more')
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 8px 0
          border-bottom-1px(rgba(7, 17, 27, 0.1))
          .user
            right 0
            top 10px
            font-size 0
            line-height 12px
            .name
              display inline-block
              margin-right 6px
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
            .avatar
              margin-right 15px
              border-radius 50%
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            margin-bottom 6px
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
        .no-rating
          padding: 16px 0
          font-size 12px
          color rgb(147, 153, 159)
</style>
