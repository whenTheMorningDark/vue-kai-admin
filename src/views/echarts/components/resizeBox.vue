<template>
  <div class="resizeBox" :style="cBoxStyle" @click="handClickFun" ref="resizeBox" v-drag>
    <slot></slot>
  </div>
</template>

<script>
import drag from "@/directive/drag"; // base on element-ui

export default {
  name: "resizeBox",
  directives: { drag },
  props: {
    boxStyle: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
  computed: {
    cBoxStyle () {
      return {
        left: this.boxStyle.x + "px",
        top: this.boxStyle.y + "px"
      };
    }
  },
  methods: {
    handClickFun () {
      console.log("clcik");
      // this.boxStyle.x = 200;
    }
  }
};
</script>

<style>
.resizeBox {
  position: absolute;
  width: 600px;
  height: 400px;
}
</style>