<template>
  <div :class="rwClassName" :style="rwStyle">
    <canvasRules
      :vertical="vertical"
      :scale="scale"
      :width="width"
      :height="height"
      :start="start"
      :selectStart="selectStart"
      :selectLength="selectLength"
      :canvasConfigs="canvasConfigs"
    ></canvasRules>
  </div>
</template>

<script>
import canvasRules from "./canvasRules/canvasRules";
export default {
  name: "ruleWrapper",
  props: {
    vertical: Boolean,
    scale: Number,
    width: Number,
    thick: Number,
    height: Number,
    start: Number,
    lines: Array,
    selectStart: Number,
    selectLength: Number,
    canvasConfigs: Object,
    palette: Object,
    isShowReferLine: Boolean
  },
  computed: {
    rwClassName () {
      return this.vertical ? "v-container" : "h-container";
    },
    rwStyle () {
      const hContainer = {
        width: `calc(100% - ${this.thick}px)`,
        height: `${this.thick + 1}px`,
        left: `${this.thick}px`
      };
      const vContainer = {
        width: `${this.thick + 1}px`,
        height: `calc(100% - ${this.thick}px)`,
        top: `${this.thick}px`
      };
      return this.vertical ? vContainer : hContainer;
    }
  },
  components: {
    canvasRules
  }

};
</script>

<style>
</style>