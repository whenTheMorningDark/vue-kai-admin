<template>
  <div class="xComponents">
    <div class="wrapper">
      <baseItem label="显示">
        <el-checkbox
          v-model="dataInfo.show"
          @change="changeFun('xAxis','show',dataInfo.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="名称">
        <el-input
          v-model="dataInfo.name"
          size="mini"
          @change="changeFun('xAxis','name',dataInfo.name)"
          :disabled="cDisabled"
        ></el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="位置">
        <el-select
          v-model="dataInfo.nameLocation"
          placeholder="请选择名称位置"
          @change="changeFun('xAxis','nameLocation',dataInfo.nameLocation)"
          size="mini"
          :disabled="cDisabled"
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
        attrs="xAxis"
        attrsKey="nameTextStyle"
      ></colorFont>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import colorFont from "../colorFont/index";
import { xData, nameLocationOptions } from "../commonData/xData";
import componentsMixins from "../mixins/component";
import { clearValues } from "../../../utils/utils";
export default {
  name: "xComponents",
  mixins: [componentsMixins],
  components: {
    baseItem,
    colorFont
  },
  data () {
    return {
      dataInfo: clearValues(xData),
      nameLocationOptions
    };
  },
  methods: {
    changeColorFontFun (attrs, props, value) {
      this.changeFun(attrs, props, value);
    },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
}
</style>