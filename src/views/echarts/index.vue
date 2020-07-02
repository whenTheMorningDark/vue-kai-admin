<template>
  <div class="echarts-wrapper">
    <div class="left-container">
      <toolbar></toolbar>
      <div class="add-wrapper" @drop="drop" @dragover="allowDrop" ref="addWrapper">
        <resizeBox :boxStyle="boxStyle">
          <component :is="componentsType" :id="'echart'+1"></component>
        </resizeBox>
      </div>
    </div>
  </div>
</template>
<script>
import toolbar from "./components/toolBar";
import dataBar from "./echartComponent/dataBar";
import resizeBox from "./components/resizeBox";
export default {
  name: "echarts",
  components: {
    toolbar,
    dataBar,
    resizeBox
  },
  data () {
    return {
      componentsType: "dataBar",
      resizeBox: [],
      boxStyle: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    allowDrop (ev) {
      ev.preventDefault();
    },
    drop (ev) {
      let ele = this.$refs.addWrapper;
      let elex = ele.getBoundingClientRect().x;
      let eley = ele.getBoundingClientRect().y;
      let { x, y } = ev;
      let styleOption = { x: x - elex, y: y - eley };
      ev.preventDefault();
      // this.componentsType = "dataBar";
      var data = JSON.parse(ev.dataTransfer.getData("data"));
      // this.componentsType = data.type;
      let boxStyle = Object.assign({ x: 0, y: 0 }, styleOption);
      this.resizeBox.push({
        boxStyle,
        componentsType: data.type
      });
      console.log(this.resizeBox);
      // ev.target.appendChild(document.getElementById(data));
    }
  }

};
</script>
<style lang="scss" scoped>
.echarts-wrapper {
  width: 100%;
  height: 100%;
  .left-container {
    width: calc(100% - 120px);
    height: 100%;
    .add-wrapper {
      // width: 220px;
      width: 100%;
      height: calc(100% - 30px);
      position: relative;
    }
  }
}
</style>