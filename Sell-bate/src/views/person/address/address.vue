<template>
  <div class="address" v-show="issHide">
    <div  class="address-main">
      <v-top :bgId="0" :backShow="true" :title="title" :addtext="addtext":addShowtext="true" @back="hide" @add="updataShow"></v-top>
      <div class="address-content" ref="addWrapper">
        <ul>
          <div class="address-top">我的收货地址</div>
          <li v-for="(item,index) in address_item" class="address-item" :class="{'address-item-text':addsiteIndex===index}">
            <transition name="move">
              <div class="updata-left" @click="deleteAddress(index,$event)" v-show="updata">
              </div>
            </transition>
            <div class="address-center" v-show="!updata"  @click="addressItem(index,$event)">
              <span class="address-user">{{item.name}}</span>
              <span class="address-sex">{{item.sex}}</span>
              <span class="address-tel">{{item.tel}}</span>
              <p class="address-detail">{{item.detail}}</p>
              <p class="address-doorplate">{{item.doorplate}}</p>
            </div>
            <div class="address-center-text" @click="addItem(index,$event)" v-show="updata">
              <span class="address-user">{{item.name}}</span>
              <span class="address-sex">{{item.sex}}</span>
              <span class="address-tel">{{item.tel}}</span>
              <p class="address-detail">{{item.detail}}</p>
              <p class="address-doorplate">{{item.doorplate}}</p>
            </div>
              <div class="updata-right" @click="addsiteShow(index,$event)"  v-show="updata">
              </div>
              <div class="updata-delete-right" @click.prevent="delAddress(index,$event)">
              <div class="updata-delete-right-text">删除</div>
            </div>
          </li>
          <div class="aaa"  v-show="!updata">
            <div class="aaa-text"></div>
          </div>
          <div class="upaaa"  v-show="updata">
            <div class="upaaa-text"></div>
          </div>
        </ul>
      </div>
      <div class="address-bottom" @click="addressShow"  v-show="!updata">
        <span class="address-bottom-icon"></span>
        <span class="address-bottom-text">新增收货地址</span>
      </div>
    </div>
    <v-addsite ref="addsiteS" :updata="updatacontent" @scroll="toggleScroll"></v-addsite>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Top from '../../../components/header/head.vue';
  import addsite from './addSites.vue';
  export default{
    data() {
      return {
        click_on: false,
        title: '我的收获地址',
        tapShow: false,
        backShow: true,
        addShow: true,
        addtext: '管理',
        address_item: [
          {
             name: '张山1',
             tel: '15623535626',
             detail: '杭州电子商务创业园',
             doorplate: 'c座516号',
             sex: '先生'
          },
          {
             name: 'wangwu',
             tel: '15623535626',
             detail: '杭州电子商务创业园',
             doorplate: 'c座516号',
             sex: '先生'
           },
          {
            name: '张山1',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: 'wangwu',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: '张山1',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: 'wangwu',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: '张山1',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: 'wangwu',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: '张山1',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          },
          {
            name: 'wangwu',
            tel: '15623535626',
            detail: '杭州电子商务创业园',
            doorplate: 'c座516号',
            sex: '先生'
          }
        ],
        issHide: false,
        updata: false,
        addsiteFlag: false,
        updatacontent: {
            type: Object
        },
        addsiteIndex: '',
        atop: '我的收获地址'
      };
    },
    mounted() {
       this._initScroll();
    },
    created() {
       this._initScroll();
    },
    methods: {
      show(clickon) {
       if (clickon === undefined) {
         this.click_on = false;
       } else {
         this.click_on = clickon;
       }
        this.issHide = true;
        this.addsiteIndex = '';
        this._initScroll();
      },
      addressItem(index, event) {
        if (this.click_on) {
          this.$emit('getAddress', this.address_item[index]);
          this.hide();
        }
      },
      addItem(index, event) {
        this.addsiteIndex = '';
      },
      hide() {
        this.issHide = false;
        this.$emit('scroll');
      },
      updataShow(event) {
        this.updata = !this.updata;
        if (this.updata) {
          this.addtext = '完成';
          this.addsiteIndex = '';
        } else {
          this.addtext = '管理';
          this.addsiteIndex = '';
        }
        this._initScroll();
      },
      deleteAddress(index, event) {
        this.addsiteIndex = index;
        if (!event._constructed) {
          return;
        }
        this.addsiteFlag = true;
        this._initScroll();
      },
      delAddress(index, event) {
        if (!event._constructed) {
          return;
        }
        this.address_item.splice(index, 1);
        this._initScroll();
        this.addsiteIndex = '';
      },
      addressShow() {
        this.atop = '新增收货地址';
        this.$refs.addsiteS.show(this.atop, null);
        this.toggleScroll();
      },
      addsiteShow(index, event) {
        this.atop = '修改收货地址';
        this.updatacontent = this.address_item[index];
        this.addsiteIndex = '';
        this.$refs.addsiteS.show(this.atop, this.updatacontent);
        this.toggleScroll();
      },
      toggleScroll() {
        this.$emit('nav');
        this._initScroll();
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.addScroll) {
            this.addScroll = new BScroll(this.$refs.addWrapper, {
              click: true
            });
          } else {
            this.addScroll.refresh();
          }
        });
      }
    },
    components: {
      'v-top': Top,
      'v-addsite': addsite
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin";
  .address
    position: fixed
    top 0
    left 0
    width 100%
    height 100%
    .address-main
      width 100%
      height 100%
      top 0
      background: #f1f1f1
      .address-content
        width 100%
        height 100%
        background #f1f1f1
        margin-right 30px
        overflow hidden
        .address-top
          position relative
          height 45px
          line-height 45px
          width 100%
          margin: 0
          font-size 15px
          font-family "PingFang-SC-Medium"
          color #9c9c9c
          padding-left 10px
          background #f1f1f1
        .address-item
          position: relative
          width 100%
          background #ffffff
          margin-bottom: 5px
          padding-left 15px
          &.address-item-text
            left -80px
          &:last-child
            margin-bottom 20px
          .updata-left
            position: absolute
            left 15px
            width: 20px
            height: 20px
            top 39px
            background-size 20px 20px
            background-repeat no-repeat
            opacity: 1
            bg-image('delete')
            &.move-enter-active, &.move-leave-active
              transition: all 0.5s
            &.move-enter, &.move-leave-active
              transition: all 0.5s
              opacity: 0
              left -20px
            &.updata-addsite_left
              left -20px
              &.move-enter-active, &.move-leave-active
                opacity: 1
              &.move-enter, &.move-leave-active
                transition: all 0.5s
          .address-center
            padding-top 15px
            padding-bottom 15px
            padding-left 0px
            font-size 0
            .address-user
              font-size 15px
              font-family "PingFang-SC-Medium"
              color #424242
            .address-sex
              font-size 15px
              padding-left 15px
              font-family "PingFang-SC-Medium"
              color #424242
            .address-tel
              padding-left 20px
              font-size 15px
              font-family 'PingFang-SC-Medium'
              color #424242
            .address-detail
              padding-top 15px
              font-size 13px
              font-family 'PingFang-SC-Medium'
              color #9c9c9c
            .address-doorplate
              padding-top 10px
              font-size 13px
              font-family 'PingFang-SC-Medium'
              color #9c9c9c
          .address-center-text
            padding-top 15px
            padding-bottom 15px
            padding-left 30px
            font-size 0
            .address-user
              font-size 15px
              font-family "PingFang-SC-Medium"
              color #424242
            .address-sex
              font-size 15px
              padding-left 15px
              font-family "PingFang-SC-Medium"
              color #424242
            .address-tel
              padding-left 20px
              font-size 15px
              font-family 'PingFang-SC-Medium'
              color #424242
            .address-detail
              padding-top 15px
              font-size 13px
              font-family 'PingFang-SC-Medium'
              color #9c9c9c
              width 85%
            .address-doorplate
              padding-top 10px
              font-size 13px
              font-family 'PingFang-SC-Medium'
              color #9c9c9c
          .updata-right
            position: absolute
            top 40px
            right 30px
            width: 15px
            height: 15px
            background-size 15px 15px
            background-repeat no-repeat
            bg-image('updata')
            &.updata-addsite_right
              right 95px
          .updata-delete-right
            position: absolute
            right: -70px
            top 0
            width 80px
            height 100%
            background #ff2121
            font-size 0
            .updata-delete-right-text
              padding-top 50%
              padding-left 30%
              font-size 15px
              color #fff
      .aaa
        display table
        width 100%
        font-size 12px
        margin-top 10px
        margin-bottom 15px
        height 88px
        text-align center
        .aaa-text
          display: table-cell
          vertical-align: middle
      .upaaa
        display table
        width 100%
        font-size 12px
        margin-top 10px
        margin-bottom 15px
        height 40px
        text-align center
        .upaaa-text
          display: table-cell
          vertical-align: middle
      .address-bottom
        position absolute
        bottom 0
        height: 49px
        width 100%
        clear: both
        background #ffffff
        text-align center
        font-size 0
        .address-bottom-icon
          margin-top: 12px
          display inline-block
          vertical-align top
          background-repeat no-repeat
          width: 22px
          height: 22px
          background-size  22px 22px
          bg-image('add')
        .address-bottom-text
          margin-top: 16px
          margin-left 10px
          display inline-block
          vertical-align top
          font-size 15px
          color #37373b
          font-family "PingFang-SC-Medium"
</style>
