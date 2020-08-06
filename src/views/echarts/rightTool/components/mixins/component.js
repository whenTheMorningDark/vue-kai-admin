/* eslint-disable indent */
import { mapGetters } from "vuex";
import { clearValues } from "../../../utils/utils";
export default {
	computed: {
		...mapGetters(["currentTarget"]),
		cDisabled() {
			return !this.dataInfo.show;
		},
		cShowDisabled() {
			return !Object.keys(this.currentTarget).length > 0;
		},
	},
	methods: {
		// 输入框改变的类型和值
		changeFun(attr, type, value) {
			this.$emit("change", { attr, type, value });
		},
		setData(data) {
			if (!data || data === null || Object.keys(data).length === 0) {
				this.dataInfo = clearValues(this.dataInfo);
			} else {
				let targetKeys = Object.keys(this.dataInfo);
				targetKeys.forEach((v) => {
					this.$set(this.dataInfo, v, data[v]);
				});
			}
		},
	},
};
