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
    <div class="wrapper">
      <baseItem label="颜色">
        <!-- <el-input v-model="titleInfo.text" size="mini" @change="changeFun('text',titleInfo.text)"></el-input> -->
        <el-color-picker
          v-model="titleInfo.textStyle.color"
          size="mini"
          @change="changeFun('textStyle.color',titleInfo.textStyle.color)"
        ></el-color-picker>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import { defaultTtileKeys } from "../commonData/commonData";
// import { isObject } from "@/utils/common";
export default {
  name: "titleComponents",
  components: {
    baseItem
  },
  data () {
    return {
      titleInfo: JSON.parse(JSON.stringify(defaultTtileKeys))
    };
  },
  methods: {
    // 输入框改变的类型和值
    changeFun (type, value) {
      console.log(type, value);
      // this.$set(this.titleInfo, type, value);
      this.$emit("change", { type, value });

    },
    setData (data) {
      console.log(data);
      if (!data || data === null || Object.keys(data).length === 0) {
        // data = defaultTtileKeys;
        this.titleInfo = JSON.parse(JSON.stringify(defaultTtileKeys));
        console.log(this.titleInfo);
      } else {
        let targetKeys = Object.keys(this.titleInfo);
        targetKeys.forEach(v => {
          this.$set(this.titleInfo, v, data[v]);
        });
      }
      // console.log(data);

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
