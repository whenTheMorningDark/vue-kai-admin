/* eslint-disable indent */
export const areaBasicData = {
	name: "折线图",
	type: "line",
	images: require("@/assets/images/area-basic.jpg"),
	optionsData: {
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
