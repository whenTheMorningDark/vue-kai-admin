<template>
  <div class="echarts-wrapper">
    <div class="left-container">
      <toolbar></toolbar>
      <div class="add-wrapper" @drop="drop" @dragover="allowDrop" ref="addWrapper">
        <resizeBox
          :item="item"
          v-for="item in resizeBox"
          :key="item.id"
          @onResize="onResize"
          @delFun="delFun"
        >
          <echartTemplate :id="item.id" ref="echartComponent" :optionsData="item.optionsData"></echartTemplate>
        </resizeBox>
      </div>
    </div>
    <div class="right-container">
      <rightTool></rightTool>
    </div>
  </div>
</template>
<script>
import toolbar from "./components/toolBar";
import echartTemplate from "./echartComponent/echartTemplate";
import resizeBox from "./components/resizeBox";
import { randomStr } from "@/utils";
import rightTool from "./rightTool/index";
export default {
  name: "echarts",
  components: {
    toolbar,
    echartTemplate,
    resizeBox,
    rightTool
  },
  data () {
    return {
      resizeBox: [],
      currentId: "", // 当前操作的id
      targetEchart: null // 当前操作的echart对象
    };
  },
  methods: {
    allowDrop (ev) {
      ev.preventDefault();
    },
    async drop (ev) {
      let ele = this.$refs.addWrapper;
      let elex = ele.getBoundingClientRect().x;
      let eley = ele.getBoundingClientRect().y;
      let { x, y } = ev;
      let uid = randomStr(8);
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("data"));
      let styleOption = { x: x - elex, y: y - eley, id: uid, optionsData: data.optionsData };
      let boxOptions = Object.assign({ x: 0, y: 0, w: 300, h: 300 }, styleOption);
      let id = await this.createEchart(boxOptions);
      let targetEchart = this.$refs.echartComponent.find(v => v.id === id);
      targetEchart.resizeFun();
    },
    createEchart (boxOptions) {
      return new Promise((resolve => {
        this.resizeBox.push({
          ...boxOptions,
          active: true
        });
        resolve(boxOptions.id);
      }));
    },
    onResize (data) { // 处理resize变化后的图形
      if (this.currentId.length === 0 || this.currentId !== data.id) {
        this.currentId = data.id;
        this.targetEchart = this.$refs.echartComponent.find(v => v.id === data.id);
      }
      this.targetEchart.resizeFun();
    },
    // 删除的方法
    delFun (item) {
      this.resizeBox = this.resizeBox.filter(v => v.id !== item.id);
    }
  }

};
</script>
<style lang="scss" scoped>
.echarts-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .left-container {
    width: calc(100% - 220px);
    height: 100%;
    .add-wrapper {
      // width: 220px;
      width: 100%;
      height: calc(100% - 30px);
      position: relative;
    }
  }
  .right-container {
    width: 220px;
    height: 100%;
  }
}
</style>