<template>
  <div class="content-header">
    <table class="nav">
      <tr>
        <td v-for="day in week" :width="tdWidth">{{ day }}</td>
      </tr>
    </table>
    <div ref="calendarWrapper">
      <ul class="calendar-wrapper" id="calendar-wrapper" >
        <li v-for="month in year" class="month">
          <calendar :td-width="tdWidth" :month="month"></calendar>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import calendar from 'components/calendar/calendar';
import BScroll from 'better-scroll';

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
      year: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      oldPos: 0,
      endPos: 0
    };
  },
  created () {
    this.$nextTick(() => {
      this._initScroll();
    });
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
  methods: {
    // make calendar move
    _initScroll () {
      this.calendarScroll = new BScroll(this.$refs.calendarWrapper, {
        startX: -this.width * this.$store.state.month + this.$store.state.month + 1,
        scrollX: true,
        probeType: 3
      });

      this.calendarScroll.on('scrollStart', () => {
        this.oldPos = this.calendarScroll.startX;
      });

      this.calendarScroll.on('scroll', (pos) => {
        this.endPos = pos.x;
      });

      this.calendarScroll.on('scrollEnd', () => {
        let moveLine = Math.floor(this.width / 2);
        console.log(moveLine);
        console.log(Math.abs(this.oldPos - this.endPos));
        if (Math.abs(this.oldPos - this.endPos) < moveLine) {
          this.calendarScroll.scrollTo(this.oldPos, this.calendarScroll.startY);
        }
      });
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
