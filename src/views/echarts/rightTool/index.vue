<template>
  <div class="rightTool">
    <rightHeader :tabData="tabData" @click="tabChange" :activeName="activeName"></rightHeader>
    <div class="rightToolContent">
      <el-scrollbar style="height:100%">
        <component :is="tabConponent"></component>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import rightHeader from "./components/rightHeader";
import echartClass from "./tabComponents/echartClass";
import echartData from "./tabComponents/echartData";
import echartLevel from "./tabComponents/echartLevel";
export default {
  name: "rightTool",
  components: {
    rightHeader,
    echartClass,
    echartLevel,
    echartData
  },
  data () {
    return {
      tabData: [
        { name: "first", label: "样式", type: "echartClass" },
        { name: "second", label: "数据", type: "echartData" },
        { name: "third", label: "图层", type: "echartLevel" }
      ],
      tabConponent: "echartClass",
      activeName: "first"
    };
  },
  methods: {
    tabChange (item) {
      this.tabConponent = item.type;
    }
  }
};
</script>

<style lang="scss" scoped>
.rightTool {
  width: 100%;
  height: 100%;
  .rightToolContent {
    height: calc(100% - 43px);
  }
}
</style>
