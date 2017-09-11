<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue';
  import Tab from 'components/tab/tab.vue';
  export default {
    components: {
      'v-header': MHeader,
      'v-tab': Tab
    }
  };
</script>

<style type="text/stylus" lang="stylus" ref="stylesheet/stylus">
  @import "common/stylus/variable.styl";
  #app
    color $color-theme
</style>
