import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import getters from './getters.js';

Vue.use(Vuex);

const state = {
	// 12 month days
	monthDays: [],
	num: 0
};

// Store实例

export default new Vuex.Store({
	state,
	getters,
	mutations
});

