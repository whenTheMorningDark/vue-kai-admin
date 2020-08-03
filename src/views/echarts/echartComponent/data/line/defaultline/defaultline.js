/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
console.log(defaultTtileKeys);
export const defaultline = {
	name: "默认折线图",
	type: "line",
	images: require("@/assets/images/line-simple.jpg"),
	optionsData: {
		title: JSON.parse(JSON.stringify(defaultTtileKeys)),
		legend: legendData,
		xAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: "line",
			},
		],
	},
};
