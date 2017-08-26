<template>
  <div class="sort-widget">
    <div class="sort-widget-wrapper">
      <div class="rank-button">
        <span class="rank-name" :class="{'active':selectType===1}" @click="setRank">
          <span class="button-name">{{selectTypeInfo.rank[0].rankName}}</span>
          <span class="button-icon" :class="rankButtonIcon()"></span>
        </span>
        <span class="rank-content" v-show="rankShow">
          <span class="rank-item" v-for="(item, index) in selectTypeInfo.rank" @click="setRankItem(index)">
            <span class="rank-item-name" :class="{'active':rankItemSelectType===(index+1)}" >{{item.rankName}}</span>
          </span>
        </span>
      </div>
      <div class="sales-button">
        <span  class="sales-name" :class="{'active':selectType===2}" @click="setSales">{{selectTypeInfo.sales}}</span>
      </div>
      <div class="distance-button">
        <span class="distance-name" :class="{'active':selectType===3}" @click="setDistance">{{selectTypeInfo.distance}}</span>
      </div>
      <div class="screen-button">
        <span class="screen-name" :class="{'active':selectType===4}" @click="setScreen">
          <span class="button-name">{{selectTypeInfo.screenName}}</span>
          <span class="button-icon" :class="screenButtonIcon()"></span>
        </span>
        <span class="screen-content" v-show="screenShow">
          <span class="screen-item" v-for="(screen, index) in selectTypeInfo.screen">
            <span class="activity-name" @click="setType(-1)">{{screen.activityName}}</span>
            <span class="activity-content">
              <span class="activity-item" v-for="(activity, itemIndex) in screen.activityItem">
                <span class="activity-item-name" :class="{'active':screenItemSelectType===(itemIndex+1) && screenSelectType===(index+1)}" @click="setScreenItem(index,itemIndex)">{{activity.itemName}}</span>
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
    <div class="sort-content">
      <ul class="content-wrapper">
        <li v-show="sortInfo" v-for="(item, index) in sortInfo">
          <v-shopInfoWidget :shopInfo="item" @refresh="sendToWrap"></v-shopInfoWidget>
        </li>
      </ul>
      <div v-show="sortInfo.length === 0" class="no-message">
        <span class="hint">数据为空！</span>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import ShopInfoWidget from '../../components/widget/shopInfoWidget.vue';
  export default {
    props: {
      selectTypeInfo: {
        type: Object
      },
      shopInfo: {
        type: Array
      }
    },
    data() {
      return {
        rankShow: false,
        screenShow: false,
        listShow: false,
        selectType: 0,
        tempShopInfo: [],
        sortInfo: [],
        rankItemSelectType: 0,
        screenSelectType: 0,
        screenItemSelectType: 0
      };
    },
    created() {
      this.tempShopInfo = this.shopInfo;
      this.sortInfo = this.shopInfo;
    },
    methods: {
      sortDeliveryTime() {
        this.sortInfo.sort((a, b) => {
          return a.deliveryTime - b.deliveryTime;
        });
        this.sendToWrap();
      },
      sortDistance() {
        this.sortInfo.sort((a, b) => {
          return a.distance - b.distance;
        });
        this.sendToWrap();
      },
      sortSales() {
        this.sortInfo.sort((a, b) => {
          return a.sellCount - b.sellCount;
        });
        this.sortInfo.reverse();
        this.sendToWrap();
      },
      sortStarScore() {
        this.sortInfo.sort((a, b) => {
          return a.star - b.star;
        });
        this.sortInfo.reverse();
        this.sendToWrap();
      },
      sortRatingScore() {
        this.sortInfo.sort((a, b) => {
          return a.ratingScore - b.ratingScore;
        });
        this.sortInfo.reverse();
        this.sendToWrap();
      },
      setRankItem(index) {
        this.rankItemSelectType = index + 1;
        switch (index) {
          case 0:
            this.sortStarScore();
            break;
          case 1:
            this.sortRatingScore();
            break;
          case 2:
            this.sortDeliveryTime();
            break;
        }
        this.hideList();
      },
      setScreenItem(index, itemIndex) {
        this.screenSelectType = index + 1;
        this.screenItemSelectType = itemIndex + 1;
        let type = index * this.selectTypeInfo.screen[index].activityItem.length + itemIndex;
        this.setType(type);
      },
      setType(type) {
        if (type < 0) {
          this.sortInfo = this.tempShopInfo;
          this.screenItemSelectType = 0;
        } else {
          this.sortInfo = this.screenSelectFilter(type);
        }
        this.sendToWrap();
        this.hideList();
      },
      screenSelectFilter(type) {
        return this.tempShopInfo.filter((info) => {
          return info.supports.filter((support) => {
              return support.type === type;
            }).length !== 0;
        });
      },
      sendToWrap() {
        this.$emit('refreshWrap');
      },
      hideList() {
        this.rankShow = false;
        this.screenShow = false;
        this.listShow = false;
      },
      setRank() {
        if (this.selectType !== 1) {
          this.selectType = 1;
        } else {
          this.selectType = 0;
        }
        if (this.screenShow) {
          this.screenShow = false;
          this.listShow = false;
        }
        this.rankShow = !this.rankShow;
        this.listShow = !this.listShow;
      },
      setSales() {
        if (this.selectType !== 2) {
          this.selectType = 2;
          this.sortSales();
        } else {
          this.selectType = 0;
        }
        if (this.rankShow) {
          this.rankShow = false;
        }
        if (this.screenShow) {
          this.screenShow = false;
        }
        this.listShow = false;
      },
      setDistance() {
        if (this.selectType !== 3) {
          this.selectType = 3;
          this.sortDistance();
        } else {
          this.selectType = 0;
        }
        if (this.rankShow) {
          this.rankShow = false;
        }
        if (this.screenShow) {
          this.screenShow = false;
        }
        this.listShow = false;
      },
      setScreen() {
        if (this.selectType !== 4) {
          this.selectType = 4;
        } else {
          this.selectType = 0;
        }
        if (this.rankShow) {
          this.rankShow = false;
          this.listShow = false;
        }
        this.screenShow = !this.screenShow;
        this.listShow = !this.listShow;
      },
      rankButtonIcon() {
        if (this.rankShow) {
          return 'select-on';
        } else {
          return 'select-off';
        }
      },
      screenButtonIcon() {
        if (this.screenShow) {
          return 'select-on';
        } else {
          return 'select-off';
        }
      }
    },
    components: {
      'v-shopInfoWidget': ShopInfoWidget
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/mixin.styl";
  .sort-widget
    display block
    background white
    .sort-widget-wrapper
      display flex
      width 100%
      text-align center
      height 45px
      line-height 45px
      font-family "PingFang SC"
      font-size 13px
      z-index 20
      background white
      position relative
      border-bottom-1px(#f3f3f3)
      .rank-button
        display inline-block
        flex 1
        .rank-name
          display block
          font-size 13px
          color #9c9c9c
          &.active
            color #37373b
          .button-name
            display inline-block
          .button-icon
            display inline-block
            padding-bottom 2px
            width 11px
            height 6px
            background-size 11px 6px
            background-repeat no-repeat
            &.select-on
              bg-image(select_on)
            &.select-off
              bg-image(select_off)
        .rank-content
          text-align left
          position absolute
          display block
          top 44px
          width 100%
          height 100%
          background white
          z-index 10
          .rank-item
            display block
            height 44.5px
            padding-left 15px
            background white
            width 100%
            flex 1
            border-bottom-1px(#f3f3f3)
            .rank-item-name
              font-size 13px
              color #9c9c9c
              &.active
                color #37373b
      .sales-button
        display inline-block
        flex 1
        font-size 12px
        .sales-name
          display block
          color #9c9c9c
          &.active
            color #37373b
      .distance-button
        display inline-block
        flex 1
        font-size 12px
        .distance-name
          display block
          color #9c9c9c
          &.active
            color #37373b
      .screen-button
        display inline-block
        flex 1
        .screen-name
          display block
          color #9c9c9c
          font-size 13px
          &.active
            color #37373b
          .button-name
            display inline-block
          .button-icon
            display inline-block
            padding-bottom 2px
            width 11px
            height 6px
            background-size 11px 6px
            background-repeat no-repeat
            &.select-on
              bg-image(select_on)
            &.select-off
              bg-image(select_off)
        .screen-content
          text-align left
          position absolute
          display block
          top 44px
          left 0
          right 0
          width 100%
          height 100%
          background white
          z-index 10
          .screen-item
            display block
            width 100%
            background white
            border-bottom-1px(#f3f3f3)
            .activity-name
              flex 1
              display block
              width 100%
              height 100%
              color #9c9c9c
              padding-left 15px
              font-size 13px
              border-bottom-1px(#f3f3f3)
            .activity-content
              display block
              padding-left 30px
              width 100%
              font-size 13px
              background white
              .activity-item
                display inline-block
                width 33.3%
                height 100%
                .activity-item-name
                  color #37373b
                  &.active
                    padding 4px 5px
                    border-radius 5px
                    background #fdcf00
                    border 1px solid #fdcf00
                    color #37373b
    .sort-content
      width 100%
      height 100%
      .sort-splits
        width 100%
        height 5px
        background #f3f3f3
      .no-message
        font-size 12px
        height 250px
        padding 25%
        line-height 45px
        text-align center
        .hint
          display block
          border-radius 10px
          border 1px solid #fdcf00
    .list-mask
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index 5
      opacity 1
      backdrop-filter blur(10px)
      background rgba(7, 17, 27, 0.6)
      &.fade-enter-active, &.fade-leave-active
        transition all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity 0
        background rgba(7, 17, 27, 0)
</style>
