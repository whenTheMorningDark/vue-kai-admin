/* eslint-disable indent */
export default {
	bind(el, binding, vnode) {
		console.log(el);
		const getStyle = (function () {
			if (window.document.currentStyle) {
				return (dom, attr) => dom.currentStyle[attr];
			} else {
				return (dom, attr) => getComputedStyle(dom, false)[attr];
			}
		})();
		el.onmousedown = (e) => {
			console.log(e);
			const disX = e.clientX - el.offsetLeft;
			const disY = e.clientY - el.offsetTop;
			const dragDomWidth = el.offsetWidth;
			const dragDomHeight = el.offsetHeight;
			const screenWidth = document.body.clientWidth;
			const screenHeight = document.body.clientHeight;
			const minDragDomLeft = el.offsetLeft;
			const maxDragDomLeft = screenWidth - el.offsetLeft - dragDomWidth;
			const minDragDomTop = el.offsetTop;
			const maxDragDomTop = screenHeight - el.offsetTop - dragDomHeight;
			let styL = getStyle(el, "left");
			let styT = getStyle(el, "top");
			if (styL.includes("%")) {
				styL = +document.body.clientWidth * (+styL.replace(/\%/g, "") / 100);
				styT = +document.body.clientHeight * (+styT.replace(/\%/g, "") / 100);
			} else {
				styL = +styL.replace(/\px/g, "");
				styT = +styT.replace(/\px/g, "");
			}
			el.onmousemove = function (e) {
				// 通过事件委托，计算移动的距离
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				// 边界处理
				if (-left > minDragDomLeft) {
					left = -minDragDomLeft;
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}

				if (-top > minDragDomTop) {
					top = -minDragDomTop;
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}

				// 移动当前元素
				el.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;

				// emit onDrag event
				// el.$emit("dragDialog");
			};

			el.onmouseup = function (e) {
				el.onmousemove = null;
				el.onmouseup = null;
			};
		};
	}
};