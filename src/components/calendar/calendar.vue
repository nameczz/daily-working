<template>
  <div class="calendar">
    <table>
    	<tr>
    		<td v-for="day in week">{{ day }}</td>
    	</tr>
    	<tr v-for="week in everyDay">
    		<td v-for="day in week[1]">{{ day }}</td>
    	</tr>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	data () {
		return {
			week: ['日', '一', '二', '三', '四', '五', '六'],
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
			this.currentTime();
			this._pushDays();
			this._getEveryAndFirstDay();
			this._getDaysArr();
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
		_getEveryAndFirstDay () {
			this.$store.commit('GET_FIRSTDAY', new Date(this.getYear, this.getMonth, 1).getDay());

			let firstWeek = this.getFirstDay === 7 ? 7 : 7 - this.getFirstDay;
			let monthDays = this.getDays[this.getMonth];
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
		_getDaysArr () {
			let monthDays = this.getDays[this.getMonth];
			let prevMonthDays = this.getDays[this.getMonth - 1];
			let firstWeek = this.everyDay['one'][0];
			let preDays = 7 - firstWeek;
			let day = 1;

			for (let key in this.everyDay) {
				let length = 7;
				this.everyDay[key][1] = [];

				if (this.everyDay[key][0] === 0) return;
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

				if (this.everyDay[key][0] === 7) {
					while (length > 0) {
						this.everyDay[key][1].push(day);
						day++;
						length--;
					}
				} else if (this.everyDay[key][0] !== 0) {
					let lastDays = 7 - this.everyDay[key][0];
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
			console.log(this.everyDay);
		}
	}
};
</script>

<style lang="stylus" >
  
      

</style>
