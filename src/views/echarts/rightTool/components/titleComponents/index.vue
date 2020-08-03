<template>
  <div class="titleComponents">
    <div class="wrapper">
      <baseItem label="显示">
        <el-checkbox
          v-model="dataInfo.show"
          @change="changeFun('show',dataInfo.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="文本">
        <el-input
          v-model="dataInfo.text"
          size="mini"
          @change="changeFun('text',dataInfo.text)"
          :disabled="cDisabled"
        ></el-input>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="颜色">
        <el-color-picker
          v-model="dataInfo.textStyle.color"
          size="mini"
          @change="changeFun('textStyle.color',dataInfo.textStyle.color)"
          :disabled="cDisabled"
        ></el-color-picker>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="字体">
        <el-select
          v-model="dataInfo.textStyle.fontStyle"
          placeholder="请选择字体样式"
          @change="changeFun('textStyle.fontStyle',dataInfo.textStyle.fontStyle)"
          size="mini"
          :disabled="cDisabled"
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
          v-model="dataInfo.textStyle.fontSize"
          :min="1"
          size="mini"
          @change="changeFun('textStyle.fontSize',dataInfo.textStyle.fontSize)"
          :disabled="cDisabled"
        ></el-input-number>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="主题">
        <el-select
          v-model="dataInfo.textStyle.fontFamily"
          placeholder="请选择字体样式"
          @change="changeFun('textStyle.fontFamily',dataInfo.textStyle.fontFamily)"
          size="mini"
          :disabled="cDisabled"
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
          v-model="dataInfo.x"
          placeholder="请选择水平方向"
          @change="changeFun('x',dataInfo.x)"
          size="mini"
          :disabled="cDisabled"
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
          v-model="dataInfo.y"
          placeholder="请选择垂直方向"
          @change="changeFun('y',dataInfo.y)"
          size="mini"
          :disabled="cDisabled"
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
import componentsMixins from "../mixins/component";
import { clearValues } from "../../../utils/utils";
export default {
  name: "titleComponents",
  mixins: [componentsMixins],
  components: {
    baseItem
  },
  data () {
    return {
      dataInfo: clearValues(defaultTtileKeys),
      fontStyleOptions,
      fontFamilyOptions,
      yDirections,
      xDirections
    };
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
