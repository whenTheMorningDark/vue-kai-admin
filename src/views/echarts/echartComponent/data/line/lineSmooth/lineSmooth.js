/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { cloneDeep } from "lodash";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
export const lineSmooth = {
	name: "平滑折线图",
	type: "line",
	images: require("@/assets/images/line-smooth.jpg"),
	optionsData: {
		title: defaultTtileKeys,
		legend: cloneDeep(legendData),
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
				smooth: true,
			},
		],
	},
};
