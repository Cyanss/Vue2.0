<template>
  <div v-if="showFlag" class="address-select">
    <v-header :title="title" :bgId="0" :colorId="1" :okShow="true" :backShow="true" @back="hide" @ok="setOk" ></v-header>
    <div class="address-select-content">
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
              src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
      </iframe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../../components/header/head.vue';
  export default{
    data() {
      return {
        addressMessage: '',
        showFlag: false,
        title: '选择收货地址',
        urlApi: 'http://apis.map.qq.com/ws/place/v1/suggestion',
        key: 'WGRBZ-MO23P-5RFDF-L5EFX-5L4OF-L5FQU'
      };
    },
    created() {
      this.getSelectAddress();
    },
    methods: {
      setOk() {
        this.$emit('addressMessage', this.addressMessage);
        this.hide();
      },
      getSelectAddress() {
        window.addEventListener('message', (event) => {
          let location = event.data;
          if (location && location.module === 'locationPicker') {
            this.addressMessage = location.poiaddress;
          }
        }, false);
      },
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    },
    components: {
      'v-header': Header
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .address-select
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background white
    z-index 100
    .address-select-content
      display block
      width 100%
      height 100%
</style>
