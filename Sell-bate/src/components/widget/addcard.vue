<template>
  <div class="compu" v-if="addcardShow">
    <div class="title">
      <div class="back" @click="hide()"><img height="18px" width="10px" src="./back.png"></div>
      <div class="titleword">添加银行卡</div>
    </div>
    <div class="please">请绑定持卡人本人的银行卡</div>
    <div class="cardpeople">制卡人:<input type="text" placeholder="输入您的姓名" style="margin-left:10px;height:45px;width: 290px;outline: none;" @input="inputname" v-model="desk"></div>
    <div class="cardnumber">卡 号:<input type="tel" placeholder="无需网银/免手续费" style="margin-left:10px;height:45px;width: 290px;outline: none;" @input="inputnumber"  maxlength="17" v-model="descc" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"></div>
    <div class="nextdo">
      <div class="nextdook" v-show="nextdo">下一步</div>
      <div class="oknextdook" v-show="oknextdo" @click="oknext">下一步</div>
    </div>
    <v-card ref="addcardtwo" @scroll="toggleScroll" v-on:childToParentMsg="showChildToParentMsg"></v-card>
    <!--<editor id="editor" class="editor" @ee="cc"></editor>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import addcardtwo from './addcardtwo.vue';
  export default{
    data() {
      return {
        bank: '',
        descc: '',
        desk: '',
        number: '',
        oldNum: 0,
        nextdo: true,
        oknextdo: false,
        addcardShow: false
      };
    },
    methods: {
//      cc: function (str) {
//        this.addcardShow = false;
//      },
      showChildToParentMsg: function(data) {
        this.$emit('payfang', '1');
        this.addcardShow = false;
      },
      show() {
        this.addcardShow = true;
      },
      oknext() {
        if (this.descc.charAt(1) === 1) {
          this.bank = '工商银行';
        } else if (this.descc.charAt(1) === 2) {
          this.bank = '农业银行';
        } else {
          this.bank = '人民银行';
        }
        console.log('银行' + this.bank);
        console.log('姓名' + this.desk);
        console.log('银行卡' + this.descc);
//        this.addcardShow = false;
        this.$refs.addcardtwo.show();
//        this.toggleScroll();
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      hide() {
        this.addcardShow = false;
        this.$emit('scroll');
      },
      inputname() {
        var txtVal1 = this.desk.length;
        this.remnant = txtVal1;
        var txtVal2 = this.descc.length;
        this.remnant = txtVal2;
        if (txtVal1 !== 0 && txtVal2 !== 0) {
          this.nextdo = false;
          this.oknextdo = true;
        } else {
          this.nextdo = true;
          this.oknextdo = false;
        }
      },
      inputnumber() {
        var txtVal1 = this.desk.length;
        this.remnant = txtVal1;
        var txtVal2 = this.descc.length;
        this.remnant = txtVal2;
        if (txtVal1 !== 0 && txtVal2 !== 0) {
          this.nextdo = false;
          this.oknextdo = true;
        } else {
          this.nextdo = true;
          this.oknextdo = false;
        }
      }
    },
    components: {
      'v-card': addcardtwo
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .compu
    position fixed
    z-index 60
    top: 0px
    background: #F1F1F1
    width: 100%
    height: 834px
    margin: 0px
    padding: 0px
  .title
    height: 50px
    background: #4D4D4D
    line-height: 50px
    text-align: center
    .back
      float: left
      margin-left: 15px
    .titleword
      color: #fff
      margin-left: 130px
      float: left
  .please
    height: 45px
    color: #9c9c9c
    margin-left: 15px
    line-height: 45px
  .cardpeople
    height: 45px
    background: #fff
    margin-bottom: 1px
    line-height: 45px
    padding-left: 15px
  /*input::-webkit-input-placeholder*/
  /*padding-left: 10px*/
  .cardnumber
    height: 45px
    background: #fff
    line-height: 45px
    padding-left: 15px
    padding-right: 10px
  /*input::-webkit-input-placeholder*/
  /*padding-left: 10px*/
  .nextdo
    .nextdook
      margin-top: 100px
      margin-left: 15px
      width: 345px
      height: 45px
      background: #c4c4c4
      line-height: 45px
      line-width: 345px
      text-align: center
      color: #fff
      border-radius: 5px
    .oknextdook
      margin-top: 100px
      margin-left: 15px
      width: 345px
      height: 45px
      background: #fdcf00
      line-height: 45px
      line-width: 345px
      text-align: center
      color: #37373b
      border-radius: 5px
</style>
