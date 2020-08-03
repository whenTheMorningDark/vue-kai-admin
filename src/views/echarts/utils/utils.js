/* eslint-disable indent */
import { cloneDeep, isPlainObject } from "lodash";
let needBoolean = ["show"];
let numberArr = [
	"fontSize",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
];
let ArrayArr = ["padding"];
export const clearValues = (Obj) => {
	let targetObj = cloneDeep(Obj);
	for (let key in targetObj) {
		if (isPlainObject(targetObj[key])) {
			targetObj[key] = clearValues(targetObj[key]);
		} else {
			if (needBoolean.includes(key)) {
				targetObj[key] = false;
			} else {
				if (numberArr.includes(key)) {
					targetObj[key] = 12;
				} else if (ArrayArr.includes(key)) {
					// targetObj[key] =
					if (key === "padding") {
						targetObj[key] = [5, 5, 5, 5];
					} else {
						targetObj[key] = [];
					}
				} else {
					targetObj[key] = "";
				}
			}
		}
	}
	return targetObj;
};
