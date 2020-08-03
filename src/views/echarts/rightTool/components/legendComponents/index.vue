<template>
  <div class="legendComponents">
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
      <baseItem label="左侧">
        <el-input
          placeholder="请输入内容"
          v-model="dataInfo.left"
          size="mini"
          @change="changeFun('left',dataInfo.left)"
          :disabled="cDisabled"
        >
          <el-select
            v-model="dataInfo.left"
            slot="prepend"
            placeholder="请选择"
            @change="changeFun('left',dataInfo.left)"
            :disabled="cDisabled"
          >
            <el-option
              v-for="item in leftDataOptopns"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="顶部">
        <el-input
          placeholder="请输入内容"
          v-model="dataInfo.top"
          size="mini"
          @change="changeFun('top',dataInfo.top)"
          :disabled="cDisabled"
        >
          <el-select
            v-model="dataInfo.top"
            slot="prepend"
            placeholder="请选择"
            @change="changeFun('top',dataInfo.top)"
            :disabled="cDisabled"
          >
            <el-option
              v-for="item in topDataOptopns"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-input>
      </baseItem>
    </div>

    <div class="wrapper">
      <baseItem label="朝向">
        <el-select
          v-model="dataInfo.orient"
          placeholder="请选择"
          @change="changeFun('orient',dataInfo.orient)"
          size="mini"
          :disabled="cDisabled"
        >
          <el-option
            v-for="item in orientOptopns"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </baseItem>
    </div>

    <div class="wrapper">
      <div class="wrapper-row" v-for="item in paddingArr" :key="item.type">
        <baseItem :label="sitem.label" v-for="sitem in item.children" :key="sitem.key">
          <el-input-number
            v-model="dataInfo.padding[sitem.index]"
            :min="1"
            size="mini"
            @change="changeFun(sitem.key,dataInfo.padding[sitem.index])"
            :disabled="cDisabled"
          ></el-input-number>
        </baseItem>
      </div>
    </div>
    <div class="wrapper">
      <baseItem label="间隔">
        <el-input-number
          v-model="dataInfo.itemGap"
          :min="1"
          size="mini"
          @change="changeFun('itemGap',dataInfo.itemGap)"
          :disabled="cDisabled"
        ></el-input-number>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import { legendData, leftDataOptopns, topDataOptopns, orientOptopns } from "../commonData/legendData";
import componentsMixins from "../mixins/component";
import { clearValues } from "../../../utils/utils";
export default {
  name: "legendComponents",
  mixins: [componentsMixins],
  data () {
    return {
      dataInfo: clearValues(legendData),
      leftDataOptopns,
      topDataOptopns,
      orientOptopns,
      paddingArr: [
        { type: "firstRow", children: [{ label: "上", key: "paddingTop", index: 0 }, { label: "右", key: "paddingRight", index: 1 }] },
        { type: "secondRow", children: [{ label: "下", key: "paddingBottom", index: 2 }, { label: "左", key: "paddingLeft", index: 3 }] }
      ]
    };
  },
  components: {
    baseItem
  }
};
</script>

<style lang="scss" scoped>
.wrapper-row {
  display: flex;
  margin-bottom: 5px;
  /deep/ .el-input-number {
    width: 100%;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.wrapper {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>