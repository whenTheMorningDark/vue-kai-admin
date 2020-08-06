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
      <baseInput
        :dataInfo="dataInfo"
        :disabled="cDisabled"
        @changeColorFont="changeColorFontFun"
        :attrs="attrsKey"
        :width="70"
        :componentData="xyData"
      ></baseInput>
    </div>

    <div class="wrapper">
      <baseItem :width="70" :label="cLabel+'文本'">
        <!-- @click="handleFontclick" -->
        <settingDialog
          :dataInfo="dataInfo"
          :disabled="cDisabled"
          @changeColorFont="changeColorFontFun"
          :attrs="attrsKey"
          :width="70"
          attrsKey="nameTextStyle"
          :clickBeforFun="handleFontclick"
        ></settingDialog>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseInput
        :dataInfo="dataInfo"
        :disabled="cDisabled"
        @changeColorFont="changeColorFontFun"
        :attrs="attrsKey"
        :width="70"
        :componentData="axisLabelData"
        attrsKey="axisLabel"
      ></baseInput>
    </div>

    <div class="wrapper">
      <baseItem :width="70" label="刻度文本">
        <settingDialog
          :dataInfo="dataInfo"
          :disabled="cDisabled"
          @changeColorFont="changeColorFontFun"
          :attrs="attrsKey"
          :width="70"
          attrsKey="axisLabel"
          :clickBeforFun="handleAxisLabelclick"
        ></settingDialog>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import settingDialog from "../settingDialog/index";
import baseInput from "../baseInput";
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
    // colorFont,
    baseInput,
    settingDialog
  },
  computed: {
    cLabel () {
      return this.attrsKey === "xAxis" ? "x轴" : "y轴";
    }
  },
  data () {
    return {
      nameLocationOptions,
      xyData: [
        { label: "名称", type: "el-input", keys: "name", props: { clearable: true } },
        { label: "位置", type: "el-select", keys: "nameLocation", option: nameLocationOptions, props: { clearable: true, placeholder: "请选择名称位置" } },
        { label: "距离", type: "el-input-number", keys: "nameGap", props: { min: 1 } },
        { label: "角度", type: "el-input-number", keys: "nameRotate", props: { min: 0 } },
      ],
      axisLabelData: [
        { label: "自定义", type: "el-input", keys: "formatter", props: { min: 0, placeholder: "必须输入{value}" } },
        { label: "刻度显示", type: "el-checkbox", keys: "show", props: {} },
      ]
    };
  },
  methods: {
    changeColorFontFun (attrs, props, value) {
      console.log(attrs, props, value);
      this.$emit("change", attrs, props, value);
    },
    changeFun (attr, type, value) {
      this.$emit("change", attr, type, value);
    },
    // 检测弹窗的公用方法
    checkDialogFun ({ message, check }) {
      if (check) {
        this.$message({
          message: message,
          type: "warning"
        });
        return false;
      }
      return true;
    },
    // 处理点击文本的icon
    handleFontclick () {
      let check = this.dataInfo.name.length === 0;
      let json = {
        message: `请输入${this.cLabel}文字`,
        check
      };
      return this.checkDialogFun(json);
    },
    // 处理点击xy轴的icon
    handleAxisLabelclick () {
      let check = !this.dataInfo.axisLabel.show;
      let json = {
        message: `请勾选显示${this.cLabel}轴`,
        check
      };
      return this.checkDialogFun(json);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
}
</style>