<template>
  <div class="titleComponents">
    <div class="wrapper">
      <baseItem label="显示">
        <el-checkbox v-model="titleInfo.show" @change="changeFun('show',titleInfo.show)"></el-checkbox>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="文本">
        <el-input v-model="titleInfo.text" size="mini" @change="changeFun('text',titleInfo.text)"></el-input>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import { defaultTtileKeys } from "../commonData/commonData";
export default {
  name: "titleComponents",
  components: {
    baseItem
  },
  data () {
    return {
      titleInfo: defaultTtileKeys
    };
  },
  methods: {
    // 输入框改变的类型和值
    changeFun (type, value) {
      this.$emit("change", { type, value });
    },
    setData (data) {
      if (!data || data === null) {
        data = {};
      }
      let targetKeys = Object.keys(this.titleInfo);
      targetKeys.forEach(v => {
        this.$set(this.titleInfo, v, data[v]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
