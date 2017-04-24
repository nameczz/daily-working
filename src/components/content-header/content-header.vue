<template>
  <div class="content-header">
    <table class="nav">
      <tr>
        <td v-for="day in week" :width="tdWidth">{{ day }}</td>
      </tr>
    </table>
    <ul class="calendar-wrapper" id="calendar-wrapper">
      <li v-for="month in year" class="month">
        <calendar :td-width="tdWidth" :month="month"></calendar>
      </li>
    </ul>
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
  data () {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      year: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
  },
  mounted () {
    this.wrapperWidth;
  },
  watch: {
    // watch props---width, ul width binding with width change
    width (val) {
      this.width = val;
      this.wrapperWidth;
    }
  },
  computed: {
    // set td width
    tdWidth () {
      let width = Math.floor(this.width / 7);
      return width;
    },
    // get && set ul width
    wrapperWidth () {
      let width = this.width * 12;
      let calendarBox = document.getElementById('calendar-wrapper');
      calendarBox.style.width = `${width}px`;
    }
  },
  components: {
    'calendar': calendar
  }
};
</script>

<style lang="stylus" >
  .content-header
    padding-top: 20px
    .nav
      margin-bottom: 30px
      text-align: center
    .calendar-wrapper
      overflow: hidden
      font-size: 0
      .month
        display: inline-block
        vertical-align: top
        font-size: 16px
</style>
