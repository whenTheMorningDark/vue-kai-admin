/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
import { xData } from "../../../../rightTool/components/commonData/xData";
import { cloneDeep } from "lodash";
let currentXdata = {
	data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
};
export const defaultBar = {
	name: "基础柱状图",
	type: "bar",
	images: require("@/assets/images/bar-simple.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		legend: legendData,
		tooltip: {},
		xAxis: Object.assign({}, cloneDeep(xData), currentXdata),
		yAxis: {},
		series: [
			{
				name: "销量",
				type: "bar",
				data: [5, 20, 36, 10, 10, 20],
			},
		],
	},
};
