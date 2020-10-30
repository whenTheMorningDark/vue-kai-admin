<template>
  <div class="mxgraph_container">
    <leftSetting></leftSetting>
    <div class="mxgraph_mid" @drop="drop" @dragover="allowDrop" ref="addWrapper">
      <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
          <mxGraphComponent
            v-if="graphData.length > 0"
            ref="mxGraph"
            :graph-data="graphData"
            :rules="rules"
            @click="clickGraphFun"
          />
      </el-scrollbar>
    </div>
    <rightSetting :key="currentCell.id" @styleChange="styleChange" />
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
import mxGraphComponent from "@/components/mxGraph";
import rightSetting from "./rightSetting";
import leftSetting from "./leftSetting";
import { randomStr } from "@/utils";
// const rhombus = require("@/assets/images/rhombus.gif");
// const ellipse = require("@/assets/images/ellipse.gif");
// const rounded = require("@/assets/images/rounded.gif");
// const del = require("@/assets/images/del.png");
const defaultValue = {strokeColor: "#333", fillColor: "#fff"};
export default {
  name: "MxgraphContainer",
  provide () {
    return {
      root: this
    };
  },
  components: {
    mxGraphComponent,
    rightSetting,
    leftSetting
  },
  // rhombus
  // "shape=cylinder;strokeWidth=2;fillColor=#ffffff;strokeColor=black;" +
  //     "gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=14;"
  data () {
    return {
      graphData: [
        { id: "5", value: "开始", styleOptions: { shape: "rectangle", strokeColor: "#662B2B", dashed: "0", strokeWidth: 1 }, x: 100, y: 100, width: 100, height: 100,
          to: [
            { id: "7", style: { strokeColor: "red", edgeStyle: "orthogonalEdgeStyle", rounded: 0, orthogonalLoop: 1 }, edgeOptions: { id: "25", value: "8888", type: "8888edge" } },
            { id: "9", edgeOptions: { id: "35", value: "9999" } }], options: { name: "add", type: "start" }
        },
        { id: "7", value: "结束1", styleOptions: {shape: "cylinder"}, x: 500, y: 400, width: 100, height: 100, to: [], options: { name: "add", type: "rounded" } },
        { id: "9", value: "结束2", styleOptions: {shape: "cylinder", strokeWidth: 2, fillColor: "#ffffff", strokeColor: "black", backgroundOutline: 1, size: 15, rounded: 1}, x: 600, y: 500, width: 100, height: 100, to: [], options: { name: "add", type: "ellipse" } }
      ],
      styleOptions: {},
      mathKey: 2,
      currentCell: {}
    };
  },
  methods: {
    allowDrop (ev) {
      ev.preventDefault();
    },
    async drop (ev) {
      console.log(ev);
      let ele = this.$refs.addWrapper;
      let elex = ele.getBoundingClientRect().x;
      let eley = ele.getBoundingClientRect().y;

      let { x, y } = ev;
      let uid = randomStr(8);
      ev.preventDefault();
      let data = JSON.parse(ev.dataTransfer.getData("data"));
      let styles = Object.assign(defaultValue, data.styleOptions);
      let verter = { x: x - elex, y: y - eley, id: uid, value: data.name, styleOptions: styles, width: 100, height: 100, options: {}, to: [] };
      this.$refs.mxGraph.createVerter(verter);
    },


    styleChange ({ key, value }) {
      const notStyleOptions = ["width", "height"];
      if (notStyleOptions.includes(key)) {
        this.currentCell.geometry[key] = value;
      } else {
        this.currentCell.styleOptions[key] = value;
        this.currentCell.style = this.$refs.mxGraph.convertStyleToString(this.currentCell.styleOptions);
      }
      this.$refs.mxGraph.refreshCell(this.currentCell);
    },
    clickGraphFun (cell) {
      this.currentCell = cell;
      console.log(cell);
      this.styleOptions = {};
      // const currentGraphData = this.graphData.find(v => v.id === this.currentCell.id)
      if (Object.keys(cell).length === 0) {
        this.styleOptions = {};
      } else {
        this.styleOptions = Object.assign(this.styleOptions, cell.styleOptions);
      }
    },
    getData () {
      console.log(this.$refs.mxGraph.getGrapthData());
    },
    clickToolBar (v) {
      console.log(v);
      // const cell = this.$refs.mxGraph.getSelectionCells()
      this.$confirm("此操作将永久删除该图形, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs.mxGraph.removeFun();
      })["catch"](() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 自定义是否连线规则
    rules (source, target) {
      // if (!source.options || !target.options) {
      //   return false;
      // }
      // const sType = source.options.type;
      // const tType = target.options.type;
      // const sourceTo = source.to;
      // const tTargetId = target.id;
      // const isHaveTargetId = sourceTo.some(v => v.id === tTargetId);

      // if (isHaveTargetId) {
      //   return false;
      // }
      // if (sType === "start" && tType === "rounded") {
      //   return false;
      // }
      return true;
    }
  }
};
</script>

<style scoped lang="scss">
.mxgraph_container {
  width: 100%;
  height: 100%;
  display: flex;
  .mxgraph_mid{
    height: 100%;
    width:calc(100% - 280px - 160px)
  }
}
</style>
