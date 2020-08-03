/* eslint-disable indent */
export default {
	methods: {
		// 输入框改变的类型和值
		changeFun(type, value) {
			this.$emit("change", { type, value });
		},
		setData(data) {
			console.log(data);
			if (!data || data === null || Object.keys(data).length === 0) {
				this.dataInfo = JSON.parse(JSON.stringify(this.defaultData));
			} else {
				let targetKeys = Object.keys(this.dataInfo);
				targetKeys.forEach((v) => {
					this.$set(this.dataInfo, v, data[v]);
				});
			}
		},
	},
};
