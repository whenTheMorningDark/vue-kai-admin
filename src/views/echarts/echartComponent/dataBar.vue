<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  props: {
    id: [String]
  },
  mounted () {
    var myChart = echarts.init(document.getElementById(this.id));
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
};
</script>

<style>
</style>