<template>
  <transition name="position">
    <div v-if="showFlag" class="position">
      <v-header :title="title" :bgId="0" :colorId="1" :moreShow="true" :backShow="true" @back="hide"></v-header>
      <div class="position-top">
        <div class="position-left-content" @click="showCity">
          <span class="position-city">{{currentCity}}</span>
          <span class="position-icon" :class="positionButton()"></span>
        </div>
        <div class="position-right-input">
          <input id="search" type="text" placeholder="输入你的收货地址" class="position-input" ref="input" @input="setInput"/>
        </div>
      </div>
      <div class="city-search"></div>
      <div class="city-list" v-show="cityShow">
        <div class="city-list-ul" ref="cityScroll">
          <ul class="city-list-wrapper">
            <li class="city-list-li" v-for="(city, index) in cityList[0].prov" @click="getSelectCity(city)" >
              <span class="list-province">{{city}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="position-content" v-show="!searchShow">
        <div class="position-button" @click="getPosition">
        <span class="current-position">
          <span class="current-position-icon bg-image"></span>
          <span class="current-position-text">{{positionMessage}}</span>
        </span>
        </div>
      </div>
      <div class="search-content" v-show="searchShow">
        <ul class="message-ul">
          <li v-for="(item, index) in messageData" class="message-li">
            <span class="message-title">{{item.title}}</span>
            <span class="message-item">{{item.address}}</span>
          </li>
        </ul>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import Header from '../../../components/header/head.vue';
  import BScroll from 'better-scroll';
  export default{
    data() {
      return {
        showFlag: false,
        cityShow: false,
        messageShow: false,
        searchShow: false,
        isClicked: 0,
        currentCity: '',
        cityList: [],
        lat: 0,
        lng: 0,
        radius: 1000,
        messageData: [],
        v1: '',
        ak: '3DKUcANROqlyC1I4mn1ByLo1Gi3k7QEx',
        center: {lng: 0, lat: 0},
        positionMessage: '定位当前位置',
        title: '选择收货地址',
        urlApi: 'http://apis.map.qq.com/ws/place/v1/suggestion',
        key: 'WGRBZ-MO23P-5RFDF-L5EFX-5L4OF-L5FQU'
      };
    },
    created() {
      this.$http.get('/api/city').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.cityList = response.data;
        }
      });
    },
    methods: {
      getIpPosition() {
        /* eslint-disable no-undef */
        let geolocation = new qq.maps.Geolocation();
        geolocation.getIpLocation((ipPosition) => {
          this.currentCity = ipPosition.city;
          this.lat = ipPosition.lat;
          this.lng = ipPosition.lng;
        }, (erro) => {
          console.log(erro);
        });
      },
      setInput(event) {
        let inputText = event.target.value;
        let inputTextLength = inputText.length;
        if (inputTextLength !== 0) {
          if (!this.searchShow) {
            this.searchShow = true;
          }
          if (this.isChinese(inputText)) {
            this.serarchText(inputText);
          }
        } else {
          this.searchShow = false;
        }
      },
      isChinese(text) {
        let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
        return reg.test(text);
      },
      serarchText(text) {
        /* eslint-disable no-undef */
        this.$http.jsonp(this.urlApi, {params: {
            keyword: text,
            region: this.currentCity,
            key: this.key,
            output: 'jsonp'}
          }).then((res) => {
            console.log(res);
            this.messageData = res.body.data;
            console.log(this.messageData);
        }, (rsp) => {
          console.log('失败' + rsp);
        });
      },
      getSelectCity(city) {
        this.cityShow = false;
        console.log(city);
      },
      getPosition() {
        this.positionMessage = '定位中…';
        /* eslint-disable no-undef */
        let geolocation = new qq.maps.Geolocation();
        let options = {timeout: 6000};
        geolocation.getLocation((position) => {
          this.positionMessage = position.addr;
          this.returnHome(this.positionMessage);
        }, (erro) => {
          this.positionMessage = '定位失败！';
          console.log(erro);
        }, options);
      },
      returnHome(data) {
        console.log(data);
        this.$emit('message', data);
        this.hide();
      },
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      initScroll() {
        this.$nextTick(() => {
          if (!this.cityScroll) {
            this.cityScroll = new BScroll(this.$refs.cityScroll, {
              click: true
            });
          } else {
            this.cityScroll.refresh();
          }
        });
      },
      showCity() {
        this.cityShow = !this.cityShow;
        if (this.cityShow) {
          this.initScroll();
        }
      },
      positionButton() {
        if (this.cityShow) {
          return 'position-on';
        } else {
          return 'position-off';
        }
      }
    },
    components: {
      'v-header': Header
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .position
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background: #f3f3f3
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
    &.position-enter, &.position-leave-active
      transform translate3d(100%,0, 0)
    .city-list
      position fixed
      width 100%
      height 100%
      overflow hidden
      background white
      .city-list-ul
        width 100%
        height 553px
        .city-list-li
          margin 0 15px
          height 30px
          line-height 30px
          font-size 14px
          border-bottom-1px(#f3f3f3)
    .position-top
      height 70px
      width 100%
      line-height 70px
      padding 0 15px
      background #37373b
      font-family "PingFang SC"
      @media only screen and (max-width: 320px)
        height 40px
        line-height 40px
      .position-left-content
        display inline-block
        .position-city
          color white
          display inline-block
          vertical-align top
          font-size 14px
        .position-icon
          padding-left 5px
          display inline-block
          vertical-align middle
          padding-bottom 3px
          width 10px
          height 5px
          background-size 10px 5px
          background-repeat no-repeat
          &.position-on
            bg-image(position_on)
          &.position-off
            bg-image(position_off)
      .position-right-input
        color rgba(0, 0, 0, 0.80)
        padding-left 7px
        display inline-block
        font-size 16px
        .position-input
          width 270px
          height 25px
          color white
          padding-left 5px
          background inherit
          border-bottom 1px solid rgba(216, 216, 216, 0.80)
          @media only screen and (max-width: 320px)
            width 214px
            height 25px
    .position-content
      width 100%
      height 100%
      .position-button
        display block
        height 45px
        line-height 45px
        margin 10px 15px
        border-radius 5px
        background white
        text-align center
        font-family "PingFang SC"
        &.clicked
          border 1px solid #fdcf00
          background #f0f0f0
        @media only screen and (max-width: 320px)
          height 35px
          line-height 35px
        .current-position
          .current-position-icon
            display inline-block
            vertical-align middle
            margin-bottom 5px
            width 16px
            height 16px
            background-size 16px 16px
            background-repeat no-repeat
            bg-image(location)
            font-size 12px
          .current-position-text
            display inline-block
            vertical-align top
            color #37373b
            font-size 14px
    .search-content
      position fixed
      background white
      width 100%
      height 100%
      .message-ul
        font-family "PingFang SC"
        padding 0 15px
        .message-li
          width 100%
          height 50px
          border-bottom-1px(#f3f3f3)
          .message-title
            color #37373b
            display block
            height 30px
            line-height 30px
            font-size 16px
          .message-item
            color #c9c9c9
            display block
            font-size 12px
            height 20px
            line-height 20px
</style>
