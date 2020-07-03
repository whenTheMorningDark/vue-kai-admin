/* eslint-disable require-jsdoc */
/* eslint-disable indent */
// const componentsContext = require.context("./", true, /(vue|js)$/);

export const fileToData = (componentsContext) => {
	let targetText = componentsContext
		.keys()
		.map((v) => changeStr(v))
		.filter((v) => v !== "index");
	let map = {};
	targetText.forEach((v) => {
		console.log(v);
		// 获取文件中的 default 模块
		const componentConfig = componentsContext(`./${v}/${v}.js`)[v];
		if (!map[v]) {
			map[v] = componentConfig;
		}
	});
	return Object.values(map);
};

function changeStr(str) {
	str = str.replace(/^\.\//, "");
	var rBegin = "(?=^s*\\b)";
	var rEnd = "(?=\\b\\s+$|$)";
	var rEndSplit = rEnd.replace("=", "!");
	var rPath = "((?:.split)*(?:\\w+\\.)*(?:.split)*(?:\\w+\\.)*[\\\\\\/])?".replace(
		/split/g,
		rEndSplit
	);
	var rName = "([^\\\\\\/]+?)";
	var rSuffix = "(?:\\.([^\\.\\s]+)\\b)?";

	var regContent = rBegin + rPath + rName + rSuffix + rEnd;

	var reg = new RegExp(regContent, "");
	var match = str.match(reg);
	return match[2];
}
