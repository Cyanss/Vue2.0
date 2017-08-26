<template>
  <div>
    <transition>
      <keep-alive>
        <router-view class="route-view" @nav="toggleNav" ></router-view>
      </keep-alive>
    </transition>
    <transition name="nav">
      <div class="navigation" v-show="navShow" >
        <div class="nav-tab border-top-1px">
          <div class="nav-tab-item">
            <router-link to="/home" >
            <span class="nav-tab-content">
              <span class="icon" :class="classMap[0]"></span>
              <span class="text">首页</span>
            </span>
            </router-link>
          </div>
          <div class="nav-tab-item">
            <router-link to="/order">
            <span class="nav-tab-content">
              <span class="icon" :class="classMap[1]" ></span>
              <span class="text">订单</span>
            </span>
            </router-link>
          </div>
          <div class="nav-tab-item">
            <router-link to="/person">
            <span class="nav-tab-content">
              <span class="icon" :class="classMap[2]"> </span>
              <span class="text">我的</span>
            </span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        navShow: true
      };
    },
    created() {
      this.classMap = ['home_icon', 'order_icon', 'person_icon'];
    },
    methods: {
      toggleNav() {
        this.navShow = !this.navShow;
      }
    }
  };
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  .navigation
    width 100%
    position fixed
    bottom 0
    left 0
    background white
    z-index 50
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.nav-enter, &.nav-leave-active
      transform translate3d(0, 100%, 0)
    .nav-tab
      bottom 0
      left 0
      display flex
      width 100%
      height 49px
      line-height 49px
      border-top-1px(#f3f3f3)
      box-shadow 0 -1px 2.5px rgba(0, 0, 0, 0.1);
      .nav-tab-item
        flex 1
        text-align center
        & > a
          display block
          color #9c9c9c
          &.active
            color #fcca01
            .nav-tab-content
              .icon
                &.home_icon
                  bg-image('home_on')
                &.order_icon
                  bg-image('order_on')
                &.person_icon
                  bg-image('person_on')
        .nav-tab-content
          display inline-block
          width 30px
          height 49px
          font-size 0
          text-align center
          .icon
            display: block
            width: 30px
            height: 30px
            background-size: 30px 30px
            background-repeat: no-repeat
            &.home_icon
              bg-image('home_nm')
            &.order_icon
              bg-image('order_nm')
            &.person_icon
              bg-image('person_nm')
          .text
            font-size 12px
            display block
            line-height 16px

</style>
