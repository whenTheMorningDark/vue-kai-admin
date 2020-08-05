/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { cloneDeep } from "lodash";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
import { xData } from "../../../../rightTool/components/commonData/xData";
let currentLegendData = {
	data: ["bar", "bar2"],
};
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
	xAxisData.push("类目" + i);
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
let currentXdata = {
	data: xAxisData,
	splitLine: {
		show: false,
	},
};
export const barAnimationDelay = {
	name: "柱状图动画延迟",
	type: "bar",
	images: require("@/assets/images/bar-animation-delay.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		legend: Object.assign({}, cloneDeep(legendData), currentLegendData),
		toolbox: {
			// y: 'bottom',
			feature: {
				magicType: {
					type: ["stack", "tiled"],
				},
				dataView: {},
				saveAsImage: {
					pixelRatio: 2,
				},
			},
		},
		tooltip: {},
		xAxis: Object.assign({}, cloneDeep(xData), currentXdata),
		yAxis: {},
		series: [
			{
				name: "bar",
				type: "bar",
				data: data1,
				animationDelay: function(idx) {
					return idx * 10;
				},
			},
			{
				name: "bar2",
				type: "bar",
				data: data2,
				animationDelay: function(idx) {
					return idx * 10 + 100;
				},
			},
		],
		animationEasing: "elasticOut",
		animationDelayUpdate: function(idx) {
			return idx * 5;
		},
	},
};
