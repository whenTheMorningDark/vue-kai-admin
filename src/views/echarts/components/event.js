/* eslint-disable indent */
export default {
	data() {
		return {
			steps: 5,
		};
	},
	methods: {
		move(direction) {
			let targetKeys = [40, 37, 39, 38];
			if (
				!targetKeys.includes(direction) ||
				Object.keys(this.currentItem).length === 0
			) {
				return;
			}
			let map = {
				40: this.downFun,
				37: this.leftFun,
				39: this.rightFun,
				38: this.upFun,
			};
			map[direction]();
		},
		// 向下的方法
		downFun() {
			console.log("down");
			let y = this.currentItem.y + this.steps;
			this.$set(this.currentItem, "y", y);
		},
		// 向上的方法
		upFun() {
			console.log("up");
			let y = this.currentItem.y - this.steps;
			this.$set(this.currentItem, "y", y);
		},
		// 向左的方法
		leftFun() {
			console.log("left");
			let x = this.currentItem.x - this.steps;
			this.$set(this.currentItem, "x", x);
		},
		// 向右的方法
		rightFun() {
			console.log("left");
			let x = this.currentItem.x + this.steps;
			this.$set(this.currentItem, "x", x);
		},
	},
	mounted() {
		window.addEventListener("keydown", (e) => this.move(e.keyCode));
	},
	destory() {
		window.removeEventListener("keydown", (e) => this.move(e.keyCode));
	},
};
