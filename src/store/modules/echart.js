/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import Vue from "vue";

// eslint-disable-next-line require-jsdoc
export function getPropByPath(obj, path, strict) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, ".$1");
	path = path.replace(/^\./, "");

	let keyArr = path.split(".");
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) {
			break;
		}
		let key = keyArr[i];
		if (key in tempObj) {
			tempObj = tempObj[key];
		} else {
			if (strict) {
				throw new Error("please transfer a valid prop path to form item!");
			}
			break;
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null,
	};
}
// eslint-disable-next-line require-jsdoc
function getValueByPath(object, prop) {
	prop = prop || "";
	const paths = prop.split(".");
	let current = object;
	let result = null;
	for (let i = 0, j = paths.length; i < j; i++) {
		const path = paths[i];
		if (!current) {
			break;
		}

		if (i === j - 1) {
			result = current[path];
			break;
		}
		current = current[path];
	}
	return result;
	// console.log(result);
}

const state = {
	currentTarget: {}, // 当前单选的对象
	echartArr: [], // echart对象集合
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
	changeCurrentTagetAttr(state, { key, value }) {
		state.currentTarget[key] = value;
	},
	// 改变当前对象的optionsData方法
	changeCurrentTagetOptions(state, { attr, key, value }) {
		let targetObj = state.currentTarget.optionsData[attr];
		let paddingArr = {
			paddingTop: 0,
			paddingRight: 1,
			paddingBottom: 2,
			paddingLeft: 3,
		};
		if (Object.keys(paddingArr).includes(key)) {
			let searchKeys = "padding";
			let { o, k } = getPropByPath(targetObj, searchKeys);
			Vue.set(o, k[paddingArr[key]], value);
		} else {
			console.log(getPropByPath(targetObj, key));
			let { o, k } = getPropByPath(targetObj, key);
			Vue.set(o, k, value);
		}
		// let { o, k } = getPropByPath(targetObj, key);
		// Vue.set(o, k, value);
		let targetEchart = state.echartArr.find(
			(v) => v.id === state.currentTarget.id
		);
		targetEchart.setOption(state.currentTarget.optionsData);
	},
};
const actions = {};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
