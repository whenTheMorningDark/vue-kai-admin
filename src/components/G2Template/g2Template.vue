<template>
  <VueDragResize
    :w="baseOptions.width"
    :h="baseOptions.height"
    v-on:resizing="resize"
    v-on:dragging="dragging"
  >
    <div :id="baseOptions.container" style="height:100%"></div>
  </VueDragResize>
</template>

<script>
import { Chart } from "@antv/g2";
import VueDragResize from "vue-drag-resize";

export default {
  name: "g2Tempalte",
  components: {
    VueDragResize
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    baseOptions: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "interval"
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
    dragging (newRect) {
      // ["top", "left"].forEach(v => {
      //   this.$set(this.boxStyle, v, newRect[v] + "px");
      // });
      // this.$refs.g2Template.forceFit();
    },
    resize (newRect) {
      this.forceFit();
    },
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
      this.chart[this.type]().position(keys);
      this.chart.render();
      this.forceFit();
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