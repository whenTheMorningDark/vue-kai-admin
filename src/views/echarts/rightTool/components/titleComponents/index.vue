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
        <el-color-picker
          v-model="titleInfo.textStyle.color"
          size="mini"
          @change="changeFun('textStyle.color',titleInfo.textStyle.color)"
        ></el-color-picker>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="字体">
        <el-select
          v-model="titleInfo.textStyle.fontStyle"
          placeholder="请选择字体样式"
          @change="changeFun('textStyle.fontStyle',titleInfo.textStyle.fontStyle)"
          size="mini"
        >
          <el-option
            v-for="item in fontStyleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="大小">
        <el-input-number
          v-model="titleInfo.textStyle.fontSize"
          :min="1"
          size="mini"
          @change="changeFun('textStyle.fontSize',titleInfo.textStyle.fontSize)"
        ></el-input-number>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="主题">
        <el-select
          v-model="titleInfo.textStyle.fontFamily"
          placeholder="请选择字体样式"
          @change="changeFun('textStyle.fontFamily',titleInfo.textStyle.fontFamily)"
          size="mini"
        >
          <el-option
            v-for="item in fontFamilyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="x方向">
        <el-select
          v-model="titleInfo.x"
          placeholder="请选择水平方向"
          @change="changeFun('x',titleInfo.x)"
          size="mini"
        >
          <el-option
            v-for="item in xDirections"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="y方向">
        <el-select
          v-model="titleInfo.y"
          placeholder="请选择垂直方向"
          @change="changeFun('y',titleInfo.y)"
          size="mini"
        >
          <el-option
            v-for="item in yDirections"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import { defaultTtileKeys, fontStyleOptions, fontFamilyOptions, xDirections, yDirections } from "../commonData/commonData";
// import { isObject } from "@/utils/common";
export default {
  name: "titleComponents",
  components: {
    baseItem
  },
  data () {
    return {
      titleInfo: JSON.parse(JSON.stringify(defaultTtileKeys)),
      fontStyleOptions,
      fontFamilyOptions,
      yDirections,
      xDirections,
      titleData: [
        { label: "显示", valueKey: "show", type: "el-checkbox" }
      ] // 标题组件的数据
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
