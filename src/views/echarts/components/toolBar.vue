<template>
  <div class="toolbar">
    <el-popover placement="right" title="选择图表" width="500" trigger="hover">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(element,index) in listData" :key="index">
          <div @dragstart="drag($event,element)" draggable="true">{{element.name}}</div>
        </el-col>
      </el-row>
      <div class="toolbar-item" slot="reference">
        <SvgIcon iconClass="tubiao" class="icon-item"></SvgIcon>
      </div>
    </el-popover>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import map from "../echartComponent/data";
export default {
  name: "echartToolbar",
  components: {
    SvgIcon
  },
  data () {
    return {
      listData: [
        { name: "组件1", id: 1, content: "内容内容内容。。。。", type: "dataBar", optionsData: map.barData },
        { name: "组件2", id: 2, content: "内容内容内容。。。。", type: "dataBar", optionsData: map.lineData },
        { name: "组件3", id: 3, content: "内容内容内容。。。。", type: "dataBar", optionsData: map.pieData},
        { name: "组件4", id: 4, content: "内容内容内容。。。。", type: "dataBar", optionsData: map.scatterData },
        { name: "组件5", id: 5, content: "内容内容内容。。。。", type: "dataBar", optionsData: map.radarData },
        { name: "组件6", id: 6, content: "内容内容内容。。。。", type: "dataBar" },
        { name: "组件7", id: 7, content: "内容内容内容。。。。", type: "dataBar" }
      ]
    };
  },
  methods: {
    drag (e, element) {
      e.dataTransfer.setData("data", JSON.stringify(element));
    }
  },
  mounted() {
    console.log(map);
  }
};
</script>

<style lang="scss" scoped>
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
