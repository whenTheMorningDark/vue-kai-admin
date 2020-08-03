/* eslint-disable indent */
export const defaultTtileKeys = {
	text: "默认标题",
	show: true,
	textStyle: {
		color: "#333",
		fontStyle: "normal",
		fontWeight: "bolder",
		fontFamily: "Microsoft YaHei",
		fontSize: 20,
	},
	x: "center",
	y: "top",
};

export const fontStyleOptions = [
	{ label: "normal", value: "normal" },
	{ label: "italic", value: "italic" },
	{ label: "oblique", value: "oblique" },
];

export const fontFamilyOptions = [
	{ label: "serif", value: "serif" },
	{ label: "monospace", value: "monospace" },
	{ label: "Arial", value: "Courier New" },
	{ label: "Microsoft YaHei", value: "Microsoft YaHei" },
];

export const xDirections = [
	{ label: "水平居左", value: "left" },
	{ label: "水平居中", value: "center" },
	{ label: "水平居右", value: "right" },
];
export const yDirections = [
	{ label: "顶部", value: "top" },
	{ label: "底部", value: "bottom" },
];
