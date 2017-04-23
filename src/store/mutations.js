import {
	GET_DAYS,
	GET_MONTH,
	GET_YEAR,
	GET_FIRSTDAY,
	GET_TODAY
} from './mutation-types.js';
import Vue from 'vue';

export default {
	// time should includes year && month
	[GET_DAYS] (state, time) {
		let day = new Date(time.year, time.month, 0).getDate();
		if (state.monthDays[time.month - 1]) {
			Vue.set(state.monthDays, time.month - 1, day);
		} else {
			state.monthDays[time.month - 1] = day;
		}
	},
	[GET_MONTH] (state, month) {
		state.month = month;
	},
	[GET_YEAR] (state, year) {
		state.year = year;
	},
	[GET_FIRSTDAY] (state, firstDay) {
		state.firstDay = firstDay;
	},
	[GET_TODAY] (state) {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		state.today.push(year, month, day);
	}
};
