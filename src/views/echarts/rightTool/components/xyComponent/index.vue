<template>
  <div class="xyComponents">
    <div class="wrapper">
      <baseItem label="显示" :width="70">
        <el-checkbox
          v-model="dataInfo.show"
          @change="changeFun(attrsKey,'show',dataInfo.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="名称" :width="70">
        <el-input
          v-model="dataInfo.name"
          size="mini"
          @change="changeFun(attrsKey,'name',dataInfo.name)"
          :disabled="cDisabled"
          clearable
        ></el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="位置" :width="70">
        <el-select
          v-model="dataInfo.nameLocation"
          placeholder="请选择名称位置"
          @change="changeFun(attrsKey,'nameLocation',dataInfo.nameLocation)"
          size="mini"
          :disabled="cDisabled"
          clearable
        >
          <el-option
            v-for="item in nameLocationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>

    <div class="wrapper">
      <colorFont
        :dataInfo="dataInfo"
        :disabled="cDisabled"
        @changeColorFont="changeColorFontFun"
        :attrs="attrsKey"
        attrsKey="nameTextStyle"
        :width="70"
      ></colorFont>
    </div>

    <div class="wrapper">
      <baseItem label="距离" :width="70">
        <el-input-number
          v-model="dataInfo.nameGap"
          :min="1"
          size="mini"
          @change="changeFun(attrsKey,'nameGap',dataInfo.nameGap)"
          :disabled="cDisabled"
        ></el-input-number>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="角度" :width="70">
        <el-input-number
          v-model="dataInfo.nameRotate"
          :min="0"
          size="mini"
          @change="changeFun(attrsKey,'nameRotate',dataInfo.nameRotate)"
          :disabled="cDisabled"
        ></el-input-number>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="自定义" :width="70">
        <el-input
          v-model="dataInfo.axisLabel.formatter"
          :min="0"
          size="mini"
          @change="changeFun(attrsKey,'axisLabel.formatter',dataInfo.axisLabel.formatter)"
          :disabled="cDisabled"
          placeholder="必须输入{value}"
        ></el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="刻度显示" :width="70">
        <el-checkbox
          v-model="dataInfo.axisLabel.show"
          @change="changeFun(attrsKey,'axisLabel.show',dataInfo.axisLabel.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import colorFont from "../colorFont/index";
import { nameLocationOptions } from "../commonData/xData";
export default {
  name: "xyComponents",
  props: {
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    cShowDisabled: {
      type: Boolean
    },
    cDisabled: {
      type: Boolean
    },
    attrsKey: {
      type: String
    }
  },
  components: {
    baseItem,
    colorFont
  },
  data () {
    return {
      nameLocationOptions,
      // xyData: [
      //   { label: "名称", type: "el-input", keys: "name", props: { clearable: true } },
      //   { label: "位置", type: "el-select", keys: "nameLocation", option: nameLocationOptions, props: { clearable: true, placeholder: "请选择名称位置" } },
      //   { label: "距离", type: "el-input-number", keys: "nameGap", props: { min: 1 } },
      //   { label: "角度", type: "el-input-number", keys: "nameRotate", props: { min: 0 } },
      //   { label: "自定义", type: "el-input", keys: "axisLabel.formatter", props: { min: 0, placeholder: "必须输入{value}" } },
      //   { label: "刻度显示", type: "el-checkbox", keys: "axisLabel.show", props: {} },
      // ]
    };
  },
  methods: {
    changeColorFontFun (attrs, props, value) {
      // this.changeFun(attrs, props, value);
      console.log(attrs, props, value);
      this.$emit("change", attrs, props, value);
    },
    changeFun (attr, type, value) {
      this.$emit("change", attr, type, value);
    },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
}
</style>