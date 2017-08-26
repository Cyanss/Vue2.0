<template>
  <div class="home-wrap">
    <transition name="top">
      <div class="home-wrap-top" v-show="topShow && isHide">
        <v-header :bgId="0" :backShow="true" :title="title" :moreShow="true" @back="hide"></v-header>
      </div>
    </transition>
    <div class="home" ref="homeScroll" id="home">
      <div class="home-wrapper ">
        <transition name="move">
          <div class="home-wrapper" ref="scrollWrapper" v-show="isHide">
            <div class="main-top">
              <div class="main-top-left" @click="setPosition">
                <span class="position-left-icon bg-image"></span>
                <span class="position-text">{{currentAddress}}</span>
                <span class="position-right-icon bg-image"></span>
              </div>
              <div class="main-top-right" @click="setSearch">
              <span class="search-hint">
                <span class="hint-icon bg-image"></span>
                <span class="hint-text">搜索商品和店铺</span>
              </span>
              </div>
            </div>
            <v-banner :image="image"></v-banner>
            <div class="main-content">
              <div class="main-content-tap border-bottom-1px">
                <div class="tap-tab-item" @click="refreshScroll">
                  <router-link to="/home/hot" >
                  <span class="tap-tab-content">
                    <span class="text">此刻热门</span>
                    <span class="bg"></span>
                  </span>
                  </router-link>
                </div>
                <div class="tap-tab-item" @click="refreshScroll">
                  <router-link to="/home/nearby" ref="nearby">
                  <span class="tap-tab-content">
                    <span class="text">附近商店</span>
                    <span class="bg"></span>
                  </span>
                  </router-link>
                </div>
              </div>
            </div>
              <router-view class="route-wrap" ref="routeView" @preferential="setPreferential" @boutique="setBoutique" @discount="setDiscount"
                           @rank="setRank" @group="setGroup" @refresh="refreshScroll"></router-view>
          </div>
        </transition>
      </div>
    </div>
    <div class="components-wrapper" >
      <v-position ref="position" @scroll="toggleScroll" @message="getPosition"></v-position>
      <v-search ref="search" @scroll="toggleScroll"></v-search>
      <v-preferential ref="preferential" @scroll="toggleScroll"></v-preferential>
      <v-boutique ref="boutique" @scroll="toggleScroll"></v-boutique>
      <v-discounts ref="discounts" @scroll="toggleScroll"></v-discounts>
      <v-rank ref="rank" @scroll="toggleScroll"></v-rank>
      <v-group ref="group" @scroll="toggleScroll"></v-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Preferential from './hot/preferential/preferential.vue';
  import Header from '../../components/header/head.vue';
  import BScroll from 'better-scroll';
  import Banner from '../../components/banner/banner.vue';
  import Position from './position/position.vue';
  import Search from './search/search.vue';
  import Boutique from './hot/boutiques/boutiques.vue';
  import Discounts from './hot/discounts/discounts.vue';
  import Group from './hot/group/group.vue';
  import Rank from './hot/rank/rank.vue';
  export default{
    data() {
      return {
        title: '飞优特',
        currentAddress: '定位中…',
        apply: true,
        ak: '3DKUcANROqlyC1I4mn1ByLo1Gi3k7QEx',
        code: 0,
        isHide: true,
        topShow: true,
        transitionName: 'slide-left',
        selectedFood: {},
        position: {
          province: '',
          city: '',
          district: '',
          street: '',
          street_number: ''
        },
        image: [
          {
            url: '../../../static/images/1a.png',
            alt: '图1',
            href: '#'
          },
          {
            url: '../../../static/images/2a.jpg',
            alt: '图2',
            href: '#'
          },
          {
            url: '../../../static/images/1a.png',
            alt: '图3',
            href: '#'
          },
          {
            url: '../../../static/images/4a.jpg',
            alt: '图4',
            href: '#'
          },
          {
            url: '../../../static/images/5a.jpg',
            alt: '图5',
            href: '#'
          },
          {
            url: '../../../static/images/1a.png',
            alt: '图6',
            href: '#'
          }
        ]
      };
    },
    mounted() {
      this.autoGetPosition();
    },
    activated() {
      this._initScroll();
    },
    created() {
      this.classMap = ['position_icon_1', 'position_icon_2', 'search_icon'];
    },
    methods: {
      autoGetPosition() {
        /* eslint-disable no-undef */
        let geolocation = new qq.maps.Geolocation();
        let options = {timeout: 6000};
        geolocation.getLocation((autoPosition) => {
          console.log(autoPosition);
          if (autoPosition.type !== 'ip') {
            this.currentAddress = autoPosition.addr;
          }
        }, (erro) => {
          console.log(erro);
          this.currentAddress = '定位失败！';
        }, options);
      },
      getPosition(message) {
        this.currentAddress = message;
      },
      refreshScroll() {
        this._initScroll();
      },
      setPosition(event) {
        this.$refs.position.show();
        this.$refs.position.getIpPosition();
        this.toggleScroll();
      },
      setDiscount(event) {
        this.$refs.discounts.show();
        this.toggleScroll();
      },
      setRank(event) {
        this.$refs.rank.show();
        this.toggleScroll();
      },
      setGroup(event) {
        this.$refs.group.show();
        this.toggleScroll();
      },
      setSearch(event) {
        this.$refs.search.show();
        this.toggleScroll();
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.homeScroll) {
            let tempScrollY = 0;
            let tempoffset = 0;
            let outY = 0;
            this.homeScroll = new BScroll(this.$refs.homeScroll, {
              probeType: 2,
              momentumLimitDistance: 30,
              click: true
            });
            this.homeScroll.on('scrollStart', () => {
              tempScrollY = this.homeScroll.y;
            });
            this.homeScroll.on('scroll', () => {
              tempoffset = this.homeScroll.y - tempScrollY;
              if (this.homeScroll.y > this.homeScroll.maxScrollY && this.homeScroll.y < -44) {
                if (Math.abs(tempoffset) > 10) {
                  if (tempoffset < 0) {
                    if (this.topShow) {
                      this.topShow = false;
                    }
                  } else {
                    if (!this.topShow) {
                      this.topShow = true;
                    }
                  }
                }
                tempScrollY = this.homeScroll.y;
              }
              if (this.homeScroll.y <= this.homeScroll.maxScrollY - 5) {
                outY = this.homeScroll.maxScrollY - this.homeScroll.y;
              } else if (this.homeScroll.y > 0) {
                outY = -this.homeScroll.y;
              }
              if (this.homeScroll.y >= -88) {
                if (!this.topShow) {
                  this.topShow = true;
                }
              }
            });
            this.homeScroll.on('scrollEnd', () => {
              if (outY > 20) {
                this.scrollEndUpDate();
                this.homeScroll.refresh();
                outY = 0;
              } else if (outY < -20) {
                this.scrollEndRefreshDate();
                this.homeScroll.refresh();
                outY = 0;
              }
            });
          } else {
            this.homeScroll.refresh();
          }
        });
      },
      scrollEndUpDate() {
        let name = this.$route.name;
        switch (name) {
          case 'hot':
            this.$refs.routeView.hotScrollEndUpdate();
            break;
          case 'nearby':
            this.$refs.routeView.nearbyScrollEndUpdate();
            break;
        }
      },
      scrollEndRefreshDate() {
        console.log('下拉刷新事件');
      },
      setPreferential() {
        this.$refs.preferential.show();
        this.toggleScroll();
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.refreshScroll();
        this.$emit('nav');
      },
      setBoutique() {
        this.$refs.boutique.show();
        this.toggleScroll();
      },
      hide() {
        this.backshow = false;
      }
    },
    components: {
      'v-header': Header,
      'v-banner': Banner,
      'v-position': Position,
      'v-search': Search,
      'v-preferential': Preferential,
      'v-boutique': Boutique,
      'v-discounts': Discounts,
      'v-group': Group,
      'v-rank': Rank
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 5
    background #666668
    .home-wrap-top
      display block
      position relative
      width 100%
      height 44px
      z-index 15
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
      &.top-enter, &.top-leave-active
        transform translate3d(0, -100%, 0)
    .home
      display block
      width 100%
      height 100%
      z-index 10
      .home-wrapper
        transition all 0.2s linear
        transform translate3d(0, 0, 0)
        &.move-enter, &.move-leave-active
          transform translate3d(-100%, 0, 0)
        .map
          width 100%
          height 300px
        .main-top
          position relative
          height 44px
          display flex
          line-height 44px
          background #37373b
          .main-top-left
            position absolute
            display inline-block
            vertical-align middle
            height 44px
            line-height 44px
            flex 1
            left 15px
            font-size 0
            .position-left-icon
              display inline-block
              vertical-align middle
              width 8.5px
              height 11.5px
              background-size 8.5px 11.5px
              background-repeat no-repeat
              bg-image('position_1')
            .position-text
              vertical-align middle
              display inline-block
              font-family "PingFang SC"
              width 110px
              color white
              padding 0 5px
              font-size 12px
              text-overflow ellipsis
              overflow hidden
              white-space: nowrap
            .position-right-icon
              display inline-block
              vertical-align middle
              width 5px
              height 9px
              background-size 5px 9px
              background-repeat no-repeat
              bg-image('position_2')
          .main-top-right
            position absolute
            display inline-block
            width 200px
            height 27px
            background white
            border-radius 13px
            flex 1
            top 8px
            right 15px
            @media only screen and (max-width: 320px)
              width 150px
            .search-hint
              display block
              width 100%
              height 100%
              text-align center
              font-size 0
              .hint-icon
                display inline-block
                vertical-align top
                line-height 27px
                margin 7px 5px 0 0
                width 11.5px
                height 11.5px
                background-size 11.5px 11.5px
                background-repeat no-repeat
                bg-image('search')
              .hint-text
                display inline-block
                vertical-align top
                line-height 27px
                font-size 12px
                color #9c9c9c
                font-family 'PingFang SC'
        .main-content
          background white
          .main-content-tap
            width 100%
            display flex
            height 45px
            line-height 45px
            border-bottom-1px(#f3f3f3)
            .tap-tab-item
              flex 1
              text-align center
              & > a
                display block
                font-size 13px
                color #999999
                font-family 'PingFang SC'
                font-weight 700
                &.active
                  color #37373b
                  font-size 15px
                  font-family 'PingFang SC'
                  font-weight 700
                  .tap-tab-content
                    .bg
                      background #fdcf00
                .tap-tab-content
                  display inline-block
                  width 100px
                  height 45px
                  position relative
                  .bg
                    position absolute
                    display inline-block
                    width 100px
                    height 3px
                    bottom 0
                    left 0


</style>
