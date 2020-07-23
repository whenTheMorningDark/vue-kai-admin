/* eslint-disable indent */
const state = {
	currentTarget: {}, // 当前单选的对象
};
const mutations = {
	// 设置当前的对象
	setCurrentTarget(state, target) {
		state.currentTarget = target;
	},
	changeCurrentTagetAttr(state, { key, value }) {
		state.currentTarget[key] = value;
	},
};
const actions = {};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
