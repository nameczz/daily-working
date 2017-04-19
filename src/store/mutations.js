import {
	GET_DAYS
} from './mutation-types.js';
import Vue from 'vue';

export default {
	// time should includes year && month
	[GET_DAYS] (state, time) {
		let day = new Date(time.year, time.month, 0).getDate();
		Vue.set(state.monthDays, time.month - 1, day);
	}
};
