<template>
  <div>
    <div class="rating-detial" v-show="showFlag" ref="ratingDetailScroll">
      <div class="rating-detial-wrapper">
        <v-header :bgId="0" :moreShow="true" :backShow="true" :title="title" :colorId="1" @back="hide()"></v-header>
        <v-ratingSelect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                        :onlyContent="onlyContent" :ratings="ratings"></v-ratingSelect>
        <div class="detail-solider"></div>
        <div class="rating-wrapper">
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" class="rating-item">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Header from '../../../components/header/head.vue';
  import RatingSelect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../../common/js/date';
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
        onlyContent: true,
        showFlag: false,
        title: '评论'
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
        }
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingDetailScroll, {
            click: true
          });
        });
      });
    },
    methods: {
      initScroll() {
        this.$nextTick(() => {
          if (!this.ratingDetailScroll) {
            this.ratingDetailScroll = new BScroll(this.$refs.ratingDetailScroll, {
              click: true
            });
          } else {
            this.ratingDetailScroll.refresh();
          }
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
      show() {
        this.showFlag = true;
        this.initScroll();
      },
      hide() {
        this.showFlag = false;
      },
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-header': Header,
      'v-ratingSelect': RatingSelect
    }
  };
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .rating-detial
    position fixed
    left 0
    top 0
    z-index 70
    width 100%
    height 100%
    background white
    .detail-solider
      border-bottom 10px solid rgba(7, 17, 27, 0.1)
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
