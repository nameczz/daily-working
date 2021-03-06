import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import getters from './getters.js';

Vue.use(Vuex);

const state = {
	// 12 month days
	monthDays: [],
	// current year
	year: 2017,
	month: 8,
	firstDay: 1,
	today: [],
	createdYears: {}
};

// Store实例

export default new Vuex.Store({
	state,
	getters,
	mutations
});

