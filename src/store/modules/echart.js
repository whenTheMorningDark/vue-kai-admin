/* eslint-disable indent */
const state = {
	currentTarget: {}, // 当前单选的对象
};
const mutations = {
	setCurrentTarget(state, target) {
		console.log(target);
		state.currentTarget = target;
	},
};
const actions = {};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
