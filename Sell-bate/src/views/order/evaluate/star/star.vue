<template>
  <div>
    <p class="all" >
      <input type="radio" value="0" v-model="inputdata" />
      <span>★</span>
      <input type="radio" value="1" v-model="inputdata" />
      <span>★</span>
      <input type="radio" value="2" v-model="inputdata" />
      <span>★</span>
      <input type="radio" value="3" v-model="inputdata" />
      <span>★</span>
      <input type="radio" value="4" v-model="inputdata" />
      <span>★</span>
      <input type="radio" value="5" v-model="inputdata" />
      <span>★</span>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputdata: '5'
      };
    },
    methods: {
      onClickMe() {
//        console.log(this.inputdata.value);
        this.$emit('child-say', this.inputdata.value);
      }
    },
    watch: {
      inputdata(value) {
//        console.log('-----子-------->' + value);
        this.$emit('child-say', value);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixin.styl"

  .all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{font-size:1.5em;color:gold;
    -webkit-transition:color .2s;
    transition:color .2s;
  }
  .all>input:checked~span{color:#666;}
  .all>input:checked+span{color:gold;}
</style>
