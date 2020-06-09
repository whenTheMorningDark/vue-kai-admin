<template>
  <div :id="baseOptions.container" style="height:100%"></div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  name: "g2Tempalte",
  components: {
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    baseOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: {}
      // defaultOptions: {
      //   padding: "auto" // 为了防止小图时图表变形
      // }

    };
  },
  methods: {

    changeData (newData) {
      if (!newData || newData.length === 0) {
        return;
      }
      if (Object.keys(this.chart).length > 0) {
        this.chart.changeData(newData);
      }
    },
    forceFit () {
      this.chart.forceFit();
    },
    createChart (baseOptions, data) {
      this.chart = new Chart(this.baseOptions);
      this.chart.data(data);
      let keys = Object.keys(data[0]).join("*");
      this.chart.interval().position(keys);
      this.chart.render();
      this.forceFit();
      // const e = document.createEvent("Event");
      // e.initEvent("resize", true, true);
      // window.dispatchEvent(e);
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.data || this.data.length === 0) {
        return;
      }
      this.createChart(this.baseOptions, this.data);
    });
  }
};
</script>

<style>
</style>