<template>
  <div class="calendar">
    <table>
    	<tr>
    		<td v-for="day in week">{{ day }}</td>
    	</tr>
    	<tr>
    		<td v-for="day in week">{{ day }}</td>
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
			everyDay: {
				'one': [],
				'two': [],
				'three': [],
				'four': [],
				'five': [],
				'six': []
			}
		};
	},
	created () {
		this.init();
		console.log(this.getYear);
		console.log(this.getMonth);
		console.log(this.getFirstDay);
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
		init () {
			this.currentTime();
			this.pushDays();
			this.getEveryAndFirstDay();
		},
		// get current year && month && firstDay
		currentTime () {
			let date = new Date();
			this.$store.commit('GET_MONTH', date.getMonth());
			this.$store.commit('GET_YEAR', date.getFullYear());
		},
		// push day lenth for 12 month
		pushDays () {
			for (let i = 1; i < 13; i++) {
				this.$store.commit('GET_DAYS', {
					year: this.getYear,
					month: i
				});
			}
		},
		// get one month day length
		getEveryAndFirstDay () {
			let	firstDay = new Date(this.getYear, this.getMonth, 1).getDay();
			let firstWeek = firstDay === 7 ? 7 : 7 - firstDay;

			this.$store.commit('GET_FIRSTDAY', firstDay);
			console.log(firstWeek);
		}
	}
};
</script>

<style lang="stylus" >
  
      

</style>
