/* eslint-disable comma-dangle */
/* eslint-disable indent */
// 这是柱状图默认的数据
import { randomStr } from "@/utils";
export const g2BarData = [
	{ genre: "Sports", sold: 275 },
	{ genre: "Strategy", sold: 115 },
	{ genre: "Action", sold: 120 },
	{ genre: "Shooter", sold: 350 },
	{ genre: "Other", sold: 150 },
];
export const baseOptions = {
	container: "g2Bar" + randomStr(3),
	width: 400,
	height: 250,
};
