<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="calendar-view">
      <div class="calendar-wrapper">
        <template v-for="month in year">
          <calendar :month="month" class="month"></calendar>
        </template>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
import calendar from 'components/calendar/calendar';

export default {
  data () {
    return {
      year: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
  },
  components: {
    'calendar': calendar
  }
};
</script>

<style lang="stylus" >
  .calendar-view
    width: 140px
    overflow: hidden
    overflow-x:scroll
    .calendar-wrapper
      width: 3000px
      .month
        display: inline-block
        

</style>
