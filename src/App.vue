<template>
  <div id="app">
    <img src="./assets/logo.png">
    <calendar></calendar>
    <router-view></router-view>
  </div>
</template>

<script>
import calendar from 'components/calendar/calendar';

export default {
  components: {
    'calendar': calendar
  }
};
</script>

<style lang="stylus" >
  #app
    margin: 0 auto
      

</style>
