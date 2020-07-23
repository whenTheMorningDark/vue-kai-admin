/* eslint-disable indent */
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			steps: 5,
		};
	},
	computed: {
		...mapGetters(["currentTarget"]),
	},
	methods: {
		move(direction) {
			let targetKeys = [40, 37, 39, 38];
			if (
				!targetKeys.includes(direction) ||
				this.currentTarget === null ||
				Object.keys(this.currentTarget).length === 0
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
			let y = this.currentTarget.y + this.steps;
			this.$store.commit("echart/changeCurrentTagetAttr", {
				key: "y",
				value: y,
			});
		},
		// 向上的方法
		upFun() {
			let y = this.currentTarget.y - this.steps;
			this.$store.commit("echart/changeCurrentTagetAttr", {
				key: "y",
				value: y,
			});
		},
		// 向左的方法
		leftFun() {
			let x = this.currentTarget.x - this.steps;
			this.$set(this.currentTarget, "x", x);
			this.$store.commit("echart/changeCurrentTagetAttr", {
				key: "x",
				value: x,
			});
		},
		// 向右的方法
		rightFun() {
			let x = this.currentTarget.x + this.steps;
			this.$store.commit("echart/changeCurrentTagetAttr", {
				key: "x",
				value: x,
			});
		},
	},
	mounted() {
		window.addEventListener("keydown", (e) => this.move(e.keyCode));
	},
	destory() {
		window.removeEventListener("keydown", (e) => this.move(e.keyCode));
	},
};
