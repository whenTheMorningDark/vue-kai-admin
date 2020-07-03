/* eslint-disable indent */
export const defaultline = {
	name: "折线图",
	type: "line",
	images: require("@/assets/images/line-simple.jpg"),
	optionsData: {
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
