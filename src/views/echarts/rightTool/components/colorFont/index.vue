<template>
  <div class="colorFont">
    <div class="wrapper" v-for="item in colorFontData" :key="item.keys">
      <baseItem :label="item.label" :width="width">
        <component
          :is="item.type"
          v-model="dataInfo[attrsKey][item.keys]"
          @change="changeFun(item.keys)"
          :disabled="disabled"
          size="mini"
          v-bind="item.props"
        >
          <template v-if="item.type==='el-select' && item.option && item.option.length>0">
            <el-option
              v-for="item in item.option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </template>
        </component>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
const fontStyleOptions = [
  { label: "normal", value: "normal" },
  { label: "italic", value: "italic" },
  { label: "oblique", value: "oblique" },
];

const fontFamilyOptions = [
  { label: "serif", value: "serif" },
  { label: "monospace", value: "monospace" },
  { label: "Arial", value: "Courier New" },
  { label: "Microsoft YaHei", value: "Microsoft YaHei" },
];
const fontWeightOptions = [
  { label: "normal", value: "normal" },
  { label: "bold", value: "bold" },
  { label: "bolder", value: "bolder" },
  { label: "lighter", value: "lighter" },
];
export default {
  name: "colorFont",
  data () {
    return {
      colorFontData: [
        { label: "颜色", keys: "color", type: "el-color-picker" },
        { label: "大小", keys: "fontSize", type: "el-input-number" },
        { label: "字体", keys: "fontStyle", type: "el-select", option: fontStyleOptions, props: { clearable: true, placeholder: "请选择字体" } },
        { label: "主题", keys: "fontFamily", type: "el-select", option: fontFamilyOptions, props: { clearable: true, placeholder: "请选择主题" } },
        { label: "粗细", keys: "fontWeight", type: "el-select", option: fontWeightOptions, props: { clearable: true, placeholder: "请选择粗细" } },
      ],
      fontStyleOptions,
      fontFamilyOptions,
      fontWeightOptions
    };
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: true
    },
    attrs: {
      type: String,
      default: ""
    },
    attrsKey: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 50
    }
  },
  components: {
    baseItem
  },
  methods: {
    changeFun (keys) {
      this.$emit("changeColorFont", this.attrs, `${this.attrsKey}.${keys}`, this.dataInfo[this.attrsKey][keys]);
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