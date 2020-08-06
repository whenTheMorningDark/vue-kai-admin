<template>
  <div class="xyComponents">
    <div class="wrapper">
      <baseItem label="显示">
        <el-checkbox
          v-model="dataInfo.show"
          @change="changeFun(attrsKey,'show',dataInfo.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
    <div class="wrapper">
      <baseItem label="名称">
        <el-input
          v-model="dataInfo.name"
          size="mini"
          @change="changeFun(attrsKey,'name',dataInfo.name)"
          :disabled="cDisabled"
        ></el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="位置">
        <el-select
          v-model="dataInfo.nameLocation"
          placeholder="请选择名称位置"
          @change="changeFun(attrsKey,'nameLocation',dataInfo.nameLocation)"
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
        :attrs="attrsKey"
        attrsKey="nameTextStyle"
      ></colorFont>
    </div>

    <div class="wrapper">
      <baseItem label="距离">
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
      <baseItem label="角度">
        <el-input-number
          v-model="dataInfo.nameRotate"
          :min="0"
          size="mini"
          @change="changeFun(attrsKey,'nameRotate',dataInfo.nameRotate)"
          :disabled="cDisabled"
        ></el-input-number>
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
      nameLocationOptions
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