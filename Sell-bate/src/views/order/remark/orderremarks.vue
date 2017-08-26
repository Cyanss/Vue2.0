<template>
  <div class="tie" v-if="showFlag">
    <div class="compu" >
      <div>
        <div class="title">
          <div class="back" @click="hide()"><img height="18px" width="10px" src="./back.png"></div>
          <div class="titleword">订单备注</div>
        </div>
        <div class="box">
          <textarea id="textbody" style="padding:0;border: none;outline: none;resize:none;" placeholder="请输入备注内容" maxlength="50" @input="descInput" v-model="desccText" class="boxbody"></textarea>
          <div class="boxword">
            <div class="boxnumber"><span>{{remnant}}</span>/50字
            </div>
          </div>
        </div>
        <div class="ok">
          <div v-show="nookbutton" class="nookbutton">确定</div>
          <div v-show="okbutton" class="okbutton"  @click="okok">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      descc: ''
    },
    data() {
      return {
        desccText: '',
        remnant: 0,
        nookbutton: true,
        okbutton: false,
        showFlag: false
      };
    },
    methods: {
      show() {
        this.desccText = this.descc;
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
        this.$emit('scroll');
      },
      toggleScroll() {
        this.isHide = !this.isHide;
        this.$emit('nav');
      },
      descInput() {
        let txtVal = this.desccText.length;
        this.remnant = txtVal;
        if (txtVal !== 0) {
          this.nookbutton = false;
          this.okbutton = true;
        } else {
          this.nookbutton = true;
          this.okbutton = false;
        }
      },
      okok() {
        // this.descc = this.desccText;
        this.$emit('child-say', this.desccText);
        this.hide();
      }
    }
  };
</script>

<style lang="stylus"  type="text/stylus" rel="stylesheet/stylus">
  .compu
    position fixed
    z-index 100px
    background: #F1F1F1
    width: 100%
    height: 834px
    margin: 0
    padding: 0
    top 0
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
  .box
    width: 375px
    font-size: 15px
    height: 150px
    background: #fff
    .boxbody
      font-family "PingFang SC Medium"
      height: 130px
      width: 345px
      font-size: 18px
      margin-left: 15px
      margin-right: 15px
      margin-top: 15px
    .boxword
      height: 20px
      width: 100%
      background: #fff
      color: #9c9c9c
      text-align: right
      font-size: 15px
      .boxnumber
        margin-right: 10px
  .ok
    .nookbutton
      margin-top: 105px
      margin-left: 15px
      width: 345px
      height: 45px
      background: #c4c4c4
      line-height: 45px
      line-width: 345px
      text-align: center
      color: #ffffff
      border-radius: 5px
    .okbutton
      margin-top: 105px
      margin-left: 15px
      width: 345px
      height: 45px
      background: #FDCF00
      line-height: 45px
      line-width: 345px
      text-align: center
      color: #37373D
      border-radius: 5px
</style>
