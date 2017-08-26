<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}</span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}</span>
      <span @click="select(3,$event)" class="block smell" :class="{'active':selectType===3}">{{desc.smell}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const SMELL = 3;
  const ALL = 2;

  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '好评',
            negative: '差评',
            smell: '味道不错'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      smell() {
        return this.ratings.filter((rating) => {
          return rating.rateType === SMELL;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      font-family "PingFang SC"
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        line-height 16px
        margin-right 8px
        font-size 12px
        border-radius 1px
        color rgb(77, 85, 93)
        &.active
          color #37373d
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background #f2f2f2
          &.active
            background #fdcf00
        &.negative
          background #f2f2f2
          &.active
            background #fdcf00
        &.smell
          background #f2f2f2
          &.active
           background #fdcf00
    .switch
      font-family "PingFang SC"
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0
      .text
        display inline-block
        vertical-align middle
        font-size 12px
</style>
