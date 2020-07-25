/* eslint-disable indent */
import Vue from "vue";
const state = {
	currentTarget: {}, // 当前单选的对象
	echartArr: [] // echart对象集合
};
const mutations = {
	// 设置当前的对象
	setCurrentTarget(state, target) {
		state.currentTarget = target;
	},
	// 设置当前echart对象集合
	setEchartArr(state, arr) {
		state.echartArr = arr;
	},
	changeCurrentTagetAttr(state, {
		key,
		value
	}) {
		state.currentTarget[key] = value;
	},
	// 改变当前对象的optionsData方法
	changeCurrentTagetOptions(state, {
		attr,
		key,
		value
	}) {
		Vue.set(state.currentTarget.optionsData[attr], key, value);
		console.log(state.currentTarget);
		let targetEchart = state.echartArr.find(v => v.id === state.currentTarget.id);
		targetEchart.setOption(state.currentTarget.optionsData);
	}
};
const actions = {};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};