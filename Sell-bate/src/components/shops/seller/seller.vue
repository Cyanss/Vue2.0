<template>
  <div>
    <div class="seller" ref="sellerScroll">
      <div class="seller-content">
        <div class="Shipping">
          <h1 class="title ">配送信息</h1>
          <div class="infomation">
            <ul>
              <li class="info-item" v-for="(item, index) in shopInfo.shipping">
                <span class="activity-icon1" :class="classMap[item.type]"></span>
                <span class="activity-desc2">{{item.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="Business-info">
          <h1 class="title">商家信息</h1>
          <ul>
            <li class="seller-info-item" v-for="(item, index) in shopInfo.sellerInfo">
            <span class="info-item">
              <span class="item-left">{{item.itemTitle}}</span>
              <span class="item-right" @click="setComplaints(index, shopInfo.sellerInfo.length)">
                <span class="right-item-text">{{item.description}}</span>
                <span class="right-item-icon" v-show="index===shopInfo.sellerInfo.length-1"></span>
              </span>
            </span>
            </li>
          </ul>
        </div>
        <div class="service-discount">
          <span class="buinfo">商家服务优惠</span>
          <div class="activity-wrap1">
            <ul class="activity-list1">
              <li class="activity-item1" v-for="(item, index) in shopInfo.supports">
                <span class="activity-icon1" :class="classMap[item.type]"></span>
                <span class="activity-desc1">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <h1 class="Business-profile">商家简介</h1>
          <div class="Business-profile-wapper ">
            <p class="content">{{shopInfo.bulletin}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="compontents">
      <v-complaints ref="complaints" @illegal="getIllegal"></v-complaints>
    </div>
    <div class="illegalInfo"  v-show="illegalInfoShow" @click="hideIllegal">
      <div class="illegal-info-content">
        <span class="illegal-info-text">{{illegalInfoText}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../../star/star.vue';
  import Split from '../../split/split.vue';
  import BScroll from 'better-scroll';
  import Complaints from '../complaints/complaints.vue';
  import {urlParse} from '../../../common/js/util.js';

  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        showFlag: false,
        illegalInfoShow: false,
        illegalInfoText: '',
        title: '先锋便利店（西兴店）',
        tapShow: false,
        backShow: true,
        shopInfo: {
          shopName: '鲜峰便利店(西兴店)',
          title: '公告：欢迎观领指点大会，优惠不断...',
          shopImage: '../../../static/images/shop_img_3.png',
          star: 4.5,
          sellCount: 153,
          deliveryTime: 30,
          minPrice: 0,
          deliveryPrice: 0,
          ratingScore: 4.3,
          distance: 2.4,
          sellerInfo: [
            {
              itemTitle: '商家:',
              description: '先锋便利店（西兴店）'
            },
            {
              itemTitle: '电话:',
              description: '400-1799917'
            },
            {
              itemTitle: '营业时间:',
              description: '09:00 -- 20:00'
            },
            {
              itemTitle: '地址:',
              description: '杭州市滨江区长河街道江南大道'
            },
            {
              itemTitle: '举报投诉:',
              description: '举报投诉'
            }
          ],
          shipping: [
            {
              type: 0,
              description: '由商家提供配送，大约22分钟送达，距离100米之内'
            },
            {
              type: 1,
              description: '免费送达'
            }
          ],
          bulletin: '粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。',
          supports: [
            {
              type: 0,
              description: '新用户立即享受5折优惠'
            },
            {
              type: 1,
              description: '农夫山泉特价处理'
            },
            {
              type: 2,
              description: '满20减5,满40减15,满50减20'
            }
          ],
          activityCount: 4
        }
      };
    },
    created() {
      this.classMap = ['new', 'special', 'decrease'];
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      hideIllegal() {
        this.illegalInfoShow = false;
      },
      getIllegal(info) {
        if (typeof (info) !== 'undefined') {
          if (info === 'success') {
            this.illegalInfoText = '提交成功';
            this.illegalInfoShow = true;
            console.log('info', info);
          }
        }
      },
      setComplaints(index, length) {
        if (index === length - 1) {
          this.$refs.complaints.show();
        }
      },
      _initScroll() {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      }
    },
    components: {
      'v-star': Star,
      'v-split': Split,
      'v-complaints': Complaints
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 259px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .Shipping
      padding: 10px 0px 0px 18px
      color: #37373b
      .title
        font-family "PingFang-SC"
        padding-bottom: 5px
        line-height: 14px
        font-size: 14px
        font-weight: 700
      .infomation
        padding-top: 5px
        line-height: 24px
        font-size: 12px
        color: #9c9c9c
    .Business-info
      padding: 18px 18px 0 18px
      color: #37373b
      font-family "PingFang-SC"
      .title
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
        font-weight: 700
      .seller-info-item
        padding: 5px 0px
        line-height: 16px
        font-size: 13px
        color: #9c9c9c
        &:last-child
          border-none()
        .info-item
          .item-left
            position relative
            display inline-block
            vertical-align top
            font-family "PingFang-SC"
            color #37373b
          .item-right
            position absolute
            right 15px
            display inline-block
            vertical-align top
            font-family "PingFang-SC"
            font-size 12px
            color #9c9c9c
            .right-item-text
              display inline-block
            .right-item-icon
              display inline-block
              width 6px
              height 11px
              margin-left 7px
              margin-top 3px
              vertical-align top
              background-size 6px 11px
              background-repeat no-repeat
              bg-image(more)
    .service-discount
      padding: 10px 10px 0 18px
      .buinfo
        padding-top: 12px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: #37373b
      .activity-wrap1
        height 74px
        padding 20px 0px 15px 0px
        position relative
        .activity-list1
          .activity-item1
            padding-bottom 14px
            padding-left 5px
            display block
            .activity-icon1
              display inline-block
              vertical-align top
              width 13px
              height 13px
              background-size 13px 13px
              background-repeat no-repeat
              &.new
                bg-image(new_3)
              &.special
                bg-image(special_3)
              &.decrease
                bg-image(decrease_3)
            .activity-desc1
              display inline-block
              vertical-align top
              font-family "PingFang-SC"
              font-size 11px
              color #707072
      .Business-profile
        font-family "PingFang-SC"
        padding-top: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: #37373b
      .Business-profile-wapper
        padding: 10px 18px 18px 0px
        .content
          padding-top: 10px
          line-height: 24px
          font-size: 12px
          color: #9c9c9c
        .text
          line-height: 16px
          font-size: 12px
          color: #9c9c9c
  .illegalInfo
    position fixed
    top 0
    left 0
    background inherit
    width 100%
    height 100%
    padding 70% 0 0 0
    .illegal-info-content
      margin 0 auto
      width 215px
      height 50px
      line-height 50px
      border-radius 5px
      background rgba(0,0,0,0.4)
      text-align center
      .illegal-info-text
        color white
        font-size 16px
</style>
