<template>
  <VueDragResize
    :w="baseOptions.width"
    :h="baseOptions.height"
    v-on:resizing="resize"
    v-on:dragging="dragging"
  >
    <g2Template v-bind="$props" ref="g2Template"></g2Template>
  </VueDragResize>
</template>

<script>
import g2Template from "../g2Template";
import VueDragResize from "vue-drag-resize";
import { g2BarData, baseOptions } from "../data/g2Bar";
export default {
  components: {
    g2Template,
    VueDragResize
  },
  props: {
    data: {
      type: Array,
      default: g2BarData
    },
    baseOptions: {
      type: Object,
      default: baseOptions
    }
  },
  methods: {
    changeData (data) {
      this.$refs.g2Template.changeData(data);

    },
    dragging (newRect) {
      // ["top", "left"].forEach(v => {
      //   this.$set(this.boxStyle, v, newRect[v] + "px");
      // });
      // this.$refs.g2Template.forceFit();
    },
    resize (newRect) {
      this.$refs.g2Template.forceFit();
    }
  }
};
</script>

<style>
.box {
  position: relative;
}
.vdr {
  padding: 10px;
}
</style>