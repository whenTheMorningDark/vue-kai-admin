/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
import { cloneDeep } from "lodash";
let currentLegendData = {
	data: ["支出", "收入"],
	left: 10,
	show: true,
};
export const barWaterfall = {
	name: "阶梯瀑布图",
	type: "bar",
	images: require("@/assets/images/bar-waterfall2.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(params) {
				var tar;
				if (params[1].value !== "-") {
					tar = params[1];
				} else {
					tar = params[0];
				}
				return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
			},
		},
		legend: Object.assign({}, cloneDeep(legendData), currentLegendData),
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			splitLine: {
				show: false,
			},
			data: (function() {
				var list = [];
				for (var i = 1; i <= 11; i++) {
					list.push("11月" + i + "日");
				}
				return list;
			})(),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "辅助",
				type: "bar",
				stack: "总量",
				itemStyle: {
					barBorderColor: "rgba(0,0,0,0)",
					color: "rgba(0,0,0,0)",
				},
				emphasis: {
					itemStyle: {
						barBorderColor: "rgba(0,0,0,0)",
						color: "rgba(0,0,0,0)",
					},
				},
				data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
			},
			{
				name: "收入",
				type: "bar",
				stack: "总量",
				label: {
					show: true,
					position: "top",
				},
				data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
			},
			{
				name: "支出",
				type: "bar",
				stack: "总量",
				label: {
					show: true,
					position: "bottom",
				},
				data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
			},
		],
	},
};
