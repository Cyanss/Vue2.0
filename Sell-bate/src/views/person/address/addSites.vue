<template>
  <div v-show="showFlag2" class="addsite">
    <v-top :bgId="0" :backShow="true" :title="title" @back="hide"></v-top>
    <div ref="addsiteContent">
      <form class="addsite-content"  @submit.prevent="submit">
        <div class="addsite-top">联系人</div>
        <div class="addsite-text">姓名:
          <input class="addsite-edtext" type="text" placeholder="请输入收货人姓名" name="addsite-name" v-model="updatatext.name"/></div>
        <div class="addsite-text">电话:
          <input class="addsite-edtext" type="text" placeholder="请输入收货人姓名" name="addsite-tel" v-model="updatatext.tel"/></div>
        <div class="addsite-sex">
          <table class="addsite-sex">
            <tr class="addsite-sex-choice">
              <td>
                <div class="sex" :class="choiceMap[manId]" @click="manClick">
                </div><label class="addsite-sex-lbl">先生</label>
              </td>
              <td>
                <div class="sex" :class="choiceMap[womanId]" @click="womanClick">
                </div><label class="addsite-sex-lbl">女士</label>
              </td>
            </tr>
          </table>
        </div>
        <div class="addsite-top">收货地址</div>
        <div class="addsite-text-detail" @click="showSelect">小区/大厦/学校:
          <span class="addsite-edtext-d" v-show="detailHade">请填写区域</span>
          <span class="addsite-edtext_detail">{{updatatext.detail}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="addsite-text-l">楼号-门牌号:</div>
        <div class="addsite-text-area">
          <div class="addsite-text-last">
            <textarea class="addsite-text-last-edtext" placeholder="请输入详细地址"  v-model="updatatext.doorplate"
                      maxlength="50" onchange="this.value=this.value.substring(0, 50)"
                      onkeydown="this.value=this.value.substring(0, 50)"
                      onkeyup="this.value=this.value.substring(0, 50)"/>
          </div>
        </div>
        <div class="addsite-btn-b">
          <input type="submit" name="btn" class="addsite-btn" value="保存"/>
        </div>
      </form>
    </div>
    <div v-show="detailShow" class="tanchu">
      <div class="outbox">
        <div class="btn-body">
          <div class="body-text">您确定放弃此次编辑？</div>
        </div>
        <div class="btn-base" @click="sure">确定</div>
        <div class="btn-gray" @click="nosure">取消</div>
      </div>
    </div>
    <v-addressSelect ref="addressSelect" @addressMessage="getAddressMessage"></v-addressSelect>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Top from '../../../components/header/head.vue';
  import split from '../../../components/split/split.vue';
  import AddressSelect from './addressSelect.vue';

  export default{
    props: {
      updata: {
        type: Object,
        default() {
          return {
          };
        }
      }
    },
    data() {
      return {
        showFlag2: false,
        title: '111',
        backShow: true,
        selectShow: false,
        addShow: false,
        detailShow: false,
        choiceShow: true,
        manId: 1,
        womanId: 0,
        detailHade: true,
        updatatext: {
          name: '',
          tel: '',
          detail: '',
          doorplate: '',
          sex: ''
        }
      };
    },
    created() {
      this.choiceMap = ['selsct', 'noselect'];
    },
    methods: {
      getAddressMessage(message) {
        console.log(message);
        this.updatatext.detail = message;
        this.detailHade = false;
      },
      showSelect() {
        this.$refs.addressSelect.show();
      },
      show(title, updata) {
        this.title = title;
        if (updata) {
            this.updatatext.name = updata.name;
            this.updatatext.tel = updata.tel;
            this.updatatext.detail = updata.detail;
            this.updatatext.doorplate = updata.doorplate;
            this.updatatext.sex = updata.sex;
            console.log('----xiugai--->' + this.updatatext.name);
            if (this.updatatext.sex === '先生') {
              this.choiceShow = true;
            } else {
              this.choiceShow = false;
            }
            this.detailHade = false;
        } else {
          this.updatatext.name = null;
          this.updatatext.tel = null;
          this.updatatext.detail = null;
          this.updatatext.doorplate = null;
          this.updatatext.sex = null;
          this.detailHade = true;
        }
        this.choice();
        this.showFlag2 = true;
      },
      hide() {
        this.detailShow = true;
      },
      sure() {
        this.detailShow = false;
        this.showFlag2 = false;
        this.title = '';
        this.$emit('scroll');
      },
      nosure() {
        this.detailShow = false;
      },
      submit() {
        if (this.title === '修改收货地址') {
            // 修改地址
          this.updata.name = this.updatatext.name;
          this.updata.tel = this.updatatext.tel;
          this.updata.detail = this.updatatext.detail;
          this.updata.doorplate = this.updatatext.doorplate;
          this.updata.sex = this.updatatext.sex;
          console.log('=====1111111111==============' + this.updata.sex);
          this.sure();
        } else {
          console.log('===姓名==========' + this.updatatext.name);
          console.log('===电话==========' + this.updatatext.tel);
          console.log('===详细地址==========' + this.updatatext.detail);
          console.log('===门牌号==========' + this.updatatext.doorplate);
          console.log('===性别==========' + this.updatatext.sex);
          // 添加地址
          this.sure();
        }
      },
      choice() {
          if (this.choiceShow) {
            this.manId = 0;
            this.womanId = 1;
            this.updatatext.sex = '先生';
          } else {
            this.manId = 1;
            this.womanId = 0;
            this.updatatext.sex = '女士';
          }
      },
      manClick() {
        this.choiceShow = true;
        this.choice();
      },
      womanClick() {
        this.choiceShow = false;
        this.choice();
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
    filters: {
//        getDetail (detail) {
//            if (detail) {
//              this.detailHade = false;
//              return '123456';
//            }
//        }
    },
    components: {
      'v-top': Top,
      split,
      'v-addressSelect': AddressSelect
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin";
  .addsite
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 60px
    background: #f1f1f1
    .tanchu
      position: fixed
      z-index: 100
      top: 0px
      left: 0px
      width: 100%
      height 100%
      border-radius 5px
      overflow: auto
      display flex
      justify-content center
      align-items center
      background rgba(0,0,0,0.3)
      .outbox
        text-align center
        background #fff
        height: 150px
        width: 300px
        border-radius 5px
        position: fixed
        .btn-body
          display: table
          width 100%
          height 104.5px
          line-height: 104.5px
          text-align center
          border-bottom: solid 1px #f3f3f3
          .body-text
            display: table-cell
            vertical-align: middle
            color #000000
        .btn-base
          /*margin-top: 60px*/
          width: 149px
          float: right
          line-height: 45px
          text-align center
          color #fdcf00
          font-size 15px
        .btn-gray
          /*margin-top: 60px*/
          width: 149px
          float: left
          line-height: 45px
          text-align center
          border-right solid 1px #f3f3f3
    .addsite-content
      display inline-block
      width 100%
      .addsite-top
        margin 15px 15px 15px 15px
        width:100%
        font-family "PingFang-SC-Medium"
        font-size 15px
        color #9c9c9c
      .addsite-text
        position: relative
        font-family "PingFang-SC-Medium"
        width 100%
        background: #fff
        color #000000
        font-size 15px
        padding 0 15px 0 15px
        border 0
        border-bottom-1px(rgb(243, 243, 243))
        .addsite-edtext
          display inline-block
          font-family "PingFang-SC-Medium"
          padding-left 10px
          font-size 15px
          height: 45px
          overflow auto
          outline none
          ::-webkit-input-placeholder
            font-family "PingFang-SC-Medium"
            font-size 15px
            color #9c9c9c
          :-moz-placeholder
            font-family "PingFang-SC-Medium"
            font-size 15px
            color #9c9c9c
          ::-moz-placeholder
            font-family "PingFang-SC-Medium"
            font-size 15px
            color #9c9c9c
          :-ms-input-placeholder
            font-family "PingFang-SC-Medium"
            font-size 15px
            color #9c9c9c
      .addsite-text-l
        width 100%
        background #fff
        font-size 15px
        padding 15px 15px 15px 15px
        border-bottom-1px(rgb(243, 243, 243))
      .addsite-edtext-d
        position: relative
        font-family "PingFang-SC-Medium"
        width 100%
        background: #fff
        color #9c9c9c
        font-size 15px
        margin 15px 15px 15px 15px
        border 0
      .addsite-text-detail
        position: relative
        font-family "PingFang-SC-Medium"
        width 100%
        background: #fff
        color #000000
        font-size 15px
        padding 15px 15px 15px 15px
        border 0
        border-bottom-1px(rgb(243, 243, 243))
        .addsite-edtext_detail
          position absolute
          display inline-block
          font-family "PingFang-SC-Medium"
          padding-left 10px
          width 56%
          font-size 15px
        .icon-keyboard_arrow_right
          position: absolute
          top 13px
          font-size: 20px
          right: 40px
      .addsite-text-area
        position relative
        font-family "PingFang-SC-Medium"
        width 100%
        height: 150px
        background: #fff
        border-none()
        .addsite-text-last
          padding-top 20px
          margin: auto 20px auto 15px
          font-size 0
          .addsite-text-last-edtext
            border none
            outline none
            resize none
            width 100%
            height: 110px
            margin 0
            padding 0
            display inline-block
            font-family "PingFang-SC-Medium"
            font-size 15px
            overflow auto
      .addsite-sex
        width 100%
        background #fff
        font-size 0
        padding 13.5px 15px 13.5px 15px
        .addsite-sex-choice
          display: block element
          text-align center
          .sex-choice
            font-size 0
          .sex
            display: inline-block
            width 18px
            height: 18px
            background-size 18px 18px
            background-repeat: no-repeat
            vertical-align middle
            &.selsct
              bg-image('select')
            &.noselect
              bg-image('no_select')
          .addsite-sex-lbl
            vertical-align middle
            margin-top 1.5px
            margin-bottom 1.5px
            margin-left 10px
            font-size 15px
      .addsite-btn-b
        position: absolute
        bottom 0
        width: 100%
        height 48px
        text-align center
        .addsite-btn
          width 100%
          height: 100%
          color #000
          font-family "PingFang-SC"
          font-size 18px
          background #fdcf00
</style>
