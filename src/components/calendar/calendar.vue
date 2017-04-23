<template>
  <div class="calendar">
  	<template v-if="showType === 'month'"> 
	    <table class="day-wrapper">
	    	<tr v-for="week in everyDay" class="week">
	    		<td v-for="day in week[1]" class="day" :width="tdWidth" height="50">{{ day }}</td>
	    	</tr>
	    	<br/>
	    </table>
	  </template>
	  <!-- 日视图 -->
	  <template v-else-if="showType === 'week'">
	  	<table>
	  		<tr>
	  			<td v-for="day in everyDay[week][1]">{{ day }}</td>
	  		</tr>
	  	</table>
	  </template>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	props: {
		month: {
			type: Number,
			default: -1
		},
		week: {
			type: String,
			default: 'three'
		},
		showType: {
			type: String,
			default: 'month'
		},
		tdWidth: {
			type: Number
		}
	},
	data () {
		return {
			// key[0] --- day length for week in this month .. key[1] --- 7 dates in this week
			everyDay: {
				'one': [0, []],
				'two': [0, []],
				'three': [0, []],
				'four': [0, []],
				'five': [0, []],
				'six': [0, []]
			}
		};
	},
	created () {
		this._init();
	},
	computed: {
		...mapState({
			getYear: state => state.year,
			getMonth: state => state.month,
			getDays: state => state.monthDays,
			getFirstDay: state => state.firstDay
		})
	},
	methods: {
		// init
		_init () {
			let month = this.month === -1 ? this.getMonth : this.month;
			this.currentTime();
			this._pushDays();
			this._getDaysArr(month);
		},
		// get current year && month && firstDay
		currentTime () {
			let date = new Date();
			this.$store.commit('GET_MONTH', date.getMonth());
			this.$store.commit('GET_YEAR', date.getFullYear());
		},
		// push day length for 12 month
		_pushDays () {
			for (let i = 1; i < 13; i++) {
				this.$store.commit('GET_DAYS', {
					year: this.getYear,
					month: i
				});
			}
		},
		// get one month days length
		_getEveryAndFirstDay (month) {
			// get firstday in this month
			this.$store.commit('GET_FIRSTDAY', new Date(this.getYear, month, 1).getDay());

			let firstWeek = this.getFirstDay === 7 ? 7 : 7 - this.getFirstDay;
			let monthDays = this.getDays[month];
			let lastWeek = (monthDays - firstWeek) % 7;
			let weeks = Math.floor((monthDays - firstWeek) / 7);

			for (let key in this.everyDay) {
				if (key === 'one') {
					this.everyDay[key][0] = firstWeek;
					continue;
				}
				if (weeks > 0) {
					this.everyDay[key][0] = 7;
					weeks--;
				} else if (weeks === 0) {
					this.everyDay[key][0] = lastWeek;
					weeks--;
				} else {
					this.everyDay[key][0] = 0;
				}
			}
		},
		// get 7 dates in every week
		_getDaysArr (month) {
			this._getEveryAndFirstDay(month);
			console.log(this.everyDay);
			let monthDays = this.getDays[month];
			let prevMonthDays = month === 0 ? this.getDays[11] : this.getDays[month - 1];
			let firstWeek = this.everyDay['one'][0];
			let preDays = 7 - firstWeek;
			let day = 1;

			for (let key in this.everyDay) {
				let length = 7;
				let weekDays = this.everyDay[key][0];
				this.everyDay[key][1] = [];

				if (weekDays === 0) return;
				// first week
				if (key === 'one') {
					while (firstWeek > 0) {
						this.everyDay[key][1].push(day);
						day++;
						firstWeek--;
					}

					while (preDays > 0) {
						this.everyDay[key][1].unshift(prevMonthDays);
						prevMonthDays--;
						preDays--;
					}

					continue;
				}
				// last weeks
				if (this.everyDay[key][0] === 7) {
					while (length > 0) {
						this.everyDay[key][1].push(day);
						day++;
						length--;
					}
				} else if (weekDays !== 0) {
					let lastDays = 7 - weekDays;
					let lastDay = 1;

					while (day <= monthDays) {
						this.everyDay[key][1].push(day);
						day++;
					}

					while (lastDays > 0) {
						this.everyDay[key][1].push(lastDay);
						lastDay++;
						lastDays--;
					}
				}
			}
		}
	}
};
</script>

<style lang="stylus" >
	.calendar
		width: 100%
		.day-wrapper
			.week
				.day
					margin: 10px
  	
      
</style>
