/* eslint-disable comma-dangle */
/* eslint-disable indent */
// 这是折线图默认的数据
import { randomStr } from "@/utils";
export const g2LineData = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
	{
		year: "1997",
		value: 7,
	},
	{
		year: "1998",
		value: 9,
	},
	{
		year: "1999",
		value: 13,
	},
];
export const baseOptions = {
	container: "g2Line" + randomStr(3),
	width: 400,
	height: 250,
};
