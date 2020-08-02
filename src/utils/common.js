/* eslint-disable indent */
/* eslint-disable require-jsdoc */
export const debounce = (func, wait, immediate) => {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;

		if (timeout) {
			clearTimeout(timeout);
		}
		if (immediate) {
			const callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait);
			if (callNow) {
				func.apply(context, args);
			}
		} else {
			timeout = setTimeout(() => {
				func.apply(context, args);
			}, wait);
		}
	};
};
export function throttle(func, wait) {
	var previous = 0;
	return function () {
		const now = Date.now();
		const context = this;
		const args = arguments;
		if (now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	};
}
// 判断元素是否是undefine
export const isUndefined = (val) => val === void 0;
// 判断元素是否是对象
export const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
// 根据路径寻找元素的value
// let obj = {
//   a: {
//     b: {
//       c: ["asddsa"]
//     }
//   }
// };
// console.log(getPropByPath(obj, "a.b.c.0"));
export function getPropByPath(obj, path, strict) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, ".$1");
	path = path.replace(/^\./, "");

	let keyArr = path.split(".");
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) {
			break;
		}
		let key = keyArr[i];
		if (key in tempObj) {
			tempObj = tempObj[key];
		} else {
			if (strict) {
				throw new Error("please transfer a valid prop path to form item!");
			}
			break;
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null,
	};
}
//   let obj = {
//     key1: 'str1',
//     key2: {
//         key3: 'str3'
//     },
//     key4: {
//         key5: {
//             key6: 'str6',
//             key7: 'str7'
//         },
//         key8: 'str8'
//     },
//     key9: 'str9'
// };
// searchKeys(obj, 'str3') return 'key3, key2'

export function searchKeys(obj, value) {
	for (let key in obj) {
		if (obj[key] === value) {
			// 找到了 value
			return key;
		} else {
			// 不是要找的 value
			if (typeof obj[key] === "object") {
				// 该值为对象
				let temp = searchKeys(obj[key], value);
				console.log(temp);
				if (temp) {
					// temp 不是 undefined，找到了 value
					return `${temp}, ${key}`;
				}
			}
		}
	}
}