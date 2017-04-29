<template>
  <div class="content-header">
    <table class="nav">
      <tr>
        <td v-for="day in week" :width="tdWidth">{{ day }}</td>
      </tr>
    </table>
    <div ref="calendarWrapper">
      <ul class="calendar-wrapper" id="calendar-wrapper" >
        <template v-for="(value, key) in getCreatedYears">          
          <li v-for="month in value" class="month" :style="{ width: width + 'px' }"> 
            <h1 style="text-align: center">{{month}} + {{key}}</h1>
            <calendar :td-width="tdWidth" :month="month" :year="parseInt(key)"></calendar>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import calendar from 'components/calendar/calendar';
import BScroll from 'better-scroll';
import {mapState} from 'vuex';

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
      endPos: 0,
      gap: 20,
      // earlierYear: you need to create earlier years
      earlierYear: 1,
      // laterYear: you need to create later years
      laterYear: 5
    };
  },
  created () {
    this._pushYears();
    this.$nextTick(() => {
      this._initScroll();
    });
    console.log(this.getCreatedYears);
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
      let num = this.width % 7;
      return (this.width - num) / 7;
    },
    // get && set ul width
    wrapperWidth () {
      let width = this.width * 12 * (this.earlierYear + this.laterYear + 1) + this.width / 2;
      let calendarBox = document.getElementById('calendar-wrapper');
      calendarBox.style.width = `${width}px`;
    },
    ...mapState({
      getYear: state => state.year,
      getMonth: state => state.month,
      getDays: state => state.monthDays,
      getFirstDay: state => state.firstDay,
      getCreatedYears: state => state.createdYears
    })
  },
  methods: {
    // make calendar move
    _initScroll () {
      this.calendarScroll = new BScroll(this.$refs.calendarWrapper, {
        startX: 0,
        scrollX: true,
        probeType: 3,
        momentum: false
      });

      this.calendarScroll.on('scrollStart', () => {
        this.oldPos = this.calendarScroll.startX;
      });

      this.calendarScroll.on('scroll', (pos) => {
        this.endPos = pos.x;
      });

      this.calendarScroll.on('scrollEnd', () => {
        let moveLine = Math.floor(this.width / 2) - Math.floor(this.width / 8);
        let that = this;
        let gap = this.gap;
        console.log(this.width);
        console.log(this.oldPos);
        if (Math.abs(this.oldPos - this.endPos) < moveLine) {
          // right
          if (this.oldPos > this.endPos) {
            let runId = setInterval(function () {
              that.calendarScroll.scrollTo(that.endPos, that.calendarScroll.startY);
              if (that.endPos < that.oldPos) {
                that.endPos += gap;
              } else {
                that.calendarScroll.scrollTo(that.oldPos, that.calendarScroll.startY);
                clearInterval(runId);
              }
            }, 10);
          } else {
            // left
           let runId = setInterval(function () {
              that.calendarScroll.scrollTo(that.endPos, that.calendarScroll.startY);
              if (that.endPos > that.oldPos) {
                that.endPos -= gap;
              } else {
                that.calendarScroll.scrollTo(that.oldPos, that.calendarScroll.startY);
                clearInterval(runId);
              }
            }, 10);
          }
        } else {
          if (this.oldPos > this.endPos) {
            let destination = this.oldPos - this.width;
            let runId = setInterval(function () {
              that.calendarScroll.scrollTo(that.endPos, that.calendarScroll.startY);
              if (that.endPos > destination) {
                that.endPos -= gap;
              } else {
                that.calendarScroll.scrollTo(destination, that.calendarScroll.startY);
                clearInterval(runId);
              }
            }, 10);
          } else {
            let destination = this.oldPos + this.width;
            let runId = setInterval(function () {
              that.calendarScroll.scrollTo(that.endPos, that.calendarScroll.startY);
              if (that.endPos < destination) {
                that.endPos += gap;
              } else {
                that.calendarScroll.scrollTo(destination, that.calendarScroll.startY);
                clearInterval(runId);
              }
            }, 10);
          }
        }
      });
    },
    _pushYears () {
      let currentYear = this.getYear;
      let beginYear = currentYear - this.earlierYear;
      let endYear = currentYear + this.laterYear;
      for (let i = beginYear; i <= endYear; i++) {
        this.$store.commit('GET_CREATEDYEARS', i);
      }
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
