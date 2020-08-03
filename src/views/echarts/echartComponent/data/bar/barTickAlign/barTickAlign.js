/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
export const barTickAlign = {
	name: "坐标轴刻度与标签对齐",
	type: "bar",
	images: require("@/assets/images/bar-tick-align.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		color: ["#3398DB"],
		legend: legendData,
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				axisTick: {
					alignWithLabel: true,
				},
			},
		],
		yAxis: [
			{
				type: "value",
			},
		],
		series: [
			{
				name: "直接访问",
				type: "bar",
				barWidth: "60%",
				data: [10, 52, 200, 334, 390, 330, 220],
			},
		],
	},
};
