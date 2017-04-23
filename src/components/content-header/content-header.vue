<template>
  <div class="content-header">
    <calendar :td-width="width"></calendar>
  </div>
</template>

<script>
import calendar from 'components/calendar/calendar';

export default {
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed: {
    tdWidth () {
      let width = Math.floor(this.width / 7);
      return width;
    }
  },
  components: {
    'calendar': calendar
  }
};
</script>

<style lang="stylus" >
 
</style>
