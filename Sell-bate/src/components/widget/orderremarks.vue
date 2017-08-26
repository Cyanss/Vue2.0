<template>
  <div class="compu">
  <div>
    <div class="title">
      <div class="back"><img height="20px" width="16px" src="./back.png"></div>
      <div class="titleword">订单备注</div>
    </div>
    <div class="box">
      <textarea style="padding:0;border: none;outline: none;" placeholder="请输入备注内容" maxlength="50" @input="descInput" v-model="descc" class="boxbody"></textarea>
      <!--<textarea placeholder="填写服务备注" rows="3" maxlength="50" @input="descInput" v-model="desc" class="boxbody"></textarea>-->
      <div class="boxword"><span>{{remnant}}</span>/50</div>
    </div>
    <div class="ok">
      <div class="okbutton">确定</div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        remnant: 0,
        descc: ''
      };
    },
    methods: {
      descInput() {
        var txtVal = this.descc.length;
        this.remnant = txtVal;
      }
    }
  };
</script>

<style lang="stylus"  type="text/stylus" rel="stylesheet/stylus">
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
       /*margin-top: 6px*/
     .titleword
       color: #fff
       margin-left: 130px
       float: left
   .box
      font-size: 15px
      height: 150px
      background: #fff
      textarea::-webkit-input-placeholder
       padding-left: 15px
       padding-top: 15px
      .boxbody
        height: 130px
        width: 100%
      .boxword
        height: 20px
        width: 100%
        background: #fff
        text-align: right
        padding-right: 10px
        margin-bottom: 15px
   .ok
      .okbutton
        margin-top: 105px
        margin-left: 15px
        width: 345px
        height: 45px
        background: #FDCF00
        line-height: 45px
        line-width: 345px
        text-align: center
        color: #fff
        border-radius: 5px
</style>
