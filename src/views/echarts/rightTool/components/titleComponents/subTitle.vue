<template>
  <div class="subTitle">
    <div class="title">副标题</div>
    <div class="wrapper">
      <baseItem label="文本">
        <el-input
          v-model="dataInfo.subtext"
          size="mini"
          @change="changeFun('title','subtext',dataInfo.subtext)"
          :disabled="cDisabled"
        ></el-input>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="样式">
        <settingDialog
          :dataInfo="dataInfo"
          :disabled="cDisabled"
          @changeColorFont="changeColorFontFun"
          attrs="title"
          :width="70"
          attrsKey="subtextStyle"
        ></settingDialog>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import settingDialog from "../settingDialog";
import componentsMixins from "../mixins/component";
import { clearValues } from "../../../utils/utils";
import { defaultTtileKeys } from "../commonData/commonData";
export default {
  name: "subTitle",
  mixins: [componentsMixins],
  components: {
    baseItem,
    settingDialog
  },
  data () {
    return {
      dataInfo: clearValues(defaultTtileKeys),
    };
  },
  methods: {
    changeColorFontFun (attrs, props, value) {
      this.changeFun(attrs, props, value);
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