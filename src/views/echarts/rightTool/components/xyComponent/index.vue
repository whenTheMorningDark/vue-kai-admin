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
      <baseItem :width="70" label="x轴文本">
        <settingDialog
          :dataInfo="dataInfo"
          :disabled="cDisabled"
          @changeColorFont="changeColorFontFun"
          :attrs="attrsKey"
          :width="70"
          attrsKey="nameTextStyle"
          @click="handleFontclick"
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
          @click="handleAxisLabelclick"
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
    checkDialogFun ({ message, reslove, check }) {
      if (this.cDisabled) {
        return;
      }
      if (check) {
        this.$message({
          message: message,
          type: "warning"
        });
      } else {
        reslove();
      }
    },
    // 处理点击文本的icon
    handleFontclick (reslove) {
      let check = this.dataInfo.name.length === 0;
      let json = {
        message: "请输入x轴文字",
        reslove,
        check
      };
      this.checkDialogFun(json);
    },
    handleAxisLabelclick (reslove) {
      let check = !this.dataInfo.axisLabel.show;
      let json = {
        message: "请勾选显示x轴",
        reslove,
        check
      };
      this.checkDialogFun(json);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
}
</style>