<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-wrap">
      <div class="ratings-top">
        <div class="top-content">
          <div class="top-content-left">
            <span class="left-score">{{seller.score}}</span>
            <span class="left-content">
            <span class="content-star">
            <v-star :size="24" :score="seller.serviceScore"></v-star>
          </span>
          <span class="content-desc">周边商家{{seller.rankRate}}%</span>
          </span>
          </div>
          <div class="top-content-right">
            <div class="ratings-score">5.6</div>
            <div class="delivery-service">配送服务</div>
          </div>
        </div>
      </div>
      <div class="splits"></div>
      <v-ratingSelect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                      :onlyContent="onlyContent" :ratings="ratings"></v-ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../../star/star.vue';
  import Split from '../../split/split.vue';
  import RatingSelect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../../common/js/date';
  import BScroll from 'better-scroll';
  const ALL = 2;
  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
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
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-star': Star,
      'v-split': Split,
      'v-ratingSelect': RatingSelect
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 259px
    bottom 0
    width 100%
    left 0
    overflow hidden
    .splits
      height 10px
      background #f2f2f2
    .ratings-top
      .top-content
        height 60px
        font-family "PingFang-SC-Medium"
        font-size 11px
        position relative
        margin 20px 50px 20px 28px
        @media only screen and (max-width: 320px)
          margin-left 25px
          margin-right 30px
        .top-content-left
          display inline-block
          padding-top 13.5px
          padding-bottom 13.5px
          padding-right 37.5px
          .left-score
            display inline-block
            font-family "PingFang-SC-Bold"
            font-size 35px
            color #ff5339
          .left-content
            display inline-block
            padding-left 18px
            .content-desc
              display block
              margin-top 7px
        .top-content-right
          position absolute
          right 0
          top 5px
          display block
          height 100%
          border-left 1px solid #d8d8d8
          padding-left 40px
          @media only screen and (max-width: 320px)
            padding-left 30px
          .ratings-score
            padding-top 6px
            font-family "PingFang-SC-Medium"
            font-size 22px
            color #ff5339
          .delivery-service
            display block
            margin-top 8px
            font-family "PingFang-SC-Medium"
            font-size 11px
            color #9c9c9c
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-bottom-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 13px
            color #424242
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147,153,159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color #666666
            font-size: 13px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            top: 0
            right: 0
            line-height: 12px
            font-size: 12px
            color #999999

</style>
