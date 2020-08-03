/* eslint-disable indent */
import { defaultTtileKeys } from "../../../../rightTool/components/commonData/commonData";
import { legendData } from "../../../../rightTool/components/commonData/legendData";
import { cloneDeep } from "lodash";
export const areaBasicData = {
	name: "折线图",
	type: "line",
	images: require("@/assets/images/area-basic.jpg"),
	optionsData: {
		title: defaultTtileKeys,
		legend: cloneDeep(legendData),
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: "line",
				areaStyle: {},
			},
		],
	},
};
