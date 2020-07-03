<template>
  <div class="toolbar">
    <el-popover placement="right" title="选择图表" width="800" trigger="click">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          v-for="(item,index) in listData"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="6" v-for="(element,index) in item.children" :key="index">
              <div class="content-wrapper" @dragstart="drag($event,element)" draggable="true">
                <div class="imgages" v-if="element.images">
                  <img :src="element.images" width="100%" height="140" />
                </div>
                <div>{{element.name}}</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="toolbar-item" slot="reference">
        <SvgIcon iconClass="tubiao" class="icon-item"></SvgIcon>
      </div>
    </el-popover>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import { barChildren } from "../echartComponent/data/bar/index";
import { lineChildren } from "../echartComponent/data/line/index";
import { pieChildren } from "../echartComponent/data/pie/index";
export default {
  name: "echartToolbar",
  components: {
    SvgIcon
  },
  data () {
    return {
      listData: [
        { name: "bar", label: "柱形图", children: barChildren },
        { name: "line", label: "折线图", children: lineChildren },
        { name: "pie", label: "饼图", children: pieChildren },
        // { name: "scatter", label: "散点图", children: [{ name: "基础散点图", id: 12, images: require("@/assets/images/scatter-simple.jpg"), type: "scatter", optionsData: map.scatterData }] },
        // { name: "radar", label: "雷达图", children: [{ name: "基础雷达图", id: 12, images: require("@/assets/images/radar.jpg"), type: "radar", optionsData: map.radarData }] }
      ],
      activeName: "bar"
    };
  },
  methods: {
    drag (e, element) {
      e.dataTransfer.setData("data", JSON.stringify(element));
    }
  }

};
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.toolbar {
  width: 100%;
  height: 30px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  .toolbar-item {
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin-right: 5px;
    .icon-item {
      width: 100%;
      height: 100%;
      color: #1296db;
    }
  }
}
</style>
