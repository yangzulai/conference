<template>
  <div id="app">
    <status-bar v-if="isDesktop"></status-bar>
    <header-tab v-if="isDesktop"></header-tab>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import StatusBar from './components/statusBar';
  import headerTab from './components/headerTab.vue'
  export default {
    data() {
      return {
      }
    },
    components: {
      "status-bar": StatusBar,
      "header-tab": headerTab
    }
  }
</script>
<style>

</style>

