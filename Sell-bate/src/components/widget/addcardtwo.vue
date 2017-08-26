<template>
  <div class="compu" v-if="showaddtwo">
    <div class="title">
      <div class="back" @click="hide()"><img height="18px" width="10px" src="./back.png"></div>
      <div class="titleword">添加银行卡</div>
    </div>
    <div class="please">请填写该银行卡预留的手机号</div>
    <div class="phone">手机号:<input type="tel" placeholder="填写手机号" style="outline: none;" class="phonetext" @input="inputnumber"  maxlength="11" v-model="desphone" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"></div>
    <div class="verification">
      <div class="verificationwrite">验证码:<input type="text" placeholder="填写验证码" style="outline: none;" class="verificationtext" v-model="desverifi" @input="inputveri"></div>
      <div class="verificationget" v-show="verificationget">发送验证码</div>
      <button class="verificationgetok" v-show="verificationgetok" @click="send">
        <!--<span v-show="sendMsgDisabled">{{time+'秒'}}</span>-->
        <span>发送验证码</span>
      </button>
      <div class="verificationgetsub" v-show="sendMsgDisabled">
        <span>{{time+'秒'}}</span>
      </div>
    </div>
    <div class="nextdo">
      <div class="nextdook" v-show="nextdo">完成</div>
      <div class="oknextdook" v-show="oknextdo" @click="oknext">完成</div>
    </div>
    <!--<v-pay ref="pay" @scroll="toggleScroll"></v-pay>-->
  </div>
</template>

<script type="text/ecmascript-6">
  //  import pay from '../../views/order/pay/pay.vue';
  export default{
    data() {
      return {
        sendMsgDisabled: false,
        desverifi: '',
        desphone: '',
        vertime: '60',
        verificationget: true,
        verificationgetok: false,
        verificationgetsub: false,
        showaddtwo: false,
        nextdo: true,
        oknextdo: false,
        time: 60
      };
    },
    methods: {
      send() {
        let me = this;
        me.verificationgetok = false;
        me.sendMsgDisabled = true;
        let interval = window.setInterval(function() {
          if ((me.time--) <= 0) {
            me.time = 60;
            me.verificationgetok = true;
            me.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
//      send: function(event) {
//        var t = 5;
//       this.verificationget = false;
//        this.verificationgetok = false;
//        this.verificationgetsub = true;
//        event = this.verificationgetsub;
//        event.target.disabled = false;
//        setInterval(function() {
//          if (t > 0) {
//            this.vertime = t--;
//            event.target.innerHTML = t--;
//            event.target.disabled = false;
//            console.log(this.vertime);
//          } else {
//            window.clearInterval(0);
//            event.target.innerHTML = '再次验证';
//            event.target.disabled = false;
//           this.verificationget = false;
//           this.verificationgetok = true;
//            this.verificationgetsub = false;
//          }
//        }, 1000);
//      },
      oknext() {
        console.log('手机号' + this.desphone);
        console.log('验证码' + this.desverifi);
        this.showaddtwo = false;
        this.$emit('childToParentMsg', '1');
//        this.showaddtwo = false;
//        this.addcard.false();
//        this.toggleScroll();
      },
//      toggleScroll() {
//        this.isHide = !this.isHide;
//        this.$emit('nav');
//      },
      show() {
        this.showaddtwo = true;
      },
      hide() {
        this.showaddtwo = false;
        this.$emit('scroll');
      },
      inputnumber() {
        var txtVal1 = this.desphone.length;
        this.remnant = txtVal1;
        if (txtVal1 !== 11) {
          this.verificationget = true;
          this.verificationgetok = false;
        } else {
          this.verificationget = false;
          this.verificationgetok = true;
        }
        var txtVal2 = this.desverifi.length;
        this.remnant = txtVal2;
        if (txtVal1 !== 0 && txtVal2 !== 0) {
          this.nextdo = false;
          this.oknextdo = true;
        } else {
          this.nextdo = true;
          this.oknextdo = false;
        }
      },
      inputveri() {
        var txtVal1 = this.desphone.length;
        this.remnant = txtVal1;
        var txtVal2 = this.desverifi.length;
        this.remnant = txtVal2;
        if (txtVal1 !== 0 && txtVal2 !== 0) {
          this.nextdo = false;
          this.oknextdo = true;
        } else {
          this.nextdo = true;
          this.oknextdo = false;
        }
      },
      components: {
//        'v-pay': pay
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .compu
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
  .phone
    height: 45px
    background: #fff
    margin-bottom: 1px
    line-height: 45px
    padding-left: 15px
    .phonetext
      margin-left: 10px
      width: 290px
  /*input::-webkit-input-placeholder*/
  /*padding-left: 10px*/
  .verification
    height: 45px
    background: #fff
    .verificationwrite
      height:45px
      width: 275
      line-height: 45px
      padding-left: 15px
      float: left
      .verificationtext
        margin-left: 10px
    /*.input::-webkit-input-placeholder*/
    /*padding-left: 10px*/
    .verificationget
      width: 100px
      height: 45px
      float: right
      background: #c4c4c4
      line-height: 45px
      text-align: center
    .verificationgetok
      width: 100px
      height: 45px
      float: right
      background: #FDCF00
      line-height: 45px
      text-align: center
    .verificationgetsub
      width: 100px
      height: 45px
      float: right
      background: #c4c4c4
      color: #ffffff
      line-height: 45px
      text-align: center
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
