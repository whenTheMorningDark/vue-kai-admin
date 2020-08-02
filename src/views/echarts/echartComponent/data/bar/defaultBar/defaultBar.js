/* eslint-disable indent */
import {
	defaultTtileKeys
} from "../../../../rightTool/components/commonData/commonData";
export const defaultBar = {
	name: "基础柱状图",
	type: "bar",
	images: require("@/assets/images/bar-simple.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		tooltip: {},
		xAxis: {
			data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
		},
		yAxis: {},
		series: [{
			name: "销量",
			type: "bar",
			data: [5, 20, 36, 10, 10, 20],
		}],
	},
};